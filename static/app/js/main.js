/**
 *  CODE
 */

(function () {
    'use strict';

    var pluginName = 'scroller';

    $.fn[pluginName] = function(params){
        var defaults = {
                $scroll: null,
                radius: 180,
                minDeg: 135,
                maxDeg: 225
            },
            settings = $.extend({}, defaults, params);

        return this.each(function(){
            var $this = $(this),
                dragging = false,
                events = {
                    mouseDown: function(e){
                        e.preventDefault();

                        dragging = true;

                        $(document).on('mousemove', events.mouseMove);
                        $(document).on('mouseup', events.mouseUp);
                    },
                    mouseMove: function(e){
                        if(!dragging) return false;

                        var offset  = settings.$scroll.offset(),
                            center  = {x: offset.left + settings.radius, y: offset.top + settings.radius},
                            mouse   = {x: e.pageX, y: e.pageY},
                            degrees = 180 + ((Math.atan2(mouse.y - center.y, mouse.x - center.x) * 180) / Math.PI) % 360;

                        degrees = degrees < settings.minDeg ? settings.minDeg : (degrees > settings.maxDeg ? settings.maxDeg : degrees);

                        setBarPosByDegree(degrees);
                    },
                    mouseUp: function(e){
                        dragging = false;

                        $(document).off('mousemove', events.mouseMove);
                        $(document).off('mouseup', events.mouseUp);
                    }
                };

            var setBarPosByRadians = function(radians){
                var point = {x: settings.radius + (settings.radius * Math.cos(radians)), y: settings.radius + (settings.radius * Math.sin(radians))},
                    degrees = 180 + ((radians * 180) / Math.PI) % 360;

                var dif = settings.maxDeg - settings.minDeg,
                    val = degrees - settings.minDeg,
                    pct = val/dif,
                    h   = $this[0].scrollHeight - $this.height();

                settings.$scroll.find('.'+pluginName+'-bar-drag').css({top: point.y - 10, left: point.x - 10});
                $this.scrollTop(h * pct);
            };

            var setBarPosByDegree = function(degrees){
                var radians = (degrees - 180) * 0.0174532925,
                    point = {x: settings.radius + (settings.radius * Math.cos(radians)), y: settings.radius + (settings.radius * Math.sin(radians))};

                var dif = settings.maxDeg - settings.minDeg,
                    val = degrees - settings.minDeg,
                    pct = val/dif,
                    h   = $this[0].scrollHeight - $this.height();

                settings.$scroll.find('.'+pluginName+'-bar-drag').css({top: point.y - 10, left: point.x - 10});
                $this.scrollTop(h * pct);
            };

            settings.$scroll.width(settings.radius * 2).height(settings.radius * 2);
            settings.$scroll.find('.'+pluginName+'-bar-drag').bind('mousedown', events.mouseDown);

            setBarPosByDegree(settings.minDeg);
        });
    };

    $('.'+pluginName+'-content')[pluginName]({$scroll: $('.'+pluginName+'-bar')});
})();
