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
