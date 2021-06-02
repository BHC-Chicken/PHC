// window.document.body.innerText='<a>hello</a>'; // innerText 이용시 태그까지 출력,
// window.document.body.innerHTML='<a>hello</a>'; // 태그를 태그로 이용하고 싶을 시 innerHTML

// let img = window.document.createElement('img');
// createElement(x) : 가상의 요소를 만든다.
// img.remove(); // img 요소가 DOM 상에서 삭제됨. ↓
// 요소.remove() : append 된 상황에서 요소를 (문서상에서만) 삭제한다.

// img.setAttribute('src','resources/images/img.png');
// img.setAttribute('alt', '');
// something.setAttribute(k, v) : something 요소의 속성(k)의 값을 v로 한다.
// something.removeAttribute(k) : something 요소의 속성(k)를 삭제한다.

// window.document.body.appendChild(img);
// something.appendChild(x) : 만들어 놓은 가상 요소(x)를 대상 요소(something)의 가장 끝에
// (자식으로) 추가한다.

let tbody = window.document.body.querySelector('table>tbody');

// querySelector(x) : x 선택자에 만족하는 요소를 하나만 선택한다.
// querySelectorAll(x) : x 선택자에 의해 선택되는 요소를 모두 선택하여 배열로 반환한다.
// 둘다 css 스타일의 선택자를 기입한다.

// let tbody = window.document.body.querySelector(':scope table>tbody');
// :scope 는 querySelector 혹은 querySelectorAll 메서도를 호출하는 대상을 의미한다.
// 단, window.document.body.querySelector('body>table>tbody'); 로 호출하면 안되는데
// 이는 body 의 자식/후손인 body 의 자식인 table 의 자식인 tbody 를 찾기 때문.

// tbody.innerText = 'Hello World';

// let n=0;
// let tds = tbody.querySelectorAll(':scope > tr > td');
// console.log(tds.length);
//
// tds.forEach(td=> {
//     td.innerText = ++n;
// });

let startDt = new Date();

for(let i=0; i<2500; i++) {

    // tbody.innerHTML += `<tr><td>${i+1}</td></tr>`

    let tr = window.document.createElement('tr');
    let td = window.document.createElement('td');
    td.innerText=i+1;
    tr.appendChild(td);
    tbody.appendChild(tr);
}

let endDt = new Date();
console.log(`${(endDt-startDt)/1000}초`)