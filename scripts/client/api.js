class ClientApi {
  constructor() {
    this.host = apiHost;
  }

  async getAllClients() {
    const resp = await fetch(`${apiHost}/client/`);
    if (!resp.ok) {
      const data = await resp.text();
      throw new Error(data);
    }

    return await resp.json();
  }

  async addClient(client) {
    const resp = await fetch(`${apiHost}/client/add`, {
      method: 'POST',
      body: JSON.stringify(client),
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

  async updateClient(client) {
    const resp = await fetch(`${apiHost}/client/update`, {
      method: 'PUT',
      body: JSON.stringify(client),
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

  async deleteClient(clientId) {
    const resp = await fetch(`${apiHost}/client/${clientId}`, {
      method: 'DELETE',
    });
    if (!resp.ok) {
      const data = await resp.text();
      throw new Error(data);
    }

    return;
  }
}
