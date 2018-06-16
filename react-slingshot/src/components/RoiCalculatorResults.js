import React from 'react';
import PropTypes from 'prop-types';
import {scrubFormatting} from '../utils/numberFormat';

const RoiCalculatorResults = ({results}) => {
  // const savingsExist = scrubFormatting(savings.monthly) > 0;
  // const savingsClass = savingsExist ? 'savings' : 'loss';
  // const resultLabel = savingsExist ? 'Savings' : 'Loss';

  return (
    <table>
      <tbody>
        <tr>
          <td className="fuel-savings-label"></td>
          <td>
          <table>
            <tbody>
            <tr>
              <td>Total cost of new XP apps:</td>
              <td>Total revenue from new XP apps:</td>
              <td>Net revenue from new XP apps:</td>
              <td>ROI from new XP apps</td>
            </tr>
            <tr>
              <td>{results.totalExpAppCostsPerYear}</td>
              <td>{results.grossRevenuePerYear}</td>
              <td>{results.netRevenuePerYear}</td>
              <td>{results.roiPerYear}</td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>
  );
};

RoiCalculatorResults.propTypes = {
  results: PropTypes.object.isRequired
};

export default RoiCalculatorResults;
