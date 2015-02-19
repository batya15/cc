var nodemailer = require('nodemailer');
var config = require('util/config').get("mailer");
var jade = require('jade');
var fs = require('fs');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "devel.cc@gmail.com",
        pass: "batya1988"
    }
});


module.exports = {
    sendMail: function (email, type, data) {
        var jadeTemplate = jade.compile(fs.readFileSync('services/mailerTemplate/' + type + '.jade', 'utf8'));
        var html = jadeTemplate(data);

        transporter.sendMail({
            from: email,
            to: 'batya.char@gmail.com',
            html: html
        });
    }
};