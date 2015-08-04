/**
 * @author Administrator
 */
function cateCheckbox(json,rander,defaultData){
	                var delimiter='->'
					if(defaultData){
						defaultData=$.map(defaultData,function(s){
							return delimiter+s
						})
					}
					var cateTree={}
					function Categories(json,path,hide){
						var self=this
						self.alterbuild=[]
	                    function buildDom(){
	                        self.dom = $('<div class="area">' +
	                        '<div class="choose-box">' +
	                        '<ul></ul>' +
	                        '</div>' +
	                        '<div class="choose-btn">' +
	                        '</div>' +
	                        '</div>')
	                        $.each(json, function(k, v){
	                            var l = $('<li></li>')
	                            var c = $('<input type="checkbox" />').appendTo(l).data('path',path+delimiter+k)
								if(defaultData){
									$.each(defaultData,function(i,item){
										if(item.indexOf(path+delimiter+k)==0){
											c.attr('checked',true)
											if(item.length>(path+delimiter+k).length){
												self.alterbuild.push(function(){
													var cate=new Categories(v,path+delimiter+k,true)
												    cateTree[path+delimiter+k]=cate
												})
											}
										}
									})
								}
	                            var s = $('<span></span>').html(k).appendTo(l)
								s.click(function(){
									if(!$(this).parent().hasClass('selected')){
	//									$(rander).find('li.selected').removeClass('selected')
										$(this).parent().siblings().removeClass('selected')
										$(this).parent().parent().parent().parent().nextAll().find('li.selected').removeClass('selected')
										$(this).parent().parent().parent().parent().nextAll().hide()
										$(this).parent().addClass('selected')
										if(!$.isEmptyObject(v)){
												if(!cateTree[path+delimiter+k]){
													var cate=new Categories(v,path+delimiter+k)
													cateTree[path+delimiter+k]=cate
//													if($(this).prev().is(':checked')){
//													    cate.dom.find('input:checkbox').attr('checked',true)
//											     	}
												}else{
													cateTree[path+delimiter+k].dom.show()
												}
									        	
										}
									}
								})
								c.change(function(){
									if($(this).is(':checked')){
										$(this).parent().parent().parent().parent().prevAll(':visible').find('li.selected input:checkbox').attr('checked',true)
	//									alert(path+delimiter+k)
									}else{
										if(cateTree[path+delimiter+k]){
											cateTree[path+delimiter+k].dom.find('input:checkbox:checked').click()
										}
	//									if($(this).parent().parent().find('input:checkbox:checked').size()==0){
	//										$(this).parent().parent().parent().parent().prevAll(':visible:last').find('li.selected input:checkbox').attr('checked',false)
	//									}
	//									$(this).parent().parent().parent().parent().nextAll(':visible').find('li.selected input:checkbox').attr('checked',true)
									}
								})
	                            l.appendTo(self.dom.find('ul'))
	                        })
							$('<a  class="all">全选</a>').appendTo(self.dom.find('.choose-btn')).click(function(){
								$(this).parent().parent().find('input:checkbox').not(':checked').click()
							})
							$( '<a class="reverse">反选</a>').appendTo(self.dom.find('.choose-btn')).click(function(){
								$(this).parent().parent().find('input:checkbox').click()
							})
							if(hide){
								self.dom.hide()
							}
	                        self.dom.appendTo(rander)
							$.each(self.alterbuild,function(i,item){
								item()
							})
	                    }
	                    self.init = function(){
	                        buildDom()
	                    }
	                    self.init()
	                }
					var c=new Categories(json,'')
					return {
						getSelectPath:function(){
							var result=[]
							$(rander).find(' input:checkbox:checked').each(function(){
								var path=$(this).data('path'),has=false
								$.each($.extend([],result),function(i,item){
									if(path.length>=item.length&&path.indexOf(item)==0){
										result[i]=path
										has=true
									}else if(item.length>path.length&&item.indexOf(path)==0){
										has=true
									}
								})
								if(!has){
									result.push($(this).data('path'))
								}
							})
						   return $.map(result,function(s){
								return s.substr(delimiter.length)
							})
						}
					}
				}
