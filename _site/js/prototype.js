/*jshint browser: true, devel: true, jquery: true*/



$(document).ready(function () {
    
    // Max amount for grants 'showing. and function to keep number between 0 and max_showing.
    var max_showing = 587;
    var max_min_count = function(number){
        var count = number;
        if (count > 587) {
            count = 587;
        } else if (count < 10) {
            count = 11;
        }
        return count; 
    };
    
    
    // Main navigation functionality
    $('.navbar-nav .nav-item.dropdown').on('click', function(){
        $(this).find('.navigation-first-level-menu').toggleClass('show');
    });

    $('body').click(function(e){
        var top_menu_link = $('.navigation-main-menu > .nav-item').has(e.target).length > 0,
            dropdown_menu = $('dropdown-menu').has(e.target).length > 0;
        
        if(!top_menu_link) {
            
            $('.dropdown-menu').each(function(){
                $(this).removeClass('show');
            });
        } else {
        }
    });
    
    // Main nav - top level links
    $('#navbarDropdownMenuLink_0').on('click', function(e){
        e.preventDefault();
    });
    $('#navbarDropdownMenuLink_1').on('click', function(e){
        e.preventDefault();
    });
    $('#navbarDropdownMenuLink_2').on('click', function(e){
        e.preventDefault();
        window.location.pathname = "/bga-grants-and-programs/finder/tool.html";
    });
    $('#navbarDropdownMenuLink_3').on('click', function(e){
        e.preventDefault();
        window.location.pathname = "/bga-grants-and-programs/expertise-and-advice.html";
    });
    $('#navbarDropdownMenuLink_4').on('click', function(e){
        e.preventDefault();
        window.location.pathname = "/bga-grants-and-programs/events-and-training.html";
    });
    $('#navbarDropdownMenuLink_5').on('click', function(e){
        e.preventDefault();
        window.location.pathname = "/bga-grants-and-programs/news.html";
    }); 

    // Mobile nav (for the moble test version only)
    $('.mobile-test .collapse').css('display', 'none');
    
    $('#ChangeToggle').on('click', function(){
        $('.mobile-test .collapse').toggleClass('open');
    });
    
    $('.mobile-test #navbarDropdownMenuLink_0').on('click', function(e){
        e.preventDefault();
        window.location.pathname = "/bga-grants-and-programs/registrations";     
    });
    $('.mobile-test #navbarDropdownMenuLink_1').on('click', function(e){
        e.preventDefault();
        window.location.pathname = "/bga-grants-and-programs/planning";
    });
    
    $('#ChangeToggle').on('click', function(){
        $('#navigation-bar').slideToggle();
    });
    $(window).on('resize', function(){
        if ($(window).width() < 770) {
            $('#navigation-bar').hide();
        } else {
           $('#navigation-bar').show(); 
        }
    });
    
    
    
    // Information page accordions
    $('.accordion-item-tile').on('click', function(){
        $(this).parents('.accordion-item').toggleClass('open');
        $(this).parents('.accordion-item').find('.accordion-item-content').slideToggle(400);
    });
    
    
    
    // Prevent click empty 'a' tag from causing scrolling
    $('a').on('click', function(e){
        if (! $(this).attr('href') ) {
            e.preventDefault();
        }
    });
    
    
    // Hide empty breadcrumb links and arrows
    $('a.breadcrumb-link').each(function(){
        if( $(this).is(':empty') ) {
            var wrapper = $(this).parent('.breadcrumb-home-wrapper');
            $(wrapper).remove();
        }
    });
    $('.breadcrumb-home-wrapper').last().addClass('last');

    /*----------- Add side-menu (sticky_list) functionality ----------- */
    
    // Function for menu stickiness on scroll (called within the if .anchor-menu .sticky-container exists block)
    function add_position(positions) {

        for (var i = 0; i < positions.length; i++) {
            var top_position = positions[i];
            if ($(window).scrollTop() >= top_position) {
                $('.anchor-menu a').removeClass('active-sticky');
                $('.anchor-menu a[data-value=' + positions[i] + ']').addClass('active-sticky');
            }
        }
    }
    
    // Function to make the side menu sticky
    var stickyPosition = $('.anchor-menu').offset(); //This var is outside the function because it needs to be determined BEFORE window resizing,.
    
    function menuStickiness() {
        
        var win = $(window),
            stickyWidth = $('.twoCol39-left').width();
        
        // Set side-menu initial horizontal position 
        if(win.width() < 575) {
            $('.anchor-menu').css('position', 'relative').css('top', 'auto');
        } else if (win.width() >= 575) {
            if (win.scrollTop() >= stickyPosition.top) {
                $('.anchor-menu').css('position', 'fixed').css('top', '32px').css('width', stickyWidth);
            } else {
                $('.anchor-menu').css('position', 'relative').css('top', 'auto').css('width', stickyWidth);
            }
        } 
        
        // Reset side-menu position on scroll
        $(window).scroll(function () {

            stickyWidth = $('.twoCol39-left').width();

            if (win.width() < 575) {
                $('.anchor-menu').css('position', 'relative').css('top', 'auto').css('width', stickyWidth);
            } else if (win.width() >= 575) {
                if (win.scrollTop() >= stickyPosition.top) {
                    $('.anchor-menu').css('position', 'fixed').css('top', '32px').css('width', stickyWidth);
                } else if (win.scrollTop() < stickyPosition.top) {
                    $('.anchor-menu').css('position', 'relative').css('top', 'auto').css('width', stickyWidth);
                }
            }
        });
    }

    if ($( ".anchor-menu .sticky-container" ).length) {

        // Apply menu stickiness
        menuStickiness();
        
        // Side menu scroll to section of the page
        // and add top position of element to anchor link as a data-value
        $('.anchor-menu a').each(function(){
            
            // Get rid of punctuation before converting it an ID.
             var a_text = $(this).text(),
                element_name = a_text.replace(". ", "");
                element_name = element_name.replace(/\s+/g, '-').toLowerCase();
                element_name = element_name.replace("'", "");
                element_name = element_name.replace(",", "");
                element_name = element_name.replace(/[0-9]/g, '');
                var name_str = '#' + element_name;
                var element_position = $(name_str).offset();
                //console.log(element_position);
                      
            if ($(name_str).length){
                $(this).attr('data-value', Math.round(element_position.top));
        
                $(this).on('click', function(){
                    $([document.documentElement, document.body]).animate(
                        { scrollTop: $(name_str).offset().top }, 400);
                    $('.anchor-menu a').removeClass('active-sticky');
                    $(this).addClass('active-sticky');
                });
            }   
        });   
    } // END if .anchor-menu .sticky-container EXISTS
    
    // Menu stickiness on .resize()
    $(window).on('resize', function(){
        if ($( ".anchor-menu .sticky-container" ).length) {
            menuStickiness();
        }
    });
    
    
   
    // Modal functionality
    // Empty href modal
    $('a[href=""]').on("click", function(){
        if (!$(this).parents('.sticky-container').length && !$(this).hasClass("guide_navlink")){
            $(".modal-wrapper").addClass("active");
            $(".modal-background").addClass("active");
        }
    });
    
    $('.inactive-path').on("click", function(){
        $(".modal-wrapper").addClass("active");
        $(".modal-background").addClass("active");
    });
    
    $(".modal-close").on("click", function(){
        $(".modal-wrapper").removeClass("active");
        $(".modal-background").removeClass("active");
    });

    $(".modal-background").on("click", function(){
        $(".modal-wrapper").removeClass("active");
        $(".modal-background").removeClass("active");
        $(".shortlist-wrapper-2").removeClass("active");
    });
    
    // Search not working modal
    $(".search-bar-search").on("click", function(){
        $(".modal-wrapper").addClass("active");
        $(".modal-background").addClass("active");
    });
    $(".name-search button").on("click", function(){
        $(".modal-wrapper").addClass("active");
        $(".modal-background").addClass("active");
    });
     

    // FINDER ALT LINK and VIEW RESULTS - scroll to results      
    $('.alt-link').on('click', function(){
        $('html, body').animate({
            scrollTop: $('.showing-results').offset().top
        }, 500);
    });
    $('.view-results').on('click', function(){
        $('html, body').animate({
            scrollTop: $('.showing-results').offset().top
        }, 500);
    });
    // Mobile test only
    $('.mobile-test .alt-link').on('click', function(){
        $( ".mobile-test" ).scrollTop( 1080 );
    });
    $('.mobile-test .view-results').on('click', function(){
        $( ".mobile-test" ).scrollTop( 580 );
    });

    
    // SHORTLIST 
    // on page load add existing shortlisted items saved on sessionStorage
    var current_shortlist = sessionStorage.getItem('shortlist');
    var shortlist_count = sessionStorage.getItem('shortlist count');
    
    if(shortlist_count === null) {
        shortlist_count = '0';
    }
    
    $('.shortlist-links ul').prepend(current_shortlist);
    $('.shortlist-counter').text(shortlist_count);
    $('.shortlist-btn-counter').text(shortlist_count);
    
    
    if (shortlist_count != "0") {
        $('.empty-shortlist').addClass('inactive');
    } else {
        $('.empty-shortlist').removeClass('inactive');
    }
    
    var shortlist_items = ['shortlist-1', 'shortlist-2', 'shortlist-3', 'shortlist-4','shortlist-5', 'shortlist-6', 'shortlist-7', 'shortlist-8', 'shortlist-9', 'shortlist-10', 'shortlist-11', 'shortlist-12', 'shortlist-13', 'shortlist-14', 'shortlist-15', 'shortlist-16', 'shortlist-17', 'shortlist-18', 'shortlist-19', 'shortlist-20'];
    
    for( var item = 0; item < shortlist_items.length; item++){
        var item_state = sessionStorage.getItem(shortlist_items[item]);
        
        if (item_state === "shortlisted") {
            $('#' + shortlist_items[item] + ' .shortlist').addClass('shortlisted');
        }   
    } 
       
    
    
    // Add or remove items from the shortlist (using link on results cards)
     $(document).on('click', ".shortlist", function(){
        
        // Animate the changing number
        var animDuration = 400;

        if ($(window).width() < 769 ) {
            $(".shortlist-btn-counter").animate({
                 now: '+=200'
             }, {
                    duration: animDuration,
                    step: function (now, fx) {
                     $(this).css({'width': '22px',
                                  'height': '22px',
                                  'font-size': '13px',
                                  'background-color': '#254f90'
                                 });
                    }
                });

                $('.shortlist-btn-counter').animate({
                 now: '-=400'
             }, {
                    duration: animDuration,
                    step: function (now, fx) {
                     $(this).css({'width': '20px',
                                  'height': '20px',
                                  'font-size': '12px',
                                  'background-color': '#2F70BF'
                                 });
                 }
            });
        } else {
            $(".shortlist-btn-counter").animate({
             now: '+=200'
         }, {
                duration: animDuration,
                step: function (now, fx) {
                 $(this).css({'width': '30px',
                              'height': '30px',
                              'font-size': '17px',
                              'top': '1px',
                              'right': '7px',
                              'background-color': '#254f90'
                             });
                }
            });

            $('.shortlist-btn-counter').animate({
             now: '-=400'
         }, {
                duration: animDuration,
                step: function (now, fx) {
                 $(this).css({'width': '28px',
                              'height': '28px',
                              'font-size': '16px',
                              'top': '2px',
                              'right': '8px',
                              'background-color': '#2F70BF'
                             });
             }
            });
        }
         
       
        var parent_card = $(this).parents('.search-card-standard-content'),
            grant = parent_card.find('.search-card-content-type').text(),
            description = parent_card.find('h5').text(),
            shortlist_li = '<li><span></span><a href="">'+grant+"</a><p>"+description+"</p></li>",
            shortlist_li_text = grant + description,
            count = parseInt($('.shortlist-btn-counter').text()),
            shortlist_number = $(this).parents('.search-result-card').attr('id');
        
        if ( $(this).hasClass('shortlisted')) {
            
            sessionStorage.setItem(shortlist_number, '');
            
            $(this).find('p').text('Add to shortlist');
            $(this).removeClass('shortlisted');
            
            $('.shortlist-links li').each(function(){
                if ($(this).text() == shortlist_li_text) {
                    $(this).remove();
                }
            });
            $('.shortlist-btn-counter').text(count - 1);
            $('.shortlist-counter').text(count - 1);
            
            if( $('.shortlist-btn-counter').text() == '0' ) {
                $('.empty-shortlist').removeClass('inactive');
            } else {
                $('.empty-shortlist').addClass('inactive');
            }
            
        } else {
            $(this).find('p').text('Remove from shortlist');
            $(this).addClass('shortlisted'); 
            
            sessionStorage.setItem(shortlist_number, 'shortlisted');
            
            $('.shortlist-links ul').prepend(shortlist_li);
            
            $('.shortlist-counter').text(count + 1);
            $('.shortlist-btn-counter').text(count + 1);
            
            if( $('.shortlist-btn-counter').text() == '0' ) {
                $('.empty-shortlist').removeClass('inactive');
            } else {
                $('.empty-shortlist').addClass('inactive');
            }
        }
        
        var current_shortlist = $('.shortlist-links ul').html();
        sessionStorage.setItem('shortlist', current_shortlist );
         
        var shortlist_count = $('.shortlist-counter').text();
        sessionStorage.setItem('shortlist count', shortlist_count);
         
        
    });
    
    // Reset shortlist counter size on screen resize
    $(window).on('resize', function(){
        if ($(window).width() < 769 ) {
            $('.shortlist-btn-counter').css({'width': '20px', 'height': '20px', 'font-size': '12px', 'top': '0px', 'right': '0px' });
        } 
        else {$('.shortlist-btn-counter').css({'width': '28px', 'height': '28px', 'font-size': '16px', 'top': '2px', 'right': '8px'});
        }
    });
    
    // Remove items from shortlist (in the shortlist modal)  
    $(document).on('click', '.shortlist-links li span', function(){
        var count = parseInt($('.shortlist-btn-counter').text()),
            grant = $(this).parent('li').find('a').text();
         
        $(this).parent('li').remove();
        $('.search-card-content-type').each(function(){
            if ( $(this).text() == grant ){
                $(this).parents('.search-card-standard-content').find('.shortlist').removeClass('shortlisted'); 
                $(this).parents('.search-card-standard-content').find('.toggle-shortlist').text('Add to shortlist');
            }
        });
        
        $('.shortlist-btn-counter').text(count - 1);
        $('.shortlist-counter').text(count - 1);
        
        if( $('.shortlist-btn-counter').text() == '0' ) {
            $('.empty-shortlist').removeClass('inactive');
        } else {
            $('.empty-shortlist').addClass('inactive');
        }
        
        var current_shortlist = $('.shortlist-links ul').html();
        sessionStorage.setItem('shortlist', current_shortlist );
        
        var shortlist_count = $('.shortlist-counter').text();
        sessionStorage.setItem('shortlist count', shortlist_count);
        
        $('.shortlist').each(function(){
            var shortlist_id = $(this).parents('.search-result-card').attr('id');
            
            if ($(this).hasClass('shortlisted')) {
                sessionStorage.setItem(shortlist_id, 'shortlisted');
            } else {
                sessionStorage.setItem(shortlist_id, '');
            }
        });
    });
    
    // Shortlist modal
    $(".view-shortlist").on("click", function(){
        if( !($(this).hasClass('disabled')) ) {
            $(".shortlist-wrapper").addClass("active");
            $(".modal-background").addClass("active");
        }
    });
    $(".shortlist-wrapper .modal-close").on("click", function(){
        $(".shortlist-wrapper").removeClass("active");
        $(".modal-background").removeClass("active");
    });

    $(".modal-background").on("click", function(){
        $(".shortlist-wrapper").removeClass("active");
        $(".modal-background").removeClass("active");
    });
    
    // Shortlist INSTRUCTIONS modal - only appears once
    $(document).on("click", '.shortlist', function(){
        var parent_card = $(this).parents('.search-card-standard-content'),
            grant = parent_card.find('.search-card-content-type').text();
        
        $('.shortlist-wrapper-2 h4 span').text(grant);
        
        
        if (!sessionStorage.getItem('shortlist use')) {
            $(".shortlist-wrapper-2").addClass("active");
            $(".modal-background").addClass("active");
            sessionStorage.setItem('shortlist use', '1');
        }
    });
    $(".shortlist-wrapper-2 .modal-close").on("click", function(){
        $(".shortlist-wrapper-2").removeClass("active");
        $(".modal-background").removeClass("active");
    });

    
    
    // FINDER CHANGE SECTION
    // Get current path, put in an array and split out to determine the section number
    var pathArray = window.location.pathname.split('/');
    var current_section = pathArray[3];   
    current_section = current_section[5];

    $('.finder_section').hide(); 
    
    switch (current_section) {
        case "h":
            $('#section_0').show();
            break; 
        case "1":
            $('#section_1').show();
            break;
        case "2":
            $('#section_2').show();
            break;
        case "3":
            $('#section_3').show();
            break;
        case "4":
            $('#section_4').show();
            break;
        case "5":
            $('#section_5').show();
            break;
        case "6":
            $('#section_6').show();
            break;
        case "7":
            $('#section_7').show();
            break;
        case "8":
            $('#section_8').show();
            break;
        default:
            $('#section_loading').show();
    }


    // FILTER ACCORDIONS
    // Open filter accordions
    $('.filter-item-title').on('click', function(){
        
        if ( $(this).hasClass('open') ) {
            $(this).parents('.filter-item').find('.filter-item-content').slideUp();
            $(this).removeClass('open');
        } else { 
            $('.filter-item-content').slideUp();
            $('.filter-item-title').removeClass('open');
            
            $(this).parents('.filter-item').find('.filter-item-content').slideDown();
            $(this).addClass('open');
        }
        
    });
   
 
    
    // FINDER QUESTIONS
    // Multiple selects
    $('.finder-question.multi-select li').on('click', function(){
        
        var filter_option = $(this).attr('data-value');
        var filter_type = $(this).attr('filter-type');
        
        if ($(this).hasClass('selected')) {
            sessionStorage.setItem(filter_option, false);
        } else {
            sessionStorage.setItem(filter_option, true);
        }
        
        $(this).toggleClass('selected');
        $('.active-filters li[data-value="' + filter_option + '"]').toggleClass('selected');
        $('#' + filter_option).parent('.checkbox-item').toggleClass('selected');
        
 
    });
    
    // Single selects
    $('.finder-question.single-select select').change(function(){
        
        var filter_option = $(this).val();
        var filter_type = $(this).parents('.finder-question').attr('id');
        filter_type = (filter_type.slice(9, filter_type.length));
        
        // Add bubble
        $('#' + filter_type + ' .active-filters.single-select li').removeClass('selected');
        $('.active-filters.single-select li[data-value="' + filter_option + '"]').addClass('selected');
        
        // Change select in the filters
        $('#' + filter_type + ' .filter-item-content select').val(filter_option);
        
        // Add to sessionStorage 
        sessionStorage.setItem(filter_type + " selection", filter_option);
        
    });
    
    

    // FILTER SELECTONS
    // Select filter 'bubble' options - multiple select
    $('.active-filters.multi-select li').on('click', function(){
        
        var filter_option = $(this).attr('data-value');
        sessionStorage.setItem(filter_option, false);
    
        $(this).toggleClass('selected');
        $('#' + filter_option).parent('.checkbox-item').toggleClass('selected');
        $('.finder-question.multi-select li[data-value="' + filter_option + '"]').toggleClass('selected'); 
        
        total_active_filters();
        

    });
    
    
    // Select filter 'bubble' options-single select
     $('.active-filters.single-select li').on('click', function(){
         $(this).removeClass('selected');
         
         var filter_type = $(this).parents('.filter-item').attr('id');
         
         $('#question-' + filter_type + ' select').val('select-option');     
         $('#' + filter_type + ' .filter-item-content select').val('select-option');
         
         // Add to sessionStorage 
         sessionStorage.setItem(filter_type + " selection", 'select-option');
    });
    
    // Select single select options
    $('.filter-item-content select').change(function(){
        
        var filter_type = $(this).parents('.filter-item').attr('id');
        var filter_option = $(this).val();

        $('#' + filter_type + ' .active-filters.single-select li').removeClass('selected');
        $('#' + filter_type + ' .active-filters.single-select li[data-value="' + filter_option + '"]').addClass('selected');   
        $('#question-' + filter_type + ' select').val(filter_option);
        
        // Add to sessionStorage 
        sessionStorage.setItem(filter_type + " selection", filter_option);
        
    });
    
    // Select filter checkbox options
    $('.checkbox-item label').on('click', function(){
        
        var filter_option = $(this).parents('.checkbox-item').find('input').attr('id');
        
        $(this).parents('.checkbox-item').toggleClass('selected');
        $(this).parents('.filter-item').find('.active-filters li[data-value="' + filter_option +'"]').toggleClass('selected ');
        $('.finder-question.multi-select li[data-value="' + filter_option + '"]').toggleClass('selected');
        
        if ($(this).parents('.checkbox-item').hasClass('selected')) {
            sessionStorage.setItem(filter_option, true);
        } else {
            sessionStorage.setItem(filter_option, false);
        }
                   
    }); 
    
    // Toggle switch questions
    $('.finder-question-toggle .custom-control-input').on('click', function(){
        var filter_type = $(this).parents('.finder-question-toggle').attr('id');  
        filter_type = filter_type.slice(9, filter_type.length);
        //console.log(filter_type);

            if ($(this).is(":checked")) { 
                $('li[data-value="' + filter_type + '"]').toggleClass('selected');
                $('#filter-' + filter_type).prop('checked', true).toggleClass('selected');
                
            } else {
                $('li[data-value="' + filter_type + '"]').toggleClass('selected');
                $('#filter-' + filter_type).prop('checked', false).toggleClass('selected');
            }
    });
    
    $('.filter-item .custom-control-input').on('click', function(){
        var filter_type = $(this).attr('id');
        filter_type = filter_type.slice(7, filter_type.length);
        //console.log(filter_type);
        
        if ($(this).is(":checked")) { 
            $(this).toggleClass('selected');
            $('li[data-value="' + filter_type + '"]').toggleClass('selected');   
            $('#'+ filter_type + '-switch').prop('checked', true).toggleClass('selected');
            
        } else {
            $(this).toggleClass('selected');
            $('li[data-value="' + filter_type + '"]').toggleClass('selected');
            $('#'+ filter_type + '-switch').prop('checked', false).toggleClass('selected');
        }
    });
   
    $('.filter-item .filter-toggle-switch').on('click', function(){
        var filter_type = $(this).attr('data-value');
        //console.log(filter_type);
        
        $(this).removeClass('selected');
        $('#'+ filter_type + '-switch').prop('checked', false).toggleClass('selected');
        $('#filter-' + filter_type).prop('checked', false).toggleClass('selected');
    });
    
    
 

    // FUNCTION TO COUNT and SET active filter counts
    var all_filter_types = ['location', 'rural', 'industry', 'industry-toggle', 'business-type', 'support-type', 'objectives', 'business-stage', 'status', 'atsi'];
    
    
    // MOBILE FILTER VISIBILITY
    $('.view-filters').on('click', function(){
        $('.filter-wrapper').addClass('active');
        $('.modal-background').addClass('active');

        //add active state to mobile filter counters
        for (var m = 0; m < all_filter_types.length; m++) {
            var filter_type = sessionStorage.getItem(all_filter_types[m]);
            if (filter_type !== null) {           
                $('#' + all_filter_types[m] + ' .mobile-counter').text(filter_type).addClass('active');
            }
        }
        
        //Close open filter accordions
        $('.filter-item-content').hide();
         $('.filter-item-title').removeClass('open');
        
    });
    $('.filter-wrapper .modal-close').on('click', function(){
        $('.filter-wrapper').removeClass('active');
        $('.modal-background').removeClass('active');
        
    });
    $('.mobile-apply-filters-button').on('click', function(){
        $('.filter-wrapper').removeClass('active');
        $('.modal-background').removeClass('active');
    });
    
    
    // FINDER RESULTS CARDS
    $(document).on('click', '.accordion-title', function(){
        $(this).parents('.search-accordion-expand-wrapper').find(".collapse").slideToggle();
        $(this).parents('.grant-expand-title').toggleClass('collapsed');
    });
   
    
    // CLEAR ALL FILTERS / QUESTIONS
    $('.clear-all').on('click', function(){
        $('.active-filters li.selected').removeClass('selected');
        $('.checkbox-item.selected').removeClass('selected');
        $('.finder-question li.selected').removeClass('selected');
        $('.finder-question-toggle .custom-control-input').prop('checked', false).removeClass('selected');
        
        
        $('.finder-question.single-select select').val('select-option');
        $('.filter-item-content select').val('select-option');
        
        $('.filter-item-title').removeClass('open');
        $('.filter-item-content').slideUp();
        $('.filter-item .custom-control-input').prop('checked', false).removeClass('selected');
        
        sessionStorage.setItem('showing', max_showing);
        $('span.number').text(sessionStorage.getItem('showing'));
        
        sessionStorage.clear();
        
        $('.mobile-counter').each(function(){
            $(this).removeClass('active').text(0);
        });
        $('.filter-counter').text(0);

    });
    

    
    
    // FUNCTION COUNT TOTAL NUMBER OF ACTIVE FILTERS
    var total_active_filters = function(){
        var total_active = 0;

        for ( var k = 0; k < all_filter_types.length; k++){ 
            
            var filter_type = all_filter_types[k];
            var filter_count = parseInt(sessionStorage.getItem(filter_type));
            
            if(isNaN(filter_count)) {
                filter_count = 0;
            }
            total_active = total_active + filter_count;
        } 
        
        $('.filter-counter').text(total_active);
    };

        
    // SET ACTIVE FILTERS ON PAGE LOAD - MULTIPLE SELECT
    var filter_set_multiple = ['australian-capital-territory', 'new-south-wales', 'northern-territory', 'queensland', 'south-australia', 'tasmania', 'victoria', 'western-australia','other-australian-territory', 'funding', 'subsidy', 'concession', 'scholarship', 'tax-rebate', 'advice', 'mentorship', 'build-or-improve-infrastructure', 'covid-19-related-support', 'employ-people', 'funding-for-training-and-skills-development', 'import-or-export-products-or-services', 'improve-or-grow-my-business', 'invest-money-in-other-businesses', 'market-and-advertise-my-business', 'organise-an-event', 'prevent-or-recover-from-a-natural-disaster', 'purchase-or-upgrade-equipment-vehicles-or-tools', 'recycle-waste-or-reduce-my-energy-use', 'research-and-develop-innovative-new-products-or-services', 'start-a-business', 'upgrade-restore-or-fit-out-a-building', 'open', 'coming-soon', 'closed'];
    
    for ( var filter = 0; filter < filter_set_multiple.length; filter++) {
        
        var filter_option = filter_set_multiple[filter];
            
            if (sessionStorage.getItem(filter_option) === "true") {  

                // Select filters on the page
                $('.finder-question.multi-select li[data-value="' + filter_option + '"]').toggleClass('selected');       
                $('.active-filters li[data-value="' + filter_option + '"]').toggleClass('selected');    
                $('#' + filter_option).parent('.checkbox-item').toggleClass('selected');

            }
    }
    
    
    
    // SET ACTIVE FILTERS ON PAGE LOAD - SINGLE SELECT   
    // function for reset each filter set
    var set_single_filters = function(filter_type, filter_set){
        
        var filter_option = sessionStorage.getItem(filter_type + ' selection');
        if (filter_option === null) {
            filter_option = 'select-option';
        }
        
        $('select[select-filter-type="' + filter_type + '"]').val(filter_option);     

        $('#' + filter_type + ' select').val(filter_option); 

        $('#' + filter_type + ' .active-filters.single-select li').removeClass('selected');
        $('#' + filter_type + ' .active-filters.single-select li[data-value="' + filter_option + '"]').addClass('selected');
 
     };
    
    // Filter sets
    var filter_set_industry = ['select-option', 'accommodation-and-food-services', 'administrative-and-support-services', 'agriculture-forestry-and-fishing', 'arts-and-recreation-services', 'construction', 'education-and-training', 'electricity-gas-water-and-waste-services', 'financial-and-insurance-services', 'health-care-and-social-assistance', 'information-media-and-telecommunications', 'manufacturing', 'mining', 'professional-scientific-and-technical-services', 'public-administration-and-safety', 'rental-hiring-and-real-estate-services', 'retail-trade', 'transport-postal-and-warehousing', 'wholesale-trade', 'other-services'];
    
    var filter_set_business_type = ['select-option','sole-trader', 'partnership', 'company', 'trust', 'not-for-profit'];
   
    var filter_set_business_stage = ['select-option', '2-years-or-less', '3-and-5-years', 'more-than-5-years'];
    
    set_single_filters('industry', filter_set_industry);
    set_single_filters('industry', filter_set_industry);
    set_single_filters('business-type', filter_set_business_type);
    set_single_filters('business-stage', filter_set_business_stage);
    
    
    
    // SET TOGGLE SWITCH QUESTIONS ON PAGE LOAD.
    var filter_set_toggles = ['rural', 'atsi', 'industry-toggle'];
    
    for ( var toggle = 0; toggle < filter_set_toggles.length ; toggle++){
        var toggle_option = filter_set_toggles[toggle];

        if (sessionStorage.getItem(toggle_option) === '1') {  
            
            $('.custom-control-input').addClass('selected');
            $('input[toggle-filter-type="' + toggle_option + '"]').prop('checked', true).toggleClass('selected');
            
            $('.active-filters li[filter-type="' + toggle_option + '"]').toggleClass('selected');
    
        }       
    }
 
    
    
    // SET FILTER COUNT ON PAGE LOAD
    total_active_filters();
    

    //CREATE 'SHOWING' NUMBER
    var showing = sessionStorage.getItem('showing');
    
    if (showing === null) {
        showing = 587;
    }
    $('span.number').text(showing);
    
    $('[filter-type]').on('click', function(){

        var filter_type = $(this).attr('filter-type'),
            select_filter_type = $(this).attr('select-filter-type'),
            result_count = parseInt(sessionStorage.getItem('showing')),
            filter_value = parseInt($(this).attr('filter-value')),
            filter_type_current_value = parseInt(sessionStorage.getItem(filter_type));
        
        if (isNaN(filter_type_current_value)){
            filter_type_current_value = 0;
        }
        if (isNaN(result_count)){
            result_count = parseInt(max_showing);
        }
        
        var reduced_count = Math.round(result_count - 70),
            restore_count = Math.round(result_count + 70),
            new_count_minus = result_count - filter_value,
            new_count_plus = result_count + filter_value;
        
        reduced_count = max_min_count(reduced_count);
        restore_count = max_min_count(restore_count);
        new_count_minus = max_min_count(new_count_minus);
        new_count_plus = max_min_count(new_count_plus); 

        // First use of a filter type
        if (filter_type_current_value === 0) {

            if ($(this).hasClass('selected')) {
                $('span.number').text(reduced_count);
                sessionStorage.setItem('showing', reduced_count);
                sessionStorage.setItem(filter_type, filter_type_current_value + 1);
                $('.filter-item#' + filter_type).find('.mobile-counter').text(filter_type_current_value + 1).addClass('active');
                
                total_active_filters();
                return false;
                
            } else {
                // This is not a possible scenario  
            }
            
        
            
        // Catch the last use of a filter type and reset
        } else if (filter_type_current_value === 1) {  
            if ($(this).hasClass('selected')) {
                $('span.number').text(new_count_plus);
                sessionStorage.setItem('showing', new_count_plus);
                sessionStorage.setItem(filter_type, filter_type_current_value + 1);
                $('.filter-item#' + filter_type).find('.mobile-counter').text(filter_type_current_value + 1).addClass('active');
                
                total_active_filters();
                return false;
                
                
            } else {
                $('span.number').text(restore_count);
                sessionStorage.setItem('showing', restore_count);
                sessionStorage.setItem(filter_type, filter_type_current_value - 1);
                $('.filter-item#' + filter_type).find('.mobile-counter').text(filter_type_current_value - 1).removeClass('active');
                
                total_active_filters();
                return false;
            }
            
            
            
        }
        
        // All other clicks on a filter type
        else {
            if ($(this).hasClass('selected')) {
                $('span.number').text(new_count_plus);
                sessionStorage.setItem('showing', new_count_plus);
                sessionStorage.setItem(filter_type, filter_type_current_value + 1);
                $('.filter-item#' + filter_type).find('.mobile-counter').text(filter_type_current_value + 1).addClass('active');
                
                total_active_filters();
                return false;
                
            } else {  
                $('span.number').text(new_count_minus);
                sessionStorage.setItem('showing', new_count_minus);
                sessionStorage.setItem(filter_type, filter_type_current_value - 1);
                $('.filter-item#' + filter_type).find('.mobile-counter').text(filter_type_current_value - 1).addClass('active');
                
                total_active_filters();
                return false;
                
            }
        }


    });
    
    $('[select-filter-type]').change(function(){
        
        var filter_type = $(this).attr('select-filter-type'),
            result_count = parseInt(sessionStorage.getItem('showing')),
            filter_value = parseInt($(this).attr('filter-value')),
            filter_type_current_value = parseInt(sessionStorage.getItem(filter_type));
        
        if (isNaN(filter_type_current_value)){
            filter_type_current_value = 0;
        }
        if (isNaN(result_count)){
            result_count = parseInt(max_showing);
        }
        
        var reduced_count = Math.round(result_count - 93),
            new_count_plus = result_count + filter_value;

        reduced_count = max_min_count(reduced_count);
        new_count_plus = max_min_count(new_count_plus);  
 
        $('span.number').text(reduced_count);
        sessionStorage.setItem('showing', reduced_count);
        sessionStorage.setItem(filter_type, 1);
        
        $('.filter-item#' + filter_type).find('.mobile-counter').text(1).addClass('active');
        
        //Set total filter count
        total_active_filters();

    });
    
    $('[toggle-filter-type]').change(function(){
        
        var filter_type = $(this).attr('toggle-filter-type'),
            result_count = parseInt(sessionStorage.getItem('showing')),
            filter_value = parseInt($(this).attr('filter-value')),
            filter_type_current_value = parseInt(sessionStorage.getItem(filter_type));
        
        if (isNaN(filter_type_current_value)){
            filter_type_current_value = 0;
        }
        if (isNaN(result_count)){
            result_count = parseInt(max_showing);
        }
        
        var reduced_count = Math.round(result_count - filter_value),
            restore_count = Math.round(result_count + filter_value);

        reduced_count = max_min_count(reduced_count);
        restore_count = max_min_count(restore_count);  

        if (!$(this).is(":checked")) {
            $('span.number').text(restore_count);
            sessionStorage.setItem('showing', restore_count);
            sessionStorage.setItem(filter_type, 0);
            
            $('.filter-item#' + filter_type).find('.mobile-counter').text(0).removeClass('active');
        } else {
            $('span.number').text(reduced_count);
            sessionStorage.setItem('showing', reduced_count);
            sessionStorage.setItem(filter_type, 1);
        }
        
        //Set total filter count
        total_active_filters();
    });
    
    
    
    // VARY SEARCH RESULT CARDS ON DISPLAY
    
    // Create variables for storing search card ids 
    var card_ids_task_1 = ["#search-result-1", "#search-result-2", "#search-result-3", "#search-result-4", "#search-result-5", "#search-result-6", "#search-result-7", "#search-result-8", "#search-result-9", "#search-result-10"];
    var card_ids_task_2 = ["#search-result-11", "#search-result-12", "#search-result-13", "#search-result-14", "#search-result-15", "#search-result-16", "#search-result-17", "#search-result-18", "#search-result-19", "#search-result-20"];
    
    // Create sets of card HTML
    var search_cards_task_1 = {};
    var search_cards_task_2 = {};

    var create_card_set = function(card_identifiers, card_set, cards){
        $(card_identifiers).each(function(){
            cards['#' + $(this).attr('id')] = $(this).html();
        }); 
    };
    
    create_card_set('.result-task-1', card_ids_task_1, search_cards_task_1);  
    create_card_set('.result-task-2', card_ids_task_2, search_cards_task_2);  
    
    // Function to shuffle the id order in their array
    function Shuffle(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }
    
    // Function to rearrange cards on display. Uses presence sessionStorage('purchase-or-upgrade-equipment-vehicles-or-tools') to determine whether cards are from the Task_1 or Task_2 set.
    function rearrange_cards(){
    
        $('.results-wrapper').empty();
        var task2 = sessionStorage.getItem('purchase-or-upgrade-equipment-vehicles-or-tools');
        
        if (task2 === 'true') {
            var shuffled_cards_2 = Shuffle(card_ids_task_2);
            for (var id_1 = 0; id_1 < shuffled_cards_2.length; id_1++) {
                $('.results-wrapper').append('<div class="search-card-result">' + search_cards_task_2[shuffled_cards_2[id_1]] + '</div>');
            }
        } else {
            var shuffled_cards_1 = Shuffle(card_ids_task_1);
            for (var id_2 = 0; id_2 < shuffled_cards_1.length; id_2++) {
                $('.results-wrapper').append('<div class="search-card-result">' + search_cards_task_1[shuffled_cards_1[id_2]] + '</div>');
            }
        }  
    }
    
    // Rearrange cards on filter click
    $('[filter-type]').on('click', function(){
        rearrange_cards();
    });
    
    $('[select-filter-type]').change(function(){
        rearrange_cards();
    });
    
    $('[toggle-filter-type]').change(function(){
        rearrange_cards();
    });
    
    // Rearrange cards on page load (so the task remains consistent across tool sections once it is selected).
    rearrange_cards();
    
    
    // Persistent showing number and shortlist
    
    
    if ($('.showing-results').length) {
        var showing_position = $('.results-title').offset();
        $(window).scroll(function () {
            if ($(window).scrollTop() > showing_position.top) {
                $('.results-title-wrapper').addClass('sticky');
                $('.filter-and-results-wrapper').addClass('sticky');
            } else {
                $('.results-title-wrapper').removeClass('sticky');
                $('.filter-and-results-wrapper').removeClass('sticky');
            }
        });
    } 
    
    
    
}); // END doc ready

