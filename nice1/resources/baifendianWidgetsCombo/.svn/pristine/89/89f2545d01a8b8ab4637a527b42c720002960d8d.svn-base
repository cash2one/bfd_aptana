BfdWidget.queryfactor = function(setting, global) {
	Widget.call(this)
	if(setting.cols&&setting.cols.length)setting.option.groups = setting.cols
	var submit = {
		text:"查询",
		type:"button",
		dom:$('<button type="button" class="commit button"></button>')
	};
	var theme = setting.theme||global.theme||'default';

	var self = this;
	var Condition = function(param,container){
		$.extend(true,this,param);
		this.SSelect = function(theme){
			var dom = $('<select></select>',{
				'class':"condition select",
				name:this.name
			});
			if($.isArray(this.options)){
				var options_html;
				$.each(this.options,function(n,i){
					options_html+='<option value="'+i.value+'">'+i.text+'</option>';
				});
				dom.html(options_html)
			}
			if(theme!=='default'){
				dom.sSelect();
			}
			return dom;
		}
		this.setPlaceholder = function(){
			var placeholder = this.placeholder
			this.dom.focusin(function(){
				if($(this).val()===placeholder){
					$(this).val('').css('color','#000');
				}
			}).focusout(function(){
				if($(this).val()===''){
					$(this).val(placeholder).css('color','#ccc');
				}else{
					$(this).css('color','#000');
				}
			}).trigger('focusout')
		}
		if(!this.container){
			if(this.type==="select"){
				this.dom = this.SSelect(theme)
			}else{
				this.dom = $('<input/>',{
					type:this.type,
					'class':"condition "+this.type,
					name:this.name
				});
				if(this.placeholder){
					this.setPlaceholder()
				}
			}
			container.append(this.dom);
		}else{
			this.dom = $("#"+this.container).addClass("condition").attr("name",this.name);
			if(this.type==="select"){
				if(theme!=='default'){
					var opts = {}
					if(this.placeholder){
						opts.defaultText = this.placeholder
						//this.dom.prepend('<option selected="selected" disabled="disabled">'+this.placeholder+'</option>')
					}
					this.dom = this.dom.sSelect(opts);
				}
			}else{
				if(this.placeholder){
					this.setPlaceholder()
				}
			}
			
		}

	}
	Condition.prototype = {
		value:function(){
			return this.dom.val();
		}
	};
	var Factor = function(setting){
		var _f = this;
		_f.conditions = [];
		_f.submit = [];
		var container = $("#"+setting.container);
		container.addClass("queryfactor_container").addClass(theme)
		$.each(setting.option.groups,function(n,i){
			var condition = new Condition(i,container);
			_f.conditions.push(condition);
		});
		if(setting.option.submit){
			if(setting.option.submit.bychange){
				if($.isArray(setting.option.submit.bychange)){
					$.each(setting.option.submit.bychange,function(n,i){
						_f.submit.push(_f.conditions[i])
					})
				}else{
					_f.submit.push(_f.conditions[setting.option.submit.bychange])
				}
			}else{
				$.extend(submit,setting.option.submit);
				if(submit.html){
					submit.html = submit.html.replace(/\{\{text\}\}/g,submit.text)
					submit.dom = $(submit.html)
				}
				_f.submit.push(submit);
			}
		}else{
			submit.dom.text(submit.text)
			_f.submit.push(submit);
		}
		if($.inArray(submit,_f.submit)>=0){
			container.append(submit.dom);
		}
		this.dom = container;
	}
	Factor.prototype = {
		getValue:function(){
			var param = {};
			$.each(this.conditions,function(n,i){
				var val = i.value()
				if(val&&val!==''&&val!==i.placeholder){
					param[i.name] = val;
				}
			});
			return param;
		},
		commit:function(fun){
			var self = this
			var func = function(){
				fun(self.getValue())
			};
			$.each(this.submit,function(n,i){
				self[i.type](i.dom,func);
			})
		},
		button:function(dom,func){
			dom.click(func);
		},
		text:function(dom,func){
			dom.change(func);
		},
		select:function(dom,func){
			dom.change(func);
		}
	};
	this.init = function() {
		self.factor = new Factor(setting)
		self.addEvent('submit', function() {})
		self.factor.commit(function(param) {
			self.fireEvent('submit',param)
		});
	};
	this.init();
}