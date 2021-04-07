

var HBS = {
    loadTemplate: function(target, path, templateData) {
        $.get(path, function(data) {
            var template = Handlebars.compile(data);
            if( !templateData ) {
                templateData = {}
            }
            $(target).html(template(templateData));
        }, 'html');
    }
}


// 임시 소스, 코드 분리 해야함
$(document).on('ready', function() {
    $('.dropdown-header').on('click', function() {
        var $this = $(this);
        $this.closest('.dropdown-box').toggleClass('open');
    });

    var Gnb = (function() {
        return {
            init: function() {
                this.attachEvent();
            },
            attachEvent: function() {
                $(document).on('click', '.btn-gnb, .btn-gnb-close', function() {
                    var $gnbMobileWrap = $('.gnb-list-wrap');
                    var $fixedLeftMenu = $('.fixed-left-menu');
                    if( $gnbMobileWrap.css('display') !== 'none' ) {
                        $gnbMobileWrap.hide();
                        $fixedLeftMenu.show();
                    } else {
                        $gnbMobileWrap.show();
                        $fixedLeftMenu.hide();
                    }
                })
            }
        }
    })()
    Gnb.init();

    var ProductFilter = (function() {
        var $wrap = $('.product-filter');
        var $showArea = $('.selected-filter-show');
        var $nav = $('.product-filter-list-wrap');

        function clickNavOpener() {
            $wrap.toggleClass('nav-open');
        }
        return {
            init: function() {
                $showArea.on('click', clickNavOpener);

                $nav.find('li').on('click', function(e) {
                    var $this = $(this);
                    var target = $this.data('target');
                    var targetText = $this.data('target-text');

                    $showArea.attr('data-show', target);
                    $showArea.find('.show-label').text(targetText);

                    clickNavOpener();
                });
            }
        }
    })();
    ProductFilter.init();

    // 왼쪽 메뉴 fixed
    var LeftMenu = (function() {
        var $leftMenu = $('.left-menu');
        var isFixed = $leftMenu.hasClass('fixed-left-menu');
        var offset = 0;
        if( isFixed ) {
            offset = $leftMenu.offset().top;
        }
        return {
            init: function() {
                var $win = $(window);
                if( isFixed && $win.width() >= 1024 ) {
                    $win.on('scroll', function() {
                        var st = $(this).scrollTop();
                        if( st >= offset ) {
                            $leftMenu.addClass('fixed');
                        } else {
                            $leftMenu.removeClass('fixed');
                        }
                    });
                } else {
                    return false;
                }
            }
        }
    })();
    LeftMenu.init();

    // 셀렉트 박스 페이지 이동
    $('#linkSelect').on('change', function(e) {
        e.stopPropagation();
        var $selected = $(this).find('option:selected');
        var link = $selected.data('link');

        location.href = link;
    });
    // 공용 셀렉트링크 메뉴
    $('.select-link-menu-title').on('click', function(e) {
        e.stopPropagation();
        var $wrap = $(this).parents('.select-link-menu-wrap');
        $wrap.toggleClass('open');
    });
    // 셀렉트 닫기
    $('body').on('click', function() {
        $('.select-link-menu-wrap').removeClass('open');
        $('.select-link-menu').removeClass('open');
    });
});
