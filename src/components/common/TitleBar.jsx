import React, {PureComponent} from 'react';
import HLayout from '../../layouts/HLayout';

class TitleBar extends PureComponent {
  render() {
    return (
      <HLayout className={`title-bar ${this.props.className}`} hAlign={HLayout.hAlign.stretchWithSpace} vAlign={HLayout.vAlign.center} fillWidth>
        {this.props.children}
      </HLayout>
    );
  }
}

export default TitleBar;