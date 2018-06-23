import React, {PureComponent} from 'react';
import ReactTV from 'react-tv';
import 'whatwg-fetch';
import 'es6-promise';

import DropboxService from './services/DropboxService';
import RootTitleBar from './components/RootTitleBar';
import Breadcrumbs from './components/Breadcrumbs';
import FolderContainer from './components/common/FolderContainer';
import Spinner from './components/common/Spinner';
import Sheet from './components/common/Sheet';
import PathModel from './models/PathModel';

class App extends PureComponent {

  tabIndex = 0;

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
    Promise.all([
      DropboxService.getUser(),
      DropboxService.getSpaceUsage(),
      DropboxService.listFolder(this.state.paths[0].path)
    ])
      .then((values) => this.setState({
        user: values[0],
        spaceUsage: values[1],
        paths: [
          new PathModel('', '', values[2])
        ],
        loaded: true
      }));

    window.addEventListener('keydown', (e) => {
      let keyCode = e.keyCode;
      if (keyCode === 461) {
        let backBtns = document.querySelectorAll('.back-btn');
        if (backBtns.length > 0) {
          let lastBtn = backBtns[backBtns.length - 1];
          lastBtn.click();
        }
      }
    });
  }

  render() {
    if (this.state.loaded) {
      let currPath = this.state.paths[0];
      return (
        <div>
          <RootTitleBar email={this.state.user.email}
                        username={this.state.user.displayName}
                        spaceUsed={this.state.spaceUsage.used}
                        spaceAllocated={this.state.spaceUsage.allocated}/>
          <Breadcrumbs path={currPath.path}/>
          <FolderContainer getTabIndex={this._getTabIndex} className="main-container" entries={currPath.list.entries} onFolderChosen={this._onFolderChosen}/>
          {this._renderSheets()}
        </div>
      );
    }

    return <Spinner text="Loading..."/>;
  }

  _getTabIndex = () => {
    this.tabIndex++;
    return this.tabIndex;
  };

  _closeSheet = () => {
    let paths = this.state.paths.slice();
    paths.pop();
    this.setState({paths: paths});
  };

  _onFolderChosen = (path, name) => {
    let paths = this.state.paths.slice();
    paths.push(new PathModel(path, name));
    this.setState({paths: paths});
  };

  _renderSheets = () => {
    if (this.state.paths.length > 1) {
      document.querySelector('body').classList.add('scroll-off');
      let sheets = [];
      this.state.paths.forEach((path, index) => {
        if (index !== 0) {
          let className = index === this.state.paths.length - 1 ? '' : 'scroll-off';
          sheets.push(<Sheet className={className}
                             key={`sheet_${index}`}
                             hide={this._closeSheet}
                             path={path}
                             getTabIndex={this._getTabIndex}
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
