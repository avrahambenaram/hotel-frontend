window.onload = () => {
  const reservationApi = new ReservationApi();
  const reservationTable = new ReservationTable(reservationApi);
  reservationTable.showReservations();

  const filter = new ReservationFilter();
  filter.addListener('filter-id', (id) => reservationTable.showReservationById(id));
  filter.addListener('filter-query', (query) => reservationTable.showReservationsByQuery(query));

  const addForm = new AddForm(reservationApi);
  addForm.addListener(reservation => {
    reservationTable.addReservationItem(reservation);
  })
}
