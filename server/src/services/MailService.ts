import nodemailer, { TransportOptions, Transporter } from 'nodemailer'

const transporter: Transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
} as TransportOptions)

export const sendVerificationMail = async (to: string, link: string) => {
  // Proper email needed to use it. It will give an error without email data in .env
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Account verification on ' + process.env.SERVER_URL,
      text: '',
      html: `
          <div>
            <h1>Please click on the link to verify your email:</h1>
            <a href="${link}">${link}</a>
          </div>
        `
    })
  } catch (error) {
    console.error(error)
  }
}
