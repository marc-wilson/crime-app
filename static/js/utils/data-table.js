class ColumnMapping {
    constructor(mapping) {
        this.fieldName = mapping.fieldName;
        this.label = mapping.label;
        this.display = mapping.display;
    }
}

class DataTable {

    constructor(data, mapping, onRowClickCallback) {
        this.data = data;
        this.columnMapping = mapping ? mapping.map( m => new ColumnMapping(m) ) : null;
        this.callback = onRowClickCallback ? onRowClickCallback : () => {};
        this.columns = this.getColumns();
        this.init();
    }
    init() {
        console.log(this);
    }
    getColumns() {
        if (this.data && Array.isArray(this.data) && this.data.length > 0) {
            const row = this.data[0];
            if (row) {
                const columns = Object.keys(row).map(k => k);
                if (!this.columnMapping) {
                    return columns;
                } else {
                    return columns.map( c => this.columnMapping.find( m => c.toLowerCase() === m.fieldName.toLowerCase() ) );
                }
            }
            return null;
        }
        return null;
    }
    generateThead() {
        if (this.columns && Array.isArray(this.columns)) {
            const thead = document.createElement('thead');
            const tr = document.createElement('tr');
            this.columns.forEach( c => {
                const th = document.createElement('th');
                if (c instanceof ColumnMapping) {
                    th.innerText = c.label;
                    th.style.display = c.display ? 'table-cell' : 'none';
                } else {
                    th.innerText = c;
                }
                tr.appendChild(th);
            });
            thead.appendChild(tr);
            return thead;
        }
        return null;
    }
    generateTbody() {
        if (this.data && Array.isArray(this.data) && this.data.length > 0) {
            const tbody = document.createElement('tbody');
            this.data.forEach( d => {
                const tr = document.createElement('tr');
                const values = Object.values(d);
                if (values) {
                    values.forEach( (v, idx) => {
                        const td = document.createElement('td');
                        td.innerText = v;
                        if (this.columnMapping) {
                            const mapping = this.columnMapping[idx];
                            if (mapping) {
                                td.style.display = mapping.display ? 'table-cell' : 'none';
                            }
                        }

                        tr.appendChild(td);
                        tr.setAttribute('data-case', JSON.stringify(d));
                        tr.onclick = this.callback;
                    });
                    tbody.appendChild(tr);
                }
            });
            return tbody;
        }
        return null;
    }
    toHtmlTable() {
        if (this.data && Array.isArray(this.data) && this.data.length > 0) {
            const table = document.createElement('table');
            table.classList.add('table');
            table.classList.add('table-bordered');
            table.classList.add('table-hover');
            const thead = this.generateThead();
            const tbody = this.generateTbody();
            table.appendChild(thead);
            table.appendChild(tbody);
            return table;
        }
        return null;
    }
}