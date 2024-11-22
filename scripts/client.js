window.onload = async () => {
  try {
    const errorText = document.getElementById('errorText');
    const errorFilter = document.getElementById('errorFilter');

    const clients = await getAllClients();
    const clientTable = new ClientTable(errorText);
    clientTable.setClientTable(clients);

    const filter = new ClientFilter(errorFilter);
    filter.addListener('filter-all', () => clientTable.showClients());
    filter.addListener('filter-id', (id) => clientTable.showClientById(id));
    filter.addListener('filter-cpf', (cpf) => clientTable.showClientByCpf(cpf));
  } catch(err) {
    errorText.innerText = err.message;
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
