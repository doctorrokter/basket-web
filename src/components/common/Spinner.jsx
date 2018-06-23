'use strict';

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import VLayout from '../../layouts/VLayout';

class Spinner extends PureComponent {
  render() {
    return (
      <VLayout className="spinner" hAlign={VLayout.hAlign.center} vAlign={VLayout.vAlign.center} fillHeight fillWidth>
        <i className="fa fa-spinner fa-spin"/>
        {
          this.props.text !== '' &&
          <p>{this.props.text}</p>
        }
      </VLayout>
    );
  }
}

Spinner.propTypes = {
  text: PropTypes.string
};

Spinner.defaultProps = {
  text: ''
};

export default Spinner;