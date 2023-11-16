const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const config = require("../configs/general.config.json")[env];
const moment = require("moment");
const { rootUrl } = require("../configs/config");
const UNIQUE_KEY = process.env.UNIQUE_KEY;

exports.genereateHash = async (data) => {
  return await bcrypt.hash(data, config.bcryptSaltRounds);
};

exports.genereateJwt = (data) => {
  return jwt.sign(data, config.jwtSecret, {
    expiresIn: config.jwtExpirationTime,
    issuer: config.jwtIssuer,
  });
};

exports.genereateEmailVerifiTokenAndHashUrl = async (user) => {
  const data = user.id + user.username + UNIQUE_KEY;
  const hash = await bcrypt.hash(data, config.bcryptSaltRounds);
  const emailVerifyToken = hash.replace(/\//g, "");
  const hashUrl = config.SERVER_URL + "/email-verification/" + emailVerifyToken;
  return { emailVerifyToken, hashUrl };
};

exports.comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

exports.verifyJwt = (token) => {
  return jwt.verify(token, config.jwtSecret);
};

exports.genereateEmailVerifyHashUrl = (emailVerifyToken) => {
  const hashUrl = config.SERVER_URL + "/email-verification/" + emailVerifyToken;
  return hashUrl;
};

exports.getInvoicePdfFilePath = (req) => {
  //const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  //console.log("fullUrl:",fullUrl);
  const protocol = env === "production" ? req.protocol + "s" : req.protocol;
  const filePath = `${protocol}://${req.get("host")}/invoice-files/`;
  return filePath;
};

exports.getBillPdfFilePath = (req) => {
  //const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  //console.log("fullUrl:",fullUrl);
  const protocol = env === "production" ? req.protocol + "s" : req.protocol;
  const filePath = `${protocol}://${req.get("host")}/bill-files/`;
  return filePath;
};

exports.getQuotationPdfFilePath = (req) => {
  //const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  //console.log("fullUrl:",fullUrl);
  const protocol = env === "production" ? req.protocol + "s" : req.protocol;
  const filePath = `${protocol}://${req.get("host")}/quotation-files/`;
  return filePath;
};

exports.getBusinessLogoUrl = (req) => {
  const protocol = env === "production" ? req.protocol + "s" : req.protocol;
  return `${protocol}://${req.get("host")}/images/business/`;
};

exports.getBusinessLogoUrlForBase64 = () => {
  const ROOT_DIRECTORY = rootUrl ?? config.ROOT_URL;
  return `${ROOT_DIRECTORY}/public/images/business/`;
};

exports.genereatePasswordRecoveryHashUrl = (resetPasswordToken) => {
  const hashUrl = `${config.SERVER_URL}/reset-password/${resetPasswordToken}`;
  return hashUrl;
};

exports.genereatePasswordRecoveryTokenAndHashUrl = async (user) => {
  const data = user.id + user.username + UNIQUE_KEY;
  const hash = await bcrypt.hash(data, config.bcryptSaltRounds);
  const resetPasswordToken = hash.replace(/\//g, "");
  const hashUrl = `${config.SERVER_URL}/reset-password/${resetPasswordToken}`;
  return { resetPasswordToken, hashUrl };
};

exports.getFormattedDate = (date, dateFormat) => {
  return moment(new Date(date)).format(dateFormat);
};

exports.getReceiptPdfFilePath = (req) => {
  const protocol = env === "production" ? req.protocol + "s" : req.protocol;
  const filePath = `${protocol}://${req.get("host")}/payment-receipt-files/`;
  return filePath;
};

exports.getPaymentMadePdfFilePath = (req) => {
  const protocol = env === "production" ? req.protocol + "s" : req.protocol;
  const filePath = `${protocol}://${req.get("host")}/payment-made-files/`;
  return filePath;
};

exports.getTokenList = (data) => {
  const conjunctions = ["and", "or", "but"];
  const prepositions = ["in", "on", "at", "with"];
  const auxiliaryVerbs = [
    "am",
    "is",
    "are",
    "was",
    "were",
    "be",
    "being",
    "been",
    "have",
    "has",
    "had",
  ];
  const articles = ["a", "an", "the"];
  const pronouns = [
    "I",
    "you",
    "he",
    "she",
    "it",
    "we",
    "they",
    "this",
    "these",
    "that",
    "those",
  ];
  const adverbs = ["not", "very", "always", "never", "often", "sometimes"];

  const replacedStr = data?.replace(/[^\w.@\s]/gi, "");
  const filteredString = replacedStr.replace(
    new RegExp(
      `\\b(${conjunctions.join("|")})\\b|\\b(${prepositions.join(
        "|"
      )})\\b|\\b(${auxiliaryVerbs.join("|")})\\b|\\b's\\b|\\b(${articles.join(
        "|"
      )})\\b|\\b(${pronouns.join("|")})\\b|\\b(${adverbs.join("|")})\\b`,
      "gi"
    ),
    ""
  );

  const arr = filteredString.split(/ +/);
  const tokenList = arr.filter((value) => value);
  return tokenList;
};
