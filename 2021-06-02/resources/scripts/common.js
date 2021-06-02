const COLUMN_COUNT=3;
const ROW_COUNT=3;
const MAX_ROTATION_DEGREE=15;

let __turn='o';

const main=window.document.body.querySelector(':scope>main');

const ground = window.document.getElementById('ground');
const groundBody = ground.querySelector(':scope>tbody');

for (let i=0; i<ROW_COUNT; i++) {
    let tr = window.document.createElement('tr');

    tr.style.height=`${1/ROW_COUNT*100}%`;

    for (let j=0; j<COLUMN_COUNT; j++) {
        let td = window.document.createElement('td');
        tr.style.height=`${1/COLUMN_COUNT*100}%`;
        td.addEventListener('click', ()=> {
            put(td);
            determine(i,j);
            switchTurn();
        })
        tr.append(td);
    }

    groundBody.append(tr);
}

function getWhich(x,y) {
    let trs=groundBody.querySelectorAll(':scope>tr');
    let targetTR=trs[y];
    let tds=targetTR.querySelectorAll(':scope>td')
    let targetTd=tds[x];

    return targetTd.dataset.which;
}

function switchTurn() {
    __turn=__turn==='x'?'o':'x';
}

function put(td) {
    const which = td.dataset.which //'data-which' attribute
    if(which===undefined) {
        td.dataset.which=__turn;
        const img = window.document.createElement('img');
        img.setAttribute('alt', '');
        img.setAttribute('src', `resources/images/${__turn}.png`);
        td.append(img);

        setTimeout(()=> {
            img.classList.add('visible');
        },10);
    }

}

function determine(x,y) {
    // x 축

    // y 축

    // 대각선 1

    // 대각선 2
}
/*
mousemove(e): 대상 요소에서 마우스가 움직일때 마다 발생 (사용에 유의)
mouseenter(e): 대상 요소에서 마우스가 안 올라가 있다가 들어갈때 한번 발생
mouseleave(e): 대상 요소에 마우스가 올라가 있다가 나갈때 한번 발생
mouseover(e): mouseenter 랑 비슷하나 자식 요소도 포함
mouseout(e): mouseleave 랑 비슷하나 자식 요소도 포함
*/

main.addEventListener('mousemove', (e) => {
    const mainWidth=main.getBoundingClientRect().width;
    const mainHeight=main.getBoundingClientRect().height;
    // getBoundingClientRect() : 대상 요소의 위치나 크기 등을 가져오기 위해 사용한다.
    const xPercent =(e.pageX-mainWidth/2)/mainWidth*2;
    const yPercent =(e.pageY-mainHeight/2)/mainHeight*2;
    const xDegree= Math.floor(xPercent*MAX_ROTATION_DEGREE);
    const yDegree= Math.floor(yPercent*MAX_ROTATION_DEGREE)*-1;
    ground.style.transform=`translate(-50%, -50%) rotateX(${yDegree}deg) rotateY(${xDegree}deg)`;

    console.log(`X%=${xPercent} / Y%=${yPercent}`);
})
