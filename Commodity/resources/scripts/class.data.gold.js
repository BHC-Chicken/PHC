class Data_gold {
    static API_KEY='Sw9gwWxWJqxr-kXoKmss';

    static getCover() {
        return window.document.body.querySelector(':scope>div.cover')
    }

    static createTableRow(ths, gold) {
        let tr = window.document.createElement('tr');
        for(let i=0; i<ths.length; i++) {
            let th = ths[i];
            let index = parseInt(th.dataset.index);
            let td = window.document.createElement('td');
            td.innerText=gold[index];
            tr.append(td);
        }
        return tr;
    }

    static getIndexes() {
        // [ 0,1,2,3,4,7 ]
        const tableHeadings = Data_gold.getTableHead().querySelectorAll(':scope>th');
        let indexes= [];
        tableHeadings.forEach(th=>{indexes.push(parseInt(th.dataset.index))});
        return indexes;
    }

    static getTableGold() {
        return window.main.getElementById(gold);
    }

    static getTableBody() {
        return Data_gold.getTableGold().querySelector(':scope>tbody');
    }

    static getTableHead() {
        return Data_gold.getTableGold().querySelector(':scope>thead');
    }

    static showCover() {
        Data_gold.getCover().classList.add('visible');
    }

    static hideCover() {
        Data_gold.getCover().classList.remove('visible');
    }
    static retrieve(params) {
        let tableBody = Data_gold.getTableBody();
        const callback = (status, responseText) => {
            const ths = Data_gold.getTableHead().querySelectorAll(':scope>tr>th');
            let respJson = JSON.parse(responseText);
            let dataArray = respJson['dataset_data']['data'];

            for (let i=0; i<dataArray.length; i++) {
                let data = dataArray[i];

                let tr = Data_gold.createTableRow(ths, data);
                tableBody.append(tr);
            }
            Data_gold.hideCover();
        };

        const fallback = (status) => {
            Data_gold.hideCover();
        };
        let url=`https://www.quandl.com/api/v3/datasets/${params['vendor']}/${params['code']}/data.json?api_key=${Data_gold.API_KEY}`;
        Ajax.request({
            method: 'GET',
            url : url
        }, callback, fallback);
        Data_gold.showCover();
        tableBody.innerHTML = '';
    }
}