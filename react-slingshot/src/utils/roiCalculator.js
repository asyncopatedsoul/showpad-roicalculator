import {roundNumber} from './math';
import {getCurrencyFormattedNumber} from './numberFormat';

// Configuration Data
import data from '../data/config.json'

// Private
export function calculateRoleResourceCost(daysWorked, bandwidthAllocation, roleCostPerYear, resourceCount) {
  // const hoursPerDay = 8;
  const daysPerYear = 52 * 5;

  var roleCostPerDay = roleCostPerYear / daysPerYear * bandwidthAllocation;
  var totalRoleCost = daysWorked * roleCostPerDay * resourceCount;

  return totalRoleCost;
}

export function calculateExperienceAppCost(resourceRoleCosts, monthlyCosts) {

  var totalResourceRoleCosts = 0;
  for (let roleCost of resourceRoleCosts) { totalResourceRoleCosts+=roleCost; }

  var totalMonthlyCosts = 0;
  for (let monthlyCost of monthlyCosts) { totalMonthlyCosts+=monthlyCost; }

  return totalResourceRoleCosts + totalMonthlyCosts*12;
}

export function calculateRevenueForCustomerCategoryPerPeriod(customerCount, expAppAttributionToCustomerCount, revenuePerUser, usersPerCustomer) {
  return customerCount * expAppAttributionToCustomerCount * revenuePerUser * usersPerCustomer;
}


//========
// function calculateMonthlyCost(milesDrivenPerMonth, ppg, mpg) {
//   const gallonsUsedPerMonth = milesDrivenPerMonth / mpg;
//   return gallonsUsedPerMonth * ppg;
// }



// Public
export function loadConfigurationData() {
  return data;
}

export function calculateTotalRevenuePerYear(scenario) {

  // default period = 1 mo
  var periodsPerYear = 12;

  var accountsNewRevenue = calculateRevenueForCustomerCategoryPerPeriod(
    scenario.accts_new_cnt_pr_yr, scenario.accts_new_attrbution, scenario.accts_new_revenue_pr_user, scenario.accts_new_avg_users);
  var accountsRetainedRevenue = calculateRevenueForCustomerCategoryPerPeriod(
    scenario.accts_retained_cnt_pr_yr, scenario.accts_retained_attrbution, scenario.accts_retained_revenue_pr_user, scenario.accts_retained_avg_users);
  var accountsUpgradedRevenue = calculateRevenueForCustomerCategoryPerPeriod(
    scenario.accts_upgrade_cnt_pr_yr, scenario.accts_upgrade_attrbution, scenario.accts_upgrade_revenue_pr_user, scenario.accts_upgrade_avg_users);

  return periodsPerYear * (accountsNewRevenue + accountsRetainedRevenue + accountsUpgradedRevenue);
}

export function calculateTotalExpAppCostsPerYear(scenario) {

  var managerCostPerExpApp = calculateRoleResourceCost(
    scenario.mgmt_days_worked, scenario.mgmt_bandwidth_pr_dy, scenario.mgmt_cost_pr_yr, scenario.mgmt_cnt_res);

  var solutionsEngineerCostPerExpApp = calculateRoleResourceCost(
      scenario.sltn_eng_days_worked, scenario.sltn_eng_bandwidth_pr_dy, scenario.sltn_eng_cost_pr_yr, scenario.sltn_eng_cnt_res);

  var productEngineerCostPerExpApp = calculateRoleResourceCost(
      scenario.prdct_eng_days_worked, scenario.prdct_eng_bandwidth_pr_dy, scenario.prdct_eng_cost_pr_yr, scenario.prdct_eng_cnt_res);

  var customerSupportCostPerExpApp = calculateRoleResourceCost(
      scenario.cstmr_spprt_days_worked, scenario.cstmr_spprt_bandwidth_pr_dy, scenario.cstmr_spprt_cost_pr_yr, scenario.cstmr_spprt_cnt_res);

  var supportEngineeringCostPerExpApp = calculateRoleResourceCost(
      scenario.spprt_eng_days_worked, scenario.spprt_eng_bandwidth_pr_dy, scenario.spprt_eng_cost_pr_yr, scenario.spprt_eng_cnt_res);


  var expAppCost = calculateExperienceAppCost([managerCostPerExpApp, solutionsEngineerCostPerExpApp, productEngineerCostPerExpApp, customerSupportCostPerExpApp, supportEngineeringCostPerExpApp],
  [scenario.pltfrm_cost_pr_mo, scenario.misc_cost_pr_mo]);



  return scenario.cnt_exp_apps * expAppCost;
}

export function calculateNetRevenuePerYear(scenario) {
  var totalExpAppCostsPerYear = calculateTotalExpAppCostsPerYear(scenario);
  var totalRevenuePerYear = calculateTotalRevenuePerYear(scenario);

  return totalRevenuePerYear - totalExpAppCostsPerYear;
}

