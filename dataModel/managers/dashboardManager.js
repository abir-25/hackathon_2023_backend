// const { Sequelize } = require("../../db");
// const moment = require("moment");
// const Invoice = require("../models/invoice");
// const businessManager = require("../managers/businessManager");
// const dbManager = require("./dbManager");
// const Bill = require("../models/bill");

// const getDashboardData = async (
//   businessId,
//   graphGenerateForRevenue = 3,
//   graphGenerateForPayment = 3
// ) => {
//   const business = await businessManager.getBusinessCurrencyInfo(businessId);
//   const lifetimeData = await getLifetimeData(businessId);
//   const currentMonthData = await getMonthlyData(businessId);
//   const salesExpenseDataForGraph = await getSalesExpenseDataForGraph(
//     businessId,
//     graphGenerateForRevenue
//   );
//   const cashCostDataForGraph = await getCashCostDataForGraph(
//     businessId,
//     graphGenerateForPayment
//   );
//   return {
//     business,
//     lifetimeData,
//     currentMonthData,
//     salesExpenseDataForGraph,
//     cashCostDataForGraph,
//   };
// };

// const getLifetimeData = async (businessId) => {
//   const invoiceResult = await Invoice.findOne({
//     where: { isDeleted: 0, isPublished: 1, businessId: businessId },
//     attributes: [
//       [Sequelize.fn("sum", Sequelize.col("netAmount")), "totalNetAmount"],
//       [Sequelize.fn("sum", Sequelize.col("paidAmount")), "totalPaidAmount"],
//     ],
//     raw: true,
//   });

//   const billResult = await Bill.findOne({
//     where: { isDeleted: 0, isPublished: 1, businessId: businessId },
//     attributes: [
//       [Sequelize.fn("sum", Sequelize.col("netAmount")), "totalNetAmount"],
//       [Sequelize.fn("sum", Sequelize.col("paidAmount")), "totalPaidAmount"],
//     ],
//     raw: true,
//   });

//   const totalSales = invoiceResult.totalNetAmount ?? 0;
//   const totalPaymentReceived = invoiceResult.totalPaidAmount ?? 0;
//   const totalDueAmount = totalSales - totalPaymentReceived;

//   const totalExpense = billResult.totalNetAmount ?? 0;
//   const totalPaymentMade = billResult.totalPaidAmount ?? 0;

//   const totalSalesText =
//     totalSales > 0 ? (totalSales / 1000).toFixed(2) + "K" : "0.00K";
//   const totalPaymentReceivedText =
//     totalPaymentReceived > 0
//       ? (totalPaymentReceived / 1000).toFixed(2) + "K"
//       : "0.00K";
//   const totalDueAmountText =
//     totalDueAmount > 0 ? (totalDueAmount / 1000).toFixed(2) + "K" : "0.00K";

//   const totalExpenseText =
//     totalExpense > 0 ? (totalExpense / 1000).toFixed(2) + "K" : "0.00K";
//   const totalPaymentMadeText =
//     totalPaymentMade > 0 ? (totalPaymentMade / 1000).toFixed(2) + "K" : "0.00K";

//   const totalGrossProfit = totalSales - totalExpense;
//   const totalGrossProfitText =
//     totalGrossProfit > 0 ? (totalGrossProfit / 1000).toFixed(2) + "K" : "0.00K";

//   return {
//     totalSales,
//     totalSalesText,
//     totalPaymentReceived,
//     totalPaymentReceivedText,
//     totalDueAmount,
//     totalDueAmountText,
//     totalExpense,
//     totalExpenseText,
//     totalPaymentMade,
//     totalPaymentMadeText,
//     totalGrossProfit,
//     totalGrossProfitText,
//   };
// };

// const getMonthlyData = async (businessId) => {
//   const currentMonthStartDate = moment().format("YYYY-MM-01");
//   const currentMonthEndDate = moment().format("YYYY-MM-DD");

//   const today = moment().format("DD");

//   const lastMonthDate = moment().subtract(1, "months");
//   const lastMonthYear = lastMonthDate.format("YYYY-MM");
//   const lastMonthStartDate = lastMonthYear + "-01";
//   const lastMonthNoOfDays = lastMonthDate.daysInMonth("DD");
//   const lastMonthDay = today > lastMonthNoOfDays ? lastMonthNoOfDays : today;
//   const lastMonthEndDate = lastMonthYear + "-" + lastMonthDay;

