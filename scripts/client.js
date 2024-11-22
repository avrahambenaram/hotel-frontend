window.onload = () => {
  const errorText = document.getElementById('errorText');
  const errorFilter = document.getElementById('errorFilter');

  const clientApi = new ClientApi();
  const clientTable = new ClientTable(errorText, clientApi);
  clientTable.setup();

  const filter = new ClientFilter(errorFilter);
  filter.addListener('filter-all', () => clientTable.showClients());
  filter.addListener('filter-id', (id) => clientTable.showClientById(id));
  filter.addListener('filter-cpf', (cpf) => clientTable.showClientByCpf(cpf));
}
