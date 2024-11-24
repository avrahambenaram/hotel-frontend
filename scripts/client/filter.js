class ClientFilter {
  constructor() {
    this.listeners = {
      'filter-id': [],
      'filter-cpf': [],
    };
    this.setupModalTogglers();
    this.setupShowAll();
    setTimeout(() => {
      this.searchForQuery();
    }, 200)
  }

  setupModalTogglers() {
    this.filter = document.getElementById('filter');
    this.openFilter = document.getElementById('open-filter');
    this.openFilter.addEventListener('click', () => this.toggleFilter());
    this.closeFilter = document.getElementById('close-filter');
    this.closeFilter.addEventListener('click', () => this.toggleFilter());
  }

  toggleFilter() {
    if (filter.open) {
      filter.close();
    } else {
      filter.showModal();
    }
  }

  addListener(key, callback) {
    if (key != 'filter-id' && key != 'filter-cpf') {
      return;
    }
    this.listeners[key].push(callback);
  }

  removeAllListeners() {
    this.listeners = {
      'filter-id': [],
      'filter-cpf': [],
    };
  }

  setupShowAll() {
    this.btnFilterAll = document.getElementById('btn-filter-all');
    this.btnFilterAll.addEventListener('click', () => window.location.search = '');
  }

  searchForQuery() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get('id');
    const cpf = params.get('cpf');
    if (id) {
      for (const fn of this.listeners['filter-id']) {
        fn(parseInt(id));
      }
      return
    }
    if (cpf) {
      for (const fn of this.listeners['filter-cpf']) {
        fn(cpf);
      }
      return
    }
  }
}