export function calculateROIPerYear(scenario) {
  var totalExpAppCostsPerYear = calculateTotalExpAppCostsPerYear(scenario);
  var netRevenuePerYear = calculateNetRevenuePerYear(scenario);

  return (netRevenuePerYear)/(totalExpAppCostsPerYear);
}

export function calculateROIScenario(scenario) {

  return {
    grossRevenuePerYear: calculateTotalRevenuePerYear(scenario),
    netRevenuePerYear: calculateNetRevenuePerYear(scenario),
    totalExpAppCostsPerYear: calculateTotalExpAppCostsPerYear(scenario),
    roiPerYear: calculateROIPerYear(scenario)
  }

}

export function necessaryDataIsProvidedToCalculateROI(scenario){
  return scenario.cnt_exp_apps > 0
    && scenario.cstmr_spprt_cnt_res > 0
    && scenario.cstmr_spprt_days_worked > 0
    && scenario.cstmr_spprt_cost_pr_dy > 0
    && scenario.cstmr_spprt_cost_pr_yr > 0
    && scenario.cstmr_spprt_bandwidth_pr_dy > 0
    && scenario.sltn_eng_cnt_res > 0
    && scenario.sltn_eng_days_worked > 0
    && scenario.sltn_eng_cost_pr_dy > 0
    && scenario.sltn_eng_cost_pr_yr > 0
    && scenario.mgmt_bandwidth_pr_dy > 0 > 0
    && scenario.prdct_eng_cnt_res > 0
    && scenario.prdct_eng_days_worked > 0
    && scenario.prdct_eng_cost_pr_dy > 0
    && scenario.prdct_eng_cost_pr_yr > 0
    && scenario.mgmt_bandwidth_pr_dy > 0
    && scenario.mgmt_cnt_res > 0
    && scenario.mgmt_days_worked > 0
    && scenario.mgmt_cost_pr_dy > 0
    && scenario.mgmt_bandwidth_pr_dy > 0
    && scenario.mgmt_cost_pr_yr > 0
    && scenario.pltfrm_cost_pr_mo > 0
    && scenario.misc_cost_pr_mo > 0
    && scenario.accts_retained_cnt_pr_yr > 0
    && scenario.accts_retained_attrbution > 0
    && scenario.accts_retained_avg_users > 0
    && scenario.accts_retained_revenue_pr_user > 0
    && scenario.accts_new_cnt_pr_yr > 0
    && scenario.accts_new_attrbution > 0
    && scenario.accts_new_avg_users > 0
    && scenario.accts_new_revenue_pr_user > 0
    && scenario.accts_upgrade_cnt_pr_yr > 0
    && scenario.accts_upgrade_attrbution > 0
    && scenario.accts_upgrade_avg_users > 0
    && scenario.accts_upgrade_revenue_pr_user > 0
  }

//
// export function calculateMilesDrivenPerMonth(milesDriven, milesDrivenTimeframe) {
//   const monthsPerYear = 12;
//   const weeksPerYear = 52;
//
//   switch (milesDrivenTimeframe) {
//     case 'week':
//       return (milesDriven * weeksPerYear) / monthsPerYear;
//     case 'month':
//       return milesDriven;
//     case 'year':
//       return milesDriven / monthsPerYear;
//     default:
//       throw new Error(`Unknown milesDrivenTimeframe passed: ${milesDrivenTimeframe}`);
//   }
// }
//
// export function calculateSavingsPerMonth(scenario) {
//   if (!scenario.milesDriven) {
//     return 0;
//   }
//
//   const milesDrivenPerMonth = calculateMilesDrivenPerMonth(scenario.milesDriven, scenario.milesDrivenTimeframe);
//   const tradeFuelCostPerMonth = calculateMonthlyCost(milesDrivenPerMonth, scenario.tradePpg, scenario.tradeMpg);
//   const newFuelCostPerMonth = calculateMonthlyCost(milesDrivenPerMonth, scenario.newPpg, scenario.newMpg);
//   const savingsPerMonth = tradeFuelCostPerMonth - newFuelCostPerMonth;
//
//   return roundNumber(savingsPerMonth, 2);
// }
//
// export function necessaryDataIsProvidedToCalculateSavings(scenario) {
//   return scenario.newMpg > 0
//     && scenario.tradeMpg > 0
//     && scenario.newPpg > 0
//     && scenario.tradePpg > 0
//     && scenario.milesDriven > 0;
// }
//
// export function calculateSavings(scenario) {
//   const monthlySavings = calculateSavingsPerMonth(scenario);
//
//   return {
//     monthly: getCurrencyFormattedNumber(monthlySavings),
//     annual: getCurrencyFormattedNumber(monthlySavings * 12),
//     threeYear: getCurrencyFormattedNumber(monthlySavings * 12 * 3)
//   };
// }
