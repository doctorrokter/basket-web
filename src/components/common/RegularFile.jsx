'use strict';

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import File from '../../util/File';
import VLayout from '../../layouts/VLayout';
import moment from 'moment/moment';

class RegularFile extends PureComponent {
  render() {
    let file = this.props.file;
    let type = File.fileType(file.name);
    let className = this.props.isFolder ? ' folder' : ` file ${type}`;
    return (
      <VLayout vAlign={VLayout.vAlign.bottom}
               hAlign={VLayout.hAlign.left}
               className={`cell ${className}`}
               onClick={this.props.onClick}>
        {
          !this.props.isFolder &&
          <i className={`file-type fas fa-file-${type}`}/>
        }

        <span className="file-name">{file.name}</span>
        {
          !this.props.isFolder &&
          <span className="created-at">{moment(file.client_modified).format('DD MMM YYYY, h:mm')}</span>
        }
      </VLayout>
    );
  }
}

RegularFile.propTypes = {
  isFolder: PropTypes.bool,
  file: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

RegularFile.defaultProps = {
  isFolder: false
};

export default RegularFile;