//   const invoiceResult = await Invoice.findOne({
//     where: { isDeleted: 0, isPublished: 1, businessId: businessId },
//     attributes: [
//       [
//         Sequelize.fn(
//           "sum",
//           Sequelize.literal(
//             `CASE WHEN issueDate between '${currentMonthStartDate}' and '${currentMonthEndDate}' THEN netAmount ELSE 0 END`
//           )
//         ),
//         "currentMonthNetAmount",
//       ],
//       [
//         Sequelize.fn(
//           "sum",
//           Sequelize.literal(
//             `CASE WHEN issueDate between '${currentMonthStartDate}' and '${currentMonthEndDate}' THEN paidAmount ELSE 0 END`
//           )
//         ),
//         "currentMonthPaidAmount",
//       ],
//       [
//         Sequelize.fn(
//           "sum",
//           Sequelize.literal(
//             `CASE WHEN issueDate between '${lastMonthStartDate}' and '${lastMonthEndDate}' THEN netAmount ELSE 0 END`
//           )
//         ),
//         "lastMonthNetAmount",
//       ],
//       [
//         Sequelize.fn(
//           "sum",
//           Sequelize.literal(
//             `CASE WHEN issueDate between '${lastMonthStartDate}' and '${lastMonthStartDate}' THEN paidAmount ELSE 0 END`
//           )
//         ),
//         "lastMonthPaidAmount",
//       ],
//     ],
//     raw: true,
//   });

//   const billResult = await Bill.findOne({
//     where: { isDeleted: 0, isPublished: 1, businessId: businessId },
//     attributes: [
//       [
//         Sequelize.fn(
//           "sum",
//           Sequelize.literal(
//             `CASE WHEN issueDate between '${currentMonthStartDate}' and '${currentMonthEndDate}' THEN netAmount ELSE 0 END`
//           )
//         ),
//         "currentMonthNetAmount",
//       ],
//       [
//         Sequelize.fn(
//           "sum",
//           Sequelize.literal(
//             `CASE WHEN issueDate between '${currentMonthStartDate}' and '${currentMonthEndDate}' THEN paidAmount ELSE 0 END`
//           )
//         ),
//         "currentMonthPaidAmount",
//       ],
//       [
//         Sequelize.fn(
//           "sum",
//           Sequelize.literal(
//             `CASE WHEN issueDate between '${lastMonthStartDate}' and '${lastMonthEndDate}' THEN netAmount ELSE 0 END`
//           )
//         ),
//         "lastMonthNetAmount",
//       ],
//       [
//         Sequelize.fn(
//           "sum",
//           Sequelize.literal(
//             `CASE WHEN issueDate between '${lastMonthStartDate}' and '${lastMonthStartDate}' THEN paidAmount ELSE 0 END`
//           )
//         ),
//         "lastMonthPaidAmount",
//       ],
//     ],
//     raw: true,
//   });

//   const currentMonthSales = invoiceResult.currentMonthNetAmount ?? 0;
//   const currentMonthPayment = invoiceResult.currentMonthPaidAmount ?? 0;
//   const currentMonthDue = currentMonthSales - currentMonthPayment;

//   const lastMonthSales = invoiceResult.lastMonthNetAmount ?? 0;
//   const lastMonthPayment = invoiceResult.lastMonthPaidAmount ?? 0;
//   const lastMonthDue = lastMonthSales - lastMonthPayment;

//   const salesDifference = currentMonthSales - lastMonthSales;
//   const salesPercentage =
//     lastMonthSales > 0
//       ? ((Math.abs(salesDifference) / lastMonthSales) * 100).toFixed(2)
//       : "100.00";
//   const isSalesIncreased = salesDifference > 0;

//   const paymentDifference = currentMonthPayment - lastMonthPayment;
//   const paymentPercentage =
//     lastMonthPayment > 0
//       ? ((Math.abs(paymentDifference) / lastMonthPayment) * 100).toFixed(2)
//       : "100.00";
//   const isPaymentIncreased = paymentDifference > 0;

//   const dueDifference = currentMonthDue - lastMonthDue;
//   const duePercentage =
//     lastMonthDue > 0
//       ? ((Math.abs(dueDifference) / lastMonthDue) * 100).toFixed(2)
//       : "100.00";
//   const isdueIncreased = dueDifference > 0;

//   const currentMonthSalesText =
//     currentMonthSales > 0
//       ? (currentMonthSales / 1000).toFixed(2) + "K"
//       : "0.00K";

//   const currentMonthPaymentText =
//     currentMonthPayment > 0
//       ? (currentMonthPayment / 1000).toFixed(2) + "K"
//       : "0.00K";

