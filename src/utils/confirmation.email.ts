import {mailHelper} from "./nodemail.helper";

const fs = require("fs");
const Handlebars = require("handlebars");

export const sendConfirmationEmail = async (user,confirmationToken) => {
    const filePath = process.cwd()+"/dist/templates/confirmation.html";
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = Handlebars.compile(source);
    const replacements = {
        name: user.name,
        link: process.env.APP_URL+'auth/confirm_email/'+user.uuid+'/'+confirmationToken,
    };
    const htmlToSend = template(replacements);
    await mailHelper(user.email,'Email Confirmation',htmlToSend);
}