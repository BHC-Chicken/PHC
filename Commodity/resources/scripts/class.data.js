class Data {
    static API_KEY='Sw9gwWxWJqxr-kXoKmss';
    static retrieve(params) {
        const callback = (status, responseText) => {
            console.log(responseText);
        };

        const fallback = (status) => {

        };
        let url=`https://www.quandl.com/api/v3/datasets/${params['vendor']}/${params['code']}/data.json?api_key=${Data.API_KEY}`;
        Ajax.request({
            method: 'GET',
            url : url
        }, callback, fallback);
    }
}