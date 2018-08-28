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

  getAccount(account = '') {
    return new Promise((resolve, reject) => {
      const callbackName = this.genCallbackName("get_account");
      const errorName = this.genErrorName("get_account");
      window[callbackName] = (account) => {
        try {
          account = JSON.parse(account);
          this.account = account.account_name;
          resolve(account);
        } catch (e) {
          reject(e);
        }
      };
      window[errorName] = (error) => {
        reject(error);
      };
      if (window.MoreJSBridge) {
        window.MoreJSBridge.getAccount(account);
      } else if (window.webkit) {
        window.webkit.messageHandlers.getAccount.postMessage(JSON.stringify({ account }));
      } else {
        reject("请在MORE WALLET中打开此DAPP");
      }
    });
  }

  signText(text = '') {
    return new Promise((resolve, reject) => {
      const callbackName = this.genCallbackName("sign_text");
      const errorName = this.genErrorName("sign_text");
      window[callbackName] = signedText => {
        resolve(signedText);
      };
      window[errorName] = (error) => {
        reject(error);
      };
      if (window.MoreJSBridge) {
        window.MoreJSBridge.signText(text);
      } else if (window.webkit) {
        window.webkit.messageHandlers.signText.postMessage(JSON.stringify({ text }));
      } else {
        reject("请在MORE WALLET中打开此DAPP");
      }
    });
  }

  getCurrencyBalance(contract, symbol) {
    return new Promise((resolve, reject) => {
      const callbackName = this.genCallbackName("get_currency_balance");
      const errorName = this.genErrorName("get_currency_balance");
      window[callbackName] = (balance) => {
        resolve(balance);
      };
      window[errorName] = (error) => {
        reject(error);
      };
      const params = {
        contract,
        symbol
      };
      if (window.MoreJSBridge) {
        window.MoreJSBridge.getCurrencyBalance(JSON.stringify(params));
      } else if (window.webkit) {
        window.webkit.messageHandlers.getCurrencyBalance.postMessage(JSON.stringify(params));
      } else {
        reject("请在MORE WALLET中打开此DAPP");
      }
    });
  }

  getTableRows(params) {
    return new Promise((resolve, reject) => {
      const callbackName = this.genCallbackName("get_table_rows");
      const errorName = this.genErrorName("get_table_rows");
      window[callbackName] = (data) => {
        try {
          data = JSON.parse(data);
          resolve(data);
        } catch (e) {
          reject(e);
        }
      };
      window[errorName] = (error) => {
        reject(error);
      };
      if (window.MoreJSBridge) {
        window.MoreJSBridge.getTableRows(JSON.stringify(params));
      } else if (window.webkit) {
        window.webkit.messageHandlers.getTableRows.postMessage(JSON.stringify(params));
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
        window.MoreJSBridge.openInApp();
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
        return
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

  pushAction(contract, action, authorization, data) {
    return new Promise((resolve, reject) => {
      if (!this.account) {
        reject("请选择执行账号");
        return
      }

      const actions = [{
        account: contract,
        name: action,
        authorization,
        data
      }];

      this.pushActions(actions).then(resolve).catch(reject);
    });
  }

  transfer(contract, to, quantity, memo) {
    return new Promise((resolve, reject) => {
      if (!this.account) {
        reject("请选择执行账号");
        return
      }

      const data = {
        from: this.account,
        to,
        quantity,
        memo
      };

      const authorization = [{
        actor: this.account,
        permission: "active"
      }];

      this.pushAction(contract, "transfer", authorization, data).then(res => resolve(res)).catch(error => reject(error));
    });
  }

}

export default Client;
