/**
 * @author Administrator
 */

//this.legendflush = function(legend) {
//		setting.cols = [legend.current]
//		flush();
//	}
BfdWidget.line.prototype.legendflush = function(legend){
	var self = this
	self.cols=[legend.current,]
}
