class UpdateForm {
  constructor(clientApi) {
    this.listeners = [];
    this.setupModalTogglers();
    this.setupUpdateTriggers();
    this.errorText = document.getElementById('errorUpdate');
    this.clientApi = clientApi;
  }

  addListener(fn) {
    this.listeners.push(fn);
  }

  removeAllListeners() {
    this.listeners = [];
  }

  setup(client) {
    const idInput = document.getElementById('update-id');
    const nameInput = document.getElementById('update-name');
    const cpfInput = document.getElementById('update-cpf');
    const emailInput = document.getElementById('update-email');
    const phoneInput = document.getElementById('update-phone');

    idInput.value = client.id.toString();
    nameInput.value = client.name;
    cpfInput.value = client.cpf;
    emailInput.value = client.email;
    phoneInput.value = client.phone;
    this.toggleUpdate();
  }

  setupModalTogglers() {
    this.modal = document.getElementById('update-modal');
    this.closeUpdate = document.getElementById('close-update-client');
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
    this.updateForm.addEventListener('submit', (evt) => this.updateClient(evt));
  }

  async updateClient(evt) {
    try {
      evt.preventDefault();
      const client = Object.fromEntries(new FormData(this.updateForm));
      client.id = parseInt(client.id);
      const clientUpdated = await this.clientApi.updateClient(client);
      for (const fn of this.listeners) {
        fn(clientUpdated);
      }
      this.toggleUpdate();
    } catch(err) {
      this.errorText.textContent = err.message;
    }
  }
}
