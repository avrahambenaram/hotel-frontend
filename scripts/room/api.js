class RoomApi {
  constructor() {
    this.host = apiHost;
  }

  async getAllRooms() {
    const resp = await fetch(`${apiHost}/room/`);
    if (!resp.ok) {
      const data = await resp.text();
      throw new Error(data);
    }

    return await resp.json();
  }

  async getRoomById(id) {
    const resp = await fetch(`${apiHost}/room/id/${id}`);
    if (!resp.ok) {
      const data = await resp.text();
      throw new Error(data);
    }

    return await resp.json();
  }

  async getRoomByNumber(number) {
    const resp = await fetch(`${apiHost}/room/number/${number}`);
    if (!resp.ok) {
      const data = await resp.text();
      throw new Error(data);
    }

    return await resp.json();
  }

  async addRoom(room) {
    const resp = await fetch(`${apiHost}/room/add`, {
      method: 'POST',
      body: JSON.stringify(room),
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

  async updateRoom(room) {
    const resp = await fetch(`${apiHost}/room/update`, {
      method: 'PUT',
      body: JSON.stringify(room),
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

  async deleteRoom(roomId) {
    const resp = await fetch(`${apiHost}/room/${roomId}`, {
      method: 'DELETE',
    });
    if (!resp.ok) {
      const data = await resp.text();
      throw new Error(data);
    }

    return;
  }
}
