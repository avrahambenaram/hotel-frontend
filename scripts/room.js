window.onload = () => {
  const roomApi = new RoomApi();
  const roomTable = new RoomTable(roomApi);
  roomTable.showRooms();

  const filter = new RoomFilter();
  filter.addListener('filter-all', () => roomTable.showRooms());
  filter.addListener('filter-id', (id) => roomTable.showRoomById(id));
  filter.addListener('filter-number', (number) => roomTable.showRoomByNumber(number));
  filter.addListener('filter-type', (type) => roomTable.showRoomsByType(type));

  const addForm = new AddForm(roomApi);
  addForm.addListener(room => {
    roomTable.addRoomItem(room);
  })

  const updateForm = new UpdateForm(roomApi);
  updateForm.addListener(room => {
    roomTable.showRooms();
  })

  roomTable.addListener('update', room => {
    updateForm.setup(room);
  })
}
