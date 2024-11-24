class ReservationApi {
  constructor() {
    this.host = apiHost;
  }

  async getAllReservations() {
    const resp = await fetch(`${apiHost}/reservation/`);
    if (!resp.ok) {
      const data = await resp.text();
      throw new Error(data);
    }

    return await resp.json();
  }

  async getReservationsByQuery(query) {
    const q = new URLSearchParams();
    for (const key in query) {
      q.append(key, query[key]);
    }

    const resp = await fetch(`${apiHost}/reservation?${q.toString()}`);
    if (!resp.ok) {
      const data = await resp.text();
      throw new Error(data);
    }

    return await resp.json();
  }

  async getReservationById(id) {
    const resp = await fetch(`${apiHost}/reservation/id/${id}`);
    if (!resp.ok) {
      const data = await resp.text();
      throw new Error(data);
    }

    return await resp.json();
  }

  async addReservation(reservation) {
    const resp = await fetch(`${apiHost}/reservation/add`, {
      method: 'POST',
      body: JSON.stringify(reservation),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!resp.ok) {
      const data = await resp.text();
      throw new Error(data);
    }

    return await resp.json();
  }

  async deleteReservation(reservationId) {
    const resp = await fetch(`${apiHost}/reservation/${reservationId}`, {
      method: 'DELETE',
    });
    if (!resp.ok) {
      const data = await resp.text();
      throw new Error(data);
    }

    return;
  }
}
