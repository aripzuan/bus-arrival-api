const busStopIdInput = document.getElementById('busStopID');
const busList = document.getElementById('busList');

async function fetchBusArrival(busStopId) {
  const response = await fetch(
    `https://sg-bus-arrivals.vercel.app/?id=${busStopId}`
  );
  const data = await response.json();
  return data;
}

async function displayBusArrival(busStopId) {
  busList.innerHTML = ''; // clear previous rows

  const arrivalData = await fetchBusArrival(busStopId);

  for (let i = 0; i < arrivalData.services.length; i++) {
    const bus = arrivalData.services[i];
    const row = document.createElement('tr');

    const busNoCell = document.createElement('td');
    busNoCell.textContent = bus.bus_no;
    row.appendChild(busNoCell);

    const operatorCell = document.createElement('td');
    operatorCell.textContent = bus.operator;
    row.appendChild(operatorCell);

    const nextArrivalCell = document.createElement('td');
    nextArrivalCell.textContent =
      bus.next_bus_mins <= 0 ? 'Arrived' : bus.next_bus_mins + ' min(s)'; // if mins = 0 or -1 (which can means arrived or not available), it wil show Arrived
    row.appendChild(nextArrivalCell);

    busList.appendChild(row);
  }
}

function getBusTiming() {
  const busStopId = busStopIdInput.value;
  displayBusArrival(busStopId);
}

function selectBusStop(busStopId) {
  busStopIdInput.value = busStopId; // update input box
  displayBusArrival(busStopId);
}
