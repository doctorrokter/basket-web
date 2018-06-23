import React from 'react';
import PropTypes from 'prop-types';
import AbstractLayout from './AbstractLayout';

class HLayout extends AbstractLayout {

  static direction = {
    leftToRight: 'row',
    rightToLeft: 'row-reverse'
  };

  static hAlign = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
    stretchWithSpace: 'space-between',
    stretchWithSpaceAround: 'space-around'
  };

  static vAlign = {
    top: 'flex-start',
    center: 'center',
    bottom: 'flex-end',
    stretch: 'stretch'
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
      justifyContent: this.props.hAlign,
      alignItems: this.props.vAlign,
      flexWrap: this.props.wrap
    };

    if (this.props.fillHeight) {
      style.height = '100%';
    }

    if (this.props.fillWidth) {
      style.width = '100%';
    }

    return (
      <div className={`${this.getClassName()}h-layout`} style={style} onClick={this._onClick}>
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

HLayout.propTypes = {
  className: PropTypes.string,
  direction: PropTypes.oneOf([
    HLayout.direction.leftToRight,
    HLayout.direction.rightToLeft
  ]),
  hAlign: PropTypes.oneOf([
    HLayout.hAlign.left,
    HLayout.hAlign.right,
    HLayout.hAlign.center,
    HLayout.hAlign.stretchWithSpace,
    HLayout.hAlign.stretchWithSpaceAround
  ]),
  vAlign: PropTypes.oneOf([
    HLayout.vAlign.top,
    HLayout.vAlign.center,
    HLayout.vAlign.bottom,
    HLayout.vAlign.stretch,
    HLayout.vAlign.bottom
  ]),
  wrap: PropTypes.oneOf([
    HLayout.wrap.nowrap,
    HLayout.wrap.wrap,
    HLayout.wrap.wrapReverse
  ]),
  onClick: PropTypes.func,
  fillHeight: PropTypes.bool,
  fillWidth: PropTypes.bool
};

HLayout.defaultProps = {
  className: '',
  direction: HLayout.direction.leftToRight,
  hAlign: HLayout.hAlign.left,
  vAlign: HLayout.vAlign.top,
  wrap: HLayout.wrap.nowrap,
  onClick: null,
  fillHeight: false,
  fillWidth: false
};

export default HLayout;