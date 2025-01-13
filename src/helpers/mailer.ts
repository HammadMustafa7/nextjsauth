// Looking to send emails in production? Check out our Email API/SMTP product!


import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";  

export const sendEmail = async ({email, emailType, userId} :any ) => {

    try {
    
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            const user = await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            });
        } else if (emailType === "RESET") {
            const user = await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            });
        }

            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "46bee5a53cfa36",
                  pass: "c6c678b96d84b7"
                }
              });

              const mailOptions = {
                from: "Hammad@gmail.com",
                to: email,  
                subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
                html: `
                <p>Click "${userId}" <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "forgetpassword"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
                or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                </p>
                
                `
              };

                const mailResponse = await transport.sendMail(mailOptions);
                return mailResponse
            
        }
        
     catch (error) {
        return error
    }
}
