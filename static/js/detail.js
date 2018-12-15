class Detail {
    constructor(id) {
        this.id = id;
        this.crime = null;
        this._httpClient = new HttpClient();
        this.init(id);
    }
    set arrest(val) {
        document.getElementById('arrest').innerText = val;
    }
    set beat(val) {
        document.getElementById('beat').innerText = val;
    }
    set block(val) {
        document.getElementById('block').innerText = val;
    }
    set caseId(val) {
        document.getElementById('caseId').innerText = val;
    }
    set caseNumber(val) {
        document.getElementById('caseNumber').innerText = val;
    }
    set communityArea(val) {
        document.getElementById('communityArea').innerText = val;
    }
    set date(val) {
        document.getElementById('date').innerText = new Date(val).toDateString();
    }
    set description(val) {
        document.getElementById('description').innerText = val;
    }
    set district(val) {
        document.getElementById('district').innerText = val;
    }
    set domestic(val) {
        document.getElementById('domestic').innerText = val;
    }
    set fbiCode(val) {
        document.getElementById('fbiCode').innerText = val;
    }
    set iucr(val) {
        document.getElementById('iucr').innerText = val;
    }
    set location(val) {
        document.getElementById('location').innerText = val;
    }
    set type(val) {
        document.getElementById('type').innerText = val;
    }
    async init(id) {
        this.crime = await this._httpClient.get(`/api/cases/${id}`);
        console.log(this.crime);
        this.drawMap();
        this.arrest = this.crime.arrest;
        this.beat = this.crime.beat;
        this.block = this.crime.block;
        this.caseId = this.crime.case_id;
        this.caseNumber = this.crime.case_number;
        this.communityArea = this.crime.community_area;
        this.date = this.crime.date;
        this.description = this.crime.description;
        this.district = this.crime.district;
        this.domestic = this.crime.domestic;
        this.fbiCode = this.crime.fbi_code;
        this.iucr = this.crime.iucr;
        this.location = this.crime.location_description;
        this.type = this.crime.primary_type;

    }
    drawMap() {
        const point = { lat: +this.crime.latitude, lng: +this.crime.longitude };
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: point
        });
        new google.maps.Marker({position: point, map: map })
    }
}

window.onload = (evt) => {
    const url = new URL(window.location.href);
    const search = new URLSearchParams(url.search);
    const id = search.get('id');
    new Detail(id);
};