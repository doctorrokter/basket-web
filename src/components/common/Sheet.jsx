import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import SecondaryTitleBar from '../SecondaryTitleBar';
import Breadcrumbs from '../Breadcrumbs';
import PathModel from '../../models/PathModel';
import FolderContainer from './FolderContainer';
import DropboxService from '../../services/DropboxService';
import Spinner from './Spinner';
import controller from '../../util/RemoteController';

const transitionsClassNamesMap = new Map();
transitionsClassNamesMap.set('exited', 'hidden');
transitionsClassNamesMap.set('exiting', 'slideOutRight animated');
transitionsClassNamesMap.set('entering', 'slideInRight animated');
transitionsClassNamesMap.set('entered', '');

class Sheet extends PureComponent {

  timeout = 500;
  minTabIndex = 0;
  maxTabIndex = 0;

  constructor(props) {
    super(props);
    this.state = {
      opened: props.opened,
      path: props.path,
      loaded: false
    };
    this.minTabIndex = controller.nextTabIndex();
  }

  componentDidMount() {
    let t = setTimeout(() => {
      this.setState({opened: true}, () => {
        DropboxService.listFolder(this.state.path.path)
          .then((data) => {
            let path = new PathModel(this.state.path.path, this.state.path.name, data);
            this.maxTabIndex = this.minTabIndex + path.list.entries.length;
            controller.setCurrentTabIndex(this.minTabIndex);
            controller.focus();
            this.setState({path: path, loaded: true});
          });
      });
      clearTimeout(t);
    }, 0);
  }

  componentWillUnmount() {
    controller.setTabIndex(controller.getTabIndex() - (this.maxTabIndex - this.minTabIndex) - 1);
  }

  render() {
    return (
      <Transition in={this.state.opened} timeout={this.timeout} unmountOnExit>
        {
          state => this._renderBody(transitionsClassNamesMap.get(state))
        }
      </Transition>
    );
  }

  _renderBody(className) {
    let path = this.state.path;
    return (
      <div className={`sheet ${this.props.className} ${className}`}>
        <SecondaryTitleBar title={path ? path.name : ''} onBack={this._close} tabIndex={this.minTabIndex}/>
        {path && <Breadcrumbs path={path.path}/>}
        <FolderContainer className="main-container"
                         entries={path.list.entries}
                         onFocus={this.props.onFocus}
                         getTabIndex={this.props.getTabIndex}
                         onFolderChosen={this.props.onFolderChosen}/>
        {
          !this.state.loaded && <Spinner/>
        }
      </div>
    );
  };

  _close = () => {
    this.setState({opened: false}, () => {
      let t = setTimeout(() => {
        this.props.hide();
        clearTimeout(t);
      }, this.timeout / 2);
    });
  }
}

Sheet.propTypes = {
  opened: PropTypes.bool,
  hide: PropTypes.func.isRequired,
  className: PropTypes.string,
  path: PropTypes.instanceOf(PathModel),
  onFolderChosen: PropTypes.func,
  getTabIndex: PropTypes.func,
  onFocus: PropTypes.func.isRequired
};

Sheet.defaultProps = {
  opened: false,
  className: '',
  path: null
};

export default Sheet;