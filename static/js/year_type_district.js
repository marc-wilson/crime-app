// crimes by year
d3.json("/api/breakdown/year").then(data => {

    svg = d3.select("#barChart")
    margin = {top: 45, right: 45, bottom: 45, left: 45},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g");

    var years = [];
    for (k = 0; k < data.length; k++) {
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
        .text("Crimes by Year")

    for (i = 0; i < data.length; i++) {
        svg.append("text")
            .attr("transform", "translate(" + (xScale(years[i]) + 5) + "," + (height + margin.top + 15) + ")")
            .text(years[i]);
    }
});

class Index {
    constructor(year = null, type = null, district = null) {
        this.typeEl = document.getElementById('typeFilter');
        this.yearEl = document.getElementById('yearFilter');
        this.districtEl = document.getElementById('districtFilter');
        this.searchEl = document.getElementById('btnSearch');
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
        await this.generateTypeBreakdown();
        await this.generateDistrictBreakdown();
    }
    async generateDistrictBreakdown() {
        const queryString = this.getQueryString();
        const url = queryString ? `/api/breakdown/district${queryString}` : '/api/breakdown/district';
        const data = await d3.json(url);
        var svg = d3.select("#scatterChart");
        const margin = {top: 20, right: 10, bottom: 50, left: 60};
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
    async generateTypeBreakdown() {
        const queryString = this.getQueryString();
        const url = queryString ? `/api/breakdown/type${queryString}` : '/api/breakdown/type';
        const data = await d3.json(url);
        var svg = d3.select("#donutChart").attr('class', 'pie');
        const margin = {top: 0, right: 30, bottom: 30, left: 30};
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

        var radius = Math.min(width, height) / 2;
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

    search(evt) {
        const queryString = this.getQueryString(true);
        console.log(queryString);
        window.location.href = queryString;
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