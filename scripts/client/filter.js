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
    this.filterId.addEventListener('keyup', (evt) => this.filterByEnter(evt));
    this.filterCpf = document.getElementById('filterCpf');
    this.filterCpf.addEventListener('keyup', (evt) => this.filterByEnter(evt));

    this.btnFilter = document.getElementById('btn-filter');
    this.btnFilter.addEventListener('click', () => this.filterClients());
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

  filterByEnter(evt) {
    if (evt.key === 'Enter') {
      evt.target.blur();
      this.filterClients();
    }
  }

  filterClients() {
    const filterId = this.filterId.value;
    const filterCpf = this.filterCpf.value;

    if (filterId && filterCpf) {
      this.errorText.innerText = 'Erro: Digite apenas o ID ou apenas o CPF';
      return;
    }
    if (!filterId && !filterCpf) {
      for (const fn of this.listeners['filter-all']) {
        fn();
      }
    }
    if (filterId) {
      for (const fn of this.listeners['filter-id']) {
        fn(parseInt(filterId));
      }
    }
    if (filterCpf) {
      for (const fn of this.listeners['filter-cpf']) {
        fn(filterCpf);
      }
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
