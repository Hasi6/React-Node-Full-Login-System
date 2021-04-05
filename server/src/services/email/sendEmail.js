import databaseData from "../../config/default";
import nodemailer from "nodemailer";

const { emailPassword } = databaseData;

class Email {
  sendEmail = (email, output) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sememories2016@gmail.com",
        pass: emailPassword
      }
    });

    const mailOptions = {
      from: "sememories2016@gmail.com",
      to: email,
      subject: "Verify Account",
      html: output
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  };
}

export default Email;
