// const Mail = require("../models/mail");
// const MailClient = require("../models/mailClient");

// class MailManager {
//   constructor() {
//     this.mail = new Mail();
//     this.mailClient = new MailClient();
//   }

//   sendMail = ({
//     to,
//     subject,
//     text,
//     html,
//     attachedFiles,
//     senderEmail,
//     senderName,
//     directoryName,
//   }) => {
//     this.mail.setTo(to);
//     this.mail.setSubject(subject);
//     this.mail.setText(text);
//     this.mail.setHtml(html);
//     this.mail.setAttachedFileName(attachedFiles || []);
//     this.mail.setSenderEmail(senderEmail);
//     this.mail.setSenderName(senderName);
//     if (directoryName) {
//       this.mail.setFileDirectoryForAttachment(directoryName);
//     }

//     return this.mailClient.sendMail(this.mail);
//   };

//   sendEmailVerificationMail = (email, hashUrl) => {
//     const body = `<table width="100%" style="border-spacing: 0;">
//                 <tr>
//                   <td style="padding: 32px;">
//                     <table width="100%" style="border-spacing: 0;">
//                       <tr>
//                           <td style="padding: 0;">
//                               <p style="font-size:24px; text-align: center;color: #4a4a4a;">We’re happy to have you!</p>
//                               <p style="text-align: center; font-size:14px; line-height:24px;  color: #4a4a4a;">We'd like to make sure we got your email address correct. To get uninterrupted service, please verify your email.</p>
//                           </td>
//                       </tr>
//                     </table>
//                     <table width="100%" style="border-spacing: 0; padding-bottom: 50px;">
//                       <tr>
//                           <td style="padding: 0; text-align: center; padding-top: 16px;" align="center">
//                               <a href="${hashUrl}" class="btn btn-secondary" style="text-decoration: none; border-radius: 4px; font-family: 'helvetica neue', 'helvetica', 'arial', sans-serif; font-size: 14px; padding: 12px 20px 12px 20px; display: inline-block; text-align: center; white-space: nowrap; vertical-align: middle; line-height: 20px; color: #ffffff; border: 2px solid #512888; background-color: #512888">Yes it's me!</a>
//                           </td>
//                       </tr>
//                     </table>
//                   </td>
//                 </tr>
//               </table>`;
//     const html = this.createHtmlBody(body);
//     const subject = "Please confirm your email address on Quickly Invoice";
//     const text = "Verification Mail";
//     this.sendMail({ to: email, subject, text, html });
//   };

//   sendPasswordRecoveryMail = (email, hashUrl) => {
//     const body = `<table width="100%" style="border-spacing: 0;">
//                 <tr>
//                   <td style="padding: 32px;">
//                     <table width="100%" style="border-spacing: 0;">
//                       <tr>
//                           <td style="padding: 0;">
//                               <p style="font-size:24px; text-align: center;color: #4a4a4a;">Can’t recall your password?</p>
//                               <p style="text-align: center; font-size:14px; line-height:24px;  color: #4a4a4a;">That’s okay, it happens to everyone.</p>
//                           </td>
//                       </tr>
//                     </table>
//                     <table width="100%" style="border-spacing: 0; padding-bottom: 50px;">
//                       <tr>
//                           <td style="padding: 0; text-align: center; padding-top: 16px;" align="center">
//                               <a href="${hashUrl}" class="btn btn-secondary" style="text-decoration: none; border-radius: 4px; font-family: 'helvetica neue', 'helvetica', 'arial', sans-serif; font-size: 14px; padding: 12px 20px 12px 20px; display: inline-block; text-align: center; white-space: nowrap; vertical-align: middle; line-height: 20px; color: #ffffff; border: 2px solid #512888; background-color: #512888">Reset Password</a>
//                           </td>
//                       </tr>
//                     </table>
//                   </td>
//                 </tr>
//               </table>`;
//     const html = this.createHtmlBody(body);
//     const subject = "Reset your account password";
//     const text = "Recovery Password";
//     this.sendMail({ to: email, subject, text, html });
//   };

