require("dotenv").config();

var nodemailer = require("nodemailer");
const Product = require("../models/Product");
const User = require("../models/User");
const mailer = async (prodId) => {
  const product = await Product.findById(prodId);
  const user = await User.findById(product.currentWinner);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "mail.eauction@gmail.com",
      pass: process.env.PASSWORD,
    },
  });
  var mailOptions = {
    from: "mail.eauction@gmail.com",
    to: user.email,
    subject: "Order Confirmation",
    html: `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Bill</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
          }
    
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
    
          h1 {
            font-size: 24px;
            color: #333333;
          }
    
          p {
            font-size: 16px;
            color: #555555;
            margin-bottom: 10px;
          }
    
          .total {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Bill</h1>
    
          <p>Hello [Customer Name],</p>
    
          <p>Here's your bill for the recent purchase:</p>
    
          <table>
            <tr>
              <th>Description</th>
              <th>Amount</th>
            </tr>
            <tr>
              <td>${product.title}</td>
              <td>${product.currentPrice}</td>
            </tr>
            <tr>
              <td class="total">Tax</td>
              <td class="total">18%</td>
            </tr>
          </table>
    
          <p>Your payment was successful!</p>
    
          <p>If you have any questions, feel free to contact us.</p>
    
          <p>Thank you for your business!</p>
    
          <p>
            Regards,<br />
            EAuction
          </p>
        </div>
      </body>
    </html>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = mailer;
