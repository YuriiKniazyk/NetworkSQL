const mailer = require('nodemailer');
const staticEmail = require('../constant/staticEmail'); 

module.exports = async (email, codes) => {

    const transport = mailer.createTransport({
        service: 'Gmail',
        auth: {
            user: staticEmail.email,
            pass: staticEmail.pasEmail
        }
    });

    const info = await transport.sendMail({
        from: staticEmail.email,
        to: email,
        subject: 'Change password your network!!!',
        html: buildTemplates(codes, email)
    });
    console.log('info: ', info);
};

function buildTemplates(codes, email) {  

    const html = `<h1> Password change </h1>
        If its your place click link: http://localhost:3000/setpassword?email=${email}&codes=${codes}  
        or user this code: <span style="color: red">${codes}</span>`
        
    return html;
}