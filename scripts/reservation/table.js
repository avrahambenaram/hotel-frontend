class ReservationTable {
  constructor(reservationApi) {
    this.errorText = document.getElementById('errorText');
    this.reservationBody = document.getElementById('reservations');
    this.reservationApi = reservationApi;
    this.typeLabels = ['Quarto simples', 'Quarto duplo', 'Suite', 'Quarto família'];
  }

  async showReservations() {
    try {
      this.reservationBody.innerHTML = '';
      const reservations = await this.reservationApi.getAllReservations();
      for (const reservation of reservations) {
        this.addReservationItem(reservation);
      }
    } catch(err) {
      this.errorText.innerText = err.message;
    }
  }

  async showReservationsByQuery(query) {
    try {
      this.reservationBody.innerHTML = '';
      const reservations = await this.reservationApi.getReservationsByQuery(query);
      for (const reservation of reservations) {
        this.addReservationItem(reservation);
      }
    } catch(err) {
      this.errorText.innerText = err.message;
    }
  }

  async showReservationById(id) {
    try {
      this.reservationBody.innerHTML = '';
      const reservation = await this.reservationApi.getReservationById(id);
      this.addReservationItem(reservation);
    } catch(err) {
      this.errorText.innerText = err.message;
    }
  }

  removeReservationItem(reservationId) {
    const item = document.getElementById(`tr-${reservationId}`);
    if (item) {
      this.reservationBody.removeChild(item);
    }
  }
  
  addReservationItem(reservation) {
    this.errorText.innerText = '';
    const reservationItem = this.createReservationItem(reservation);
    this.reservationBody.appendChild(reservationItem);
  }

  createReservationItem(reservation) {
    const tdId = this.createBaseTd(reservation.id.toString());
    const tdCheckIn = this.createDateTd(reservation.checkIn);
    const tdCheckOut = this.createDateTd(reservation.checkOut);
    const tdRoom = this.createBaseTd(reservation.roomId.toString());
    const tdClient = this.createBaseTd(reservation.clientId.toString());
    const tdDelete = this.createDeleteTd(reservation);

    const tr = document.createElement('tr');
    tr.id = `tr-${reservation.id}`;
    tr.appendChild(tdId);
    tr.appendChild(tdCheckIn);
    tr.appendChild(tdCheckOut);
    tr.appendChild(tdRoom);
    tr.appendChild(tdClient);
    tr.appendChild(tdDelete);

    return tr
  }

  createDateTd(dateStr) {
    const date = new Date(dateStr);
    const text = date.toISOString().split('T').join(' ');
    const td = this.createBaseTd(text);
    return td;
  }

  createDeleteTd(reservation) {
    const btn = document.createElement('button');
    btn.innerHTML = feather.icons['trash-2'].toSvg({ class: 'text-red-500' });
    btn.addEventListener('click', () => this.askForDeleteReservation(reservation));

    const td = this.createBaseTd(null);
    td.appendChild(btn);
    return td;
  }

  askForDeleteReservation(reservation) {
    const confirmDelete = confirm(`Tem certeza que quer deletar a reserva ${reservation.id}?`);
    if (confirmDelete) {
      this.deleteReservation(reservation);
    }
  }

  async deleteReservation(reservation) {
    try {
      await this.reservationApi.deleteReservation(reservation.id);
      this.removeReservationItem(reservation.id);
    } catch(err) {
      this.errorText.innerText = err.message;
    }
  }

  createBaseTd(text) {
    const td = document.createElement('td');
    td.classList.add('border');
    td.classList.add('border-black');
    td.classList.add('p-2');
    td.innerText = text;
    return td
  }
}