function cateRadiobox(json,rander,defaultData){
					var delimiter='->'
					if(defaultData){
						defaultData=$.map(defaultData,function(s){
							return delimiter+s
						})
					}
					var cateTree={}
					function Categories(json,path,hide){
						var self=this
						self.alterbuild=[]
	                    function buildDom(){
	                        self.dom = $('<div class="area">' +
	                        '<div class="choose-box">' +
	                        '<ul></ul>' +
	                        '</div>' +
	                        '</div>')
	                        $.each(json, function(k, v){
	                            var l = $('<li></li>')
	                            var c = $('<input type="radio" />').attr('name','ooo'+path).appendTo(l).data('path',path+delimiter+k)
	                            if(defaultData){
									$.each(defaultData,function(i,item){
										if(item.indexOf(path+delimiter+k)==0){
											c.attr('checked',true)
											if(item.length>(path+delimiter+k).length){
												self.alterbuild.push(function(){
													var cate=new Categories(v,path+delimiter+k,true)
												    cateTree[path+delimiter+k]=cate
												})
											}
										}
									})
								}
							    var s = $('<span></span>').html(k).appendTo(l)
								s.click(function(){
									if(!$(this).parent().hasClass('selected')){
	//									$(rander).find('li.selected').removeClass('selected')
										$(this).parent().siblings().removeClass('selected')
										$(this).parent().parent().parent().parent().nextAll().find('li.selected').removeClass('selected')
										$(this).parent().parent().parent().parent().nextAll().hide()
										$(this).parent().addClass('selected')
										if(!$.isEmptyObject(v)){
												if(!cateTree[path+delimiter+k]){
													var cate=new Categories(v,path+delimiter+k)
													cateTree[path+delimiter+k]=cate
//													if($(this).prev().is(':checked')){
//													    cate.dom.find('input:radio').attr('checked',true)
//											     	}
												}else{
													cateTree[path+delimiter+k].dom.show()
												}
									        	
										}
									}
								})
								c.change(function(){
									if($(this).is(':checked')){
//										$(this).parent().parent().find('input:radio:checked')
//										alert($(this).parent().parent().parent().parent().siblings().find('li.selected input:radio:checked').size())
										$(this).parent().parent().parent().parent().siblings().find('li input:radio:checked').attr('checked',false)
										$(this).parent().parent().parent().parent().prevAll(':visible').find('li.selected input:radio').attr('checked',true)
	                                     
	//									alert(path+delimiter+k)
									}else{
										if(cateTree[path+delimiter+k]){
											cateTree[path+delimiter+k].dom.find('input:radio:checked').click()
										}
	//									if($(this).parent().parent().find('input:radio:checked').size()==0){
	//										$(this).parent().parent().parent().parent().prevAll(':visible:last').find('li.selected input:radio').attr('checked',false)
	//									}
	//									$(this).parent().parent().parent().parent().nextAll(':visible').find('li.selected input:radio').attr('checked',true)
									}
								})
	                            l.appendTo(self.dom.find('ul'))
	                        })
	                        if(hide){
								self.dom.hide()
							}
	                        self.dom.appendTo(rander)
							$.each(self.alterbuild,function(i,item){
								item()
							})
	                    }
	                    self.init = function(){
	                        buildDom()
	                    }
	                    self.init()
	                }
					var c=new Categories(json,'')
					return {
						getSelectPath:function(){
							var result=[]
							$(rander).find(' input:radio:checked').each(function(){
								var path=$(this).data('path'),has=false
								$.each($.extend([],result),function(i,item){
									if(path.length>=item.length&&path.indexOf(item)==0){
										result[i]=path
										has=true
									}else if(item.length>path.length&&item.indexOf(path)==0){
										has=true
									}
								})
								if(!has){
									result.push($(this).data('path'))
								}
							})
							return $.map(result,function(s){
								return s.substr(delimiter.length)
							})
						}
					}
				}