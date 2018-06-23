import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class Breadcrumbs extends PureComponent {
  render() {
    return (
      <div className="breadcrumbs">{this.props.path === '' ? '/' : this.props.path}</div>
    );
  }
}

Breadcrumbs.propTypes = {
  path: PropTypes.string
};

Breadcrumbs.defaultProps = {
  path: ''
};

export default Breadcrumbs;