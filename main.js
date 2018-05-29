


var vis = d3.select("#graph")
            .append("svg")
.attr("width", 500).attr("height", 500);

var nodes = [
    {x: 10, y: 90},
    {x: 70, y: 10},
    {x: 140, y: 50}
  ];


var getLinkPositions = function(x1, y1, x2, y2, width, height) {
	return [
	  x1+(width/2),
	  y1+(height/2),
	  x2+(width/2),
	  y2+(height/2)
	];
};

var links = [
  {source: nodes[0], target: nodes[1]},
  {source: nodes[2], target: nodes[1]}
];

WIDTH = 50;
HEIGHT = 30;



vis.selectAll(".line")
   .data(links)
   .enter()
   .append("line")
   .attr("x1", function(d) { return getLinkPositions(d.source.x,d.source.y, d.target.x, d.target.y, WIDTH, HEIGHT)[0]; })
   .attr("y1", function(d) { return getLinkPositions(d.source.x,d.source.y, d.target.x, d.target.y, WIDTH, HEIGHT)[1]; })
   .attr("x2", function(d) { return getLinkPositions(d.source.x,d.source.y, d.target.x, d.target.y, WIDTH, HEIGHT)[2]; })
   .attr("y2", function(d) { return getLinkPositions(d.source.x,d.source.y, d.target.x, d.target.y, WIDTH, HEIGHT)[3]; })
   .style("stroke", "rgb(6,120,155)");

var update = function(){
	vis.selectAll("circle.nodes")
	   .data(nodes)
	   .enter()
	   .append("svg:rect")
	   .attr("rx", 6)
	   .attr("ry", 6)
	   .attr("x", function(d) { return d.x; })
	   .attr("y", function(d) { return d.y; })
	   .attr("width", ""+WIDTH+"px")
	   .attr("height", ""+HEIGHT+"px")
	   .attr("fill", "purple")
}

vis.on('click', function() {
	var coords = d3.mouse(this);
	nodes.push({x:coords[0], y:coords[1]});
	update();
});

update();