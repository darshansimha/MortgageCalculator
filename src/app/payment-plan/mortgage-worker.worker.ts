/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`;
  const mortgageCalculationValues = (data) => {
        let result = {
            numberOfPayments : 0,
            mortgagePayment : 0,
            prePayment : 0,
            principalPayment : 0,
            interestPayment : 0,
            totalCost : 0,
            interestSavingsWithNonMonthlyPlan : 0
        }
        const compoundInterest = (data.mortgageAmount * Math.pow((1 + (data.roi / (12 * 100))), (12 * data.term)));
        result.totalCost = compoundInterest;
        result.numberOfPayments = data.term * data.paymentFrequency;
        result.mortgagePayment = compoundInterest/(data.timePeriod["timePeriod0"] + (data.timePeriod["timePeriod1"]/12))
        result.prePayment = data.prePaymentAmount;
        result.interestPayment = compoundInterest - data.mortgageAmount;
        result.principalPayment = data.mortgageAmount/data.term;
        result.interestSavingsWithNonMonthlyPlan = (data.mortgageAmount/data.term) + 860;

        return result;
    }
  postMessage(mortgageCalculationValues);
});
