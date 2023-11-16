// const path = require("path");
// const fsPromises = require("fs").promises;
// const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
// const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
// const MAILGUN_SENDER_EMAIL = process.env.MAILGUN_SENDER_EMAIL;
// const MAIL_SENDER_NAME = process.env.MAIL_SENDER_NAME;
// const MAILGUN_USERNAME = process.env.MAILGUN_USERNAME;

// const formData = require("form-data");
// const Mailguns = require("mailgun.js");

// const mailgunObj = new Mailguns(formData);
// const client = mailgunObj.client({
//   username: MAILGUN_USERNAME,
//   key: MAILGUN_API_KEY,
// });

// class Mailgun {
//   constructor() {
//     this.MAILGUN_SENDER_EMAIL = MAILGUN_SENDER_EMAIL;
//     this.MAIL_SENDER_NAME = MAIL_SENDER_NAME;
//   }

//   sendMail = async (mailObject) => {
//     try {
//       const data = await this.getMessage(mailObject);

//       const result = await client.messages.create(MAILGUN_DOMAIN, data);
//       console.log(result);
//       return true;
//     } catch (error) {
//       console.error(error);
//       return false;
//     }
//   };

//   async getMessage(mailObject) {
//     const attachments = await this.getAttachments(mailObject);
//     const senderName = mailObject.getSenderName() ?? this.MAIL_SENDER_NAME;
//     const senderEmail =
//       mailObject.getSenderEmail() ?? this.MAILGUN_SENDER_EMAIL;
//     const from = `${senderName} <${senderEmail}>`;

//     let msg = {
//       to: mailObject.getTo(),
//       from: from,
//       subject: mailObject.getSubject(),
//       text: mailObject.getText(),
//       html: mailObject.getHtml(),
//       attachment: attachments,
//     };

//     if (mailObject.getSenderEmail() || mailObject.getSenderName()) {
//       msg[
//         "h:Reply-To"
//       ] = `${mailObject.getSenderName()} <${mailObject.getSenderEmail()}>`;
//     }

//     return msg;
//   }

//   async getAttachments(mailObject) {
//     let attachmentList = [];

//     const fileDirectoryForAttachment =
//       mailObject.getFileDirectoryForAttachment();

//     const files = mailObject.getAttachedFileName();

//     if (Array.isArray(files) && files.length > 0) {
//       for (let index = 0; index < files.length; index++) {
//         const _filename = files[index];
//         const pathToAttachment = path.join(
//           fileDirectoryForAttachment,
//           _filename
//         );
//         const attachment = await this.getAttachment(
//           _filename,
//           pathToAttachment
//         );
//         attachmentList.push(attachment);
//       }
//     }

//     return attachmentList;
//   }

//   async getAttachment(_filename, pathToAttachment) {
//     const attachment = {
//       filename: _filename,
//       data: await fsPromises.readFile(pathToAttachment),
//     };
//     return attachment;
//   }
// }

// module.exports = Mailgun;
