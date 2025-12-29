import Mailgen from "mailgen";
import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  const mailGeneratorTheme = new Mailgen({
    theme: "default",
    product: {
      name: "Major World Debates",
      link: "http://majorworlddebate.com",
    },
  });

  const emailTextual = mailGeneratorTheme.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGeneratorTheme.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  // setup the mail obj
  const mail = {
    from: "mail.mwd@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    throw new ApiError(500, "Email service Failed");
  }
};
