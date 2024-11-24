window.onload = () => {
  const clientApi = new ClientApi();
  const clientTable = new ClientTable(clientApi);
  clientTable.showClients();

  const filter = new ClientFilter();
  filter.addListener('filter-id', (id) => clientTable.showClientById(id));
  filter.addListener('filter-cpf', (cpf) => clientTable.showClientByCpf(cpf));

  const addForm = new AddForm(clientApi);
  addForm.addListener(client => {
    clientTable.addClientItem(client);
  })

  const updateForm = new UpdateForm(clientApi);
  updateForm.addListener(client => {
    clientTable.showClients();
  })

  clientTable.addListener('update', client => {
    updateForm.setup(client);
  })
}
