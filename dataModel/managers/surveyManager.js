const { StatusCodes } = require("http-status-codes");
const { sequelize, Sequelize } = require("../../db");
const dbManager = require("./dbManager");
const MailManager = require("./mailManager");
const Survey = require("../models/survey");
const Question = require("../models/question");
const Option = require("../models/option");

const saveSurvey = async (data) => {
  const questionList = data.questionList ?? [];

  let surveyObj = {
    businessId: data.businessId,
    title: data.title ?? "No Title",
    description: data.description ?? "",
  };

  try {
    return await createSurvey(surveyObj, questionList);
  } catch (e) {
    const error = new Error("Unable to create Survey!");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};

const createSurvey = async (surveyObj, questionList) => {
  const t = await sequelize.transaction();
  try {
    // console.log(surveyObj, questionList, questionList[0].type);
    const survey = await Survey.create(surveyObj, { transaction: t });

    for (let i = 0; i < questionList.length; i++) {
      let questionObj = {
        surveyId: survey.id,
        type: questionList[i].type ?? "1",
        title: questionList[i].title ?? "No Title",
        description: questionList[i].description ?? "",
        answer: questionList[i].answer ?? "",
      };
      const question = await Question.create(questionObj, { transaction: t });

      if (questionList[i].type !== "1" && questionList[i].type !== "2") {
        let optionList = [
          {
            surveyId: survey.id,
            questionId: question.id,
            title: questionList[i].option1 ?? "",
          },
          {
            surveyId: survey.id,
            questionId: question.id,
            title: questionList[i].option2 ?? "",
          },
          {
            surveyId: survey.id,
            questionId: question.id,
            title: questionList[i].option3 ?? "",
          },
          {
            surveyId: survey.id,
            questionId: question.id,
            title: questionList[i].option4 ?? "",
          },
        ];
        await Option.bulkCreate(optionList, { transaction: t });
      }
    }

    await t.commit();
    return survey;
  } catch (e) {
    console.log("Error: ", e);
    await t.rollback();
    const error = new Error(e.message);
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};

const getSurveyListByBusinessId = (businessId) => {
  const query =
    "SELECT s.`id`, s.`title`, s.`description`, COUNT(DISTINCT q.id) AS questionCount, COUNT(DISTINCT r.id) as responseCount " +
    " FROM `surveys` s" +
    " left join questions q on s.id=q.surveyId left join responses r on s.id=r.surveyId" +
    " WHERE s.businessId=:businessId and s.isDeleted = :isDeleted GROUP BY s.`id`, s.`title`, s.`description` order by s.`id` desc";

  //     SELECT
  //     s.id AS surveyId,
  //     s.surveyName,
  //     COUNT(DISTINCT r.id) AS responseCount,
  //     COUNT(DISTINCT q.id) AS questionCount
  // FROM
  //     surveys s
  // LEFT JOIN
  //     responses r ON s.id = r.surveyId
  // LEFT JOIN
  //     questions q ON s.id = q.surveyId
  // GROUP BY
  //     s.id, s.surveyName;

  console.log(query);
  const params = { businessId: businessId, isDeleted: 0 };
  return dbManager.executeQueryDataReturnWithParameter(query, params);
};

// const getCustomerById = async (customerId, businessId) => {
//   const result = await getCustomerByCustomerId(customerId, businessId);
//   const contactData = await getContactPersonByCustomerIdAndBusinessId(
//     customerId
//   );
//   const customerData = mapCustomer(result, contactData);
//   return customerData ?? null;
// };

// const getCustomerByCustomerId = async (customerId, businessId) => {
//   const query =
//     "SELECT c.`customerId`, c.`businessId`, c.`customerType`, c.`name`, c.`email`, c.`phoneNo`, c.`websiteUrl`, c.`streetAddress`," +
//     "c.`countryId`, c.`stateId`, c.`districtId`, c.`postalCode`, c.`contactPersonName`, c.`contactPersonEmail`, c.`contactPersonPhoneNo`," +
//     "c.`position`, c.`isClient`, c.`status`, c.`isActive`, c.`isDeleted`, c.`createdAt`, c.`updatedAt`,  d.districtName, s.stateName, co.countryName FROM `customers` c" +
//     " left join districts d on c.districtId=d.districtId left join states s on d.stateId=s.stateId left join countries co on s.countryId=co.countryId " +
//     "WHERE c.businessId=:businessId AND c.isDeleted=:isDeleted AND c.customerId=:customerId";

//   const params = {
//     businessId: businessId,
//     isDeleted: 0,
//     customerId: customerId,
//   };
//   return dbManager.executeQueryDataReturnWithParameter(query, params);
// };

// const getContactPersonByCustomerIdAndBusinessId = (customerId) => {
//   const query =
//     "SELECT personId, name as personName, email as personEmail, phoneNo as personPhoneNo, position as personPosition FROM contactPersons WHERE customerId = :customerId AND isDeleted = :isDeleted";
//   const params = {
//     customerId: customerId,
//     isDeleted: 0,
//   };
//   return dbManager.executeQueryDataReturnWithParameter(query, params);
// };

// const mapCustomer = (result, contactData) => {
//   let customer = {
//     customerId: result[0].customerId,
//     businessId: result[0].businessId,
//     customerType: result[0].customerType,
//     name: result[0].name,
//     email: result[0].email,
//     phoneNo: result[0].phoneNo,
//     websiteUrl: result[0].websiteUrl,
//     streetAddress: result[0].streetAddress,
//     countryId: result[0].countryId,
//     stateId: result[0].stateId,
//     districtId: result[0].districtId,
//     postalCode: result[0].postalCode,
//     contactPersonName:
//       contactData.length > 0 ? contactData[0].contactPersonName : "",
//     contactPersonEmail:
//       contactData.length > 0 ? contactData[0].contactPersonEmail : "",
//     contactPersonPhoneNo:
//       contactData.length > 0 ? contactData[0].contactPersonPhoneNo : "",
//     position: contactData.length > 0 ? contactData[0].position : "",
//     isClient: result[0].isClient || 0,
//     status: result[0].status || 0,
//     contactList: [],
//   };

//   if (contactData.length > 0) {
//     contactData.forEach((_contact) => {
//       const contactPerson = {
//         personId: _contact.personId,
//         customerId: _contact.customerId,
//         contactPersonName: _contact.personName,
//         contactPersonEmail: _contact.personEmail,
//         contactPersonPhoneNo: _contact.personPhoneNo,
//         contactPersonPosition: _contact.personPosition,
//       };
//       customer.contactList.push(contactPerson);
//     });
//   }

//   return customer;
// };

// const editCustomer = async (data) => {
//   const contactList = data.contactList ?? [];
//   const customerId = data.customerId;
//   delete data.customerId;

//   let customerObj = {
//     businessId: data.businessId,
//     customerType: data.customerType,
//     name: data.name,
//     email: data.email,
//     phoneNo: data.phoneNo,
//     websiteUrl: data.websiteUrl,
//     streetAddress: data.streetAddress,
//     countryId: data.countryId || 0,
//     stateId: data.stateId || 0,
//     districtId: data.districtId || 0,
//     postalCode: data.postalCode || 0,
//     contactPersonName:
//       contactList.length > 0 ? contactList[0].contactPersonName : "",
//     contactPersonEmail:
//       contactList.length > 0 ? contactList[0].contactPersonEmail : "",
//     contactPersonPhoneNo:
//       contactList.length > 0 ? contactList[0].contactPersonPhoneNo : "",
//     position:
//       contactList.length > 0 ? contactList[0].contactPersonPosition : "",
//     isClient: data.isClient || 0,
//     status: data.status || 0,
//     updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
//   };

//   try {
//     return await updateCustomer(customerObj, contactList, customerId);
//   } catch (e) {
//     const error = new Error("Unable to update Customer!");
//     error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
//     throw error;
//   }
// };

// const updateCustomer = async (customerObj, contactList, customerId) => {
//   const t = await sequelize.transaction();
//   try {
//     await Customer.update(customerObj, {
//       where: { customerId: customerId },
//       transaction: t,
//     });

//     await ContactPerson.destroy({
//       where: { customerId: customerId },
//       transaction: t,
//     });

//     if (contactList.length > 0) {
//       const contactPersonList = getCustomerContactPersonList(
//         customerId,
//         contactList
//       );

//       await ContactPerson.bulkCreate(contactPersonList, { transaction: t });
//     }

//     await t.commit();
//     return customerObj;
//   } catch (e) {
//     await t.rollback();
//     const error = new Error(e.message);
//     error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
//     throw error;
//   }
// };

const removeSurvey = async (surveyId) => {
  try {
    const survey = await Survey.findByPk(surveyId);

    await Survey.update(
      { isDeleted: 1 },
      {
        where: { id: surveyId },
      }
    );
    return survey;
  } catch (e) {
    const error = new Error("Unable to delete Survey!");
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};

// const saveCustomerInfoInGlobalSearchEngine = async (customer) => {
//   const metaData = `Customer: {Name: ${customer.name}, Email: ${customer.email}, Phone: ${customer.phoneNo}}`;
//   const navigationRoute = `crm/view-customer/${customer.customerId}`;
//   const tokenObj = {
//     name: customer.name,
//     email: customer.email,
//     phoneNo: customer.phoneNo,
//   };
//   const data = {
//     obj: tokenObj,
//     objectType: "customer",
//     objectId: customer.customerId,
//     metaData,
//     navigationRoute,
//   };
//   searchEngineManager.saveSearchEngineInfo(data);
// };

// const editCustomerInfoInGlobalSearchEngine = async (customer) => {
//   await searchEngineManager.deleteFromGlobalSearchEngine(
//     "customer",
//     customer.customerId
//   );
//   await saveCustomerInfoInGlobalSearchEngine(customer);
// };

// const removeCustomerFromSearchEngine = async (customerId) => {
//   await searchEngineManager.deleteFromGlobalSearchEngine(
//     "customer",
//     customerId
//   );
// };

// const saveContactPerson = async (data) => {
//   let contactObj = {
//     businessId: data.businessId,
//     customerId: data.customerId,
//     name: data.contactPersonName,
//     email: data.contactPersonEmail,
//     phoneNo: data.contactPersonPhoneNo,
//     position: data.contactPersonPosition,
//   };

//   try {
//     return await ContactPerson.create(contactObj);
//   } catch (e) {
//     const error = new Error("Unable to create Contact person!");
//     error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
//     throw error;
//   }
// };

// const saveContactPersonInfoInGlobalSearchEngine = async (contactPerson) => {
//   const metaData = `Contact: {Name: ${contactPerson.name}, Email: ${contactPerson.email}, Phone: ${contactPerson.phoneNo}, Position: ${contactPerson.position}}`;
//   const navigationRoute = `crm/contact-person/list`;
//   const tokenObj = {
//     name: contactPerson.name,
//     email: contactPerson.email,
//     phoneNo: contactPerson.phoneNo,
//     position: contactPerson.position,
//   };
//   const data = {
//     obj: tokenObj,
//     objectType: "contactPerson",
//     objectId: contactPerson.personId,
//     metaData,
//     navigationRoute,
//   };
//   searchEngineManager.saveSearchEngineInfo(data);
// };

// const getContactPersonListByBusinessId = (businessId) => {
//   const query =
//     "SELECT c.`personId`, c.`customerId`, c.`name` as contactPersonName, c.`email` as contactPersonEmail, c.`phoneNo` as contactPersonPhoneNo, " +
//     "c.`position` as contactPersonPosition, c.`isActive`, c.`isDeleted`, c.`createdAt`, c.`updatedAt` FROM `contactPersons` c" +
//     " inner join customers cm on c.customerId=cm.customerId" +
//     " WHERE cm.businessId=:businessId and c.isDeleted = :isDeleted order by c.`personId` desc";
//   const params = { businessId: businessId, isDeleted: 0 };
//   return dbManager.executeQueryDataReturnWithParameter(query, params);
// };

// const removeContactPerson = async (contactPersonId) => {
//   try {
//     await ContactPerson.update(
//       { isDeleted: 1 },
//       {
//         where: { personId: contactPersonId },
//       }
//     );
//   } catch (e) {
//     const error = new Error("Unable to delete Contact person!");
//     error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
//     throw error;
//   }
// };

// const removeContactPersonFromSearchEngine = async (contactPersonId) => {
//   await searchEngineManager.deleteFromGlobalSearchEngine(
//     "contactPerson",
//     contactPersonId
//   );
// };

// const getContactPersonById = async (contactPersonId, businessId) => {
//   const result = await getContactPersonByPersonId(contactPersonId, businessId);
//   const contactPersonData = mapContactPerson(result);
//   return contactPersonData ?? null;
// };

// const getContactPersonByPersonId = async (personId, businessId) => {
//   const query =
//     "SELECT c.`personId`, c.`customerId`, c.`name` as contactPersonName, c.`email` as contactPersonEmail, c.`phoneNo` as contactPersonPhoneNo, " +
//     "c.`position` as contactPersonPosition, c.`isActive`, c.`isDeleted`, c.`createdAt`, c.`updatedAt` FROM `contactPersons` c" +
//     " inner join customers cm on c.customerId=cm.customerId" +
//     " WHERE cm.businessId=:businessId and c.isDeleted = :isDeleted and c.personId=:personId";

//   const params = {
//     businessId: businessId,
//     isDeleted: 0,
//     personId: personId,
//   };
//   return dbManager.executeQueryDataReturnWithParameter(query, params);
// };

// const mapContactPerson = (result) => {
//   let contactPerson = {
//     customerId: result[0].customerId,
//     personId: result[0].personId,
//     contactPersonName: result[0].contactPersonName,
//     contactPersonEmail: result[0].contactPersonEmail,
//     contactPersonPhoneNo: result[0].contactPersonPhoneNo,
//     contactPersonPosition: result[0].contactPersonPosition,
//   };

//   return contactPerson;
// };

// const editContactPerson = async (data) => {
//   const contactPerson = {
//     personId: data.contactPersonId,
//     customerId: data.customerId,
//     name: data.contactPersonName,
//     email: data.contactPersonEmail,
//     phoneNo: data.contactPersonPhoneNo || "",
//     position: data.contactPersonPosition || "",
//   };
//   contactPerson.updatedAt = Sequelize.literal("CURRENT_TIMESTAMP");

//   const personId = data.contactPersonId;

//   try {
//     await updateContactPerson(contactPerson, personId);
//   } catch (e) {
//     const error = new Error("Unable to update Contact Person!");
//     error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
//     throw error;
//   }
// };

// const updateContactPerson = async (contactPerson, personId) => {
//   try {
//     await ContactPerson.update(contactPerson, {
//       where: { personId: personId },
//     });
//   } catch (e) {
//     const error = new Error(e.message);
//     error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
//     throw error;
//   }
// };

// const editContactPersonInfoInGlobalSearchEngine = async (contactPerson) => {
//   await searchEngineManager.deleteFromGlobalSearchEngine(
//     "contactPerson",
//     contactPerson.contactPersonId
//   );
//   const contactPersonData = {
//     personId: contactPerson.contactPersonId,
//     name: contactPerson.contactPersonName,
//     email: contactPerson.contactPersonEmail,
//     phoneNo: contactPerson.contactPersonPhoneNo,
//     position: contactPerson.contactPersonPosition,
//   };
//   await saveContactPersonInfoInGlobalSearchEngine(contactPersonData);
// };

// const getNoteListByCustomer = async (customerId) => {
//   const query =
//     "SELECT id, customerId, description FROM customerNotes WHERE customerId = :customerId AND isDeleted = 0";
//   const params = { customerId: customerId };
//   return dbManager.executeQueryDataReturnWithParameter(query, params);
// };

// const saveNewCustomerNote = async (note) => {
//   try {
//     return await CustomerNotes.create(note);
//   } catch (e) {
//     const error = new Error(e.message);
//     error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
//     throw error;
//   }
// };

// const editCustomerNote = async (note) => {
//   note.updatedAt = Sequelize.literal("CURRENT_TIMESTAMP");
//   try {
//     await CustomerNotes.update(note, {
//       where: { id: note.id },
//     });
//   } catch (e) {
//     const error = new Error(e.message);
//     error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
//     throw error;
//   }
// };

// const removeCustomerNote = async (noteId) => {
//   try {
//     await CustomerNotes.update(
//       { isDeleted: 1 },
//       {
//         where: { id: noteId },
//       }
//     );
//   } catch (e) {
//     const error = new Error("Unable to delete Note!");
//     error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
//     throw error;
//   }
// };

// const getCallLogListByCustomer = async (customerId) => {
//   const query =
//     "SELECT id, customerId, description FROM customerCallLogs WHERE customerId = :customerId AND isDeleted = 0";
//   const params = { customerId: customerId };
//   return dbManager.executeQueryDataReturnWithParameter(query, params);
// };

// const saveNewCustomerCallLog = async (log) => {
//   try {
//     return await CustomerCallLogs.create(log);
//   } catch (e) {
//     const error = new Error(e.message);
//     error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
//     throw error;
//   }
// };

// const editCustomerCallLog = async (log) => {
//   log.updatedAt = Sequelize.literal("CURRENT_TIMESTAMP");
//   try {
//     await CustomerCallLogs.update(log, {
//       where: { id: log.id },
//     });
//   } catch (e) {
//     const error = new Error(e.message);
//     error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
//     throw error;
//   }
// };

// const removeCustomerCallLog = async (logId) => {
//   try {
//     await CustomerCallLogs.update(
//       { isDeleted: 1 },
//       {
//         where: { id: logId },
//       }
//     );
//   } catch (e) {
//     const error = new Error("Unable to delete Call log!");
//     error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
//     throw error;
//   }
// };

// const convertLeadToClient = async (customerId) => {
//   Customer.update({ isClient: 1 }, { where: { customerId: customerId } });
// };

// const sendCustomerEmail = async (data) => {
//   const mailManager = new MailManager();
//   const response = await mailManager.sendCustomerEmail(data);
//   if (response) {
//     return "Email Send Successfully";
//   } else {
//     const error = new Error("Unable to Send Email!");
//     error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
//     throw error;
//   }
// };

module.exports = {
  saveSurvey,
  getSurveyListByBusinessId,
  removeSurvey,
  // getCustomerListByBusinessId,
  // getCustomerById,
  // editCustomer,
  // removeCustomer,
  // saveCustomerInfoInGlobalSearchEngine,
  // editCustomerInfoInGlobalSearchEngine,
  // removeCustomerFromSearchEngine,
  // getContactPersonByCustomerIdAndBusinessId,
  // getContactPersonListByBusinessId,
  // saveContactPerson,
  // saveContactPersonInfoInGlobalSearchEngine,
  // removeContactPerson,
  // removeContactPersonFromSearchEngine,
  // getContactPersonById,
  // editContactPerson,
  // editContactPersonInfoInGlobalSearchEngine,
  // getNoteListByCustomer,
  // saveNewCustomerNote,
  // editCustomerNote,
  // removeCustomerNote,
  // getCallLogListByCustomer,
  // saveNewCustomerCallLog,
  // editCustomerCallLog,
  // removeCustomerCallLog,
  // convertLeadToClient,
  // sendCustomerEmail,
};
