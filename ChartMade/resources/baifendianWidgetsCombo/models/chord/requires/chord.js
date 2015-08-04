(function($, d3, document, window) {
	window.d3chord = function(setting) {
		var self = this
		var arcs = [],
			chords = [];
		var groups = setting.groups || [{
			name: "no groups"
		}];
		var keyindex = {}
		var matrix = []
			groups.forEach(function(n, i) {
				var row = []
				groups.forEach(function(m, j) {
					if (n==m) {
						row.push(1)
					} else {
						row.push(0)
					}
				})
				matrix.push(row)
				keyindex[n.key] = i
			})
		var last_chord = {};

		var fill = d3.scale.category10();
		var chord_fill = d3.scale.category20();

		var w = setting.width || 600,
			h = setting.height || 600,
			r0 = Math.min(w, h) * .41,
			r1 = r0 * 1.1,
			r = r1 - r0;
		var font_size = 16;
		

		this.setData = function(data) {
			var temp_matrix = [];
			data.forEach(function(item, index) {
				var temp_row = []
				data.forEach(function(d, index2) {
					temp_row.push(0)
				})
				temp_matrix.push(temp_row)
				matrix[index][index] = 0
				item["to"].forEach(function(d) {
					matrix[index][keyindex[d.key]] = d.value
					temp_matrix[index][keyindex[d.key]] = 1
				})

			})
			rerender(temp_matrix, matrix);
		}
		var arc = d3.svg.arc()
					.startAngle(function(d) {
						return d.startAngle
					})
					.endAngle(function(d) {
						return d.endAngle
					})
					.innerRadius(r0)
					.outerRadius(r1);

		var chordl = d3.svg.chord().radius(r0);
		var arcs_ev = {
			mouseover:function(g, i) {
				svg.selectAll("g.chords path")
					.filter(function(d) {
						return d.source.index != i && d.target.index != i;
					})
					.transition()
					.style("opacity", .1)
			},
			mouseout:function(g, i) {
				svg.selectAll("g.chords path")
					.filter(function(d) {
						return d.source.index != i && d.target.index != i;
					})
					.transition()
					.style("opacity", 1)
			}
		};
		var chords_ev = {
			mouseover:function(g, i) {
				svg.selectAll("g.chords path")
					.filter(function(d) {
						return d !== g;
					})
					.transition()
					.style("opacity", .1)
			},
			mouseout:function(g, i) {
				svg.selectAll("g.chords path")
					.transition()
					.style("opacity", 1)
			}
		}
		var svg = render(matrix);
		if(setting.url){
			$.ajax({url:setting.url}).done(function(data){
				self.setData(data)
				if(setting.onload){
					setting.onload()
				}
			})
		}
		function render(data) {

			var chord = d3.layout.chord()
						.padding(.05)
						.sortSubgroups(d3.descending)
						.matrix(data);
			// create svg
			var svg = d3.select("#" + setting.container)
						.append("svg")
						.attr("width", w)
						.attr("height", h)
						.append("g")
						.attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

			// draw arcs
			arcs = svg.append("g")
				.attr("class", "arcs")
				.selectAll("path")
				.data(chord.groups).enter()
				.append("path")
				.attr("class", "arc")
				.attr("d", d3.svg.arc().innerRadius(r0).outerRadius(r1))
				.attr("id", function(d, i) {
					return "group" + i;
				})
				.style("fill", function(d, i) {
					return fill(d.index);
				})
				.style("fill-opacity", ".67")
				.style("stroke", "#000")
				.style("stroke-width", "1px")
				.on("mouseover", arcs_ev.mouseover)
				.on("mouseout", arcs_ev.mouseout)
			arcs.append("title").text(function(d, i) {
					return groups[i].name + "的总访次: " + numFix(d.value);
				})
			// draw labels
			drawLabels(chord, svg)
			// draw chords
			drawTicks(chord, svg);

			last_chord = chord;

			return svg;
		}

		function rerender(temp_data, data) {
			var chord = d3.layout.chord()
							.padding(.05)
							.sortSubgroups(d3.descending)
							.matrix(data);
			var temp_chord = d3.layout.chord()
							.padding(.05)
							.sortSubgroups(d3.descending)
							.matrix(temp_data);
			svg.select("g.chords").remove();
			svg.select("g.labels").remove();
			svg.select("g.ticks").remove();
			arcs.on("mouseover",$.noop).on("mouseout",$.noop);
			// update arcs
			svg.selectAll(".arc")
						.data(chord.groups)
						.transition()
						.duration(1500)
						.attrTween("d", arcTween(last_chord))
						.each("end", function(d, i) {
							if (i == 0) {
								drawLabels(chord, svg)
								arcs.on("mouseover", arcs_ev.mouseover)
									.on("mouseout", arcs_ev.mouseout)
							}
						});
				svg.selectAll(".arc title").data(chord.groups).text(function(d, i) {
					return groups[i].name + "的总访次: " + numFix(d.value);
				})
			//draw chords
			var chords = svg.append("g")
							.attr("class", "chords")
							.selectAll("path")
							.data(chord.chords).enter().append("path")
							.style("stroke", '#333')
							.style("opacity", 1)
							.style("fill", function(d, i) {
								return fill(d.target.index);
							})
							.style("fill-opacity", ".67")
							.style("stroke", "#000")
							.style("stroke-width", ".5px")
				chords.transition()
					.duration(1500)
					.attrTween("d", chordTween(temp_chord))
					.each("end", function(d, i) {
						if (i == 0) {
							drawTicks(chord, svg);
							chords.on("mouseover", chords_ev.mouseover)
							.on("mouseout", chords_ev.mouseout)
						}
					});
				chords.append("title").text(function(d, i) {
					return groups[d.source.index].name + "到" + groups[d.target.index].name + "的页面数量:" + numFix(d.source.value) + "，" + groups[d.target.index].name + "到" + groups[d.source.index].name + "的页面数量:" + numFix(d.target.value)
				})

			//last_chord = chord;
		}

		function drawLabels(chord, svg) {

			var pageArc = svg.selectAll(".arc");
			svg.append("g")
					.attr("class", "labels")
					.selectAll("text")
					.data(chord.groups).enter().append("text")
					.attr("font-size", font_size + "px")
					.attr("x", (r - font_size)/2)
					.attr("dy", (r + font_size)/2)
					.append("textPath")
					.attr("xlink:href", function(d, i) {
						return "#group" + i;
					})
					.text(function(d, i) {
						return groups[i].name;
					})
					.filter(function(d, i) {
						return (pageArc[0][i].getTotalLength() - r*4 + font_size)/2 < this.getComputedTextLength()
					})
					.remove();
		}

		function drawTicks(chord, svg) {
			var ticks = svg.append("svg:g").attr("class", "ticks").attr("opacity", 0.1).selectAll("g").data(chord.groups).enter().append("svg:g").selectAll("g").data(groupTicks).enter().append("svg:g").attr("transform", function(d) {
				return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" + "translate(" + r1 + ",0)";
			});

			svg.selectAll(".ticks").transition().duration(700).attr("opacity", 1)

			ticks.append("svg:line").attr("x1", 1).attr("y1", 0).attr("x2", 5).attr("y2", 0).attr("stroke", '#000')

			ticks.append("svg:text").attr("x", 8).attr("dy", '.35em').attr("text-anchor", function(d) {
				return d.angle > Math.PI ? "end" : null;
			}).attr("transform", function(d) {
				return d.angle > Math.PI ? "rotate(180)translate(-16)" : null;
			}).text(function(d) {
				return d.label;
			});
			
			return ticks;
		}

		function arcTween(chord) {
			return function(d, i) {
				var it = d3.interpolate(chord.groups()[i], d);
				return function(t) {
					return arc(it(t));
				}
			}
		}
		function chordTween(chord) {
			return function(d, i) {
				var it = d3.interpolate(chord.chords()[i], d);
				return function(t) {
					return chordl(it(t));
				}
			}
		}

		// Returns an array of tick angles and labels, given a group.
		function groupTicks(d) {
			var k = (d.endAngle - d.startAngle) / d.value;
			return d3.range(0, d.value, 10).map(function(v, i) {
				return {
					angle: v * k + d.startAngle,
					label: i % 5 ? null : v
				};
			});
		}

		function numFix(num) {
			var i = (num + "").indexOf(".");
			if (i > 0) {
				var newNum = parseInt(num)
				if ((num + "").charAt(i + 1) > 4) {
					newNum++;
				}
				return newNum
			} else {
				return num
			}
		}

	}
})(jQuery, d3, document, window);