class Ajax {
    static request(params, callback, fallback) { // callback, fallback 은 옵션
        let xhr = new XMLHttpRequest();
        xhr.open(params['method'],params['url']);
        // readyState   : XHR 객체의 상태(1 ~ 4), 4 : (실패, 성공 여부랑 무관) 완료
        // status       : 서버의 요청에 대한 응답 코드

        xhr.onreadystatechange = () => {
            if(xhr.readyState===XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status<300) {
                    // 성공
                    if (typeof(callback)==='function') {
                        callback(xhr.status, xhr.responseText);
                    }
                }
                else
                {
                    // 실패
                    if (typeof(fallback)==='function') {
                        fallback(xhr.status)
                    }
                }
            }
        };
        xhr.send();
    }
}