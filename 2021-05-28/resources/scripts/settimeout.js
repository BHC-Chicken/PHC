// setTimeout(f ,t);
// t 밀리초 후에 f함수 실행

// setTimeout(()=> {window.document.body.innerText = 'Hello?'; }, 5000);

window.addEventListener('load', ()=> {
    setTimeout(() => {
        window.document.body.classList.remove('preload');
    }, 100);

    setTimeout(() => {
        let divs = window.document.body.querySelectorAll(':scope > div > div');
        let delay = 0;
        divs.forEach(div => {
            setTimeout(() => {
                div.classList.add('visible');
            }, delay += 100);


            // 요소.classList
            //  .add : 클래스를 추가한다. 중복은 알아서 거름.
            //  .remove : 클래스를 삭제한다. 없는 클래스여도 오류가 발생하지 않음.
            //  .contains : 클래스가 있는지의 여부를 반환한다.
        });
    }, 250);
});