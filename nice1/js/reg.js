/**
 * @author Administrator
 */
$(function(){
    $('.btn-info').click(function(){
        $('form').submit()
    })
    var validater = $('form').validate({
        submitHandler: function(form){
            console.info('submit')
            return false
        },
        rules: {
            code: {
                required: true
            }
        },
        messages: {
            code: {
                required: "请输入您的邀请码"
            }
        },
        focusInvalid: true,
        onkeyup: false,
        focusCleanup: true,
        onfocusout: function(element){
            $(element).valid()
        },
        errorElement: 'p',
        errorClass: "help-block error",
        errorPlacement: function(error, element){
            element.parent().find('p').remove()
            error.appendTo(element.parent())
        },
        success: function(label){
            label.remove()
        }
    })
})
/*
$(function(){
	
    $('a.select_button:eq(0)').click(function(){
        $('a.select_button:eq(1)').next().hide()
        $(this).next().slideToggle()
    })
    $('a.select_button:eq(1)').click(function(){
        $('a.select_button:eq(0)').next().hide()
        $(this).next().slideToggle()
    })
    $('.f_r').find('a:last').click(function(){
        console.info('click')
        $(this).parent().parent().parent().slideUp()
    })
})
*/
$(function(){
    function RegList(dom, list, checkboxname){
		    function CheckDom(item, name){
			        this.dom = $('<li></li>')
			        this.checkboxdom = $('<input  type="checkbox"/>')
					this.checkboxdom.val( item.id).attr('name',name)
			        this.dom.append(this.checkboxdom)
			        $('<span></span>', {
			            text: item.content
			        }).appendTo(this.dom)
			    }
        var self = this
        this.vals = []
        this.checkboxes = $()
        this.paserList = function(){
            $.each(list, function(i, item){
                var c = new CheckDom(item, checkboxname)
                c.dom.appendTo(dom.children('ul:first'))
                self.checkboxes= self.checkboxes.add(c.checkboxdom)
                c.checkboxdom.change(function(){
					console.info( c.checkboxdom.size())
                    if (self.checkboxes.filter(':checked').size() == 0) {
                        alert('至少选择一项.')
                    }else if(self.checkboxes.filter(':checked').size() == 11){
						alert('最多可以选十项.')
						$(this).attr('checked',false)
					}
                })
            })
        }
		this.reset=function(){
			self.checkboxes.each(function(){
					var d=$(this)
					d.attr('checked',false)
					$.each(self.vals,function(i1,item1){
						if(d.val()===item1){
							 d.attr('checked',true)
						}
					})
				})
		}
		this.regBtn=function(){
			dom.find('.f_r > a:first').click(function(){
				if(self.checkboxes.filter(':checked').size()==0){
					self.vals = []
					dom.prev().html(dom.find('.f_l').html())
					dom.next().addClass('error').show()
				}else{
					    self.vals=self.checkboxes.filter(':checked').map(function(){
							return $(this).val()
						}).get()
						dom.prev().html(self.checkboxes.filter(':checked').map(function(i){
						     return $(this).next().html()
					    }).get().join(','))
					dom.next().removeClass('error')	.hide()
				}
				dom.slideUp()
			})
			dom.find('.f_r > a:last').click(function(){
				dom.slideUp()
				self.reset()
			})
			dom.prev().click(function(){
				if(dom.is(':hidden')){
					$('.controls-checkbox').hide()
					dom.slideDown()
				}else{
					dom.find('.f_r > a:last').click()
				}
			})
		}
        this.init = function(){
            this.paserList()
			this.regBtn()
        }
		this.init()
    }
	var l1=new RegList($('.controls-checkbox:eq(0)'),[{id:'test',content:'测试'}],'test')
})


