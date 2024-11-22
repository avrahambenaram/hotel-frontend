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
}
