const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const surveyManager = require("../dataModel/managers/surveyManager");

exports.saveNewSurvey = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const mappedErrors = errors.mapped();
    const businessIdError = mappedErrors.businessId?.msg || null;
    return res.status(StatusCodes.BAD_REQUEST).send({
      status: StatusCodes.BAD_REQUEST,
      message: "Bad request, entered data is incorrect.",
      businessIdError,
    });
  }

  const data = req.body;

  surveyManager
    .saveSurvey(data)
    .then((survey) => {
      res.status(StatusCodes.OK).send({
        status: 1,
        message: "Survey created successfully.",
        id: survey.id,
      });
    })
    .catch((error) => {
      const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).send({
        message: error.message,
      });
    });
};

exports.getSurveyList = (req, res, next) => {
  const businessId = req.query.businessId;
  surveyManager
    .getSurveyListByBusinessId(businessId)
    .then((surveyList) => {
      return res.status(StatusCodes.OK).send({
        status: 1,
        surveyList,
      });
    })
    .catch((error) => {
      console.log(error);
      const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).send({
        message: error.message,
      });
    });
};

exports.getCustomerById = (req, res, next) => {
  const customerId = req.query.customerId;
  const businessId = req.query.businessId;

  crmManager
    .getCustomerById(customerId, businessId)
    .then((customer) => {
      return res.status(StatusCodes.OK).send({
        status: 1,
        customer,
      });
    })
    .catch((error) => {
      const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).send({
        message: error.message,
      });
    });
};

exports.updateCustomer = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const mappedErrors = errors.mapped();
    const businessIdError = mappedErrors.businessId?.msg || null;
    return res.status(StatusCodes.BAD_REQUEST).send({
      status: StatusCodes.BAD_REQUEST,
      message: "Bad request, entered data is incorrect.",
      businessIdError,
    });
  }

  const data = req.body;

  crmManager
    .editCustomer({ ...data })
    .then((customer) => {
      res.status(StatusCodes.OK).send({
        status: 1,
        message:
          customer.isClient === 0
            ? "Lead updated successfully."
            : "Client updated successfully.",
        isClient: customer.isClient,
      });
      crmManager.editCustomerInfoInGlobalSearchEngine(data);
    })
    .catch((error) => {
      const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).send({
        message: error.message,
      });
    });
};

exports.removeSurvey = (req, res, next) => {
  const surveyId = req.body.id;
  surveyManager
    .removeSurvey(surveyId)
    .then(() => {
      res.status(StatusCodes.OK).send({
        status: 1,
        message: "Survey deleted successfully.",
        surveyId,
      });
    })
    .catch((error) => {
      const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).send({
        message: error.message,
      });
    });
};
