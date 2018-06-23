import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import TitleBar from './common/TitleBar';
import HLayout from '../layouts/HLayout';
import VLayout from '../layouts/VLayout';

class SecondaryTitleBar extends PureComponent {
  render() {
    return (
      <TitleBar className="secondary-title-bar">
        <HLayout hAlign={HLayout.hAlign.stretchWithSpace} vAlign={HLayout.vAlign.center} fillWidth fillHeight>
          <HLayout vAlign={HLayout.vAlign.center}>
            {
              this.props.onBack &&
              <button className="back-btn" type="button" onClick={this.props.onBack} tabIndex={this.props.getTabIndex()}>
                <i className="fas fa-chevron-left"/>
              </button>
            }

            <VLayout hAlign={VLayout.hAlign.left} vAlign={VLayout.vAlign.center} fillHeight>
              <h2 className="secondary-title-bar-title">{this.props.title}</h2>
              {
                this.props.subtitle &&
                <span>{this.props.subtitle}</span>
              }
            </VLayout>
          </HLayout>

          {this.props.children}
        </HLayout>
      </TitleBar>
    );
  }
}

SecondaryTitleBar.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onBack: PropTypes.func,
  getTabIndex: PropTypes.func
};

SecondaryTitleBar.defaultProps = {
  title: '',
  subtitle: '',
  onBack: null,
  tabIndexPrefix: 1
};

export default SecondaryTitleBar;