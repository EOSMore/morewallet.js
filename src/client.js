class Client {

  constructor(source) {
    this.source = source;
  }

  genCallbackName(method) {
    return `mw_${method}_success`;
  }

  genErrorName(method) {
    return `mw_${method}_fail`;
  }

  getAccount() {
    return new Promise((resolve, reject) => {
      const callbackName = this.genCallbackName("get_account");
      const errorName = this.genErrorName("get_account");
      window[callbackName] = (account) => {
        this.account = account;
        resolve(account);
      };
      window[errorName] = (error) => {
        reject(error);
      };
      if (window.MoreJSBridge) {
        window.MoreJSBridge.getAccount();
      } else if (window.webkit) {
        window.webkit.messageHandlers.getAccount.postMessage(JSON.stringify({}));
      } else {
        reject("请在MORE WALLET中打开此DAPP");
      }
    });
  }

  openInApp() {
    return new Promise((resolve, reject) => {
      const callbackName = this.genCallbackName("open_in_app");
      window[callbackName] = () => {
        resolve(true);
      };
      if (window.MoreJSBridge) {
        window.MoreJSBridge.getAppVersion();
      } else if (window.webkit) {
        window.webkit.messageHandlers.openInApp.postMessage(JSON.stringify({}));
      } else {
        resolve(false);
      }
    });
  }

  getAppVersion() {
    return new Promise((resolve, reject) => {
      const callbackName = this.genCallbackName("get_app_version");
      const errorName = this.genErrorName("get_app_version");
      window[callbackName] = (version) => {
        resolve(version);
      };
      window[errorName] = (error) => {
        reject(error);
      };
      if (window.MoreJSBridge) {
        window.MoreJSBridge.getAppVersion();
      } else if (window.webkit) {
        window.webkit.messageHandlers.getAppVersion.postMessage(JSON.stringify({}));
      } else {
        reject("请在MORE WALLET中打开此DAPP");
      }
    });
  }

  checkAction(contract, action) {
    return new Promise((resolve, reject) => {
      const callbackName = this.genCallbackName("check_action");
      const errorName = this.genErrorName("check_action");
      window[callbackName] = (res) => {
        resolve(res);
      };
      window[errorName] = (error) => {
        reject(error);
      };

      const params = {
        source: this.source,
        contract,
        action
      };

      if (window.MoreJSBridge) {
        window.MoreJSBridge.checkAction(JSON.stringify(params));
      } else if (window.webkit) {
        window.webkit.messageHandlers.checkAction.postMessage(JSON.stringify(params));
      } else {
        reject("请在MORE WALLET中打开此DAPP");
      }
    });
  }

  pushActions(actions) {
    return new Promise((resolve, reject) => {
      const callbackName = this.genCallbackName("push_actions");
      const errorName = this.genErrorName("push_actions");
      window[callbackName] = (res) => {
        resolve(res);
      };
      window[errorName] = (error) => {
        reject(error);
      };

      if (!this.account) {
        reject("请选择执行账号");
      }

      const params = {
        source: this.source,
        account: this.account,
        actions
      };

      if (window.MoreJSBridge) {
        window.MoreJSBridge.pushActions(JSON.stringify(params));
      } else if (window.webkit) {
        window.webkit.messageHandlers.pushActions.postMessage(JSON.stringify(params));
      } else {
        reject("请在MORE WALLET中打开此DAPP");
      }
    });
  }

  pushAction(contract, action, data) {
    return new Promise((resolve, reject) => {
      const callbackName = this.genCallbackName("push_action");
      const errorName = this.genErrorName("push_action");
      window[callbackName] = (res) => {
        resolve(res);
      };
      window[errorName] = (error) => {
        reject(error);
      };

      if (!this.account) {
        reject("请选择执行账号");
      }

      const params = {
        source: this.source,
        account: this.account,
        contract,
        action,
        data
      };

      if (window.MoreJSBridge) {
        window.MoreJSBridge.pushAction(JSON.stringify(params));
      } else if (window.webkit) {
        window.webkit.messageHandlers.pushAction.postMessage(JSON.stringify(params));
      } else {
        reject("请在MORE WALLET中打开此DAPP");
      }
    });
  }

  transfer(contract, to, quantity, memo) {
    return new Promise((resolve, reject) => {
      if (!this.account) {
        reject("请选择执行账号");
      }

      const data = {
        from: this.account,
        to,
        quantity,
        memo
      };

      this.pushAction(contract, "transfer", data).then(res => resolve(res)).catch(error => reject(error));
    });
  }

}

export default Client;