//   const currentMonthDueText =
//     currentMonthDue > 0 ? (currentMonthDue / 1000).toFixed(2) + "K" : "0.00K";

//   const currentMonthExpense = billResult.currentMonthNetAmount ?? 0;
//   const currentMonthPaymentMade = billResult.currentMonthPaidAmount ?? 0;

//   const lastMonthExpense = billResult.lastMonthNetAmount ?? 0;
//   const lastMonthPaymentMade = billResult.lastMonthPaidAmount ?? 0;

//   const expenseDifference = currentMonthExpense - lastMonthExpense;
//   const expensePercentage =
//     lastMonthExpense > 0
//       ? ((Math.abs(expenseDifference) / lastMonthExpense) * 100).toFixed(2)
//       : "100.00";
//   const isExpenseIncreased = expenseDifference > 0;

//   const paymentMadeDifference = currentMonthPaymentMade - lastMonthPaymentMade;
//   const paymentMadePercentage =
//     lastMonthPaymentMade > 0
//       ? (
//           (Math.abs(paymentMadeDifference) / lastMonthPaymentMade) *
//           100
//         ).toFixed(2)
//       : "100.00";
//   const isPaymentMadeIncreased = paymentMadeDifference > 0;

//   const currentMonthExpenseText =
//     currentMonthExpense > 0
//       ? (currentMonthExpense / 1000).toFixed(2) + "K"
//       : "0.00K";

//   const currentMonthPaymentMadeText =
//     currentMonthPaymentMade > 0
//       ? (currentMonthPaymentMade / 1000).toFixed(2) + "K"
//       : "0.00K";

//   const currentMonthGrossProfit = currentMonthSales - currentMonthExpense;
//   const lastMonthGrossProfit = lastMonthSales - lastMonthExpense;
//   const grossProfitDifference = currentMonthGrossProfit - lastMonthGrossProfit;

//   const grossProfitPercentage =
//     lastMonthGrossProfit > 0
//       ? (
//           (Math.abs(grossProfitDifference) / lastMonthGrossProfit) *
//           100
//         ).toFixed(2)
//       : "100.00";
//   const isGrossProfitIncreased = grossProfitDifference > 0;
//   const currentMonthGrossProfitText =
//     currentMonthGrossProfit > 0
//       ? (currentMonthGrossProfit / 1000).toFixed(2) + "K"
//       : "0.00K";

//   return {
//     currentMonthSalesText,
//     salesPercentage,
//     isSalesIncreased,
//     currentMonthPaymentText,
//     paymentPercentage,
//     isPaymentIncreased,
//     currentMonthDueText,
//     duePercentage,
//     isdueIncreased,
//     currentMonthExpenseText,
//     expensePercentage,
//     isExpenseIncreased,
//     currentMonthPaymentMadeText,
//     paymentMadePercentage,
//     isPaymentMadeIncreased,
//     currentMonthGrossProfitText,
//     grossProfitPercentage,
//     isGrossProfitIncreased,
//   };
// };

// const getSalesExpenseDataForGraph = async (
//   businessId,
//   graphGenerateForRevenue
// ) => {
//   let salesLabelArray = [];
//   let expenseLabelArray = [];

//   let cashQueryString = "select ";
//   let expenseQueryString = "select ";

//   if (graphGenerateForRevenue === 3) {
//     const noOfMonth = 7;
//     const lastMonthMoment = moment().subtract(noOfMonth - 1, "months");
//     const lastMonthLabel = lastMonthMoment.format("MMM");
//     salesLabelArray.push(lastMonthLabel);
//     const lastMonth = lastMonthMoment.format("YYYY-MM-%%");
//     cashQueryString += `sum(case when issueDate like '${lastMonth}' then IFNUll(netAmount,0) else 0 end) as totalSales_0`;
//     expenseQueryString += `sum(case when issueDate like '${lastMonth}' then IFNUll(netAmount,0) else 0 end) as totalExpense_0`;

