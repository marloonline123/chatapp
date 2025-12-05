import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import transporter from "@/config/mail.js";
import Log from "@/utils/logger.js";
import { fileURLToPath } from "url";
import type { SentMessageInfo } from "nodemailer";

interface MailOptions {
    to: string;
    subject: string;
    templateName: string;
    data: Record<string, any>;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class MailService {
    private transporter;
    private templateCache = new Map<string, HandlebarsTemplateDelegate>();

    constructor() {
        this.transporter = transporter;
    }

    private getTemplate(templateName: string): HandlebarsTemplateDelegate {
        if (!this.templateCache.has(templateName)) {
            const templatePath = path.join(__dirname, "../views/emailTemplates", `${templateName}.hbs`);
            const source = fs.readFileSync(templatePath, "utf8");
            this.templateCache.set(templateName, handlebars.compile(source));
        }
        return this.templateCache.get(templateName)!;
    }

    async sendMail({ to, subject, templateName, data }: MailOptions): Promise<SentMessageInfo | null> {
        try {
            const compiled = this.getTemplate(templateName);

            const result = await this.transporter.sendMail({
                from: '"ChatFlow" <no-reply@chatflow.com>',
                to,
                subject,
                html: compiled(data),
            });

            if (result) {
                Log.info(`Email sent successfully to ${to}: ${result.messageId}`);
                return result;
            }
        } catch (error) {
            Log.error("Error sending email: ", {
                message: (error as Error)?.message,
                stack: (error as Error)?.stack,
            });

            return null;
        }
    }
}

export default new MailService();
