const { StatusCodes } = require("http-status-codes");
const Business = require("../models/business");
const BusinessOwnerMapper = require("../models/businessOwnerMapper");
const Currency = require("../models/currency");
const Invoice = require("../models/invoice");
const Bill = require("../models/bill");
const dbManager = require("./dbManager");
const { sequelize, Sequelize } = require("../../db");
const { getBusinessLogoUrl } = require("../../utils");
const Timezone = require("../models/Timezone");
const DateFormat = require("../models/DateFormat");
const Quotation = require("../models/quotation");
const BusinessLeadStatus = require("../models/businessLeadStatus");
const BusinessDealStatus = require("../models/businessDealStatus");
const BusinessTaskStatus = require("../models/businessTaskStatus");

const saveBusiness = async (business, userId) => {
  const t = await sequelize.transaction();

  if (business.countryId > 0) {
    const result = await getTimezoneByCountryId(business.countryId);
    if (result.length > 0) {
      business.timezoneId = result[0].id;
      business.timezone = result[0].timezone;
    }
  }

  try {
    const newBusiness = await Business.create(business);
    const businessOwner = {
      businessId: newBusiness.id,
      userId: userId,
      role: 1,
    };
    await BusinessOwnerMapper.create(businessOwner);

    let leadStatusList = [
      {
        businessId: newBusiness.id,
        title: "New",
      },
      {
        businessId: newBusiness.id,
        title: "In Progress",
      },
      {
        businessId: newBusiness.id,
        title: "Connected",
      },
    ];
    await BusinessLeadStatus.bulkCreate(leadStatusList, { transaction: t });

    let dealStatusList = [
      {
        businessId: newBusiness.id,
        title: "New",
      },
      {
        businessId: newBusiness.id,
        title: "In Progress",
      },
      {
        businessId: newBusiness.id,
        title: "Won",
      },
    ];
    await BusinessDealStatus.bulkCreate(dealStatusList, { transaction: t });

    let taskStatusList = [
      {
        businessId: newBusiness.id,
        title: "Open",
      },
      {
        businessId: newBusiness.id,
        title: "Done",
      },
    ];
    await BusinessTaskStatus.bulkCreate(taskStatusList, { transaction: t });

    await t.commit();
    return newBusiness;
  } catch (e) {
    console.log(e);
    const error = new Error("Unable to create Business!");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};

const getBusinessListByUserId = (userId) => {
  const query =
    "SELECT b.id, b.id as businessId, b.businessName, b.streetAddress, b.countryId, b.stateId, b.districtId, b.businessEmail, b.businessPhoneNo, b.timezoneId, b.timezone, b.dateFormatId, b.dateFormat, b.isInvoiceWithHeader, b.currencyId, b.isDeleted, c.htmlCode, c.symbol, c.decimalUnit, c.fractionalUnit FROM businesses b inner join businessOwnerMapper bm on b.id = bm.businessId left join currencies c on b.currencyId=c.id WHERE bm.userId = :userId";
  const params = { userId: userId };
  return dbManager.executeQueryDataReturnWithParameter(query, params);
};

const getCurrencyList = async () => {
  return await Currency.findAll({ where: { isActive: 1 } });
};

const getTimezoneList = async () => {
  return await Timezone.findAll({});
};

const getTimezoneByTimezoneId = async (id) => {
  return await Timezone.findByPk(id);
};

const getDateFormatList = async () => {
  return await DateFormat.findAll({});
};

const getBusinessInfo = async (req, businessId) => {
  const business = await getBusinessById(req, businessId);
  if (business) {
    return business;
  } else {
    const error = new Error("No Business Found!");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
};

const getBusinessById = async (req, businessId) => {
  const businessData = await getBusinessInfoForInvoiceById(req, businessId);
  if (businessData && businessData.length > 0) {
    return businessData[0];
  }
  return null;
};

const editBusinessInfo = async (business, businessId) => {
  try {
    await updateBusiness(business, businessId);
  } catch (e) {
    const error = new Error("Unable to update Business!");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};

const updateBusiness = async (business, businessId) => {
  business.updatedAt = Sequelize.literal("CURRENT_TIMESTAMP");
  try {
    await Business.update(business, {
      where: { id: businessId },
    });
  } catch (e) {
    const error = new Error(e.message);
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};

const editBusinessInvoiceInfo = async (data) => {
  const businessId = data.businessId;
  let business = {
    isInvoiceWithHeader: data.isInvoiceWithHeader || 1,
    defaultNote:
      data.defaultNote ||
      "It was a pleasure working with you. We will look forward to working with you in future. Please let us know if there is anything else we can do.",
    currencyId: data.currencyId || 1,
    isSetInWords: data.isSetInWords || 0,
    invoicePrefix: data.invoicePrefix || "INV",
    invoiceNoDigits: data.invoiceNoDigits || 0,
  };

  business.updatedAt = Sequelize.literal("CURRENT_TIMESTAMP");

  try {
    await updateBusiness(business, businessId);
  } catch (e) {
    const error = new Error("Unable to update Business!");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};

const editBusinessQuotationInfo = async (data) => {
  const businessId = data.businessId;
  let business = {
    quotationPrefix: data.quotationPrefix || "QT",
    quotationNoDigits: data.quotationNoDigits || 0,
  };

  business.updatedAt = Sequelize.literal("CURRENT_TIMESTAMP");

  try {
    await updateBusiness(business, businessId);
  } catch (e) {
    const error = new Error("Unable to update Business!");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};

const editBusinessBillInfo = async (data) => {
  const businessId = data.businessId;
  let business = {
    billPrefix: data.billPrefix || "BL",
    billNoDigits: data.billNoDigits || 0,
  };

  business.updatedAt = Sequelize.literal("CURRENT_TIMESTAMP");

  try {
    await updateBusiness(business, businessId);
  } catch (e) {
    const error = new Error("Unable to update Business!");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};

const editBusinessInvoiceConfiguration = async (data) => {
  const businessId = data.businessId;
  let business = {};

  if (data.timezoneId > 0) {
    const result = await getTimezoneByTimezoneId(data.timezoneId);
    if (result) {
      business = {
        timezoneId: data.timezoneId,
        timezone: result.timezone,
        dateFormat: data.dateFormat,
      };
    }
  }

  business.updatedAt = Sequelize.literal("CURRENT_TIMESTAMP");

  try {
    await updateBusiness(business, businessId);
  } catch (e) {
    const error = new Error("Unable to update Business!");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};

const getBusinessInfoForInvoice = async (req, businessId) => {
  const business = await getBusinessInfoForInvoiceById(req, businessId);
  let nextInvoiceNo = (await getTotalInvoiceByBusinessId(businessId)) + 1;
  nextInvoiceNo = await generateNextNo(
    business[0].invoicePrefix,
    business[0].invoiceNoDigits,
    nextInvoiceNo
  );

  if (business && business.length > 0) {
    return { business: business[0], nextInvoiceNo };
  } else {
    const error = new Error("No Business Found!");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
};

const generateNextNo = async (prefix, digits, nextNo) => {
  const length = nextNo.toString().length;
  const result = prefix + "-" + getNoOfZeros(digits, length) + nextNo;
  return result;
};

const getNoOfZeros = (digits, length) => {
  let zeros = "";
  for (let i = 0; i < digits - length; i++) {
    zeros += "0";
  }
  return zeros;
};

const getBusinessInfoForInvoiceById = (req, businessId) => {
  const businessLogoPath = getBusinessLogoUrl(req);
  const query =
    "SELECT b.id, b.businessName, b.streetAddress, b.countryId, b.stateId, b.districtId, b.businessEmail, b.businessPhoneNo, " +
    "b.businessLogo, b.defaultNote, b.isInvoiceWithHeader, b.currencyId, b.timezoneId, b.dateFormat, d.districtName, b.isSetInWords, s.stateName, co.countryName, " +
    `concat('${businessLogoPath}',b.businessLogo) as businessLogoUrl, b.invoicePrefix, b.invoiceNoDigits, b.quotationPrefix, b.quotationNoDigits, b.billPrefix, b.billNoDigits FROM businesses b left join districts d on b.districtId=d.districtId ` +
    "left join states s on d.stateId=s.stateId left join countries co on s.countryId=co.countryId WHERE b.id = :businessId and isDeleted = :isDeleted";
  const params = { businessId: businessId, isDeleted: 0 };
  return dbManager.executeQueryDataReturnWithParameter(query, params);
};

const getBusinessInfoForNextInvoiceNo = (businessId) => {
  const query =
    "SELECT id, businessName, invoicePrefix, invoiceNoDigits FROM businesses WHERE id = :businessId and isDeleted = :isDeleted";
  const params = { businessId: businessId, isDeleted: 0 };
  return dbManager.executeQueryDataReturnWithParameter(query, params);
};

const getTotalInvoiceByBusinessId = async (businessId) => {
  return await Invoice.count({
    where: { businessId: businessId },
  });
};

const getBusinessInfoForQuotation = async (req, businessId) => {
  const business = await getBusinessInfoForInvoiceById(req, businessId);
  let nextQuotationNo = (await getTotalQuotationByBusinessId(businessId)) + 1;

  nextQuotationNo = await generateNextNo(
    business[0].quotationPrefix,
    business[0].quotationNoDigits,
    nextQuotationNo
  );

  if (business && business.length > 0) {
    return { business: business[0], nextQuotationNo };
  } else {
    const error = new Error("No Business Found!");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
};

const getTotalQuotationByBusinessId = async (businessId) => {
  return await Quotation.count({
    where: { businessId: businessId },
  });
};

const getBusinessInfoForBill = async (req, businessId) => {
  const business = await getBusinessInfoForInvoiceById(req, businessId);
  let nextBillNo = (await getTotalBillByBusinessId(businessId)) + 1;

  nextBillNo = await generateNextNo(
    business[0].billPrefix,
    business[0].billNoDigits,
    nextBillNo
  );

  if (business && business.length > 0) {
    return { business: business[0], nextBillNo };
  } else {
    const error = new Error("No Business Found!");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
};

const getTotalBillByBusinessId = async (businessId) => {
  return await Bill.count({
    where: { businessId: businessId },
  });
};

const getBusinessInfoByBusinessId = async (businessId) => {
  return await Business.findByPk(businessId);
};

const getBusinessInfoById = (businessId) => {
  const query =
    "SELECT b.id, b.businessName, b.streetAddress, b.countryId, b.stateId, b.districtId, b.businessEmail, b.businessPhoneNo, " +
    "b.businessLogo, b.defaultNote, b.isInvoiceWithHeader, b.currencyId, b.dateFormat, d.districtName, s.stateName, co.countryName, " +
    `b.businessLogo FROM businesses b left join districts d on b.districtId=d.districtId ` +
    "left join states s on d.stateId=s.stateId left join countries co on s.countryId=co.countryId WHERE b.id = :businessId and isDeleted = :isDeleted";
  const params = { businessId: businessId, isDeleted: 0 };
  return dbManager.executeQueryDataReturnWithParameter(query, params);
};

const getBusinessInfoForEditInvoice = async (req, businessId) => {
  try {
    const business = await getBusinessInfoForInvoiceById(req, businessId);
    return business[0];
  } catch (error) {
    return null;
  }
};

const getBusinessInfoForEditQuotation = async (req, businessId) => {
  try {
    const business = await getBusinessInfoForInvoiceById(req, businessId);
    return business[0];
  } catch (error) {
    return null;
  }
};

const getBusinessInfoForEditBill = async (req, businessId) => {
  try {
    const business = await getBusinessInfoForInvoiceById(req, businessId);
    return business[0];
  } catch (error) {
    return null;
  }
};

const getTimezoneByCountryId = async (countryId) => {
  const query =
    "select t.id, t.timezone from countries as c inner join timeZones as t on c.timezoneId = t.id where c.countryId = :countryId";
  const params = { countryId: countryId };
  return await dbManager.executeQueryDataReturnWithParameter(query, params);
};

const getBusinessCurrencyInfo = async (businessId) => {
  const query =
    "select b.id, b.businessName, b.businessEmail, b.businessPhoneNo, b.currencyId, c.shortName, c.htmlCode, c.symbol from businesses b left join currencies c on b.currencyId = c.id where b.id = :businessId";
  const params = { businessId: businessId };
  const result = await dbManager.executeQueryDataReturnWithParameter(
    query,
    params
  );

  if (result && result.length > 0) {
    return result[0];
  } else {
    return {};
  }
};

module.exports = {
  saveBusiness,
  getBusinessListByUserId,
  getCurrencyList,
  getTimezoneList,
  getDateFormatList,
  getBusinessInfo,
  editBusinessInfo,
  editBusinessInvoiceInfo,
  editBusinessQuotationInfo,
  editBusinessBillInfo,
  editBusinessInvoiceConfiguration,
  getBusinessInfoForInvoice,
  getTotalInvoiceByBusinessId,
  getBusinessInfoByBusinessId,
  getBusinessInfoById,
  getBusinessInfoForEditInvoice,
  getBusinessCurrencyInfo,
  getBusinessInfoForQuotation,
  getBusinessInfoForEditQuotation,
  getTotalQuotationByBusinessId,
  getBusinessInfoForBill,
  getBusinessInfoForEditBill,
  getTotalBillByBusinessId,
  generateNextNo,
  getBusinessInfoForInvoiceById,
  getBusinessInfoForNextInvoiceNo,
};
