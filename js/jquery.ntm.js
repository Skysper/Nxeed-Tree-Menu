/* jQuery Nxeed's Tree Menu v1 | (c) 2014 Nxeed | https://github.com/nxeed */
/* jQuery Nxeed's Tree Menu v2 | (c) 2017 Skysper | https://github.com/Skysper */
(function($) {
    var defaults = {
        autoParentDetection: true,
        autoActiveDetection: true,
        itemsUniqueClasses: true,
        itemsExpandAll:true,
        parentClass: 'parent',
        activeClass: 'active',
        selectedClass: 'selected',
        expandClass: 'opened',
        collapseClass: 'closed',
        // spoilerButtonClickMinX: 4,
        // spoilerButtonClickMaxX: 20,
        // spoilerButtonClickMinY: 8,
        // spoilerButtonClickMaxY: 24,
        slideEffect: true
    };

    var methods = {
        init: function(params) {
            var options = $.extend({}, defaults, params);
            function initElements(parent,data)
            {
                $.each(data,function(index,ele){
                    var li=$("<li></li>");
                    parent.append(li);
                    var a = $('<a href="#" data-value="'+ele.value+'">'+ele.name+'</a>');
                    if(options.itemsExpandAll || ele.expand)
                    {
                        $(a).addClass(options.selectedClass);
                    }
                    li.append(a);
                    if(ele.nodes&&ele.nodes.length>0)
                    {
                        var ul = $("<ul></ul>");
                        initElements(ul,ele.nodes);
                        li.append(ul);
                    }
                });
            }

            if(options.data)
            {
              var ul = $("<ul></ul>");
              initElements(ul,options.data);
              this.append(ul);
            }

            var items = this.find('li');

            $.each(items, function(num, item) {
                item = $(item);

                if (options.autoParentDetection) {
                    if (item.has('ul')[0]) {
                        item.addClass(options.parentClass);
                    }
                }

                if (options.itemsUniqueClasses) {
                    item.addClass('item-' + num);
                }

            });

            var parents = this.find('.' + options.parentClass);

            $.each(parents, function(num, parent) {
                parent = $(parent);
                var child=parent.children("a");
                child.addClass(options.collapseClass);

                if (child.has('.' + options.selectedClass)[0]) {
                    child.removeClass(options.collapseClass).addClass(options.expandClass);

                    if (options.autoActiveDetection) {
                        child.addClass(options.activeClass);
                    }
                }

                if (child.hasClass(options.selectedClass)) {
                    child.removeClass(options.activeClass).removeClass(options.collapseClass).addClass(options.expandClass);
                }
            });

            var parent = $('.' + options.collapseClass,this).parent();
            //console.log(parent);
            parent.children('ul').hide();

            this.find('a').click(function(e) {
                    var item = $(this).parent('li');
                    var content = $(this).parent('li').children('ul');
                    if(item.hasClass(options.parentClass))
                    {
                      $(this).toggleClass(options.expandClass).toggleClass(options.collapseClass);

                      if (options.slideEffect) {
                          content.slideToggle();
                      } else {
                          content.toggle();
                      }
                   }else{
                     if(options.selected){
                        options.selected($(this).attr('data-value'));
                     }
                   }
                   e.preventDefault();
            });
        }
    };

    $.fn.ntm = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('插件jQuery.ntm中不存在方法 "' + method + '"');
        }
    };
})(jQuery);