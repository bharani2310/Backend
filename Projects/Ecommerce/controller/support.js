import nodemailer from "nodemailer";

  export const sendEmailVerification = async (email) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL, 
          pass: process.env.EMAIL_PASS, 
        },
    });

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
  
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Email Verification OTP",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px; text-align: center; max-width: 400px; margin: auto;">
            <h2 style="color: #333;">Email Verification</h2>
            <p style="font-size: 16px; color: #555;">Your One-Time Password (OTP) is:</p>
            <h3 style="font-size: 24px; color: #007bff; margin: 10px 0;">${otp}</h3>
            <p style="font-size: 14px; color: #888;">This OTP is valid for 5 minutes. Do not share it with anyone.</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="font-size: 12px; color: #aaa;">If you did not request this, please ignore this email.</p>
          </div>
        `,
      };
      
  
    await transporter.sendMail(mailOptions);
    return otp;
  };