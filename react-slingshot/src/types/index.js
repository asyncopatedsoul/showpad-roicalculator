// Centralized propType definitions
import { shape, number, bool, string, oneOfType } from 'prop-types';

export const fuelSavings = shape({
  newMpg: oneOfType([number,string]),
  tradeMpg: oneOfType([number,string]),
  newPpg: oneOfType([number,string]),
  tradePpg: oneOfType([number,string]),
  milesDriven: oneOfType([number,string]),
  milesDrivenTimeframe: string,
  displayResult: bool,
  dateModified: string,
  necessaryDataIsProvidedToCalculateSavings: bool,
  savings: savings
});

export const savings = shape({
  monthly: oneOfType([number,string]),
  annual: oneOfType([number,string]),
  threeYear: oneOfType([number,string]),
});

export const roiScenario = shape({
  cnt_exp_apps: oneOfType([number,string]),
  cstmr_spprt_cnt_res: oneOfType([number,string]),
  cstmr_spprt_days_worked: oneOfType([number,string]),
  cstmr_spprt_cost_pr_dy: oneOfType([number,string]),
  cstmr_spprt_cost_pr_yr: oneOfType([number,string]),
  cstmr_spprt_bandwidth_pr_dy: oneOfType([number,string]),
  sltn_eng_cnt_res: oneOfType([number,string]),
  sltn_eng_days_worked: oneOfType([number,string]),
  sltn_eng_cost_pr_dy: oneOfType([number,string]),
  sltn_eng_cost_pr_yr: oneOfType([number,string]),
  sltn_eng_bandwidth_pr_dy: oneOfType([number,string]),
  prdct_eng_cnt_res: oneOfType([number,string]),
  prdct_eng_days_worked: oneOfType([number,string]),
  prdct_eng_cost_pr_dy: oneOfType([number,string]),
  prdct_eng_cost_pr_yr: oneOfType([number,string]),
  prdct_eng_bandwidth_pr_dy: oneOfType([number,string]),
  spprt_eng_cnt_res: oneOfType([number,string]),
  spprt_eng_days_worked: oneOfType([number,string]),
  spprt_eng_cost_pr_dy: oneOfType([number,string]),
  spprt_eng_cost_pr_yr: oneOfType([number,string]),
  spprt_eng_bandwidth_pr_dy: oneOfType([number,string]),
  mgmt_cnt_res: oneOfType([number,string]),
  mgmt_days_worked: oneOfType([number,string]),
  mgmt_cost_pr_dy: oneOfType([number,string]),
  mgmt_bandwidth_pr_dy: oneOfType([number,string]),
  mgmt_cost_pr_yr: oneOfType([number,string]),
  pltfrm_cost_pr_mo: oneOfType([number,string]),
  misc_cost_pr_mo: oneOfType([number,string]),
  accts_retained_cnt_pr_yr: oneOfType([number,string]),
  accts_retained_attrbution: oneOfType([number,string]),
  accts_retained_avg_users: oneOfType([number,string]),
  accts_retained_revenue_pr_user: oneOfType([number,string]),
  accts_new_cnt_pr_yr: oneOfType([number,string]),
  accts_new_attrbution: oneOfType([number,string]),
  accts_new_avg_users: oneOfType([number,string]),
  accts_new_revenue_pr_user: oneOfType([number,string]),
  accts_upgrade_cnt_pr_yr: oneOfType([number,string]),
  accts_upgrade_attrbution: oneOfType([number,string]),
  accts_upgrade_avg_users: oneOfType([number,string]),
  accts_upgrade_revenue_pr_user: oneOfType([number,string])
});
