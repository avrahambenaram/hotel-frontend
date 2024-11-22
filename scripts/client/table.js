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
      this.addClient(client);
    }
  }

  showClientById(id) {
    let found = false;
    this.clientBody.innerHTML = '';
    for (const client of this.clients) {
      if (client.id === id) {
        this.addClient(client);
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
        this.addClient(client);
        found = true;
      }
    }
    if (!found) {
      this.errorText.innerText = `Cliente não encontrado com CPF: ${cpf}`;
    }
  }

  addClient(client) {
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

    const tr = document.createElement('tr');
    tr.id = `tr-${client.id}`;
    tr.appendChild(tdId);
    tr.appendChild(tdName);
    tr.appendChild(tdCpf);
    tr.appendChild(tdEmail);
    tr.appendChild(tdPhone);

    return tr
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

