'use strict';

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class ImageView extends PureComponent {
  render() {
    return (
      <div className="image-view">
        <img src={this.props.src}/>
      </div>
    );
  }
}

ImageView.propTypes = {
  src: PropTypes.any
};

export default ImageView;