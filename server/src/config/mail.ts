import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport/index.js";

const OPTIONS: SMTPTransport.Options = {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 587,
    secure: process.env.MAIL_SECURE === "true" || false, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
}

const transporter = nodemailer.createTransport(OPTIONS);

transporter.verify((error, success) => {
    if (error) console.error(error);
    else console.log("Server is ready to take our messages");
});

export default transporter;