//     for (let i = 1; i < noOfMonth; i++) {
//       const monthMoment = lastMonthMoment.add(1, "months");
//       salesLabelArray.push(monthMoment.format("MMM"));
//       expenseLabelArray.push(monthMoment.format("MMM"));
//       const month = monthMoment.format("YYYY-MM-%%");
//       cashQueryString += `,sum(case when issueDate like '${month}' then IFNUll(netAmount,0) else 0 end) as totalSales_${i}`;
//       expenseQueryString += `,sum(case when issueDate like '${month}' then IFNUll(netAmount,0) else 0 end) as totalExpense_${i}`;
//     }
//   } else if (graphGenerateForRevenue === 2) {
//     const noOfWeek = 7;
//     const currentWeekStartMoment = moment().startOf("week");
//     const currentWeekEndMoment = moment().endOf("week");
//     const currentWeek =
//       currentWeekStartMoment.format("DD/MM") +
//       "-" +
//       currentWeekEndMoment.format("DD/MM");
//     salesLabelArray.push(currentWeek);
//     expenseLabelArray.push(currentWeek);

//     let weekArray = [];
//     let startDate = currentWeekStartMoment.format("YYYY-MM-DD");
//     let endDate = currentWeekEndMoment.format("YYYY-MM-DD");
//     weekArray.push({ startDate, endDate });

//     for (let i = 1; i < noOfWeek; i++) {
//       const weekMoment = currentWeekStartMoment.subtract(1, "weeks");
//       const week =
//         weekMoment.startOf("week").format("DD/MM") +
//         "-" +
//         weekMoment.endOf("week").format("DD/MM");
//       salesLabelArray.push(week);
//       expenseLabelArray.push(week);

//       startDate = weekMoment.startOf("week").format("YYYY-MM-DD");
//       endDate = weekMoment.endOf("week").format("YYYY-MM-DD");
//       weekArray.push({ startDate, endDate });
//     }
//     salesLabelArray.reverse();
//     expenseLabelArray.reverse();
//     weekArray.reverse();

//     for (let i = 0; i < weekArray.length; i++) {
//       const weekDate = weekArray[i];
//       cashQueryString += `sum(case when issueDate between '${weekDate.startDate}' and '${weekDate.endDate}' then IFNUll(netAmount,0) else 0 end) as totalSales_${i},`;
//       expenseQueryString += `sum(case when issueDate between '${weekDate.startDate}' and '${weekDate.endDate}' then IFNUll(netAmount,0) else 0 end) as totalExpense_${i},`;
//     }
//     cashQueryString = cashQueryString.replace(/,\s*$/, "");
//     expenseQueryString = expenseQueryString.replace(/,\s*$/, "");
//   } else {
//     const noOfDay = 7;
//     const currentDayMoment = moment();
//     const currentDay = currentDayMoment.format("DD MMM");
//     salesLabelArray.push(currentDay);
//     expenseLabelArray.push(currentDay);

//     let dayArray = [];
//     let day = currentDayMoment.format("YYYY-MM-DD");
//     dayArray.push(day);

//     for (let i = 1; i < noOfDay; i++) {
//       const dayMoment = currentDayMoment.subtract(1, "days");
//       salesLabelArray.push(dayMoment.format("DD MMM"));
//       expenseLabelArray.push(dayMoment.format("DD MMM"));
//       day = dayMoment.format("YYYY-MM-DD");
//       dayArray.push(day);
//     }
//     salesLabelArray.reverse();
//     expenseLabelArray.reverse();
//     dayArray.reverse();

//     for (let i = 0; i < dayArray.length; i++) {
//       const date = dayArray[i];
//       cashQueryString += `sum(case when issueDate='${date}' then IFNUll(netAmount,0) else 0 end) as totalSales_${i},`;
//       expenseQueryString += `sum(case when issueDate='${date}' then IFNUll(netAmount,0) else 0 end) as totalExpense_${i},`;
//     }
//     cashQueryString = cashQueryString.replace(/,\s*$/, "");
//     expenseQueryString = expenseQueryString.replace(/,\s*$/, "");
//   }
//   cashQueryString +=
//     " from invoices WHERE businessId = :businessId and isPublished = :isPublished and isDeleted = :isDeleted";
//   expenseQueryString +=
//     " from bills WHERE businessId = :businessId and isPublished = :isPublished and isDeleted = :isDeleted";
//   const params = { businessId: businessId, isPublished: 1, isDeleted: 0 };

//   const invoiceResult = await dbManager.executeQueryDataReturnWithParameter(
//     cashQueryString,
//     params
//   );
//   const billResult = await dbManager.executeQueryDataReturnWithParameter(
//     expenseQueryString,
//     params
//   );

