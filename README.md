# morewallet.js

> more wallet dapp js sdk

## 示例
```javascript
import mw from 'morewallet.js';

const dappName = "dappdemo";
const client = mw.getClient(dappname);

//获取APP版本号
client.getAppVersion().then(version => {
  console.log(version);
}).catch(error => {
  console.error(error);
});

//当前账号
client.getAccount();

//是否在钱包APP中打开
client.checkInApp();

//检查是否可执行某个action
client.checkAction("eosio.token", "transfer");

//提交action
const buyramData = {
  payer: "demouser1111",
  receiver: "demouser1111",
  quantity: "10 EOS"
};
const authorization = [{
  actor: "demouser1111",
  permission: "active"
}];
client.pushAction("eosio", "buyram", authorization, buyramData);

//批量提交action
const actions = [{
  account: "eosio",
  name: "buyram",
  authorization: [{
    actor: "demouser1111",
    permission: "active"
  }],
  data: {
    payer: "demouser1111",
    receiver: "demouser1111",
    quantity: "10 EOS"
  }
}, {
  account: "eosio",
  name: "delegatebw",
  authorization: [{
    actor: "demouser1111",
    permission: "active"
  }],
  data: {
    from: "demouser1111",
    receiver: "demouser1111",
    stake_net_quantity: "10 EOS",
    stake_cpu_quantity: "5 EOS",
    transfer: false
  }
}];
client.pushActions(actions);

//转账
client.transfer("eosio.token", "demouser1111", "100 EOS", "hi");
```

## 接口

### client.getAccount()

> 获取当前账号

**返回值**

account - String

### client.openInApp()

> 是否在钱包中打开

**返回值**

res - Boolean

### client.getAppVersion()

> 获取APP版本号

**返回值**

version - String

### client.checkAction(contract, action)

> 检查是否具备action权限

**参数**

contract - 合约账号
action - action名称

**返回值**

res - Boolean

### client.pushAction(contract, action, authorization, data)

> 提交action

**参数**

contract - 合约账号
action - action名称
authorization - 权限数组
data - 执行参数

### client.pushActions(actions)

> 批量提交action

**参数**

actions - action数组

### client.transfer(contract, to, quantity, memo)

> 转账

**参数**

contract - 代币合约
to - 接收者
quantity - 转账金额
memo - 转账memo
