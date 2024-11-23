class RoomTable {
  constructor(roomApi) {
    this.errorText = document.getElementById('errorText');
    this.roomBody = document.getElementById('rooms');
    this.rooms = [];
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

  async setup() {
    try {
      const rooms = await this.roomApi.getAllRooms();
      this.rooms = rooms;
      this.showRooms();
    } catch(err) {
      this.errorText.innerText = err.message;
    }
  }

  showRooms() {
    this.roomBody.innerHTML = '';
    for (const room of this.rooms) {
      this.addRoomItem(room);
    }
  }

  showRoomById(id) {
    let found = false;
    this.roomBody.innerHTML = '';
    for (const room of this.rooms) {
      if (room.id === id) {
        this.addRoomItem(room);
        found = true;
      }
    }
    if (!found) {
      this.errorText.innerText = `Quarto não encontrado com ID: ${id}`;
    }
  }

  showRoomByNumber(number) {
    let found = false;
    this.roomBody.innerHTML = '';
    for (const room of this.rooms) {
      if (room.number === number) {
        this.addRoomItem(room);
        found = true;
      }
    }
    if (!found) {
      this.errorText.innerText = `Quarto não encontrado com esse número: ${number}`;
    }
  }

  showRoomsByType(type) {
    let found = false;
    this.roomBody.innerHTML = '';
    for (const room of this.rooms) {
      if (room.type === type) {
        this.addRoomItem(room);
        found = true;
      }
    }
    if (!found) {
      this.errorText.innerText = `Não há quartos com este tipo`;
    }
  }

  removeRoom(roomId) {
    for (const i in this.rooms) {
      if (this.rooms[i].id === roomId) {
        this.rooms.splice(i, 1);
        this.removeRoomItem(roomId);
      }
    }
  }

  removeRoomItem(roomId) {
    const item = document.getElementById(`tr-${roomId}`);
    this.roomBody.removeChild(item);
  }
  
  addRoom(room) {
    this.rooms.push(room);
    this.addRoomItem(room);
  }

  addRoomItem(room) {
    this.errorText.innerText = '';
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
      this.removeRoom(room.id);
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

