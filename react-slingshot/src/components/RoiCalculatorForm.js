import React from 'react';
import {func} from 'prop-types';
import RoiCalculatorResults from './RoiCalculatorResults';
import RoiCalculatorTextInput from './RoiCalculatorTextInput';
import {roiScenario} from '../types';

const RoiCalculatorForm = ({roiScenario, onSaveClick, onChange}) => (
  <div>
    <h2>Experience App ROI Calculator</h2>
    <table>
      <tbody>
        <tr>
          <td><label htmlFor="cnt_exp_apps"># Exp Apps</label></td>
          <td><RoiCalculatorTextInput onChange={onChange} name="cnt_exp_apps" value={roiScenario.cnt_exp_apps}/>
          </td>
        </tr>
        <tr>
          <td><label htmlFor="cstmr_spprt_cnt_res">Resource Count</label></td>
          <td><RoiCalculatorTextInput onChange={onChange} name="cstmr_spprt_cnt_res" value={roiScenario.cstmr_spprt_cnt_res}/>
          </td>
        </tr>
        <tr>
          <td><label htmlFor="cstmr_spprt_cost_pr_yr">Cost per Year</label></td>
          <td><RoiCalculatorTextInput onChange={onChange} name="cstmr_spprt_cost_pr_yr" value={roiScenario.cstmr_spprt_cost_pr_yr}/>
          </td>
        </tr>
        <tr>
          <td><label htmlFor="cstmr_spprt_bandwidth_pr_dy">Daily Bandwidth</label></td>
          <td><RoiCalculatorTextInput onChange={onChange} name="cstmr_spprt_bandwidth_pr_dy" value={roiScenario.cstmr_spprt_bandwidth_pr_dy}/>
          </td>
        </tr>
        <tr>
          <td><label htmlFor="cstmr_spprt_days_worked">Days Worked</label></td>
          <td><RoiCalculatorTextInput onChange={onChange} name="cstmr_spprt_days_worked" value={roiScenario.cstmr_spprt_days_worked}/>
          </td>
        </tr>

        <tr>
          <td><label>Date Modified</label></td>
          <td>{roiScenario.dateModified}</td>
        </tr>
      </tbody>
    </table>

    <hr/>

    {roiScenario.necessaryDataIsProvidedToCalculateSavings}
     <RoiCalculatorResults results={roiScenario.roiResult}/>

    <input type="submit" value="Save" onClick={onSaveClick}/>
  </div>
);

RoiCalculatorForm.propTypes = {
  onSaveClick: func.isRequired,
  onChange: func.isRequired,
  roiScenario: roiScenario.isRequired
};

export default RoiCalculatorForm;
