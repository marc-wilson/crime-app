
class Index {
    constructor(year = null, type = null, district = null) {
        this._httpClient = new HttpClient();
        this.typeEl = document.getElementById('typeFilter');
        this.yearEl = document.getElementById('yearFilter');
        this.districtEl = document.getElementById('districtFilter');
        this.searchEl = document.getElementById('btnSearch');
        this.saveReportEl = document.getElementById('btnSave');
        this.chartHeight = 300;
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
        this.searchEl.addEventListener('click', this.search.bind(this));
        this.saveReportEl.addEventListener('click', this.saveReport.bind(this));
        await Promise.all([
            this.generateTypeBreakdown(),
            this.generateDistrictBreakdown(),
            this.generateYearBreakdown(),
            this.getDataset()
            ]).then( () => {});
    }

    async generateDistrictBreakdown() {
        const queryString = this.getQueryString();
        const url = queryString ? `/api/breakdown/district${queryString}` : '/api/breakdown/district';
        const data = await d3.json(url);
        const margin = {top: 20, right: 10, bottom: 50, left: 60};
        var svg = d3.select("#scatterChart");
        svg.attr('width', ( (window.innerWidth / 3) * 2) - margin.left - margin.right);
        svg.attr('height', this.chartHeight);
        const width = +svg.attr("width") - margin.left - margin.right;
        const height = +svg.attr("height") - margin.top - margin.bottom;
        const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var xScale = d3.scaleLinear()
            .domain(d3.extent(data, function (d) {
                return d.district;
            }))
            .range([0, width]);

        var yScale = d3.scaleLinear()
            .domain(d3.extent(data, function (d) {
                return d.count;
            }))
            .range([height, 0]);

        var xAxis = d3.axisBottom()
            .scale(xScale)
            .ticks(5);

        var yAxis = d3.axisLeft()
            .scale(yScale)
            .ticks(5);

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        g.append("g")
            .call(yAxis);

        var bubble = g.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "bubble")
            .attr("cx", function (d) {
                return xScale(d.district);
            })
            .attr("cy", function (d) {
                return yScale(d.count);
            })
            .attr("r", 10)
            .style("fill", "steelblue")
        bubble.attr("transform", "translate(30,15)scale(0.85)");

