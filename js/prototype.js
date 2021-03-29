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
        window.location.pathname = "/bga-grants-and-programs/Expertise-and-advice.html";
    });
    $('#navbarDropdownMenuLink_4').on('click', function(e){
        e.preventDefault();
        window.location.pathname = "/bga-grants-and-programs/Events-and-training.html";
    });
    $('#navbarDropdownMenuLink_5').on('click', function(e){
        e.preventDefault();
        window.location.pathname = "/bga-grants-and-programs/News.html";
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
            $(wrapper).css('display', 'none');
        }
    });
    

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
    
    // Remove whitespace from anchor-section names or they break the sidemenu links
    $('.anchor-section').each(function(){
        var section_name = $(this).attr('name');
        section_name = $(this).attr('name').replace(/\s/g,' ');
        $(this).attr('name', section_name);
    });
    
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
            
            var a_text = $(this).text(),
                element_name = $(this).text().replace(/\s/g,' ');
                var name_str = '.anchor-section[name="' +  element_name  + '"]';
                var element_position = $(name_str).offset();
            
            
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
        
    
        // Change menu active state on scroll to different sections of the page
        var positions = [];
        $('.anchor-menu a').each(function(){
            var element_position = $(this).attr('data-value');
            positions.push(Math.round(element_position));
        }); 
    
        $(window).scroll(function(){
            add_position(positions); 
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
    
    
    // SHORTLIST
    
    // Add or remove items from the checklist (using link on results cards)
     $(document).on('click', ".shortlist", function(){
        
        var parent_card = $(this).parents('.search-card-standard-content'),
            grant = parent_card.find('.search-card-content-type').text(),
            description = parent_card.find('h5').text(),
            shortlist_li = '<li><span></span><a href="">'+grant+"</a><p>"+description+"</p></li>",
            shortlist_li_text = grant + description,
            count = parseInt($('.shortlist-btn-counter').text());

        
        if ( $(this).hasClass('shortlisted')) {
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
            
            $('.shortlist-links ul').prepend(shortlist_li);
            
            $('.shortlist-counter').text(count + 1);
            $('.shortlist-btn-counter').text(count + 1);
            
            if( $('.shortlist-btn-counter').text() == '0' ) {
                $('.empty-shortlist').removeClass('inactive');
            } else {
                $('.empty-shortlist').addClass('inactive');
            }
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

    
    
    
    // FINDER CHANGE SECTION
    
    // Change section on prev / next click
    var setSection = function(element){   
        $('.finder_section').hide(); 
        var new_section = element.attr('data-value');
        $('#' + new_section).show();    
        //window.location.hash = '#' + new_section;
    };
    $('.finder-wrapper .form-buttons .previous').on('click', function(){         
        setSection($(this));
    });    
    $('.finder-wrapper .form-buttons .next').on('click', function(){
         setSection($(this));
    });
    $('.finder-wrapper .form-buttons .start-again').on('click', function(){
        $('.finder_section').hide();
        $('#section_0').show();
    });


    // Change sections on url fragment change (to catch browser back button clicks)
    /*$(window).on('popstate', function(e) {
        var new_section = window.location.hash; 
        $('.finder_section').hide();
        $(new_section).show();
    });*/
    


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
        //console.log(filter_type);
        
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
                   
    }); 
    
    // Toggle switch questions
    $('.finder-question-toggle .custom-control-input').on('click', function(){
        var filter_type = $(this).parents('.finder-question-toggle').attr('id');  
        filter_type = filter_type.slice(9, filter_type.length);

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
    
    
 

    // MOBILE FILTER VISIBILITY
    $('.view-filters').on('click', function(){
        $('.filter-wrapper').addClass('active');
        $('.modal-background').addClass('active');
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
    
    

    
    // FUNCTION TO COUNT and SET active filter counts
    var all_filter_types = ['location', 'rural', 'industry', 'business-type', 'support-type', 'objectives', 'business-stage', 'status', 'atsi'];
    
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
        
        /*$('.filter-item').each(function(){
            var filter_type = $(this).attr('id');
            
            var filter_count = parseInt(sessionStorage.getItem(filter_type));
            
            if(isNaN(filter_count)) {
                filter_count = 0;
            }
            total_active = total_active + filter_count;
            
        });*/
        $('.filter-counter').text(total_active);
    };
    
    
 
    
        
    // SET ACTIVE FILTERS ON PAGE LOAD - MULTIPLE SELECT
    var filter_set_multiple = ['australian-capital-territory', 'new-south-wales', 'northern-territory', 'queensland', 'south-australia', 'tasmania', 'victoria', 'western-australia','funding', 'subsidy', 'concession', 'scholarship', 'tax-rebate', 'advice', 'mentorship', 'build-or-improve-infrastructure-for-a-community', 'employ-people', 'funding-for-training-and-skills-development', 'import-or-export-products-or-services', 'improve-or-grow-my-business', 'invest-money-in-other-businesses', 'market-and-advertise-my-business', 'organise-a-community-event', 'prevent-or-recover-from-a-natural-disaster', 'purchase-or-upgrade-equipment-vehicles-or-tools', 'recycle-waste-or-reduce-my-energy-use', 'research-and-develop-innovative-new-products-or-services', 'start-a-business', 'upgrade-restore-or-fit-out-a-building', 'open', 'coming-soon', 'closed'];
    
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
    set_single_filters('business-type', filter_set_business_type);
    set_single_filters('business-stage', filter_set_business_stage);
    
    
    
    // SET TOGGLE SWITCH QUESTIONS ON PAGE LOAD.
    var filter_set_toggles = ['rural', 'atsi'];
    
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
        
        var reduced_count = Math.round(result_count - 51),
            restore_count = Math.round(result_count + 51);

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
    // Get total number of search results
    var search_card_number = $('.search-card-result').length;
    var card_ids = [];

    for(var i = 0; i < search_card_number; i++){
        card_ids.push("#search-result-" + (i+1));
    }
    
    var search_cards = {};
    $('.search-card-result').each(function(){
        search_cards['#' + $(this).attr('id')] = $(this).html();
    });
    
    function Shuffle(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }
    
    $('[filter-type]').on('click', function(){

        $('.results-wrapper').empty();
        
        var shuffled_cards = Shuffle(card_ids);
        
        for (var id = 0; id < 9; id++) {
            $('.results-wrapper').append('<div class="search-card-result">' + search_cards[shuffled_cards[id]] + '</div>');
        }
    });
    
    $('[select-filter-type]').change(function(){
        
        $('.results-wrapper').empty();
        
        var shuffled_cards = Shuffle(card_ids);
        
        for (var id = 0; id < 9; id++) {
            $('.results-wrapper').append('<div class="search-card-result">' + search_cards[shuffled_cards[id]] + '</div>');
        }

    });
    
    $('[toggle-filter-type]').change(function(){
        
       $('.results-wrapper').empty();
        
        var shuffled_cards = Shuffle(card_ids);
        
        for (var id = 0; id < 9; id++) {
            $('.results-wrapper').append('<div class="search-card-result">' + search_cards[shuffled_cards[id]] + '</div>');
        }
        
    });
    
    
    
 
    
    
}); // END doc ready

