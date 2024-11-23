class AddForm {
  constructor(roomApi) {
    this.listeners = [];
    this.setupModalTogglers();
    this.setupAddTriggers();
    this.errorText = document.getElementById('errorAdd');
    this.roomApi = roomApi;
  }

  addListener(fn) {
    this.listeners.push(fn);
  }

  removeAllListeners() {
    this.listeners = [];
  }

  setupModalTogglers() {
    this.modal = document.getElementById('add-modal');
    this.openAdd = document.getElementById('open-add-room');
    this.openAdd.addEventListener('click', () => this.toggleAdd());
    this.closeAdd = document.getElementById('close-add-room');
    this.closeAdd.addEventListener('click', () => this.toggleAdd());
    this.addListener(() => this.toggleAdd());
  }

  toggleAdd() {
    if (this.modal.open) {
      this.modal.close();
    } else {
      this.modal.showModal();
    }
  }

  setupAddTriggers() {
    this.addForm = document.getElementById('add-form');
    this.addForm.addEventListener('submit', (evt) => this.addRoom(evt));
  }

  async addRoom(evt) {
    try {
      evt.preventDefault();
      const room = Object.fromEntries(new FormData(this.addForm));
      room.number = parseInt(room.number);
      room.type = parseInt(room.type);
      room.capacity = parseInt(room.capacity);
      room.priceDiary = parseFloat(room.priceDiary);
      const roomCreated = await this.roomApi.addRoom(room);
      for (const fn of this.listeners) {
        fn(roomCreated);
      }
      evt.target.reset();
    } catch(err) {
      this.errorText.innerText = err.message;
    }
  }
}