//   createHtmlBody = (body, logoAttached = true) => {
//     const date = new Date();
//     const year = date.getFullYear();
//     const logoTr = logoAttached
//       ? `<tr>
//     <td style="padding: 0;">
//         <table width="100%" style="border-spacing: 0;">
//             <tr>
//                 <td style="background-color: #ffffff; padding: 32px; text-align: center;" align="center">
//                     <table align="center" style="border-spacing: 0;">
//                         <tr>
//                             <td style="background: #ffffff; padding: 15px;" width="150">
//                                 <a href="https://quicklyservices.com/"><img style="border: 0;" src="https://restaurant.quicklyservices.com/img/email/quickly-logo-ash.png" alt="Quickly Logo" width="150"> </a>
//                             </td>
//                         </tr>
//                     </table>
//                 </td>
//             </tr>
//         </table>
//     </td>
//   </tr>`
//       : "";
//     const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
//     <html xmlns="http://www.w3.org/1999/xhtml">
//       <head>
//         <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
//         <meta http-equiv="X-UA-Compitable" content="IE-edge">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Quickly Email</title>
//       </head>
//       <body style="margin: 0; padding: 0; background-color: #ffffff;">
//         <center style="width: 100%; table-layout: fixed; background-color: #ffffff; padding-bottom: 40px;">
//           <div style="max-width: 600px; background-color: #ffffff;">
//             <table class="outer" align="center" style="margin: 0 auto; border-spacing: 0; color: #4a4a4a;" width="100%">
//               ${logoTr}
//               <tr>
//                   <td style="padding: 0;">${body}</td>
//               </tr>
//             </table>
//           </div>
//         </center>
//         <center class="footer-wrapper " style="width: 100%; table-layout: fixed; background-color: #fcf9fc;">
//           <div class="footer-webkit " style="max-width: 600px; background-color: #fcf9fc;">
//             <table class="outer " align="center" style="margin: 0 auto; border-spacing: 0; font-family: 'helvetica neue', 'helvetica', 'arial', sans-serif; color: #4a4a4a;" width="100%">
//               <tr>
//                 <td style="padding: 0; background: #fcf9fc;">
//                     <table width="100% " style="border-spacing: 0;">
//                         <tr>
//                             <td style="padding: 20px; text-align: center;" align="center">
//                               <p style="font-size: 12px;color:#8c8c8c; ">This email is generated by Quickly Invoice. We exist to provide people with access to a smarter business.</p>
//                               <p style="font-size: 12px; color:#8c8c8c;line-height:22px; ">Copyright &copy; ${year} Quickly Services, All rights reserved.</p>
//                             </td>
//                         </tr>
//                     </table>
//                 </td>
//               </tr>
//             </table>
//           </div>
//         </center>
//       </body>
//     </html>`;
//     return html;
//   };

//   sendInvoiceEmail = (data) => {
//     const { senderEmail, senderName, toEmail, subject, message, pdfFileName } =
//       data;
//     const body = `<pre>${message}</pre>`;
//     const html = this.createHtmlBody(body, false);
//     const text = "Invocie Mail";
//     return this.sendMail({
//       to: toEmail,
//       subject,
//       text,
//       html,
//       attachedFiles: [pdfFileName],
//       senderEmail,
//       senderName,
//     });
//   };

//   sendQuotationEmail = (data) => {
//     const { senderEmail, senderName, toEmail, subject, message, pdfFileName } =
//       data;
//     const body = `<pre>${message}</pre>`;
//     const html = this.createHtmlBody(body, false);
//     const text = "Quotation Mail";
//     return this.sendMail({
//       to: toEmail,
//       subject,
//       text,
//       html,
//       attachedFiles: [pdfFileName],
//       senderEmail,
//       senderName,
//       directoryName: "quotation-files",
//     });
//   };

//   sendCustomerEmail = (data) => {
//     console.log(data);
//     const { senderEmail, senderName, toEmail, subject, message } = data;
//     const body = `<pre>${message}</pre>`;
//     const html = this.createHtmlBody(body, false);
//     const text = "Customer Mail";
//     return this.sendMail({
//       to: toEmail,
//       subject,
//       text,
//       html,
//       senderEmail,
//       senderName,
//     });
//   };

