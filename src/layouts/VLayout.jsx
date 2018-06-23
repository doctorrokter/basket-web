import React from 'react';
import AbstractLayout from './AbstractLayout';
import PropTypes from 'prop-types';

class VLayout extends AbstractLayout {

  static direction = {
    topToBottom: 'column',
    bottomToTop: 'column-reverse'
  };

  static hAlign = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
    stretch: 'stretch'
  };

  static vAlign = {
    top: 'flex-start',
    center: 'center',
    bottom: 'flex-end',
    stretch: 'stretch',
    stretchWithSpace: 'space-between',
    stretchWithSpaceAround: 'space-around'
  };

  static wrap = {
    nowrap: 'nowrap',
    wrap: 'wrap',
    wrapReverse: 'wrap-reverse'
  };

  render() {
    let style = {
      display: 'flex',
      flexDirection: this.props.direction,
      alignItems: this.props.hAlign,
      justifyContent: this.props.vAlign,
      flexWrap: this.props.wrap
    };

    if (this.props.fillHeight) {
      style.height = '100%';
    }

    if (this.props.fillWidth) {
      style.width = '100%';
    }

    return (
      <div tabIndex={this.props.tabIndex} className={`${this.getClassName()}v-layout`} style={style} onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }

  _onClick = () => {
    if (this.props.onClick !== null) {
      this.props.onClick();
    }
  }
}

VLayout.propTypes = {
  className: PropTypes.string,
  direction: PropTypes.oneOf([
    VLayout.direction.topToBottom,
    VLayout.direction.bottomToTop
  ]),
  hAlign: PropTypes.oneOf([
    VLayout.hAlign.left,
    VLayout.hAlign.center,
    VLayout.hAlign.right,
    VLayout.hAlign.stretch
  ]),
  vAlign: PropTypes.oneOf([
    VLayout.vAlign.top,
    VLayout.vAlign.center,
    VLayout.vAlign.bottom,
    VLayout.vAlign.stretch,
    VLayout.vAlign.stretchWithSpace,
    VLayout.vAlign.stretchWithSpaceAround
  ]),
  wrap: PropTypes.oneOf([
    VLayout.wrap.nowrap,
    VLayout.wrap.wrap,
    VLayout.wrap.wrapReverse
  ]),
  onClick: PropTypes.func,
  fillHeight: PropTypes.bool,
  fillWidth: PropTypes.bool,
  tabIndex: PropTypes.number
};

VLayout.defaultProps = {
  className: '',
  direction: VLayout.direction.topToBottom,
  hAlign: VLayout.hAlign.center,
  vAlign: VLayout.vAlign.top,
  wrap: VLayout.wrap.nowrap,
  onClick: null,
  fillHeight: false,
  fillWidth: false
};

export default VLayout;