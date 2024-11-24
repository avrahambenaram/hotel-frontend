class ClientTable {
  constructor(clientApi) {
    this.errorText = document.getElementById('errorText');
    this.clientBody = document.getElementById('clients');
    this.clientApi = clientApi;
    this.listeners = {
      'update': [],
    };
  }

  addListener(key, cb) {
    if (key != 'update') {
      return
    }
    this.listeners[key].push(cb);
  }

  removeAllListeners() {
    this.listeners = {
      'update': [],
    };
  }

  async showClients() {
    try {
      this.clientBody.innerHTML = '';
      const clients = await this.clientApi.getAllClients();
      for (const client of clients) {
        this.addClientItem(client);
      }
    } catch(err) {
      this.errorText.innerText = err.message;
    }
  }

  async showClientById(id) {
    try {
      this.clientBody.innerHTML = '';
      const client = await this.clientApi.getClientById(id);
      this.addClientItem(client);
    } catch(err) {
      this.errorText.innerText = err.message;
    }
  }

  async showClientByCpf(cpf) {
    try {
      this.clientBody.innerHTML = '';
      const client = await this.clientApi.getClientByCpf(cpf);
      this.addClientItem(client);
    } catch(err) {
      this.errorText.innerText = err.message;
    }
  }

  removeClientItem(clientId) {
    const item = document.getElementById(`tr-${clientId}`);
    if (item) {
      this.clientBody.removeChild(item);
    }
  }
  
  addClientItem(client) {
    this.errorText.innerText = '';
    const clientItem = this.createClientItem(client);
    this.clientBody.appendChild(clientItem);
  }

  createClientItem(client) {
    const tdId = this.createBaseTd(client.id.toString());
    const tdName = this.createBaseTd(client.name);
    const tdCpf = this.createBaseTd(client.cpf);
    const tdEmail = this.createBaseTd(client.email);
    const tdPhone = this.createBaseTd(client.phone);
    const tdUpdate = this.createUpdateTd(client);
    const tdDelete = this.createDeleteTd(client);

    const tr = document.createElement('tr');
    tr.id = `tr-${client.id}`;
    tr.appendChild(tdId);
    tr.appendChild(tdName);
    tr.appendChild(tdCpf);
    tr.appendChild(tdEmail);
    tr.appendChild(tdPhone);
    tr.appendChild(tdUpdate);
    tr.appendChild(tdDelete);

    return tr
  }

  createUpdateTd(client) {
    const btn = document.createElement('button');
    btn.innerHTML = feather.icons['edit-2'].toSvg({ class: 'text-slate-700' });
    btn.addEventListener('click', () => {
      for (const fn of this.listeners['update']) {
        fn(client);
      }
    })

    const td = this.createBaseTd(null);
    td.appendChild(btn);
    return td;
  }

  createDeleteTd(client) {
    const btn = document.createElement('button');
    btn.innerHTML = feather.icons['trash-2'].toSvg({ class: 'text-red-500' });
    btn.addEventListener('click', () => this.askForDeleteClient(client));

    const td = this.createBaseTd(null);
    td.appendChild(btn);
    return td;
  }

  askForDeleteClient(client) {
    const confirmDelete = confirm(`Tem certeza que quer deletar o cliente ${client.name}?`);
    if (confirmDelete) {
      this.deleteClient(client);
    }
  }

  async deleteClient(client) {
    try {
      await this.clientApi.deleteClient(client.id);
      this.removeClientItem(client.id);
    } catch(err) {
      this.errorText.innerText = err.message;
    }
  }

  createBaseTd(text) {
    const td = document.createElement('td');
    td.classList.add('border');
    td.classList.add('border-black');
    td.classList.add('p-2');
    td.innerText = text;
    return td
  }
}

