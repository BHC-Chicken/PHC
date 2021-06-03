const COLUMN_COUNT=3;
const ROW_COUNT=3;
const MAX_ROTATION_DEGREE=15;

let __turn='o';
let __putCount =0;

const main=window.document.body.querySelector(':scope>main');
const ground = window.document.getElementById('ground');
const groundBody = ground.querySelector(':scope>tbody');

for (let i = 0; i < ROW_COUNT; i++) {
    let tr = window.document.createElement('tr');
    tr.style.height = `${1 / ROW_COUNT * 100}%`;
    for (let j = 0; j < COLUMN_COUNT; j++) {
        let td = window.document.createElement('td');
        td.style.width = `${1 / COLUMN_COUNT * 100}%`;
        td.addEventListener('click', () => {
            if (td.dataset.which === undefined) {
                put(td);
                if (!determine(j, i)) {
                    if(__putCount===ROW_COUNT*COLUMN_COUNT) {
                        alert('무승부');
                        showResult('u');
                        reset();
                    }
                    else {
                        switchTurn();
                    }
                } else {
                    showResult(__turn);
                }
            }
        });
        tr.append(td);
    }
    groundBody.append(tr);
}

const cover = window.document.getElementById('cover');
const coverImage = cover.querySelector('img');
const coverButton = cover.querySelector('button');

coverButton.addEventListener('click', ()=> {
    reset();
    hideResult();
});

function reset() {
    ground.querySelectorAll('td').forEach(td=> {
        td.innerHTML='';
        td.removeAttribute('data-which');
    });
    __turn='o';
    __putCount=0;
}

function showResult (winner) {
    coverImage.setAttribute('src', `resources/images/${winner}.png`);
    cover.classList.add('visible');
}

function hideResult() {
    cover.classList.remove('visible');
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
    td.dataset.which = __turn;
    const img = window.document.createElement('img');
    img.setAttribute('alt', '');
    img.setAttribute('src', `resources/images/${__turn}.png`);
    td.append(img);
    __putCount++;

    setTimeout(() => {
        img.classList.add('visible');
    }, 10);
}

function getSumOfRow(map, target) {
    let sum=0;
    for (let i=0; i<ROW_COUNT; i++) {
        sum += map[target][i];
    }
    return sum;
}

function getSumOfColumn(map, target) {
    let sum=0
    for (let i =0; i<ROW_COUNT; i++) {
        sum += map[i][target];
    }
    return sum;
}

function getSumOfSlope(map,isReversed) {
    let sum=0;
    for (let y=0;y<ROW_COUNT;  y++) {
        let x=!isReversed ? y : (ROW_COUNT-1)-y;
        sum += map[y][x];
    }
    return sum;
}

function determine(x,y) {
    let map = new Array(ROW_COUNT);

    for (let i = 0; i < map.length; i++) {
        map[i] = new Array(COLUMN_COUNT);
        for (let j = 0; j < map[i].length; j++) {
            let which = getWhich(j, i);
            map[i][j] = which === undefined ? 0 : which === 'o' ? 1 : -1;
        }
    }

    if (Math.abs(getSumOfRow(map, y)) === 3 ||
        Math.abs(getSumOfColumn(map, x)) === 3 ||
        Math.abs(getSumOfSlope(map, true)) === 3 ||
        Math.abs(getSumOfSlope(map, false)) === 3) {
        alert(`승자 결정됨. ${__turn}`);
        return true;
    }
    return false;
}



    /*
    map
    map[0] => [o,o,o]
    map[1] => [x,o,o]
    map[2] => [x,x,x]
    */

    // // 행 방향 검사
    // for(let row=0; row<ROW_COUNT; row++) {
    //     let rowContent='';
    //     for (let column=0;column<COLUMN_COUNT; column++) {
    //         let which = getWhich(column, row);
    //         if(which!==undefined) {
    //             rowContent+=getWhich(column,row);
    //         }
    //     }
    //     console.log(rowContent);
    //     if(rowContent==='ooo'||rowContent==='xxx') {
    //         alert(`${row+1}번 행에서 승자 결정(${__turn})`);
    //         return true;
    //     }
    // }
    // return false;

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

    // console.log(`X%=${xPercent} / Y%=${yPercent}`);
});
