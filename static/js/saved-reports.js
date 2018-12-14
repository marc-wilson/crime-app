class SavedReports {
    constructor() {
        this.init();
    }

    async init() {

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
}

window.onload = (evt) => {
    new SavedReports();
};
