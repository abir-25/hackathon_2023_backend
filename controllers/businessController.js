const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const businessManager = require("../dataModel/managers/businessManager");
const multer = require("multer");
const uploadMiddleware = require("../middleware/file-upload");
const Business = require("../dataModel/models/business");

exports.createUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const mappedErrors = errors.mapped();
    const businessNameError = mappedErrors.businessName?.msg || null;
    const streetAddressError = mappedErrors.streetAddress?.msg || null;
    return res.status(StatusCodes.BAD_REQUEST).send({
      status: StatusCodes.BAD_REQUEST,
      message: "Bad request, entered data is incorrect.",
      businessNameError: businessNameError,
      streetAddressError: streetAddressError,
    });
  }

  const business = {
    businessName: req.body.businessName,
    streetAddress: req.body.streetAddress,
    countryId: req.body.countryId || 0,
    stateId: req.body.stateId || 0,
    districtId: req.body.districtId || 0,
    businessEmail: req.body.businessEmail || null,
    businessPhoneNo: req.body.businessPhoneNo || null,
    defaultNote:
      "It was a pleasure working with you. We will look forward to working with you in future. Please let us know if there is anything else we can do.",
    currencyId: 1,
  };

  businessManager
    .saveUser(business, req.userId)
    .then((result) => {
      res.status(StatusCodes.OK).send({
        status: 1,
        message: "New Business created successfully.",
        business: {
          id: result.id,
          businessName: result.businessName,
          streetAddress: result.streetAddress,
          countryId: result.countryId,
          stateId: result.stateId,
          districtId: result.districtId,
          businessEmail: result.businessEmail,
          businessPhoneNo: result.businessPhoneNo,
        },
      });
    })
    .catch((error) => {
      const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).send({
        message: error.message,
      });
    });
};

exports.getBusinessInfo = (req, res, next) => {
  res.status(StatusCodes.OK).send({
    status: 1,
  });
  // const businessId = req.query.businessId || 0;
  // businessManager
  //   .getBusinessInfo(req, businessId)
  //   .then((business) => {
  //     res.status(StatusCodes.OK).send({
  //       status: 1,
  //       business,
  //     });
  //   })
  //   .catch((error) => {
  //     const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  //     return res.status(statusCode).send({
  //       message: error.message,
  //     });
  //   });
};

exports.updateBusinessInfo = (req, res, next) => {
  const upload = multer({
    storage: uploadMiddleware.files.storage(),
    limits: { fileSize: uploadMiddleware.files.maxFileSize },
    fileFilter: uploadMiddleware.files.allowedImages,
  }).single("businessLogo");
  upload(req, res, function (err) {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        status: StatusCodes.BAD_REQUEST,
        message: err.message,
      });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const mappedErrors = errors.mapped();
      const businessNameError = mappedErrors.businessName?.msg || null;
      const streetAddressError = mappedErrors.streetAddress?.msg || null;

      return res.status(StatusCodes.BAD_REQUEST).send({
        status: StatusCodes.BAD_REQUEST,
        message: "Bad request, entered data is incorrect.",
        businessNameError: businessNameError,
        streetAddressError: streetAddressError,
      });
    }

    const businessId = req.body.businessId;
    let business = {
      businessName: req.body.businessName,
      streetAddress: req.body.streetAddress,
      countryId: req.body.countryId || 0,
      stateId: req.body.stateId || 0,
      districtId: req.body.districtId || 0,
      businessEmail: req.body.businessEmail || null,
      businessPhoneNo: req.body.businessPhoneNo || null,
    };
    if (req.file) {
      business.businessLogo = req.file.filename;
    }

    businessManager
      .editBusinessInfo(business, businessId)
      .then((business) => {
        res.status(StatusCodes.OK).send({
          status: 1,
          message: "Business updated successfully.",
          business,
        });
      })
      .catch((error) => {
        const statusCode =
          error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).send({
          message: error.message,
        });
      });
  });
};

exports.login = (req, res, next) => {
  console.log("API Login");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const mappedErrors = errors.mapped();
    const emailError = mappedErrors.email?.msg || null;
    const passwordError = mappedErrors.password?.msg || null;
    return res.status(StatusCodes.BAD_REQUEST).send({
      status: StatusCodes.BAD_REQUEST,
      message: "Bad request, entered data is incorrect",
      emailError: emailError,
      passwordError: passwordError,
    });
  }

  const email = req.body.email;
  const password = req.body.password;

  getBusinessLogin(email, password)
    .then((result) => {
      return res.status(StatusCodes.OK).send({
        status: 1,
        token: result.jwToken,
        business: {
          id: result.id,
          userEmail: result.userEmail,
          name: result.name,
          phoneNo: result.phoneNo,
        },
      });
    })
    .catch((error) => {
      const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).send({
        emailError: error.message,
      });
    });
};

const getBusinessLogin = async (username, password) => {
  const business = await getUserByUsername(username);
  if (!business) {
    const error = new Error("No Business Found!");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
  const match = await comparePassword(password, business.password);
  if (match) {
    const jwtData = { id: business.id, username: business.businessEmail };
    const jwToken = genereateJwt(jwtData);
    return await business.update({ jwToken });
  } else {
    const error = new Error("Invalid Email/Password!");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
};

const getUserByUsername = (username) => {
  return Business.findOne({ where: { businessEmail: username } });
};
