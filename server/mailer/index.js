'use strict';
const nodemailer = require('nodemailer');
const router = require('express').Router()
module.exports = router


router.post('/', (req, res, next) => {
        nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        if (err) console.error.bind(console);
        let transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 25,
                secure: false, // true for 465, false for other ports
                auth: {
                user: 'sup3rmark3tsw33p@gmail.com', // generated ethereal user
                pass: 'redbulll' // generated ethereal password
                }
        });

        // setup email data with unicode symbols
        let mailOptions = {
                from: '"SUPERmarket" <sup3rmark3tsw33p@gmail.com>', // sender address
                to: `"customer" <${req.user.email}`, // list of receivers
                subject: 'Order Confirmation', // Subject line
                text: 'Your Order has been sucessfully processed. You will recieve another email when your order has shipped.', // plain text body
                html: '<b>Your Order has been sucessfully processed. You will recieve another email when your order has shipped.</b>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });

        });
        console.log("jsdkblsjfbldkbfvjkldfbdjbf")
        res.redirect('/home')
});