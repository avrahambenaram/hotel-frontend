class RoomFilter {
  constructor() {
    this.setupModalTogglers();
    this.setupFilterTriggers();
    this.errorText = document.getElementById('errorFilter');
    this.listeners = {
      'filter-all': [],
      'filter-id': [],
      'filter-number': [],
      'filter-query': [],
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
    this.filterNumber = document.getElementById('filterNumber');
    this.filterNumber.addEventListener('keyup', (evt) => this.filterByEnter(evt, 'number'));
    this.filterForm = document.getElementById('filter-form');
    this.filterForm.addEventListener('submit', (evt) => this.filterRoomsByQuery(evt));

    this.btnFilterId = document.getElementById('btn-filter-id');
    this.btnFilterId.addEventListener('click', () => this.filterRoomsById());
    this.btnFilterNumber = document.getElementById('btn-filter-number');
    this.btnFilterNumber.addEventListener('click', () => this.filterRoomsByNumber());
    this.btnFilterAll = document.getElementById('btn-filter-all');
    this.btnFilterAll.addEventListener('click', () => this.filterAllRooms());
  }

  addListener(key, callback) {
    if (key != 'filter-all' && key != 'filter-id' && key != 'filter-number' && key != 'filter-query') {
      return;
    }
    this.listeners[key].push(callback);
  }

  removeAllListeners() {
    this.listeners = {
      'filter-all': [],
      'filter-id': [],
      'filter-number': [],
      'filter-query': [],
    };
  }

  filterByEnter(evt, mode) {
    if (evt.key === 'Enter') {
      evt.target.blur();
      if (mode == 'id') {
        this.filterRoomsById();
      }
      if (mode == 'number') {
        this.filterRoomsByNumber();
      }
    }
  }

  filterAllRooms() {
    for (const fn of this.listeners['filter-all']) {
      fn();
    }
    this.toggleFilter();
    this.cleanFields();
  }

  filterRoomsById() {
    const filterId = this.filterId.value;
    for (const fn of this.listeners['filter-id']) {
      fn(parseInt(filterId));
    }
    this.toggleFilter();
    this.cleanFields();
  }

  filterRoomsByNumber() {
    const filterNumber = this.filterNumber.value;
    for (const fn of this.listeners['filter-number']) {
      fn(parseInt(filterNumber));
    }
    this.toggleFilter();
    this.cleanFields();
  }

  filterRoomsByQuery(evt) {
    evt.preventDefault();
    const query = Object.fromEntries(new FormData(this.filterForm));
    for (const fn of this.listeners['filter-query']) {
      fn(query);
    }
    this.toggleFilter();
    this.cleanFields();
  }

  cleanFields() {
    this.filterId.value = '';
    this.filterNumber.value = '';
  }

  toggleFilter() {
    if (filter.open) {
      filter.close();
    } else {
      filter.showModal();
    }
  }
}
