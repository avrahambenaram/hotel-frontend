
class ClientTable {
  constructor() {
    this.clientBody = document.getElementById('clients');
    this.clients = [];
  }

  setClientTable(clients) {
    this.clientBody.innerHTML = '';
    this.clients = clients;
    for (const client of clients) {
      this.addClient(client);
    }
  }

  addClient(client) {
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

async function getAllClients() {
  const resp = await fetch(`${apiHost}/client/`);
  if (!resp.ok) {
    const data = await resp.text();
    throw new Error(data);
  }

  return await resp.json();
}

window.onload = async () => {
  try {
    const errorText = document.getElementById('errorText');

    const clients = await getAllClients();
    const clientTable = new ClientTable();
    clientTable.setClientTable(clients);
  } catch(err) {
    errorText.innerText = err.message;
  }
}