//   let salesDataArray;
//   let expenseDataArray;
//   if (invoiceResult && invoiceResult.length > 0) {
//     salesDataArray = [
//       Number(Number(invoiceResult[0]["totalSales_0"]).toFixed(2)),
//       Number(Number(invoiceResult[0]["totalSales_1"]).toFixed(2)),
//       Number(Number(invoiceResult[0]["totalSales_2"]).toFixed(2)),
//       Number(Number(invoiceResult[0]["totalSales_3"]).toFixed(2)),
//       Number(Number(invoiceResult[0]["totalSales_4"]).toFixed(2)),
//       Number(Number(invoiceResult[0]["totalSales_5"]).toFixed(2)),
//       Number(Number(invoiceResult[0]["totalSales_6"]).toFixed(2)),
//     ];
//   } else {
//     salesDataArray = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
//   }

//   if (billResult && billResult.length > 0) {
//     expenseDataArray = [
//       Number(Number(billResult[0]["totalExpense_0"]).toFixed(2)),
//       Number(Number(billResult[0]["totalExpense_1"]).toFixed(2)),
//       Number(Number(billResult[0]["totalExpense_2"]).toFixed(2)),
//       Number(Number(billResult[0]["totalExpense_3"]).toFixed(2)),
//       Number(Number(billResult[0]["totalExpense_4"]).toFixed(2)),
//       Number(Number(billResult[0]["totalExpense_5"]).toFixed(2)),
//       Number(Number(billResult[0]["totalExpense_6"]).toFixed(2)),
//     ];
//   } else {
//     expenseDataArray = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
//   }

//   return {
//     salesLabelArray,
//     salesDataArray,
//     expenseLabelArray,
//     expenseDataArray,
//   };
// };

// const getCashCostDataForGraph = async (businessId, graphGenerateForPayment) => {
//   let cashLabelArray = [];
//   let cashQueryString = "select ";

//   let costLabelArray = [];
//   let costQueryString = "select ";

//   if (graphGenerateForPayment === 3) {
//     const noOfMonth = 7;
//     const lastMonthMoment = moment().subtract(noOfMonth - 1, "months");
//     const lastMonthLabel = lastMonthMoment.format("MMM");
//     cashLabelArray.push(lastMonthLabel);
//     costLabelArray.push(lastMonthLabel);
//     const lastMonth = lastMonthMoment.format("YYYY-MM-%%");
//     cashQueryString += `sum(case when paymentDate like '${lastMonth}' then IFNUll(paymentAmount,0) else 0 end) as totalCash_0`;
//     costQueryString += `sum(case when paymentDate like '${lastMonth}' then IFNUll(paymentAmount,0) else 0 end) as totalCost_0`;

//     for (let i = 1; i < noOfMonth; i++) {
//       const monthMoment = lastMonthMoment.add(1, "months");
//       cashLabelArray.push(monthMoment.format("MMM"));
//       costLabelArray.push(monthMoment.format("MMM"));
//       const month = monthMoment.format("YYYY-MM-%%");
//       cashQueryString += `,sum(case when paymentDate like '${month}' then IFNUll(paymentAmount,0) else 0 end) as totalCash_${i}`;
//       costQueryString += `,sum(case when paymentDate like '${month}' then IFNUll(paymentAmount,0) else 0 end) as totalCost_${i}`;
//     }
//   } else if (graphGenerateForPayment === 2) {
//     const noOfWeek = 7;
//     const currentWeekStartMoment = moment().startOf("week");
//     const currentWeekEndMoment = moment().endOf("week");
//     const currentWeek =
//       currentWeekStartMoment.format("DD/MM") +
//       "-" +
//       currentWeekEndMoment.format("DD/MM");
//     cashLabelArray.push(currentWeek);
//     costLabelArray.push(currentWeek);

//     let weekArray = [];
//     let startDate = currentWeekStartMoment.format("YYYY-MM-DD");
//     let endDate = currentWeekEndMoment.format("YYYY-MM-DD");
//     weekArray.push({ startDate, endDate });

//     for (let i = 1; i < noOfWeek; i++) {
//       const weekMoment = currentWeekStartMoment.subtract(1, "weeks");
//       const week =
//         weekMoment.startOf("week").format("DD/MM") +
//         "-" +
//         weekMoment.endOf("week").format("DD/MM");
//       cashLabelArray.push(week);
//       costLabelArray.push(week);

//       startDate = weekMoment.startOf("week").format("YYYY-MM-DD");
//       endDate = weekMoment.endOf("week").format("YYYY-MM-DD");
//       weekArray.push({ startDate, endDate });
//     }
//     cashLabelArray.reverse();
//     costLabelArray.reverse();
//     weekArray.reverse();

