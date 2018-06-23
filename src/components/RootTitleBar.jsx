import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import TitleBar from './common/TitleBar';
import HLayout from '../layouts/HLayout';
import VLayout from '../layouts/VLayout';

const toGB = (bytes) => {
  return parseFloat(bytes / 1024 / 1024 / 1024).toFixed(2);
};

class RootTitleBar extends PureComponent {
  render() {
    return (
      <TitleBar className="root-title-bar">
        <VLayout hAlign={VLayout.hAlign.stretch} fillWidth>
          <h2 className="root-title-bar-title">{this.props.username}</h2>
          <HLayout hAlign={HLayout.hAlign.stretchWithSpace}>
            <div>{this.props.email}</div>
            <div>{toGB(this.props.spaceUsed)}GB/{toGB(this.props.spaceAllocated)}GB</div>
          </HLayout>
        </VLayout>
      </TitleBar>
    );
  }
}

RootTitleBar.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  spaceUsed: PropTypes.number,
  spaceAllocated: PropTypes.number
};

RootTitleBar.defaultProps = {
  spaceUsed: 0,
  spaceAllocated: 0
};

export default RootTitleBar;