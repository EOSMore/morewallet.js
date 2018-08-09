# morewallet.js

![https://www.npmjs.com/package/morewallet.js](https://img.shields.io/npm/v/morewallet.js.svg) ![](https://img.shields.io/badge/language-javascript-red.svg)

> more wallet dapp js sdk

## 示例
### ES6
```javascript
import mw from 'morewallet.js';

const dappName = "dappdemo";
const client = mw.getClient(dappName);

//获取APP版本号
client.getAppVersion().then(version => {
  console.log(version);
}).catch(error => {
  console.error(error);
});

//当前账号信息
client.getAccount();

//是否在钱包APP中打开
client.checkInApp();

//检查是否可执行某个action
client.checkAction("eosio.token", "transfer");

//提交action
const buyramData = {
  payer: "demouser1111",
  receiver: "demouser1111",
  quantity: "10.0000 EOS"
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
    quant: "10.0000 EOS"
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
    stake_net_quantity: "10.0000 EOS",
    stake_cpu_quantity: "5.0000 EOS",
    transfer: false
  }
}];
client.pushActions(actions);

//转账
client.transfer("eosio.token", "demouser1111", "100.0000 EOS", "hi");

//获取余额
client.getCurrencyBalance("eosio.token", "EOS");

//数据表信息
client.getTableRows({
  code: "eosio",
  scope: "eosio",
  table: "global"
});

```

### UMD

- 页面引入script：

```html
<script src="https://cdn.more.top/morewallet/1.0.1/morewallet.js.min.js"></script>
```

- 使用

```html
<script>
  var dappName = "dappdemo";
  var client = MOREWALLET.getClient(dappName);
  client.getCurrencyBalance("eosio.token", "EOS");
</script>
```

## 接口

### client.getAccount()

> 获取当前账号信息

**返回值**

- account_name - String 账户名
- core_liquid_balance - String eos余额
- ram_quota - Integer 内存
- net_weight - Integer 带宽
- cpu_weight - Integer CPU
- permissions - Array 权限信息
- total_resources - Object 资源信息
- voter_info - Object 投票信息

### client.openInApp()

> 是否在钱包中打开

**返回值**

- res - Boolean

### client.getAppVersion()

> 获取APP版本号

**返回值**

- version - String

### client.checkAction(contract, action)

> 检查是否具备action权限

**参数**

- contract - 合约账号
- action - action名称

**返回值**

- res - Boolean

### client.getCurrencyBalance(contract, symbol)

> 获取指定代币余额

**参数**

- contract - 合约账号
- symbol - symbol名称

### client.pushAction(contract, action, authorization, data)

> 提交action

**参数**

- contract - 合约账号
- action - action名称
- authorization - 权限数组
- data - 执行参数

### client.pushActions(actions)

> 批量提交action

**参数**

- actions - action数组

### client.transfer(contract, to, quantity, memo)

> 转账

**参数**

- contract - 代币合约
- to - 接收者
- quantity - 转账金额
- memo - 转账memo

### client.getTableRows(params)

> 获取数据表信息

**参数**

- params - 查询信息，参考`/chain/get_table_rows`接口
