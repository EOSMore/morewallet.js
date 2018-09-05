import Client from './client';

export default {
  version: "1.0.0",
  getClient: (source) => {
    const client = new Client(source);
    client.getAccount()
      .then(({ account_name }) => {
        client.account = account_name
      })
      .catch(() => {
      });
    return client;
  }
}
