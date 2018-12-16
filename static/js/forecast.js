d3.json("/api/predictive").then(data => {
	svg = d3.select("#futureChart")
		margin = {top:45, right: 45, bottom: 45, left:45},
		width = +svg.attr("width")-margin.left - margin.right,
		height = +svg.attr("height") - margin.top - margin.bottom,
		g = svg.append("g");

	var dates = [];
	for (i=0; i<312; i++){
		var date = new Date(data[i].ds);
		dates[i] = {month: date.getMonth(), data: data[i].yhat};
	}
	data = dates;

	var per_month = d3.nest()
	.key(function(d){
		return d.month;
	})
	.rollup(function(dates){
		return d3.sum(dates, function(d){
			return d.data;
		});
	})
	.entries(dates);

	var xScale = d3.scaleBand()
	.domain(d3.keys(per_month))
	.rangeRound([margin.left, width])
	.padding(0.3);

	var yScale = d3.scaleLinear()
	.domain(d3.extent(per_month, function(d){
		return d.value;
	}))
	.range([height, margin.top]);

	svg.selectAll("rect")
	.data(per_month)
	.enter()
	.append("rect")
	.attr("x", function(d){
		return xScale(d.key);
	})
	.attr("y", function(d){
		return yScale(d.value);
	})
	.attr("width", xScale.bandwidth())
	.attr("height", function(d){
		return height-yScale(d.value)+margin.top;
	})
	.style("fill", "steelblue");

	var yAxis = d3.axisLeft(yScale)
	.scale(yScale)
	.ticks(7);

	g.append("g")
	.attr("transform", "translate("+width+",0)")
	.call(yAxis);

	svg.append("text")
	.attr("transform", "translate("+(width/2)+","+(height+margin.top+45)+")")
	.style("text-anchor", "middle")
	.text("Predicted Number of Crimes in 2019");

	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

	for(i=0; i<per_month.length; i++){
		svg.append("text")
		.attr("transform", "translate("+(xScale(per_month[i].key)+5)+","+(height+margin.top+15)+")")
		.text(months[i]);
	}
});