//   createHtmlBodyForSendAcknowledgementMail = (email, body) => {
//     const date = new Date();
//     const year = date.getFullYear();
//     const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
//     <html xmlns="http://www.w3.org/1999/xhtml">
//       <head>
//         <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
//         <meta http-equiv="X-UA-Compitable" content="IE-edge">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Quickly Email</title>
//       </head>
//       <body style="margin: 0; padding: 0; background-color: #ffffff;">
//         <center style="width: 100%; table-layout: fixed; background-color: #ffffff; padding-bottom: 40px;">
//           <div style="max-width: 600px; background-color: #ffffff;">
//             <table class="outer" align="center" style="margin: 0 auto; border-spacing: 0; color: #4a4a4a;" width="100%">
//               <tr>
//                   <td style="padding: 0;">${body}</td>
//               </tr>
//             </table>
//           </div>
//         </center>
//         <center class="footer-wrapper " style="width: 100%; table-layout: fixed; background-color: #fcf9fc;">
//           <div class="footer-webkit " style="max-width: 600px; background-color: #fcf9fc;">
//             <table class="outer " align="center" style="margin: 0 auto; border-spacing: 0; font-family: 'helvetica neue', 'helvetica', 'arial', sans-serif; color: #4a4a4a;" width="100%">
//               <tr>
//                 <td style="padding: 0; background: #fcf9fc;">
//                     <table width="100% " style="border-spacing: 0;">
//                         <tr>
//                             <td style="padding: 20px; text-align: center;" align="center">
//                               <p style="font-size: 12px;color:#8c8c8c; ">This email was sent to <a href="mailto:${email}" style="text-decoration: none; color: #388CDA;">${email}</a> which is generated by Quickly Invoice. We exist to provide people with access to a smarter business.</p>
//                               <p style="font-size: 12px; color:#8c8c8c;line-height:22px; ">Copyright &copy; ${year} Quickly Services, All rights reserved.</p>
//                             </td>
//                         </tr>
//                     </table>
//                 </td>
//               </tr>
//             </table>
//           </div>
//         </center>
//       </body>
//     </html>`;
//     return html;
//   };

//   sendAcknoledgementEmail = (data) => {
//     const {
//       invoiceNo,
//       senderEmail,
//       senderName,
//       customerName,
//       currencySymbol,
//       toEmail,
//       paymentDate,
//       paymentAmount,
//       netAmount,
//       totalPaymentAmount,
//       paymentReceiptFileName,
//     } = data;
//     const subject = "Payment Received for INV-" + invoiceNo;
//     const body = `<table width="100%" style="border-spacing: 0;">
//     <tr>
//       <td style="padding: 0px 32px 32px 32px;">
//         <div style="max-width:560px;margin:auto;padding:0 5%">
//           <div style="padding:30px 0;color:#555;line-height:1.7;">Dear ${customerName}, <br><br>We have received a payment of ${currencySymbol}${paymentAmount} on ${paymentDate} <br>Thank you for your payment.<br>
//           </div>

//           <div style="padding:3%;background:#f2e8fb; border:1px solid #d4cce9;color:#333">
//             <div style="padding:0 3% 3%;border-bottom:1px solid #d4cce9;text-align:center">
//               <h3 style="margin-bottom:0">Payment Received</h3>
//               <h2 style="color:#512888;margin-top:10px">${currencySymbol}${Number(
//       Number(paymentAmount).toFixed(2)
//     )}</h2>
//             </div>

//             <div style="margin:auto;max-width:350px;padding:3% 3% 0">
//               <p><span style="width:40%;padding-left:10%;float:left">Invoice No</span><span style="width:40%;padding-left:10%;float:left"><b>INV-${invoiceNo}</b></span></p>
//               <div style="clear:both"></div>
//               <p></p>
//               <p><span style="width:40%;padding-left:10%;float:left">Payment Date</span><span style="width:40%;padding-left:10%"><b>${paymentDate}</b></span></p>
//               <p></p>
//               <p><span style="width:40%;padding-left:10%;float:left">Invoice Total</span><span style="width:40%;padding-left:10%"><b>${currencySymbol}${Number(
//       Number(netAmount).toFixed(2)
//     )}</b></span></p>
//               <p></p>
//               <p><span style="width:40%;padding-left:10%;float:left">Total Payment</span><span style="width:40%;padding-left:10%"><b>${currencySymbol}${Number(
//       Number(totalPaymentAmount).toFixed(2)
//     )}</b></span></p>
//               <p></p>
//               <p><span style="width:40%;padding-left:10%;float:left">Total Due</span><span style="width:40%;padding-left:10%"><b>${currencySymbol}${Number(
//       Number(netAmount - totalPaymentAmount).toFixed(2)
//     )}</b></span></p>
//             </div>
//           </div>
//           <div style="max-width:560px;margin:auto;padding:0 5%"><br></div>
//         </div>
//       </td>
//     </tr>
//   </table>`;
//     const html = this.createHtmlBodyForSendAcknowledgementMail(toEmail, body);
//     const text = "Payment Successful";

//     return this.sendMail({
//       to: toEmail,
//       subject,
//       text,
//       html,
//       attachedFiles: [paymentReceiptFileName],
//       senderEmail,
//       senderName,
//       directoryName: "payment-receipt-files",
//     });
//   };
// }

// module.exports = MailManager;
