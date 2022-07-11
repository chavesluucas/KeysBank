import React from 'react';
import ReactDOM from 'react-dom/client';
//o createServer do mriagejs é a nosa "fake api"
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
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Desenvolvimento',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00')
        },
        {
          id: 2,
          title: 'Peças para o computador',
          type: 'withdraw',
          category: 'Ferramenta de trabalho',
          amount: 6000,
          createdAt: new Date('2021-02-13 11:00:00')
        }
      ],
    })
  },

  routes() {
    this.namespace = 'api'; //todas as chamads a API vão estar a partir dessa info

    //quando houver uma requisição to tipo GET, eu vou retornar algo
    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })
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

