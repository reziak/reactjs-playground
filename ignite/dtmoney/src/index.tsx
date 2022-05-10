import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Entry 1',
          value: 2000,
          type: 'deposit',
          category: 'Sale',
          createdAt: new Date('2022-04-29 09:00:00'),
        },
        {
          id: 2,
          title: 'Entry 2',
          value: 1500,
          type: 'deposit',
          category: 'Sale',
          createdAt: new Date('2022-04-27 13:10:00'),
        },
        {
          id: 3,
          title: 'Entry 1',
          value: 1000,
          type: 'withdraw',
          category: 'House',
          createdAt: new Date('2022-04-26 11:00:00'),
        },
      ]
    })
  },
  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', data);
    });
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
