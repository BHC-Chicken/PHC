class Data {
    static API_KEY='Sw9gwWxWJqxr-kXoKmss';

    static getCover() {
        return window.document.body.querySelector(':scope>div.cover')
    }

    static createTableRow(ths, data) {
        let tr = window.document.createElement('tr');
        for(let i=0; i<ths.length; i++) {
            let th = ths[i];
            let index = parseInt(th.dataset.index);
            let td = window.document.createElement('td');
            td.innerText=data[index];
            tr.append(td);
        }
        return tr;
    }

    static getIndexes() {
        // [ 0,1,2,3,4,7 ]
        const tableHeadings = Data.getTableHead().querySelectorAll(':scope>th');
        let indexes= [];
        tableHeadings.forEach(th=>{indexes.push(parseInt(th.dataset.index))});
        return indexes;
}

    static getTable() {
        return window.document.getElementById('data-table');
    }

    static getTableBody() {
        return Data.getTable().querySelector(':scope>tbody');
    }

    static getTableHead() {
        return Data.getTable().querySelector(':scope>thead');
    }

    static showCover() {
        Data.getCover().classList.add('visible');
    }

    static hideCover() {
        Data.getCover().classList.remove('visible');
    }
    static retrieve(params) {
        let tableBody = Data.getTableBody();
        const callback = (status, responseText) => {
            const ths = Data.getTableHead().querySelectorAll(':scope>tr>th');
            let respJson = JSON.parse(responseText);
            let dataArray = respJson['dataset_data']['data'];

            let indexes = Data.getIndexes(); //[0,1,2,3,4,7]
            for (let i=0; i<dataArray.length; i++) {
                let data = dataArray[i];

                let tr = Data.createTableRow(ths, data);
                tableBody.append(tr);
            }
            Data.hideCover();
        };

        const fallback = (status) => {
            Data.hideCover();
        };
        let url=`https://www.quandl.com/api/v3/datasets/${params['vendor']}/${params['code']}/data.json?api_key=${Data.API_KEY}`;
        Ajax.request({
            method: 'GET',
            url : url
        }, callback, fallback);
        Data.showCover();
        tableBody.innerHTML = '';
    }
}