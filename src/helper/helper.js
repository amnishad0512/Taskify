import nodemailer from 'nodemailer';

export const Response = (res, status, code, message, data) => {
    res.status(code).json({ status, message, data });
};

export const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
};

export const sendEmail = async (type, recipientEmail, key) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'amnishad0512@gmail.com',
            pass: 'iwxb utqd epeq shwv'
        }
    });

    const mailOptionOTP = {
        from: 'amnishad0512@gmail.com',       // Sender's email address
        to: recipientEmail,  // Recipient's email address
        subject: 'Email Verification',              // Subject of the email
        text: 'This is a test email sent using Nodemailer!',  // Plain text body
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Taskify OTP Verification</title>
    <style>
        /* General styling */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
        }
        h2 {
            color: #333;
            font-size: 20px;
            margin-bottom: 10px;
        }
        p {
            font-size: 16px;
            color: #555;
            line-height: 1.5;
        }
        .otp {
            font-size: 22px;
            font-weight: bold;
             color: #555;
            margin: 20px 0;
        }
        .footer {
            font-size: 12px;
            color: #888;
            margin-top: 20px;
        }

        /* Responsive Design */
        @media only screen and (max-width: 600px) {
            .email-container {
                padding: 15px;
            }
            h2 {
                font-size: 18px;
            }
            .otp {
                font-size: 20px;
            margin: 10px 0;

            }
            p {
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <h2>Taskify OTP Verification</h2>
        <p>Use the following OTP to verify your email address:</p>
        <div class="otp">
            <strong>${key}</strong>
        </div>
        <p>This OTP is valid for 5 minutes. If you didn’t request this, please ignore this email.</p>
        <div class="footer">
            <p>Thank you for using Taskify!</p>
        </div>
    </div>
</body>
</html>
`
    };

    const resetLink = `https://taskify.manojnishad.com/set-password/${key}`;
    const mailOptionPasswordReset = {
        from: 'amnishad0512@gmail.com',      // Sender's email
        to: recipientEmail,                // Recipient's email
        subject: 'Password Reset - Taskify', // Subject of the email
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Taskify Password Reset</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .email-container {
                        width: 100%;
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        box-sizing: border-box;
                    }
                    h2 {
                        color: #333;
                        font-size: 20px;
                        margin-bottom: 10px;
                    }
                    p {
                        font-size: 16px;
                        color: #555;
                        line-height: 1.5;
                    }
                    .button {
                        background-color: #007bff;
                        color: white;
                        font-size: 16px;
                        padding: 12px 25px;
                        border-radius: 5px;
                        text-decoration: none;
                        display: inline-block;
                        margin-top: 20px;
                    }
                    .button:hover {
                        background-color: #0056b3;
                    }
                    .footer {
                        font-size: 12px;
                        color: #888;
                        margin-top: 20px;
                    }

                    @media only screen and (max-width: 600px) {
                        .email-container {
                            padding: 15px;
                        }
                        h2 {
                            font-size: 18px;
                        }
                        .button {
                            font-size: 14px;
                            padding: 10px 20px;
                        }
                        p {
                            font-size: 14px;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <h2>Taskify Password Reset Request</h2>
                    <p>We received a request to reset your password for your Taskify account. If you did not request this, please ignore this email.</p>
                    <p>If you want to reset your password, click the button below:</p>
                    <a href="${resetLink}" class="button">Reset Your Password</a>
                    <p>This link will expire in 5 minutes.</p>
                    <div class="footer">
                        <p>Thank you for using Taskify!</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };
    return new Promise((resolve, reject) => {
        if (type === 'otp') {
            transporter.sendMail(mailOptionOTP, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                    reject(false);
                } else {
                    console.log('Email sent: ' + info.response);
                    resolve(true);
                }
            });
        } else {
            transporter.sendMail(mailOptionPasswordReset, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                    reject(false);
                } else {
                    console.log('Email sent: ' + info.response);
                    resolve(true);
                }
            });
        }
    });
};