//     for (let i = 0; i < weekArray.length; i++) {
//       const weekDate = weekArray[i];
//       cashQueryString += `sum(case when paymentDate between '${weekDate.startDate}' and '${weekDate.endDate}' then IFNUll(paymentAmount,0) else 0 end) as totalCash_${i},`;
//       costQueryString += `sum(case when paymentDate between '${weekDate.startDate}' and '${weekDate.endDate}' then IFNUll(paymentAmount,0) else 0 end) as totalCost_${i},`;
//     }
//     cashQueryString = cashQueryString.replace(/,\s*$/, "");
//     costQueryString = costQueryString.replace(/,\s*$/, "");
//   } else {
//     const noOfDay = 7;
//     const currentDayMoment = moment();
//     const currentDay = currentDayMoment.format("DD MMM");
//     cashLabelArray.push(currentDay);
//     costLabelArray.push(currentDay);

//     let dayArray = [];
//     let day = currentDayMoment.format("YYYY-MM-DD");
//     dayArray.push(day);

//     for (let i = 1; i < noOfDay; i++) {
//       const dayMoment = currentDayMoment.subtract(1, "days");
//       cashLabelArray.push(dayMoment.format("DD MMM"));
//       costLabelArray.push(dayMoment.format("DD MMM"));
//       day = dayMoment.format("YYYY-MM-DD");
//       dayArray.push(day);
//     }
//     cashLabelArray.reverse();
//     costLabelArray.reverse();
//     dayArray.reverse();

//     for (let i = 0; i < dayArray.length; i++) {
//       const date = dayArray[i];
//       cashQueryString += `sum(case when paymentDate='${date}' then IFNUll(paymentAmount,0) else 0 end) as totalCash_${i},`;
//       costQueryString += `sum(case when paymentDate='${date}' then IFNUll(paymentAmount,0) else 0 end) as totalCost_${i},`;
//     }
//     cashQueryString = cashQueryString.replace(/,\s*$/, "");
//     costQueryString = costQueryString.replace(/,\s*$/, "");
//   }
//   cashQueryString +=
//     " from payments WHERE businessId = :businessId and isActive = :isActive";
//   costQueryString +=
//     " from billPayments WHERE businessId = :businessId and isActive = :isActive";

//   const params = { businessId: businessId, isActive: 1 };
//   const paymentReceivedResult =
//     await dbManager.executeQueryDataReturnWithParameter(
//       cashQueryString,
//       params
//     );
//   const paymentMadeResult = await dbManager.executeQueryDataReturnWithParameter(
//     costQueryString,
//     params
//   );

//   let cashDataArray;
//   let costDataArray;

//   if (paymentReceivedResult && paymentReceivedResult.length > 0) {
//     cashDataArray = [
//       Number(Number(paymentReceivedResult[0]["totalCash_0"]).toFixed(2)),
//       Number(Number(paymentReceivedResult[0]["totalCash_1"]).toFixed(2)),
//       Number(Number(paymentReceivedResult[0]["totalCash_2"]).toFixed(2)),
//       Number(Number(paymentReceivedResult[0]["totalCash_3"]).toFixed(2)),
//       Number(Number(paymentReceivedResult[0]["totalCash_4"]).toFixed(2)),
//       Number(Number(paymentReceivedResult[0]["totalCash_5"]).toFixed(2)),
//       Number(Number(paymentReceivedResult[0]["totalCash_6"]).toFixed(2)),
//     ];
//   } else {
//     cashDataArray = [0, 0, 0, 0, 0, 0, 0];
//   }

//   if (paymentMadeResult && paymentMadeResult.length > 0) {
//     costDataArray = [
//       Number(Number(paymentMadeResult[0]["totalCost_0"]).toFixed(2)),
//       Number(Number(paymentMadeResult[0]["totalCost_1"]).toFixed(2)),
//       Number(Number(paymentMadeResult[0]["totalCost_2"]).toFixed(2)),
//       Number(Number(paymentMadeResult[0]["totalCost_3"]).toFixed(2)),
//       Number(Number(paymentMadeResult[0]["totalCost_4"]).toFixed(2)),
//       Number(Number(paymentMadeResult[0]["totalCost_5"]).toFixed(2)),
//       Number(Number(paymentMadeResult[0]["totalCost_6"]).toFixed(2)),
//     ];
//   } else {
//     costDataArray = [0, 0, 0, 0, 0, 0, 0];
//   }

//   return { cashLabelArray, cashDataArray, costLabelArray, costDataArray };
// };

// module.exports = {
//   getDashboardData,
//   getSalesExpenseDataForGraph,
//   getCashCostDataForGraph,
// };
