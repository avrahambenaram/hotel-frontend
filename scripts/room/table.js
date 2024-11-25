class RoomTable {
  constructor(roomApi) {
    this.errorText = document.getElementById('errorText');
    this.roomBody = document.getElementById('rooms');
    this.roomApi = roomApi;
    this.listeners = {
      'update': [],
    };
    this.typeLabels = ['Quarto simples', 'Quarto duplo', 'Suite', 'Quarto família'];
  }

  addListener(key, cb) {
    if (key != 'update') {
      return
    }
    this.listeners[key].push(cb);
  }

  removeAllListeners() {
    this.listeners = {
      'update': [],
    };
  }

  async showRooms() {
    try {
      this.roomBody.innerHTML = '';
      const rooms = await this.roomApi.getAllRooms();
      for (const room of rooms) {
        this.addRoomItem(room);
      }
    } catch(err) {
      this.errorText.textContent = err.message;
    }
  }

  async showRoomsByQuery(query) {
    try {
      this.roomBody.innerHTML = '';
      const rooms = await this.roomApi.getRoomsByQuery(query);
      for (const room of rooms) {
        this.addRoomItem(room);
      }
    } catch(err) {
      this.errorText.textContent = err.message;
    }
  }

  async showRoomById(id) {
    try {
      this.roomBody.innerHTML = '';
      const room = await this.roomApi.getRoomById(id);
      this.addRoomItem(room);
    } catch(err) {
      this.errorText.textContent = err.message;
    }
  }

  async showRoomByNumber(number) {
    try {
      this.roomBody.innerHTML = '';
      const room = await this.roomApi.getRoomByNumber(number);
      this.addRoomItem(room);
    } catch(err) {
      this.errorText.textContent = err.message;
    }
  }

  removeRoomItem(roomId) {
    const item = document.getElementById(`tr-${roomId}`);
    if (item) {
      this.roomBody.removeChild(item);
    }
  }
  
  addRoomItem(room) {
    this.errorText.textContent = '';
    const roomItem = this.createRoomItem(room);
    this.roomBody.appendChild(roomItem);
  }

  createRoomItem(room) {
    const tdId = this.createBaseTd(room.id.toString());
    const tdNumber = this.createBaseTd(room.number.toString());
    const label = this.typeLabels[room.type - 1];
    const tdType = this.createBaseTd(label);
    const tdCapacity = this.createBaseTd(room.capacity.toString());
    const tdPriceDiary = this.createBaseTd(room.priceDiary.toFixed(2));
    const tdUpdate = this.createUpdateTd(room);
    const tdDelete = this.createDeleteTd(room);

    const tr = document.createElement('tr');
    tr.id = `tr-${room.id}`;
    tr.appendChild(tdId);
    tr.appendChild(tdNumber);
    tr.appendChild(tdType);
    tr.appendChild(tdCapacity);
    tr.appendChild(tdPriceDiary);
    tr.appendChild(tdUpdate);
    tr.appendChild(tdDelete);

    return tr
  }

  createUpdateTd(room) {
    const btn = document.createElement('button');
    btn.innerHTML = feather.icons['edit-2'].toSvg({ class: 'text-slate-700' });
    btn.addEventListener('click', () => {
      for (const fn of this.listeners['update']) {
        fn(room);
      }
    })

    const td = this.createBaseTd(null);
    td.appendChild(btn);
    return td;
  }

  createDeleteTd(room) {
    const btn = document.createElement('button');
    btn.innerHTML = feather.icons['trash-2'].toSvg({ class: 'text-red-500' });
    btn.addEventListener('click', () => this.askForDeleteRoom(room));

    const td = this.createBaseTd(null);
    td.appendChild(btn);
    return td;
  }

  askForDeleteRoom(room) {
    const confirmDelete = confirm(`Tem certeza que quer deletar o quarto ${room.number}?`);
    if (confirmDelete) {
      this.deleteRoom(room);
    }
  }

  async deleteRoom(room) {
    try {
      await this.roomApi.deleteRoom(room.id);
      this.removeRoomItem(room.id);
    } catch(err) {
      this.errorText.textContent = err.message;
    }
  }

  createBaseTd(text) {
    const td = document.createElement('td');
    td.classList.add('border');
    td.classList.add('border-black');
    td.classList.add('p-2');
    td.textContent = text;
    return td
  }
}

