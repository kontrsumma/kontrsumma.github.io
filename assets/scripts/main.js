var slider = (function () {
  var roll_timer,
      frameset,
      controls,
      settings = {
        count: 3,
        time: 500,
        interval: 10000
      },
      current,
      block = false;

  return {
    init: function (count) {
      settings.count = count;

      frameset = $('.slider__frame');
      frameset.eq(0).addClass('is-shown');
      controls = $('.slider__control_item');

      current = 0;
      slider.slide(1);
    },

    roll: function (i, dir) {
      i = i % settings.count;
      if (i < 0) {
        i += settings.count;
      }
      if (current != i) {
        current = i;

        $('.slider__control_item').removeClass('is-active').eq(i).addClass('is-active');

        var prev = $('.is-shown');
        var next_class;

        if (!dir) {
          next_class = 'is-coming-right';
        }
        else {
          next_class = 'is-coming-left';
        }

        var next = frameset.eq(i).addClass(next_class).show();

        block = true;

        var offset = prev.width();
        if (!dir) {
          offset = -offset;
        }

        prev.animate({'left': offset}, settings.time, function () {
          $(this).removeClass('is-shown').hide().css('left','');
        });

        next.animate({'left': 0}, settings.time, function () {
          $(this).removeClass('is-coming-left').removeClass('is-coming-right').addClass('is-shown');
          block = false;
        });
      }
    },

    slide: function (i, force, dir) {
      clearInterval(roll_timer);
      if (force) {
        slider.roll(i, dir);
        slider.slide(i+1);
      }
      else {
        roll_timer = setInterval(function () {
          slider.roll(i++);
        }, settings.interval);
      }
    },

    go: function (i) {
      if (!block) {
        slider.slide(i, true);
      }
    },

    prev: function () {
      if (!block) {
        slider.slide(current-1, true, true);
      }
    },

    next: function () {
      if (!block) {
        slider.slide(current+1, true);
      }
    }
  };
})();

$(function () {
  slider.init(3);

  $('a[href="#"]').on("click.dummy", function (e) {
    return false;
  });
});
