
	var myData = [];
	var margin = 50;
	var marginAll = {top: 50, right: 50, bottom: 50, left: 50};
	var height = 500;
	var width = 1000;
	
	async function initialiseData() {
		myData = await d3.csv("https://ashagp2.github.io/mcs-ds/DataViz/2017.csv")
		update();
	}

		

	function update() {
		//var x = d3.scaleLog().domain([200, 105000]).range([0,500]);
		
		var tooltip = d3.select("#tooltip");
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
               .html("Country: "+ d.Country + " HappinessScore: "+d.HappinessScore);
             })
.on("mouseout", function() { tooltip.style("opacity", 0) });;

//Y axis
var svg = d3.select("svg");

svg.append("g").attr("transform","translate("+margin+","+margin+")").call(d3.axisLeft(y));

// text label for the y axis
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 )
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Happiness Score (Ranging between 0 - 10)");    

//X axis
xAxisNew = d3.axisBottom(x);
xAxisNew.tickFormat(d3.format("~s"));
xAxis = d3.select("svg").append("g").attr("transform","translate("+margin+","+(height+margin)+")").call(xAxisNew);

svg.append("text").attr("id","xAxisLabel")         
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + marginAll.top * 2) + ")")
      .style("text-anchor", "middle")
      .text("Importance of GDP per Capita");
	  
	}


// A function that switch to the second dataset:
function triggerTransition(param){
	var svg = d3.select("svg");
	var label = "";
  var x = d3.scaleLinear()
    .domain(d3.extent(myData, function(d) { if(param == "corruption") { 
							label = "Government Corruption";
							return d.GovernmentCorruption; 
						} else if(param == "freedom") { 
							label = "Freedom";
							return d.Freedom; 
						} else if(param == "family") { 
							label = "Family";
							return d.Family; 
						} else if(param == "gdp") {
							label = "GDP per Capita";
							return d.Economy_GDP_perCapita; 
						} else if(param == "life") {
							label = "Life Expectancy";							
							return d.LifeExpectancy; 
						} else if(param == "generosity") { 
						    label = "Generosity";
							return d.Generosity; 
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
						} else if(param == "gdp") { 
							return x(d.Economy_GDP_perCapita); 
						} else if(param == "life") { 
							return x(d.LifeExpectancy); 
						} else if(param == "generosity") { 
							return x(d.Generosity); 
						} 
                    });
	
	xAxis.transition().duration(1000).call(d3.axisBottom(x))

	// text label for the x axis
	d3.select("#xAxisLabel").remove();
	
	  
    svg.append("text").attr("id","xAxisLabel")          
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + marginAll.top * 2) + ")")
      .style("text-anchor", "middle")
      .text("Importance of "+label);
}
