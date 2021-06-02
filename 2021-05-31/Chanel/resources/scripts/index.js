const CIRCULATION_INTERVAL= 4000;
let splashImages = window.document.body.querySelectorAll(':scope>section.splash>div');
for (let i=0; i<splashImages.length; i++) {
    splashImages[i].style.backgroundImage = `url("resources/images/splash-${i + 1}.webp")`;
    /* 요소.style : 요소의 CSS 속성에 접근할 수 있게 한다. */
}

// 재귀 호출(Recursive Call) : 
function circulateSplash(currentSplashIndex) {
    setTimeout(() => {
        splashImages[currentSplashIndex++].classList.remove('visible');
        if (currentSplashIndex===splashImages.length)
            currentSplashIndex=0;
        splashImages[currentSplashIndex].classList.add('visible');
        circulateSplash(currentSplashIndex);
    }, CIRCULATION_INTERVAL);
}

circulateSplash(0);

// 검색 이벤트
let searchOpener = window.document.getElementById('search-opener');
let searchCloser = window.document.getElementById('search-closer');
searchOpener.addEventListener('click', ()=> {
    let searchForm = window.document.getElementById('search-form');
    searchForm['keyword'].value='';
    searchForm['keyword'].focus();
    window.document.body.classList.add('searching');
});
searchCloser.addEventListener('click', ()=> {
    window.document.body.classList.remove('searching');
});