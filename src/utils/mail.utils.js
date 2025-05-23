import { config }  from "dotenv"
import transporter from "../config/mail.config.js"
import { BaseException } from "../exception/base.exception.js"

config()

const sendMail = async ({ to, subject, text = "", html = "" }) => {
    try {
        const mail = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject,
            text,
            html,
        })
        
        return mail.messageId
    } catch (error) {
        console.log(error);
        throw new BaseException('Email yuborishda xatolik ',500)
    }
}

export default sendMail