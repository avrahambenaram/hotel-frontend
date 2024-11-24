class ClientFilter {
  constructor() {
    this.setupModalTogglers();
    this.setupFilterTriggers();
    this.errorText = document.getElementById('errorFilter');
    this.listeners = {
      'filter-all': [],
      'filter-id': [],
      'filter-cpf': [],
    };
  }

  setupModalTogglers() {
    this.filter = document.getElementById('filter');
    this.openFilter = document.getElementById('open-filter');
    this.openFilter.addEventListener('click', () => this.toggleFilter());
    this.closeFilter = document.getElementById('close-filter');
    this.closeFilter.addEventListener('click', () => this.toggleFilter());
  }

  setupFilterTriggers() {
    this.filterId = document.getElementById('filterId');
    this.filterId.addEventListener('keyup', (evt) => this.filterByEnter(evt, 'id'));
    this.filterCpf = document.getElementById('filterCpf');
    this.filterCpf.addEventListener('keyup', (evt) => this.filterByEnter(evt, 'cpf'));

    this.btnFilterId = document.getElementById('btn-filter-id');
    this.btnFilterId.addEventListener('click', () => this.filterClientsById());
    this.btnFilterCpf = document.getElementById('btn-filter-cpf');
    this.btnFilterCpf.addEventListener('click', () => this.filterClientsByCpf());
    this.btnFilterAll = document.getElementById('btn-filter-all');
    this.btnFilterAll.addEventListener('click', () => this.filterAllClients());
  }

  addListener(key, callback) {
    if (key != 'filter-all' && key != 'filter-id' && key != 'filter-cpf') {
      return;
    }
    this.listeners[key].push(callback);
  }

  removeAllListeners() {
    this.listeners = {
      'filter-all': [],
      'filter-id': [],
      'filter-cpf': [],
    };
  }

  filterByEnter(evt, mode) {
    if (evt.key === 'Enter') {
      evt.target.blur();
      if (mode === 'id') {
        this.filterClientsById();
      }
      if (mode === 'cpf') {
        this.filterClientsByCpf();
      }
    }
  }

  filterAllClients() {
    for (const fn of this.listeners['filter-all']) {
      fn();
    }
    this.toggleFilter();
    this.cleanFields();
  }

  filterClientsById() {
    const filterId = this.filterId.value;
    for (const fn of this.listeners['filter-id']) {
      fn(parseInt(filterId));
    }
    this.toggleFilter();
    this.cleanFields();
  }

  filterClientsByCpf() {
    const filterCpf = this.filterCpf.value;
    for (const fn of this.listeners['filter-cpf']) {
      fn(parseInt(filterCpf));
    }
    this.toggleFilter();
    this.cleanFields();
  }

  cleanFields() {
    this.filterId.value = '';
    this.filterCpf.value = '';
  }

  toggleFilter() {
    if (filter.open) {
      filter.close();
    } else {
      filter.showModal();
    }
  }
}
