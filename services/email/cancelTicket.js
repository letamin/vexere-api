const nodemailer = require("nodemailer");
const fs = require("fs"); //built-in 
const hogan = require("hogan.js"); //to read hjs file
const template = fs.readFileSync("services/email/cancelTicketEmailTemplate.hjs", "utf-8");
const compiledTemplate = hogan.compile(template);

module.exports.sendCancelTicketEmail = (user, trip, ticket) => {
    const transport = {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        requireSSL: true,
        auth: {
            user: "minh.cybersoft@gmail.com",
            pass: "HniM0109."
        }
    }

    const transporter = nodemailer.createTransport(transport);
    const mailOptions = {
        from: "minh.cybersoft@gmail.com",
        to: "lethanhminh0901@gmail.com",
        subject: "Mail xac nhan huy ve thanh cong",
        html: compiledTemplate.render({
            email: user.email, //lay tu user
            fromStation: trip.fromStationId.name,
            toStation: trip.toStationId.name,
            seatCodes: ticket.seats
                .map(i => i.code)
                .join(", ")
        })
    }

    transporter.sendMail(mailOptions, err => {
        if (err) return console.log(err);
        console.log("Mail sent");
    })
}