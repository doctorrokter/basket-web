import React, {PureComponent} from 'react';
import ReactTV from 'react-tv';
import 'whatwg-fetch';
import 'es6-promise';

import DropboxService from './services/DropboxService';
import RootTitleBar from './components/RootTitleBar';
import SecondaryTitleBar from './components/SecondaryTitleBar';
import Breadcrumbs from './components/Breadcrumbs';
import FolderContainer from './components/common/FolderContainer';
import Spinner from './components/common/Spinner';
import Sheet from './components/common/Sheet';
import PathModel from './models/PathModel';
import controller from './util/RemoteController';

class App extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      spaceUsage: {
        used: 0,
        allocated: 0
      },
      user: {
        email: '',
        displayName: ''
      },
      loaded: false,
      paths: [new PathModel()]
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      let keyCode = e.keyCode;
      console.log(keyCode);
      controller.handleKeyPress(keyCode);
    });

    DropboxService.loadInitialData()
      .then((data) => {
        this.setState({...data}, () => {
          controller.initFirst();
        });
      })
  }

  render() {
    if (this.state.loaded) {
      let currPath = this.state.paths[0];

      if (this.state.paths.length > 1) {
        currPath = this.state.paths[this.state.paths.length - 1];
      }

      return (
        <React.Fragment>
          {this._renderTitleBar()}
          <Breadcrumbs path={currPath.path}/>
          <FolderContainer onFocus={controller.setCurrentTabIndex}
                           className="main-container"
                           entries={currPath.list.entries}
                           onFolderChosen={this._onFolderChosen}/>
        </React.Fragment>
      );
    }

    return <Spinner text="Loading..."/>;
  }

  _renderTitleBar = () => {
    if (this.state.paths.length > 1) {
      let currPath = this.state.paths[this.state.paths.length - 1];
      return <SecondaryTitleBar title={currPath.name} onBack={this._closeSheet} tabIndex={1}/>;
    }

    return <RootTitleBar email={this.state.user.email}
                         username={this.state.user.displayName}
                         spaceUsed={this.state.spaceUsage.used}
                         spaceAllocated={this.state.spaceUsage.allocated}/>;
  };

  _closeSheet = () => {
    let paths = this.state.paths.slice();
    if (paths.length > 1) {
      paths.pop();
      this.setState({paths: paths});
      controller.initFirst();
    }
  };

  _onFolderChosen = (path, name) => {
    this.setState({loaded: false}, () => {
      let paths = this.state.paths.slice();
      let pathModel = new PathModel(path, name);
      paths.push(pathModel);

      this.setState({paths: paths, loaded: true}, () => {
        DropboxService.listFolder(pathModel.path)
          .then((data) => {
            pathModel.list = data;
            let newPaths = this.state.paths.slice();
            this.setState({paths: newPaths});
            controller.initFirst();
          })
      });
    });
  };

  _renderSheets = () => {
    if (this.state.paths.length > 1) {
      document.querySelector('body').classList.add('scroll-off');
      let sheets = [];
      this.state.paths.forEach((path, index) => {
        if (index !== 0) {
          let className = index === this.state.paths.length - 1 ? '' : 'scroll-off';
          sheets.push(<Sheet className={className}
                             onFocus={controller.setCurrentTabIndex}
                             key={`sheet_${index}`}
                             hide={this._closeSheet}
                             path={path}
                             getTabIndex={controller.nextTabIndex}
                             onFolderChosen={this._onFolderChosen}/>);
        }
      });

      return sheets;
    }
    document.querySelector('body').classList.remove('scroll-off');

    return null;
  }
}

ReactTV.render(<App/>, document.querySelector('#root'));
