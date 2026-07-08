import "dotenv/config";
import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "neopolitan",
    product: {
      name: "basecampy",
      link: "https://basecampy.com",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emialHtml = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USERNAME,
      pass: process.env.MAILTRAP_SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: "sanketc2102@gmail.com",
      to: options.email,
      subject: options.subject,
      text: emailTextual,
      html: emialHtml,
    });
  } catch (err) {
    console.error(
      err,
      "sending email is silently failed pls check your credentials",
    );

    console.log("Error", err);
  }
};

function registerUserEmailMailGen(userName, url) {
  return {
    subject: "Verify Your BaseCamp Account",
    body: {
      name: userName,
      intro:
        "Welcome to BaseCamp! Thanks for joining us. Verify your email to activate your account and start collaborating with your team.",
      action: {
        instructions: "Click below to verify your email:",
        button: {
          color: "#2563EB",
          text: "Verify Email",
          link: url,
        },
      },
      outro:
        "If you didn't sign up for BaseCamp, you can safely ignore this email.",
    },
  };
}

function forgetPasswordMailGen(userName, url) {
  return {
    subject: "Reset Your BaseCamp Password",
    body: {
      name: userName,
      intro: "A password reset request was received for your BaseCamp account.",
      action: {
        instructions:
          "Click the button below to reset your password. This link will expire for your security.",
        button: {
          color: "#DC2626",
          text: "Reset Password",
          link: url,
        },
      },
      outro:
        "If you didn't request this password reset, simply ignore this email. Your account remains secure.",
    },
  };
}

export { registerUserEmailMailGen, forgetPasswordMailGen, sendMail };
