import Client from './client';

export default {
  version: "1.0.0",
  getClient: (source) => {
    const client = new Client(source);
    client.getAccount();
    return client;
  }
}