        g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -110)
            .attr("y", 30)
            .attr("class", "label")
            .text("Number of Crimes");

        g.append("text")
            .attr("x", (width / 2) + 60)
            .attr("y", height + 35)
            .attr("text-anchor", "end")
            .attr("class", "label")
            .text("District");
    }

    async generateYearBreakdown() {
        const queryString = this.getQueryString();
        const url = queryString ? `/api/breakdown/year${queryString}` : '/api/breakdown/year';
        const data = await d3.json(url);
        const svg = d3.select("#barChart")
        const margin = {top: 45, right: 45, bottom: 45, left: 45};
        svg.attr('width', window.innerWidth - margin.left - margin.right);
        svg.attr('height', this.chartHeight);
        const width = +svg.attr("width") - margin.left - margin.right;
        const height = +svg.attr("height") - margin.top - margin.bottom;
        const g = svg.append("g");

        var years = [];
        for (let k = 0; k < data.length; k++) {
            years[k] = data[k].year;
        }

        var xScale = d3.scaleBand()
            .domain(years)
            .range([margin.left, width])
            .padding(0.2);

        var yScale = d3.scaleLinear()
            .domain(d3.extent(data, function (d) {
                return d.count;
            }))
            .range([height, margin.top]);

        var index = 0;

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function (d) {
                return xScale(years[index++]);
            })
            .attr("y", function (d) {
                return yScale(d.count);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) {
                return height - yScale(d.count) + margin.top;
            })
            .style("fill", "steelblue");

        var yAxis = d3.axisLeft(yScale)
            .scale(yScale)
            .ticks(7);

        g.append("g")
            .attr("transform", "translate(" + (width + margin.right) + ",0)")
            .call(yAxis);

        svg.append("text")
            .attr("transform", "translate(" + (width / 2) + "," + (height + margin.top + 40) + ")")
            .style("text-anchor", "middle")
            .text("Crimes by Year");

        for (let i = 0; i < data.length; i++) {
            svg.append("text")
                .attr("transform", "translate(" + (xScale(years[i]) + 5) + "," + (height + margin.top + 15) + ")")
                .text(years[i]);
        }

    }

    async generateTypeBreakdown() {
        const queryString = this.getQueryString();
        const url = queryString ? `/api/breakdown/type${queryString}` : '/api/breakdown/type';
        const data = await d3.json(url);
        var svg = d3.select("#donutChart").attr('class', 'pie');
        const margin = {top: 0, right: 30, bottom: 30, left: 30};
        svg.attr('width', (window.innerWidth / 3) - margin.left - margin.right);
        svg.attr('height', this.chartHeight);
        const width = +svg.attr("width") - margin.left - margin.right;
        const height = +svg.attr("height") - margin.top - margin.bottom;
        const g = svg.append("g")
            .attr("transform", "translate(" + (width / 1.6) + "," + (height / 1.73) + ")");

        var thickness = 50;
        var duration = 500;

        var type_keys = [];
        for (let i = 0; i < data.length; i++) {
            type_keys[i] = data[i].type;
        }

        var radius = Math.min(width, height) / 2 - 25;
        var color = d3.scaleOrdinal()
            .domain(type_keys)
            .range(["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"]);

        var arc = d3.arc()
            .innerRadius(radius - thickness)
            .outerRadius(radius);

        var pie = d3.pie()
            .value(function (d) {
                return d.count;
            })
            .sort(null);

        var path = g.selectAll('path')
            .data(pie(data))
            .enter()
            .append("g")
            .on("mouseover", function (d) {
                let g = d3.select(this)
                    .style("cursor", "pointer")
                    .style("fill", "black")
                    .append("g")
                    .attr("class", "text-group");

                g.append("text")
                    .attr("class", "name-text")
                    .text(`${d.data.type}`)
                    .attr('text-anchor', 'middle')
                    .attr('dy', '-1.2em');

                g.append("text")
                    .attr("class", "value-text")
                    .text("Number of crimes: " + `${d.data.count}`)
                    .attr('text-anchor', 'middle')
                    .attr('dy', '.6em');
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .style("cursor", "none")
                    .style("fill", color(this._current))
                    .select(".text-group").remove();
            })
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(i))
            .on("mouseover", function (d) {
                d3.select(this)
                    .transition()
                    .duration(400)
                    .style("d", arc)
                    .style("cursor", "pointer")
                    .style("fill", "#324352");
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .transition()
                    .duration(750)
                    .attr("d", arc)
                    .style("cursor", "none")
                    .style("fill", color(this._current));
            })
            .each(function (d, i) {
                this._current = i;
            });
    }

    async getDataset() {
        const queryString = this.getQueryString();
        const url = queryString ? `/api/data${queryString}` : '/api/data';
        const data = await d3.json(url);
        const tableContainer = document.getElementById('tableContainer');
        const datatable = new DataTable(data, this.generateColumnMapping(), this.onRowClick.bind(this));
        if (datatable) {
            const table = datatable.toHtmlTable();
            if (table) {
                tableContainer.appendChild(table);
            }
        }
    }

    async saveReport() {
        const data = new FormData();
        data.append('type', this._type);
        data.append('district', this._district);
        data.append('year', this._year);
        console.log(data);
        const result = await this._httpClient.post('/save', data);
        console.log(result);
    }

    onRowClick(data) {
        try {
            const json = data.target.closest('tr').getAttribute('data-case');
            const crime = JSON.parse(json)
            window.location.href = `/detail?id=${crime.id}`;
        } catch (ex) {}
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

    search(evt) {
        const queryString = this.getQueryString(true);
        queryString ? window.location.href = queryString : window.location.reload();
    }

    getQueryString(appendOrigin) {
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
        let origin = appendOrigin ? `${window.location.origin}/index` : '';
        return queryString && queryString.length > 0 ? `${origin}?${queryString.join('&')}` : null;
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