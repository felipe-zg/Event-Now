const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true});
admin.initializeApp();


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'faleconosco.eventnow@gmail.com',
        pass: 'senhaEventNow'
    }
});

exports.sendMail = functions.https.onCall((input, context) => {

    const {dest, assunto, mensagem, email, nome} = input;

    const mailOptions = {
        from: 'Event Now <faleconosco.eventnow@gmail.com>',
        to: dest,
        subject: assunto, 
        html: `
            <body style="background-color:#612F74, justify-content: center">
                <h2>Contato de usuário</h2>
                <p style="font-size: 20px;">${mensagem}</p>
                <br />
                <p>de:  ${nome},  ${email}</p>
            </body>
        ` // email content in HTML
    };

    // returning result
    return transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.warn(error.toString());
            return context.send(error.toString());
        }
        console.warn('emial enviado');
        return context.send('Email enviado: ' + info.response);
    });
      
});