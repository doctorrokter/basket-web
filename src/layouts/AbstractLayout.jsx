import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class AbstractLayout extends PureComponent {
  getClassName = () => {
    return this.props.className.trim() === '' ? '' : this.props.className + ' ';
  }
}

AbstractLayout.propTypes = {
  className: PropTypes.string
};

AbstractLayout.defaultProps = {
  className: ''
};

export default AbstractLayout;