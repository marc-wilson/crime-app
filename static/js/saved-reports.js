class Index {
    constructor(year = null, type = null, district = null) {
        this.typeEl = document.getElementsByClassName('selected typeFilter')[0];
        this.yearEl = document.getElementsByClassName('selected yearFilter')[0];
        this.districtEl = document.getElementsByClassName('selected districtFilter')[0];
        this.selectEl = document.getElementById('btnSelect');
        this.year = year ? year : null;
        this.type = type ? type : null;
        this.district = district ? district : null;
        this.init();
    }

    get _year() {
        return this.yearEl.value;
    }

    set year(_val) {
        this.yearEl.value = _val;
    }

    get _type() {
        return this.typeEl.value;
    }

    set type(_val) {
        this.typeEl.value = _val;
    }

    get _district() {
        return this.districtEl.value;
    }

    set district(_val) {
        this.districtEl.value = _val;
    }

    async init() {
        this.selectEl.addEventListener('click', this.getDataset);
        const reportEls = document.getElementsByClassName('report');
        for (let reportEl of reportEls) {
            reportEl.addEventListener('click', (event) => {
               console.log("event.target", event, event.target.parentElement);
                for (let reportEl of reportEls) {
                    reportEl.classList.remove("selected");
                }
                if (event.target.parentElement.classList.contains("selected")) {
                   event.target.parentElement.classList.remove("selected");
                } else {
                   event.target.parentElement.classList.add("selected");
                }
           });
        }
    }

    getQueryString() {
        let queryString = [];
        if (this._year) {
            queryString.push(`year=${this._year}`);
        }
        if (this._type) {
            queryString.push(`type=${this._type}`);
        }
        if (this._district) {
            queryString.push(`district=${this._district}`);
        }
        return queryString && queryString.length > 0 ? `?${queryString.join('&')}` : null;
    }

    async getDataset() {
        const queryString = this.getQueryString();
        const url = queryString ? `/api/data${queryString}` : '/api/data';
        const data = await d3.json(url);
        const tableContainer = document.getElementById('tableContainer');
        const datatable = new DataTable(data, this.generateColumnMapping());
        if (datatable) {
            tableContainer.appendChild(datatable.toHtmlTable());
        }
        console.log(datatable);
    }
    generateColumnMapping() {
        return [
            new ColumnMapping({ fieldName: 'arrest', label: 'Arrest', display: true }),
            new ColumnMapping( { fieldName: 'beat', label: 'Beat', display: false }),
            new ColumnMapping( { fieldName: 'block', label: 'Block', display: false }),
            new ColumnMapping( { fieldName: 'case_id', label: 'Case ID', display: false }),
            new ColumnMapping( { fieldName: 'case_number', label: 'Case Number', display: false }),
            new ColumnMapping( { fieldName: 'community_area', label: 'Community Area', display: false }),
            new ColumnMapping( { fieldName: 'date', label: 'Date', display: true }),
            new ColumnMapping( { fieldName: 'description', label: 'Desc', display: true }),
            new ColumnMapping( { fieldName: 'district', label: 'Dist', display: true }),
            new ColumnMapping( { fieldName: 'domestic', label: 'Domestic', display: true }),
            new ColumnMapping( { fieldName: 'fbi_code', label: 'FBI Code', display: false }),
            new ColumnMapping( { fieldName: 'id', label: 'ID', display: false }),
            new ColumnMapping( { fieldName: 'iucr', label: 'IUCR', display: false }),
            new ColumnMapping( { fieldName: 'latitude', label: 'Lat', display: false }),
            new ColumnMapping( { fieldName: 'location', label: 'Location', display: false }),
            new ColumnMapping( { fieldName: 'location_description', label: 'Location Description', display: true }),
            new ColumnMapping( { fieldName: 'longitude', label: 'Lon', display: false }),
            new ColumnMapping( { fieldName: 'primary_type', label: 'Type', display: true }),
            new ColumnMapping( { fieldName: 'updated_on', label: 'Updated', display: false }),
            new ColumnMapping( { fieldName: 'ward', label: 'Ward', display: false }),
            new ColumnMapping( { fieldName: 'x_coordinate', label: 'X', display: false }),
            new ColumnMapping( { fieldName: 'y_coordinate', label: 'Y', display: false }),
            new ColumnMapping( { fieldName: 'year', label: 'Year', display: true }),
        ]
    }
}

window.onload = (evt) => {
    const url = new URL(window.location.href);
    const search = new URLSearchParams(url.search);
    const year = search.get('year');
    const type = search.get('type');
    const district = search.get('district');
    new Index(year, type, district);
};
