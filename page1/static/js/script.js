(function($) {
    // This function is only responsible for the function of one carousel image each time it is called
    // That is to say, only one carousel will be generated, and the scope of this function can only be assigned to one carousel
    // It is required to pass the root label of the current carousel image when calling this function
    // The parameter ele here is the root tag of a carousel
    var slide = function(ele,options) {
        var $ele = $(ele);
        // Default setting option
        var setting = {
        		// Controlling the animation time of the carousel
            speed: 1000,
            // Control the time of interval (rotation speed)
            interval: 2000,
            
        };
        // object merging
        $.extend(true, setting, options);
        // Specify the location and state of each image
        var states = [
            { $zIndex: 1, width: 120, height: 150, top: 69, left: 184, $opacity: 0.2 },
            { $zIndex: 2, width: 130, height: 170, top: 59, left: 200, $opacity: 0.4 },
            { $zIndex: 3, width: 170, height: 218, top: 35, left: 230, $opacity: 0.7 },
            { $zIndex: 4, width: 224, height: 288, top: 0, left: 263, $opacity: 1 },
            { $zIndex: 3, width: 170, height: 218, top: 35, left: 350, $opacity: 0.7 },
            { $zIndex: 2, width: 130, height: 170, top: 59, left: 420, $opacity: 0.4 },
            { $zIndex: 1, width: 120, height: 150, top: 69, left: 445, $opacity: 0.2 }
        ];

        var $lis = $ele.find('li');
        var timer = null;

        // event
        $ele.find('.hi-next').on('click', function() {
            next();
        });
        $ele.find('.hi-prev').on('click', function() {
            states.push(states.shift());
            move();
        });
        $ele.on('mouseenter', function() {
            clearInterval(timer);
            timer = null;
        }).on('mouseleave', function() {
            autoPlay();
        });

        move();
        autoPlay();

        // Let each li correspond to each state of the states above
        // Let li expand from the center
        function move() {
            $lis.each(function(index, element) {
                var state = states[index];
                $(element).css('zIndex', state.$zIndex).finish().animate(state, setting.speed).find('.block').css('opacity', state.$opacity);
            });
        }

        // 切换到下一张
        function next() {
            //Principle: move the last element of the array to the first
            states.unshift(states.pop());
            move();
        }

        function autoPlay() {
            timer = setInterval(next, setting.interval);
        }
    }
    // Find the root tag of the carousel to be rotated, call slide()
    $.fn.hiSlide = function(options) {
        $(this).each(function(index, ele) {
            slide(ele,options);
        });
        // return value to support chaining
        return this;
    }
})(jQuery);