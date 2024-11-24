class RoomFilter {
  constructor() {
    this.listeners = {
      'filter-id': [],
      'filter-number': [],
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
      'filter-number': [],
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
    if (number) {
      for (const fn of this.listeners['filter-number']) {
        fn(parseInt(number));
      }
      return
    }

    const capacity = params.get('capacity');
    const priceDiary = params.get('priceDiary');
    const type = params.get('type');

    if (capacity || priceDiary || type) {
      this.createQuery(capacity, priceDiary, type);
    }

  }

  createQuery(capacity, priceDiary, type) {
    const query = {};
    if (capacity) {
      query.capacity = parseInt(capacity);
    }
    if (type && type != '0') {
      query.type = parseInt(type);
    }
    if (priceDiary) {
      query.priceDiary = parseFloat(priceDiary);
    }
    for (const fn of this.listeners['filter-query']) {
      fn(query);
    }
  }
}
