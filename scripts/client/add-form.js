class AddForm {
  constructor(clientApi) {
    this.listeners = [];
    this.setupModalTogglers();
    this.setupAddTriggers();
    this.errorText = document.getElementById('errorAdd');
    this.clientApi = clientApi;
  }

  addListener(fn) {
    this.listeners.push(fn);
  }

  removeAllListeners() {
    this.listeners = [];
  }

  setupModalTogglers() {
    this.modal = document.getElementById('add-modal');
    this.openAdd = document.getElementById('open-add-client');
    this.openAdd.addEventListener('click', () => this.toggleAdd());
    this.closeAdd = document.getElementById('close-add-client');
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
    this.addForm.addEventListener('submit', (evt) => this.addClient(evt));
  }

  async addClient(evt) {
    try {
      evt.preventDefault();
      const client = Object.fromEntries(new FormData(this.addForm));
      const clientCreated = await this.clientApi.addClient(client);
      for (const fn of this.listeners) {
        fn(clientCreated);
      }
      evt.target.reset();
    } catch(err) {
      this.errorText.innerText = err.message;
    }
  }
}
