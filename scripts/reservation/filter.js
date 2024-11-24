class ReservationFilter {
  constructor() {
    this.listeners = {
      'filter-id': [],
      'filter-query': [],
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
    if (key != 'filter-id' && key != 'filter-number' && key != 'filter-query') {
      return;
    }
    this.listeners[key].push(callback);
  }

  removeAllListeners() {
    this.listeners = {
      'filter-id': [],
      'filter-query': [],
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
    const number = params.get('number');
    if (id) {
      for (const fn of this.listeners['filter-id']) {
        fn(parseInt(id));
      }
      return
    }

    const room = params.get('room');
    const client = params.get('client');

    if (room || client) {
      this.createQuery(room, client);
    }

  }

  createQuery(room, client) {
    const query = {};
    if (room) {
      query.room = parseInt(room);
    }
    if (client) {
      query.client = parseInt(client);
    }
    for (const fn of this.listeners['filter-query']) {
      fn(query);
    }
  }
}
