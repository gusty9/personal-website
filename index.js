$('document').ready(function(){
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });
    on_scroll($(window).scrollTop(), $(window).height(), 300);
    $(window).scroll(function(){
        on_scroll($(this).scrollTop(), $(this).height(), 300);
    });

    function on_scroll(scrollTop, screenHeight, fadetime) {
        if (scrollTop > screenHeight * .9) {
            $('.navbar').addClass('filled_nav');
            $('.navbar').show(fadetime)
        } else if ($(this).scrollTop() > screenHeight * 0.25) {
            $('.navbar').hide(fadetime)
        } else {
            $('.navbar').removeClass('filled_nav');
            $('.navbar').show(fadetime)
        }
    }
});