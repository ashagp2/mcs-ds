var tooltip = d3.select("#tooltip");

	var myData = [];
	var margin = 50;
	var height = 500;
	var width = 1000;
	
	async function initialiseData() {
		myData = await d3.csv("https://ashagp2.github.io/mcs-ds/DataViz/2017.csv")
		update();
	}

		

	function update() {
		//var x = d3.scaleLog().domain([200, 105000]).range([0,500]);
		
	
		var x = d3.scaleLinear()
    .domain(d3.extent(myData, function(d) { //console.log(d.GDP);
	                                       return d.Economy_GDP_perCapita; }))
    .range([0, width]);
var y = d3.scaleLinear()
    .domain(d3.extent(myData, function(d) { return d.HappinessScore; }))
    .range([height, 0]);
	
	
		//var x = d3.scaleLog().domain([0.9, 120]).range([0,width]);
        //var y = d3.scaleLinear().domain([3, 10]).range([height, 0]);
		

d3.select("svg").attr("width",width+2*margin).
attr("height",height+2*margin).
append("g").attr("transform","translate("+margin+","+margin+")").
selectAll("circle").data(myData).enter().append("circle").attr("cx",function(d) {return x(d.Economy_GDP_perCapita);}).
attr("cy",function(d){return y(d.HappinessScore);}).
attr("r", function(d){return 2+parseInt(d.HappinessScore);})
.on("mouseover", function(d,i) {
                tooltip.style("opacity", 1)
               .style("left",(d3.event.pageX)+"px")
               .style("top",(d3.event.pageY)+"px")
               .html("Country "+" is "+ d.Country);
             })
.on("mouseout", function() { tooltip.style("opacity", 0) });;

//Y axis
d3.select("svg").append("g").attr("transform","translate("+margin+","+margin+")").call(d3.axisLeft(y));

//X axis
xAxisNew = d3.axisBottom(x);
//xaxis.tickValues([0,1,20,30,40,50,100,110]);
xAxisNew.tickFormat(d3.format("~s"));
xAxis = d3.select("svg").append("g").attr("transform","translate("+margin+","+(height+margin)+")").call(xAxisNew);

	}



// A function that switch to the second dataset:
function triggerTransition(param){
  var x = d3.scaleLinear()
    .domain(d3.extent(myData, function(d) { if(param == "corruption") { 
							return d.GovernmentCorruption; 
						} else if(param == "freedom") { 
							return d.Freedom; 
						} else if(param == "family") { 
							return d.Family; 
						}
					}))
    .range([0, width]);
  d3.select("svg")
    .selectAll("circle")
    .transition()
    .delay(100)
    .duration(2000)
    .attr("cx", function(d){if(param == "corruption") { 
							return x(d.GovernmentCorruption); 
						} else if(param == "freedom") { 
							return x(d.Freedom); 
						} else if(param == "family") { 
							return x(d.Family); 
						}} );
	
	xAxis.transition().duration(1000).call(d3.axisBottom(x))

	
}
