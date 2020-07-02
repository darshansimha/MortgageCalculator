/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`;
  let tableData = {
    columns: ["Category", "Term", "Amortization Period"],
    rows: [

    ],
  }
  const mortgageCalculationValues = (data) => {
    const compoundInterest = (data.mortgageAmount * Math.pow((1 + (data.roi / (12 * 100))), (12 * data.term)));
    if (data.timePeriod["timePeriod1"] == 0) {
      data.timePeriod["timePeriod1"] = 1;
    }
    tableData.rows = [];
    tableData.rows.push(["Number of Payments", data.term * data.paymentFrequency, data.term * data.paymentFrequency * data.timePeriod["timePeriod0"] * (data.timePeriod["timePeriod1"])]);
    tableData.rows.push(["Mortgage Payment", compoundInterest / (data.timePeriod["timePeriod0"] + (data.timePeriod["timePeriod1"] / 12)), compoundInterest / (data.timePeriod["timePeriod0"] + (data.timePeriod["timePeriod1"] / 12))]);
    tableData.rows.push(["Pre Payment", (data.prePaymentAmount) ? data.prePaymentAmount : 0, (data.prePaymentAmount) ? data.prePaymentAmount : 0]);
    tableData.rows.push(["Principal Payments", data.mortgageAmount / data.term, (data.mortgageAmount / data.term) * (data.timePeriod["timePeriod0"]) * (data.timePeriod["timePeriod1"])]);
    tableData.rows.push(["Interest Payment", compoundInterest - data.mortgageAmount, (compoundInterest - data.mortgageAmount) * data.timePeriod["timePeriod0"] * (data.timePeriod["timePeriod1"])]);
    tableData.rows.push(["Total Cost", compoundInterest, compoundInterest * data.timePeriod["timePeriod0"] * (data.timePeriod["timePeriod1"])]);
    tableData.rows.push(["Interest Savings with a Non-Monthly Payment Plan", (data.mortgageAmount / data.term) + 860, ((data.mortgageAmount / data.term) + 860) * data.timePeriod["timePeriod0"] * (data.timePeriod["timePeriod1"])]);
  }
  mortgageCalculationValues(data);
  tableData = JSON.parse(JSON.stringify(tableData));
  postMessage(tableData);
});
