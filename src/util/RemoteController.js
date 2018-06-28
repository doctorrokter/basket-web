'use strict';

let _currentTabIndex = 0;
let _tabIndex = 0;

class RemoteController {

  static NAV_KEY_CODES = {
    RIGHT: 39,
    LEFT: 37,
    UP: 38,
    DOWN: 40
  };

  static ACTION_KEY_CODES = {
    BACK: 461,
    OK: 13
  };

  nextTabIndex() {
    _tabIndex++;
    return _tabIndex;
  }

  getTabIndex() {
    return _tabIndex;
  }

  setTabIndex(tabIndex) {
    _tabIndex = tabIndex;
  }

  getCurrentTabIndex() {
    return _currentTabIndex;
  }

  setCurrentTabIndex(tabIndex) {
    _currentTabIndex = tabIndex;
  }

  isNavButton(keyCode) {
    return Object.keys(RemoteController.NAV_KEY_CODES).some((key) => RemoteController.NAV_KEY_CODES[key] === keyCode);
  }

  getFocused() {
    return document.querySelector(`[tabindex="${_currentTabIndex}"]`);
  }

  focus() {
    let el = this.getFocused();
    if (el) {
      el.focus();
    }
  }

  clickOnFocused() {
    let el = this.getFocused();
    if (el) {
      el.click();
    }
  }

  handleKeyPress(keyCode) {
    if (keyCode === RemoteController.ACTION_KEY_CODES.BACK) {
      let backBtns = document.querySelectorAll('.back-btn');
      if (backBtns.length > 0) {
        let lastBtn = backBtns[backBtns.length - 1];
        lastBtn.click();
      }
    } else if (this.isNavButton(keyCode)) {
      if (keyCode === RemoteController.NAV_KEY_CODES.RIGHT) {
        _currentTabIndex++;
      } else if (keyCode === RemoteController.NAV_KEY_CODES.LEFT) {
        _currentTabIndex--;
      } else if (keyCode === RemoteController.NAV_KEY_CODES.DOWN) {
        _currentTabIndex += 5;
      } else if (keyCode === RemoteController.NAV_KEY_CODES.UP) {
        _currentTabIndex -= 5;
      }
      this.focus();
    } else if (keyCode === RemoteController.ACTION_KEY_CODES.OK) {
      this.clickOnFocused();
    }
  }

  initFirst() {
    this.setCurrentTabIndex(2);
    this.focus();
  }
}

export default new RemoteController();