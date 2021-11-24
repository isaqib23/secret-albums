import * as nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
export const mailHelper = async (recevier,emailSubject,htmlData) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER, // generated ethereal user
            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.EMAIL_FROM, // sender address
        to: recevier, // list of receivers
        subject: emailSubject, // Subject line
        text: "", // plain text body
        html: htmlData, // html body
        headers: {
            "x-priority": "1",
            "x-msmail-priority": "High",
            importance: "high"
        }
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}
