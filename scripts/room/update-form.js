class UpdateForm {
  constructor(roomApi) {
    this.listeners = [];
    this.setupModalTogglers();
    this.setupUpdateTriggers();
    this.errorText = document.getElementById('errorUpdate');
    this.roomApi = roomApi;
  }

  addListener(fn) {
    this.listeners.push(fn);
  }

  removeAllListeners() {
    this.listeners = [];
  }

  setup(room) {
    const idInput = document.getElementById('update-id');
    const numberInput = document.getElementById('update-number');
    const typeInput = document.getElementById('update-type');
    const capacityInput = document.getElementById('update-capacity');
    const priceDiaryInput = document.getElementById('update-priceDiary');

    idInput.value = room.id.toString();
    numberInput.value = room.number.toString();
    typeInput.value = room.type.toString();
    capacityInput.value = room.capacity.toString();
    priceDiaryInput.value = room.priceDiary.toFixed(2);
    this.toggleUpdate();
  }

  setupModalTogglers() {
    this.modal = document.getElementById('update-modal');
    this.closeUpdate = document.getElementById('close-update-room');
    this.closeUpdate.addEventListener('click', () => this.toggleUpdate());
  }

  toggleUpdate() {
    if (this.modal.open) {
      this.updateForm.reset();
      this.modal.close();
    } else {
      this.modal.showModal();
    }
  }

  setupUpdateTriggers() {
    this.updateForm = document.getElementById('update-form');
    this.updateForm.addEventListener('submit', (evt) => this.updateRoom(evt));
  }

  async updateRoom(evt) {
    try {
      evt.preventDefault();
      const room = Object.fromEntries(new FormData(this.updateForm));
      room.id = parseInt(room.id);
      room.number = parseInt(room.number);
      room.type = parseInt(room.type);
      room.capacity = parseInt(room.capacity);
      room.priceDiary = parseFloat(room.priceDiary);
      const roomUpdated = await this.roomApi.updateRoom(room);
      for (const fn of this.listeners) {
        fn(roomUpdated);
      }
      this.toggleUpdate();
    } catch(err) {
      this.errorText.textContent = err.message;
    }
  }
}
