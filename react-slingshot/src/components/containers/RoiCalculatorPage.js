import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/roiCalculatorActions';
import RoiCalculatorForm from '../RoiCalculatorForm';

export class RoiCalculatorPage extends React.Component {
  saveRoiCalculation = () => {
    this.props.actions.saveRoiCalculation(this.props.roiScenario);
  }

  calculateRoi = e => {
    this.props.actions.calculateRoi(this.props.roiScenario, e.target.name, e.target.value);
  }

  render() {
    return (
      <RoiCalculatorForm
        onSaveClick={this.saveRoiCalculation}
        onChange={this.calculateRoi}
        roiScenario={this.props.roiScenario}
      />
    );
  }
}

RoiCalculatorPage.propTypes = {
  actions: PropTypes.object.isRequired,
  roiScenario: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    roiScenario: state.roiScenario
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoiCalculatorPage);
