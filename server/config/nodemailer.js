import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure:false,
    auth:{
        user: "94895e003@smtp-brevo.com",
        pass: "G6YXJw8kt9RhqKyr",
    },
})

export default transporter;