(function($, d3, document, window) {
	window.d3ForceDirected = function(setting) {
		var self = this
		var w = setting.width || 960,
			h = setting.height || 500,
			vis_size = Math.sqrt(Math.pow(w,2)+Math.pow(h,2))
		var color = d3.scale.category20();
		var font_size = 16
		var distance = Math.sqrt(Math.pow(w,2)+Math.pow(h,2))*0.3
		var force = d3.layout.force()
						.charge(-120)
						.linkDistance(distance)
						.linkStrength(.5)
						.gravity(.1)
						.size([w, h]);

		var svg = d3.select("#" + setting.container).append("svg")
					.attr("width", w).attr("height", h);
		this.setData = function(data) {
			force.nodes(data.nodes).links(data.links).start();

			var link = svg.selectAll("line.link")
						.data(data.links).enter().append("line")
						.attr("class", "link")
						.style("stroke-width", function(d) {
							//return Math.sqrt(d.value);
							//console.log(d)
							return 1
						})
						.style("stroke","#999")
						.style("stroke-opacity",".6");

			var node = svg.selectAll("g.node")
						.data(data.nodes).enter().append("g")
						.attr("class", "node")
						.style("fill", function(d) {
							return color(d.group);
						})
						//
						.call(force.drag);
				node.append("circle").attr("r",function(d){
					if(d.weight){
						return vis_size*d.weight/360
					}else{
						return 15
					}
				})
				.style("stroke","#000")
				.style("stroke-width",".5px")
				.on("mouseover",function(){
					d3.select(this).style("stroke","#fff")
				})
				.on("mouseout",function(){
					d3.select(this).style("stroke","#000")
				})
				node.append("text")
					.style("cursor","pointer")
					.style("font-size",font_size)
					.style("text-anchor","middle")
					.style("fill","#000")
					.style("font-weight","bold")
					.attr("y",font_size/3)
					.append("tspan")
					.text(function(d) {
						return d.name;
					})
					.filter(function(d, i) {
						return false
						//return (pageArc[0][i].getTotalLength() - r*4 + font_size)/2 < this.getComputedTextLength()
					})
					.remove();

				force.on("tick", function() {
					link.attr("x1", function(d) {
						return d.source.x;
					}).attr("y1", function(d) {
						return d.source.y;
					}).attr("x2", function(d) {
						return d.target.x;
					}).attr("y2", function(d) {
						return d.target.y;
					});

					node.attr("transform", function(d) {
						return "translate("+d.x+","+d.y+")";
					})
					// .attr("cy", function(d) {
					// 	return d.y;
					// });
				});
		}
	}
})(jQuery, d3, document, window)