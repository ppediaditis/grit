var WIDTH = 50;
var HEIGHT = 30;

var vis = d3.select("#graph")
            .append("svg")
.attr("width", 500).attr("height", 500);

var nodes = [
    {x: 10, y: 90, c: "purple"},
    {x: 70, y: 10, c: "purple"},
    {x: 140, y: 50, c: "purple"}
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


var update = function(){

	vis.selectAll(".line")
       .data(links)
       .enter()
       .append("line")
       .attr("x1", function(d) { return getLinkPositions(d.source.x,d.source.y, d.target.x, d.target.y, WIDTH, HEIGHT)[0]; })
       .attr("y1", function(d) { return getLinkPositions(d.source.x,d.source.y, d.target.x, d.target.y, WIDTH, HEIGHT)[1]; })
       .attr("x2", function(d) { return getLinkPositions(d.source.x,d.source.y, d.target.x, d.target.y, WIDTH, HEIGHT)[2]; })
       .attr("y2", function(d) { return getLinkPositions(d.source.x,d.source.y, d.target.x, d.target.y, WIDTH, HEIGHT)[3]; })
       .style("stroke", "rgb(6,120,155)");

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
	   .attr("fill", function(d) { return d.c; });

}

var pointInRectangle = function(p_x, p_y, x, y, width, height ) {
	if (p_x < x || p_y < y){
		return false;
	}
	if (p_x - width > x || p_y - height > y) {
		return false;
	}

	return true;
}

var nodeAtCoords = function(coords, action, not_found_action) {
	var found = false;
	//use traditional loop (we all hate JS)
	nodes.forEach(function(node){
		if (pointInRectangle(coords[0], coords[1], node.x, node.y, WIDTH, HEIGHT)) {
			if(action) action(node);
			found = true;
		}
	});

	if (found == false && not_found_action) not_found_action();
}

vis.on('click', function() {
	var coords = d3.mouse(this);


	nodeAtCoords(coords,null,
		                             function(node){
                                       	nodes.push({x:coords[0], y:coords[1], c:"purple" });
	                                 });
	update();
});

vis.on('mousedown', function(){
	var coords = d3.mouse(this);

	nodeAtCoords(coords,
		                             function(node){
                                       node.c = "green"
	                                 });


	update();
});

update();