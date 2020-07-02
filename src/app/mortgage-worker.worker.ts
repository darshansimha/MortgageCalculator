/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const mortgageCalculationValues = (data) => {
    let result = {
      term: {
        numberOfPayments: 0,
        mortgagePayment: 0,
        prePayment: 0,
        principalPayment: 0,
        interestPayment: 0,
        totalCost: 0,
        interestSavingsWithNonMonthlyPlan: 0
      },
      ammortized : {
        numberOfPayments: 0,
        mortgagePayment: 0,
        prePayment: 0,
        principalPayment: 0,
        interestPayment: 0,
        totalCost: 0,
        interestSavingsWithNonMonthlyPlan: 0
      }

    }
    const compoundInterest = (data.mortgageAmount * Math.pow((1 + (data.roi / (12 * 100))), (12 * data.term)));
    result.term.totalCost = compoundInterest;
    result.term.numberOfPayments = data.term * data.paymentFrequency;
    result.term.mortgagePayment = compoundInterest / (data.timePeriod["timePeriod0"] + (data.timePeriod["timePeriod1"] / 12))
    result.term.prePayment = (data.prePaymentAmount)? data.prePaymentAmount : 0;
    result.term.interestPayment = compoundInterest - data.mortgageAmount;
    result.term.principalPayment = data.mortgageAmount / data.term;
    result.term.interestSavingsWithNonMonthlyPlan = (data.mortgageAmount / data.term) + 860;

    result.ammortized.totalCost = compoundInterest;
    result.ammortized.numberOfPayments = data.term * data.paymentFrequency * data.timePeriod["timePeriod0"] * (data.timePeriod["timePeriod1"]);
    result.ammortized.mortgagePayment = compoundInterest / (data.timePeriod["timePeriod0"] + (data.timePeriod["timePeriod1"] / 12));
    result.ammortized.prePayment = (data.prePaymentAmount)? data.prePaymentAmount : 0;
    result.ammortized.interestPayment = (compoundInterest - data.mortgageAmount) * data.timePeriod["timePeriod0"] * (data.timePeriod["timePeriod1"]);
    result.ammortized.principalPayment = (data.mortgageAmount / data.term) * data.timePeriod["timePeriod0"] * (data.timePeriod["timePeriod1"]);
    result.ammortized.interestSavingsWithNonMonthlyPlan = ((data.mortgageAmount / data.term) + 860) * data.timePeriod["timePeriod0"] * (data.timePeriod["timePeriod1"]);

    return result;
  }
  const response = mortgageCalculationValues(data);
  postMessage(response);
});
