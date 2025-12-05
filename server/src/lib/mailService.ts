import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import transporter from "@/config/mail.js";
import Log from "@/utils/logger.js";

interface MailOptions {
    to: string;
    subject: string;
    templateName: string;
    data: Record<string, any>;
}

class MailService {
    private transporter;

    constructor() {
        this.transporter = transporter;
    }

    async sendMail({ to, subject, templateName, data }: MailOptions) {
        try {
            const templatePath = path.join(__dirname, "../views/emailTemplates", `${templateName}.hbs`);
            const source = fs.readFileSync(templatePath, "utf8");
            const compiled = handlebars.compile(source);

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
        }
    }
}

export default new MailService();
