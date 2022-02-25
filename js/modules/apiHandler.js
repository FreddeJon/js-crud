class ApiHandler {
  constructor(URL) {
    this.URL = URL;
  }
  get() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    return this._fetchMethod(this.URL, options);
  }

  getById(id) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    return this._fetchMethod(this.URL + `/${id}`, options);
  }

  create(player) {
    console.log(player);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    };
    return this._fetchMethod(this.URL, options);
  }

  update(player) {
    const { id } = player;
    delete player.key;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    };
    return this._fetchMethod(this.URL + `/${id}`, options);
  }

  async _fetchMethod(URL, options) {
    const res = await fetch(URL, options);
    const data = await res.json();
    return data;
  }
}

export { ApiHandler };
