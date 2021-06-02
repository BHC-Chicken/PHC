let lis = window.document.body.querySelectorAll(':scope>ul>li');
let info = window.document.body.querySelector(':scope>div.info');

lis.forEach(li=> {
    li.addEventListener('click', () => {
        let name=li.innerText;
        // let age=li.dataset.age === undefined ? '(빈값)' : li.dataset.age;
        // 'data-'로 시작하는 속성 값은 요소 변수의 dataset 속성에서(뒤에)
        // 이름을 적어서 바로 가져올 수 있다.
        // let blood=li.dataset.blood === undefined ? '(빈값)' : li.dataset.blood;

        // 삼항식(Trinomial Expression) : c ? a : b >>> c 조건이 true 일때 a, false일때 b 반환

        let age = li.dataset.age ?? '(빈 값)';
        let blood = li.dataset.blood ?? '(빈 값)';
        // x ?? y : x가 정의되지 않았을 때 대신 y값을 이용하겠다 라는 뜻.


        info.innerText=`이름 : ${name}\n 나이 : ${age}\n 혈액형 : ${blood}`;
    });
});

info.innerText='대기중';