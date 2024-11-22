window.onload = () => {
  const clientApi = new ClientApi();
  const clientTable = new ClientTable(clientApi);
  clientTable.setup();

  const filter = new ClientFilter();
  filter.addListener('filter-all', () => clientTable.showClients());
  filter.addListener('filter-id', (id) => clientTable.showClientById(id));
  filter.addListener('filter-cpf', (cpf) => clientTable.showClientByCpf(cpf));

  const addForm = new AddForm(clientApi);
  addForm.addListener(client => {
    clientTable.addClient(client);
  })
}
