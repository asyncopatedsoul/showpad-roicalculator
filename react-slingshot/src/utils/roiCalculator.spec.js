import { necessaryDataIsProvidedToCalculateROI, calculateRoleResourceCost, calculateExperienceAppCost, calculateRevenueForCustomerCategoryPerPeriod, calculateTotalRevenuePerYear, calculateTotalExpAppCostsPerYear, calculateNetRevenuePerYear, calculateROIPerYear } from './roiCalculator';

import {roundNumber} from './math';
import {getCurrencyFormattedNumber} from './numberFormat';

const scenario = {
  cnt_exp_apps:4,
  cstmr_spprt_cnt_res: 2,
  cstmr_spprt_days_worked: 28,
  cstmr_spprt_cost_pr_dy: 214.29,
  cstmr_spprt_cost_pr_yr: 80000,
  cstmr_spprt_bandwidth_pr_dy:0.2,
  sltn_eng_cnt_res: 2,
  sltn_eng_days_worked: 10,
  sltn_eng_cost_pr_dy: 342.86,
  sltn_eng_cost_pr_yr: 120000,
  sltn_eng_bandwidth_pr_dy:0.8,
  prdct_eng_cnt_res: 5,
  prdct_eng_days_worked: 28,
  prdct_eng_cost_pr_dy: 342.86,
  prdct_eng_cost_pr_yr: 120000,
  prdct_eng_bandwidth_pr_dy:0.8,
  spprt_eng_cnt_res: 2,
  spprt_eng_days_worked: 28,
  spprt_eng_cost_pr_dy: 342.86,
  spprt_eng_cost_pr_yr: 120000,
  spprt_eng_bandwidth_pr_dy:0.2,
  mgmt_cnt_res: 1,
  mgmt_days_worked: 28,
  mgmt_cost_pr_dy: 342.86,
  mgmt_bandwidth_pr_dy:0.2,
  mgmt_cost_pr_yr: 120000,
  pltfrm_cost_pr_mo:5000,
  misc_cost_pr_mo:2500,
  accts_retained_cnt_pr_yr:4,
  accts_retained_attrbution:0.2,
  accts_retained_avg_users:1000,
  accts_retained_revenue_pr_user:45,
  accts_new_cnt_pr_yr:10,
  accts_new_attrbution:0.2,
  accts_new_avg_users:1000,
  accts_new_revenue_pr_user:45,
  accts_upgrade_cnt_pr_yr:4,
  accts_upgrade_attrbution:0.2,
  accts_upgrade_avg_users:1000,
  accts_upgrade_revenue_pr_user:10
}

