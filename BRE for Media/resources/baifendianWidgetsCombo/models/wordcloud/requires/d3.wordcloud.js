(function(d3, $, document, window) {
	window.D3WordCloud = function(setting) {
		var fill = d3.scale.category20();
		var w = setting.width || 300;
		var h = setting.height || 300;
		var vis = d3.select("#" + setting.container).append("svg").attr("width", w).attr("height", h)
					.append("g").attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
		var fontSize = d3.scale.log().range([15, 35]);
		var cloudlayout = d3.layout.cloud().size([w, h])
		this.setData = function(data) {
			cloudlayout.words(data).rotate(function() {
				return ~~ (Math.random() * 5) * 30 - 60;
			}).fontSize(function(d) {
				var size = fontSize(+d.value)
				//console.log(size-d.value,fontSize);
				return size;
			}).on("end", draw).start();
			
		}
		function draw(data, bounds) {
			//console.log(data.length);
			scale = bounds ? Math.min(w / Math.abs(bounds[1].x - w / 2), w / Math.abs(bounds[0].x - w / 2), h / Math.abs(bounds[1].y - h / 2), h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;
			words = data;
			var text = vis.selectAll("text").data(words, function(d) {
				return d.text.toLowerCase();
			});
			text.transition().duration(1000).attr("transform", function(d) {
				return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			}).style("font-size", function(d) {
				return d.size + "px";
			});
			
			text.enter().append("text").attr("text-anchor", "middle").attr("transform", function(d) {
				return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			}).style("font-size", function(d) {
				return d.size + "px";
			}).on("click", function(d) {
				//load(d.text);
			}).style("opacity", .01).transition().duration(1000).style("opacity", 1);

			text.style("font-family", function(d) {
				return '"Helvetica Neue", "HelveticaNeue", Helvetica, Arial, "Lucida Grande", sans-serif';
			}).style("cursor",function(){
				return 'pointer';
			}).style("font-weight",function(){
				return 'bold';
			}).style("fill", function(d) {
				return fill(d.text.toLowerCase());
			}).text(function(d) {
				return d.text;
			});
			vis.transition().delay(1000).duration(750).attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")");
		}
	}
})(d3, $, document, window)