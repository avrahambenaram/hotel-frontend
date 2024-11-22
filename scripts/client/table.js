class ClientTable {
  constructor(clientApi) {
    this.errorText = document.getElementById('errorText');
    this.clientBody = document.getElementById('clients');
    this.clients = [];
    this.clientApi = clientApi;
  }

  async setup() {
    try {
      const clients = await this.clientApi.getAllClients();
      this.clients = clients;
      this.showClients();
    } catch(err) {
      this.errorText.innerText = err.message;
    }
  }

  showClients() {
    this.clientBody.innerHTML = '';
    for (const client of this.clients) {
      this.addClientItem(client);
    }
  }

  showClientById(id) {
    let found = false;
    this.clientBody.innerHTML = '';
    for (const client of this.clients) {
      if (client.id === id) {
        this.addClientItem(client);
        found = true;
      }
    }
    if (!found) {
      this.errorText.innerText = `Cliente não encontrado com ID: ${id}`;
    }
  }

  showClientByCpf(cpf) {
    let found = false;
    this.clientBody.innerHTML = '';
    for (const client of this.clients) {
      if (client.cpf === cpf) {
        this.addClientItem(client);
        found = true;
      }
    }
    if (!found) {
      this.errorText.innerText = `Cliente não encontrado com CPF: ${cpf}`;
    }
  }

  removeClient(clientId) {
    for (const i in this.clients) {
      if (this.clients[i].id === clientId) {
        this.clients.splice(i, 1);
        this.removeClientItem(clientId);
      }
    }
  }

  removeClientItem(clientId) {
    const item = document.getElementById(`tr-${clientId}`);
    this.clientBody.removeChild(item);
  }
  
  addClient(client) {
    this.clients.push(client);
    this.addClientItem(client);
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
    const tdUpdate = this.createBaseTd(null);
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
      this.removeClient(client.id);
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

