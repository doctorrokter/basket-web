'use strict';

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import DropboxService from '../../services/DropboxService';
import ImageView from './ImageView';
import Spinner from '../common/Spinner';

class Thumbnail extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      src: ''
    };
  }

  componentWillMount() {
    DropboxService.getThumbnail(this.props.path)
      .then((data) => {
        this.setState({loaded: true, src: window.URL.createObjectURL(data.fileBlob)});
      });
  }

  render() {
    return (
      <div className="cell thumbnail">
        {
          this.state.loaded ?
            <ImageView src={this.state.src}/> :
            <Spinner/>
        }
      </div>
    );
  }
}

Thumbnail.propTypes = {
  path: PropTypes.string
};

export default Thumbnail;