describe('ROI Calculator', () => {

  describe('necessaryDataIsProvidedToCalculateROI', () => {
    it('returns false when necessary data isn\'t provided', () => {
      // arrange
      const settings = {

      };

      // assert
      expect(necessaryDataIsProvidedToCalculateROI(settings)).toEqual(false);
    });

    it('returns true when necessary data is provided', () => {
      // arrange

      // assert
      expect(necessaryDataIsProvidedToCalculateROI(scenario)).toEqual(true);
    });
  });

  describe('calculateTotalRevenuePerYear', () => {

    it ('calculateRevenueForCustomerCategory accountsNewRevenue', ()=> {

      var accountsNewRevenue = calculateRevenueForCustomerCategoryPerPeriod(
        scenario.accts_new_cnt_pr_yr, scenario.accts_new_attrbution, scenario.accts_new_revenue_pr_user, scenario.accts_new_avg_users);

      expect(accountsNewRevenue).toEqual(90000);

    });

    it ('calculateRevenueForCustomerCategory accountsRetainedRevenue', ()=> {

      var accountsRetainedRevenue = calculateRevenueForCustomerCategoryPerPeriod(
        scenario.accts_retained_cnt_pr_yr, scenario.accts_retained_attrbution, scenario.accts_retained_revenue_pr_user, scenario.accts_retained_avg_users);

      expect(accountsRetainedRevenue).toEqual(36000);

    });

    it ('calculateRevenueForCustomerCategory accountsUpgradedRevenue', ()=> {

      var accountsUpgradedRevenue = calculateRevenueForCustomerCategoryPerPeriod(
        scenario.accts_upgrade_cnt_pr_yr, scenario.accts_upgrade_attrbution, scenario.accts_upgrade_revenue_pr_user, scenario.accts_upgrade_avg_users);

      expect(accountsUpgradedRevenue).toEqual(8000);

    });

    it('calculateTotalRevenuePerYear all categories', ()=>{

      var totalRevenuePerYear = calculateTotalRevenuePerYear(scenario);

      expect(totalRevenuePerYear).toEqual(1608000);
    });
  });

  describe('calculateTotalExpAppCostsPerYear', () => {

    let managerCostPerExpApp = 0;
    let solutionsEngineerCostPerExpApp = 0;
    let productEngineerCostPerExpApp = 0;
    let customerSupportCostPerExpApp = 0;
    let supportEngineeringCostPerExpApp = 0;
    let expAppCost = 0;
    let totalExpAppCostsPerYear = 0;

    it ('calculateTotalExpAppCostsPerYear managerCostPerExpApp', ()=> {

      managerCostPerExpApp = calculateRoleResourceCost(
        scenario.mgmt_days_worked, scenario.mgmt_bandwidth_pr_dy, scenario.mgmt_cost_pr_yr, scenario.mgmt_cnt_res);

      managerCostPerExpApp = roundNumber(managerCostPerExpApp, 2);

      expect(managerCostPerExpApp).toEqual(2584.62);
    });

    it ('calculateTotalExpAppCostsPerYear solutionsEngineerCostPerExpApp', ()=> {

      solutionsEngineerCostPerExpApp = calculateRoleResourceCost(
          scenario.sltn_eng_days_worked, scenario.sltn_eng_bandwidth_pr_dy, scenario.sltn_eng_cost_pr_yr, scenario.sltn_eng_cnt_res);


      solutionsEngineerCostPerExpApp = roundNumber(solutionsEngineerCostPerExpApp, 2);

      expect(solutionsEngineerCostPerExpApp).toEqual(7384.62);
    });

    it ('calculateTotalExpAppCostsPerYear productEngineerCostPerExpApp', ()=> {

      productEngineerCostPerExpApp = calculateRoleResourceCost(
          scenario.prdct_eng_days_worked, scenario.prdct_eng_bandwidth_pr_dy, scenario.prdct_eng_cost_pr_yr, scenario.prdct_eng_cnt_res);

      productEngineerCostPerExpApp = roundNumber(productEngineerCostPerExpApp, 2);

      expect(productEngineerCostPerExpApp).toEqual(51692.31);
    });

    it ('calculateTotalExpAppCostsPerYear customerSupportCostPerExpApp', ()=> {

      customerSupportCostPerExpApp = calculateRoleResourceCost(
          scenario.cstmr_spprt_days_worked, scenario.cstmr_spprt_bandwidth_pr_dy, scenario.cstmr_spprt_cost_pr_yr, scenario.cstmr_spprt_cnt_res);

      customerSupportCostPerExpApp = roundNumber(customerSupportCostPerExpApp, 2);

      expect(customerSupportCostPerExpApp).toEqual(3446.15);
    });

    it ('calculateTotalExpAppCostsPerYear supportEngineeringCostPerExpApp', ()=> {

      supportEngineeringCostPerExpApp = calculateRoleResourceCost(
          scenario.spprt_eng_days_worked, scenario.spprt_eng_bandwidth_pr_dy, scenario.spprt_eng_cost_pr_yr, scenario.spprt_eng_cnt_res);


      supportEngineeringCostPerExpApp = roundNumber(supportEngineeringCostPerExpApp, 2);

      expect(supportEngineeringCostPerExpApp).toEqual(5169.23);
    });


    it ('calculateTotalExpAppCostsPerYear calculateExperienceAppCost', ()=> {

      expAppCost = calculateExperienceAppCost([managerCostPerExpApp, solutionsEngineerCostPerExpApp, productEngineerCostPerExpApp, customerSupportCostPerExpApp, supportEngineeringCostPerExpApp],
      [scenario.pltfrm_cost_pr_mo, scenario.misc_cost_pr_mo]);

      expAppCost = roundNumber(expAppCost, 2);

      expect(expAppCost).toEqual(160276.93);
    });

    it ('calculateTotalExpAppCostsPerYear', ()=> {

      totalExpAppCostsPerYear = calculateTotalExpAppCostsPerYear(scenario)

      totalExpAppCostsPerYear = roundNumber(totalExpAppCostsPerYear, 2);

      expect(totalExpAppCostsPerYear).toEqual(641107.69);
    });

  });

  describe('final ROI calculations', () => {

    it ('calculateNetRevenuePerYear', ()=> {
      expect(roundNumber(calculateNetRevenuePerYear(scenario),2)).toEqual(966892.31);
    });

    it ('calculateROIPerYear', ()=> {
      expect(roundNumber(calculateROIPerYear(scenario),2)).toEqual(1.51);
    });

  });

  // describe('milesPerMonth', () => {
  //   it('converts a weekly timeframe to a monthly timeframe', () => {
  //     // arrange
  //     const milesPerWeek = 100;
  //
  //     // act
  //     const milesPerMonth = calculateMilesDrivenPerMonth(milesPerWeek, 'week');
  //
  //     // assert
  //     expect(milesPerMonth).toEqual(433.3333333333333);
  //   });
  //
  //   it('returns a monthly timeframe untouched', () => {
  //     // arrange
  //     const milesPerMonth = 300;
  //
  //     // act
  //     const milesPerMonthCalculated = calculateMilesDrivenPerMonth(milesPerMonth, 'month');
  //
  //     // assert
  //     expect(milesPerMonthCalculated).toEqual(milesPerMonth);
  //   });
  //
  //   it('converts a yearly timeframe to a monthly timeframe', () => {
  //     // arrange
  //     const milesPerYear = 1200;
  //
  //     // act
  //     const milesPerMonth = calculateMilesDrivenPerMonth(milesPerYear, 'year');
  //
  //     // assert
  //     expect(milesPerMonth).toEqual(100);
  //   });
  //
  //   it('throws an error on invalid timeFrame', () => {
  //     // arrange
  //     const milesPerYear = 1200;
  //
  //       // act & assert
  //       expect(() => calculateMilesDrivenPerMonth(milesPerYear, 'minute')).toThrow('Unknown milesDrivenTimeframe passed: minute');
  //   });
  // });

  // describe('calculateSavingsPerMonth', () => {
  //   it('returns 29.93 in savings per month with these settings', () => {
  //     // arrange
  //     const settings = {
  //       tradePpg: 3.75,
  //       tradeMpg: 24,
  //       newPpg: 3.75,
  //       newMpg: 38,
  //       milesDriven: 120,
  //       milesDrivenTimeframe: 'week'
  //     };
  //
  //     // act
  //     const savingsPerMonth = calculateSavingsPerMonth(settings);
  //
  //     // assert
  //     expect(savingsPerMonth).toEqual(29.93);
  //   });
  //
  //   it('returns 40.83 in savings per month with these settings', () => {
  //     // arrange
  //     const settings = {
  //       tradePpg: 4.15,
  //       tradeMpg: 24,
  //       newPpg: 3.75,
  //       newMpg: 38,
  //       milesDriven: 550,
  //       milesDrivenTimeframe: 'month'
  //     };
  //
  //     // act
  //     const savingsPerMonth = calculateSavingsPerMonth(settings);
  //
  //     // assert
  //     expect(savingsPerMonth).toEqual(40.83);
  //   });
  //
  //   it('returns -157.12 in loss per month with these settings', () => {
  //     // arrange
  //     const settings = {
  //       tradePpg: 3.15,
  //       tradeMpg: 40,
  //       newPpg: 3.75,
  //       newMpg: 18,
  //       milesDriven: 14550,
  //       milesDrivenTimeframe: 'year'
  //     };
  //
  //     // act
  //     const savingsPerMonth = calculateSavingsPerMonth(settings);
  //
  //     // assert
  //     expect(savingsPerMonth).toEqual(-157.12);
  //   });
  //
  //   it('returns 0 per month with these settings', () => {
  //     // arrange
  //     const settings = {
  //       tradePpg: 3.15,
  //       tradeMpg: 40,
  //       newPpg: 3.75,
  //       newMpg: 18,
  //       milesDriven: 0,
  //       milesDrivenTimeframe: 'year'
  //     };
  //
  //     // act
  //     const savingsPerMonth = calculateSavingsPerMonth(settings);
  //
  //     // assert
  //     expect(savingsPerMonth).toEqual(0);
  //   });
  // });
});
