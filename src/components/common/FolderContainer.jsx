import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import HLayout from '../../layouts/HLayout';
import File from '../../util/File';
import Thumbnail from './Thumbnail';
import RegularFile from './RegularFile';

class FolderContainer extends PureComponent {
  render() {
    return (
      <HLayout className={this.props.className} wrap={HLayout.wrap.wrap} hAlign={HLayout.hAlign.left}>
        {this._renderBody()}
      </HLayout>
    );
  }

  _renderBody = () => {
    return this.props.entries.map((entry, index) => {
      let tag = entry['.tag'];
      let tabIndex = this.props.getTabIndex();
      if (tag === 'folder') {
        return <RegularFile onFocus={this.props.onFocus} tabIndex={tabIndex} isFolder key={entry.id} file={entry} onClick={this.props.onFolderChosen.bind(null, entry.path_lower, entry.name)}/>
      } else if (tag === 'file') {
        let ext = File.extension(entry.name);
        if (File.isImage(ext)) {
          return <Thumbnail onFocus={this.props.onFocus} tabIndex={tabIndex} key={entry.id} path={entry.path_lower}/>;
        } else {
          return <RegularFile onFocus={this.props.onFocus} tabIndex={tabIndex} file={entry} key={entry.id}/>;
        }
      }
    });
  };
}

FolderContainer.propTypes = {
  entries: PropTypes.array,
  className: PropTypes.string,
  onFolderChosen: PropTypes.func,
  getTabIndex: PropTypes.func,
  onFocus: PropTypes.func
};

FolderContainer.defaultProps = {
  entries: [],
  className: ''
};

export default FolderContainer;