const buttonElement = window.document.body.querySelector(':scope > button');
const tableElement = window.document.body.querySelector(':scope > table');

let date;
let hour;

const createTr = () => {
  let ths = tableElement.querySelectorAll(':scope > thead > tr > th');
  let tr = window.document.createElement('tr');
  ths.forEach(th => {
    let td = window.document.createElement('td');
    td.setAttribute('rel', th.dataset.identifier);
    tr.append(td);
  });
  return tr;
};

buttonElement.addEventListener('click', () => {
  const callback = (status, responseText) => {
    let responseJson = JSON.parse(responseText);
    let tbodyElement = tableElement.querySelector(':scope > tbody');
    let tr = createTr();
    tr.querySelector(`[rel="timezone"]`).innerText = responseJson['abbreviation'];
    tr.querySelector(`[rel="ip"]`).innerText = responseJson['client_ip'];
    tr.querySelector(`[rel="date"]`).innerText = responseJson['datetime'].split('T')[0];
    tr.querySelector(`[rel="time"]`).innerText = responseJson['datetime'].split('T')[1];
    // tr.querySelector(`[rel="date"]`).innerText = responseJson['datetime'].substring(0,10);
    // tr.querySelector(`[rel="time"]`).innerText = responseJson['datetime'].substring(11);
    tr.querySelector(`[rel="offset"]`).innerText = responseJson['utc_offset'];
    tr.querySelector(`[rel="unix"]`).innerText = responseJson['unixtime'];
    tr.querySelector(`[rel="day"]`).innerText = responseJson['day_of_year'];
    tr.querySelector(`[rel="week"]`).innerText = responseJson['week_number'];
    tbodyElement.append(tr);
  };
  const fallback = (status) => {
    alert(`[${status}] 오류가 발생하였습니다.`);
  };
  Ajax.request('GET','http://worldtimeapi.org/api/timezone/Asia/Seoul', callback, fallback);
});