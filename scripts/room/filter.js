class RoomFilter {
  constructor() {
    this.setupModalTogglers();
    this.setupFilterTriggers();
    this.errorText = document.getElementById('errorFilter');
    this.listeners = {
      'filter-all': [],
      'filter-id': [],
      'filter-number': [],
      'filter-type': [],
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
    this.filterNumber = document.getElementById('filterNumber');
    this.filterNumber.addEventListener('keyup', (evt) => this.filterByEnter(evt));
    this.filterType = document.getElementById('filterType');
    this.filterType.addEventListener('keyup', (evt) => this.filterByEnter(evt));

    this.btnFilter = document.getElementById('btn-filter');
    this.btnFilter.addEventListener('click', () => this.filterRooms());
  }

  addListener(key, callback) {
    if (key != 'filter-all' && key != 'filter-id' && key != 'filter-number' && key != 'filter-type') {
      return;
    }
    this.listeners[key].push(callback);
  }

  removeAllListeners() {
    this.listeners = {
      'filter-all': [],
      'filter-id': [],
      'filter-number': [],
      'filter-type': [],
    };
  }

  filterByEnter(evt) {
    if (evt.key === 'Enter') {
      evt.target.blur();
      this.filterRooms();
    }
  }

  filterRooms() {
    const filterId = this.filterId.value;
    const filterNumber = this.filterNumber.value;
    const filterType = this.filterType.value;

    if (filterId && filterNumber && filterType != '0') {
      this.errorText.innerText = 'Erro: Digite apenas o ID, Número ou o tipo';
      return;
    }
    if (!filterId && !filterNumber && filterType == '0') {
      for (const fn of this.listeners['filter-all']) {
        fn();
      }
    }
    if (filterId) {
      for (const fn of this.listeners['filter-id']) {
        fn(parseInt(filterId));
      }
    }
    if (filterNumber) {
      for (const fn of this.listeners['filter-number']) {
        fn(parseInt(filterNumber));
      }
    }
    if (filterType != '0') {
      for (const fn of this.listeners['filter-type']) {
        fn(parseInt(filterType));
      }
    }

    this.toggleFilter();
    this.cleanFields();
  }

  cleanFields() {
    this.filterId.value = '';
    this.filterNumber.value = '';
    this.filterType.value = '0';
  }

  toggleFilter() {
    if (filter.open) {
      filter.close();
    } else {
      filter.showModal();
    }
  }
}
