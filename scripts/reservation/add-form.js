class AddForm {
  constructor(reservationApi) {
    this.listeners = [];
    this.setupModalTogglers();
    this.setupAddTriggers();
    this.errorText = document.getElementById('errorAdd');
    this.reservationApi = reservationApi;
  }

  addListener(fn) {
    this.listeners.push(fn);
  }

  removeAllListeners() {
    this.listeners = [];
  }

  setupModalTogglers() {
    this.modal = document.getElementById('add-modal');
    this.openAdd = document.getElementById('open-add-reservation');
    this.openAdd.addEventListener('click', () => this.toggleAdd());
    this.closeAdd = document.getElementById('close-add-reservation');
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
    this.addForm.addEventListener('submit', (evt) => this.addReservation(evt));
  }

  async addReservation(evt) {
    try {
      evt.preventDefault();
      const reservation = Object.fromEntries(new FormData(this.addForm));
      reservation.clientId = parseInt(reservation.clientId);
      reservation.roomId = parseInt(reservation.roomId);
      reservation.checkIn = new Date(reservation.checkIn).toISOString();
      reservation.checkOut = new Date(reservation.checkOut).toISOString();
      const reservationCreated = await this.reservationApi.addReservation(reservation);
      for (const fn of this.listeners) {
        fn(reservationCreated);
      }
      evt.target.reset();
    } catch(err) {
      this.errorText.innerText = err.message;
    }
  }
}
