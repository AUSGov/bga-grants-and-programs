/*jshint browser: true, devel: true, jquery: true*/



$(document).ready(function () {
    
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
        window.location.pathname = "/bga-base-prototype/Grants-and-programs.html";
    });
    $('#navbarDropdownMenuLink_3').on('click', function(e){
        e.preventDefault();
        window.location.pathname = "/bga-base-prototype/Expertise-and-advice.html";
    });
    $('#navbarDropdownMenuLink_4').on('click', function(e){
        e.preventDefault();
        window.location.pathname = "/bga-base-prototype/Events-and-training.html";
    });
    $('#navbarDropdownMenuLink_5').on('click', function(e){
        e.preventDefault();
        window.location.pathname = "/bga-base-prototype/News.html";
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
     $(".btn-search").on("click", function(){
        $(".modal-wrapper").addClass("active");
        $(".modal-background").addClass("active");
    });
    
    
    
    // EXPORT TOOL TABS & NAV TILES FUNCTIONALITY
    $('.nav-link').on('click', function(e){
        e.preventDefault();
        $('.tab-section').hide(); 
        
        var active_section = '#' + $(this).attr('href');
        $(active_section).show();
    });
    
    $('.export-nav-tile').on('click', function(){
        $('.tab-section').hide(); 
        var active_section = $(this).attr('data-attribute');
        $('#' + active_section).show();
        
        $('.nav-link.active').removeClass('active');
        $('.nav-link[href='+ active_section + ']').addClass('active');
        
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });
    
    
    // GUIDE MINI-LIST
    /*------------------- Open & close list items -------------------*/
    $(".guide-mini-list-item-title").on("click", function () {
        $(this).next('.content-wrapper').slideToggle(400);

        if ($(this).closest('.guide-mini-list-item').hasClass('open')) {
            
            $(this).closest('.guide-mini-list-item').removeClass('open');

            
        } else {
            $(this).closest('.guide-mini-list-item').addClass('open');
        }
         
     });
    
    
    //GUIDE TILES
    /*------------------- Open & close items -------------------*/
    $(".guide-title").on("click", function () {
        $(this).next('.guide-content').slideToggle(200);

        $(this).toggleClass("open");
        $(this).parent(".guide-section").toggleClass('open');
        
        var sectionId = $(this).parent(".guide-section").attr("id");
        if ($(this).parent(".guide-section").hasClass('open')) {
            sessionStorage.setItem(sectionId, 'open');
        } else {
            sessionStorage.setItem(sectionId, '');
        }
            
     });
    
    $(".guide-expand-all").on("click", function (){
        
        if($(this).hasClass('open')) {
            $(this).removeClass('open');
            $('.guide-content').slideUp(400);
            $(".guide-title").removeClass('open');
            $(".guide-section").removeClass('open');
            
            $(this).find('h5').text('Open all');
            
        } else { 
            $(this).addClass('open');
            $('.guide-content').slideDown(400);
            $(".guide-title").addClass('open');
            $(".guide-section").addClass('open');
     
            $(this).find('h5').text('Close all');
        }
        
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
    $('.shortlist').on('click', function(){
        
        var parent_card = $(this).parents('.search-card-standard-content'),
            grant = parent_card.find('.search-card-content-type').text(),
            description = parent_card.find('h5').text(),
            shortlist_li = '<li><a href="">'+grant+"</a><p>"+description+"</p></li>",
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
            
            $('.shortlist-links ul').append(shortlist_li);
            
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
    $('.shortlist-links li:before').on('click', function(){
        console.log('clicked');
        $(this).parent('li').remove();
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
    
    /*if ($('#section_0').length) {
        console.log('section 0');
        window.location.hash = "0";
    } else {
        console.log('not section 0');
    }*/

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
    

    // Change sections on url fragment change (to catch browser back button clicks)
    /*$(window).on('popstate', function(e) {
        var new_section = window.location.hash; 
        $('.finder_section').hide();
        $(new_section).show();
    });*/
    

    
    // FINDER QUESTIONS
    // Multiple selects
    $('.finder-question.multi-select li').on('click', function(){
        
        var filter_option = $(this).attr('data-value'); 
        var filter_type = $(this).parents('.finder-question').attr('id');
        
        // IF audience question - manage 'none of these' response
        if ($(this).parents('.finder-question').attr('id') == 'question-audience') {
        
            if ($(this).hasClass('none-of-these')) {
                
                if ($(this).hasClass('selected')) {
                    
                    $(this).removeClass('selected');
                    $('#audience .active-filters li.none-of-these').removeClass('selected');
                    $('#audience .none-of-these').removeClass('selected');
                    
                } else if (!$(this).hasClass('selected')) {
                    $('.finder-question.multi-select li').removeClass('selected');
                    $(this).addClass('selected');
                    
                    $('#audience .active-filters li').removeClass('selected');
                    $('#audience .active-filters .none-of-these').addClass('selected');
                    
                    $('#audience .checkbox-item').removeClass('selected');
                    $('#audience .none-of-these').addClass('selected');
                }
                
  
            } 
            else {
                $('.finder-question.multi-select li.none-of-these').removeClass('selected');
                $(this).toggleClass('selected');
                
                $('#audience .active-filters li[data-value="' + filter_option + '"]').toggleClass('selected');
                $('#audience .active-filters .none-of-these').removeClass('selected');
                
                $('#audience #' + filter_option).parents('.checkbox-item').toggleClass('selected');
                $('#audience .none-of-these').removeClass('selected');
                
            }
                
        } 
        
        // Else logic for all other multi-selects    
        else {
            $(this).toggleClass('selected');

            $('.active-filters li[data-value="' + filter_option + '"]').toggleClass('selected');
            $('#' + filter_option).parent('.checkbox-item').toggleClass('selected');
        }
        
        
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
    });
    
    
    // FINDER FILTERS
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
    
    // MULTIPLE SELECT FILTERS
    // Select filter 'bubble' options - multiple select
    $('.active-filters li').on('click', function(){
        
        var filter_option = $(this).attr('data-value');
    
        /*if ( $(this).parents('filter-item').attr('id') == "audience" ) {
            
            if ($(this).hasClass('none-of-these')) {
                
                if ($(this).hasClass('selected')) {
                    
                    $(this).removeClass('selected');
                    $('#question-audience .none-of-these').removeClass('selected');
                    $('#audience #none-of-these').removeClass('selected');
                    
                } else if (!$(this).hasClass('selected')) {
                    $('#audience .finder-question.multi-select li').removeClass('selected');
                    $('#audience .finder-question.multi-select .none-of-these').addClass('selected');
                    
                    $('#audience .active-filters li').removeClass('selected');
                    $(this).addClass('selected');
                    
                    $('#audience .checkbox-item').removeClass('selected');
                    $('#audience .none-of-these').addClass('selected');
                }
                
  
            } 
            else {
                $('#question-audience .finder-question.multi-select li.none-of-these').removeClass('selected');
                $('#question-audience .finder-question.multi-select li[data-value="' + filter_option + '"]').toggleClass('selected');
                
                $('#audience .active-filters li[data-value="' + filter_option + '"]').toggleClass('selected');
                $('#audience .active-filters .none-of-these').removeClass('selected');
                
                $('#audience #' + filter_option).parents('.checkbox-item').toggleClass('selected');
                $('#audience .none-of-these').removeClass('selected');
                
            }
            
        } 
        
        else {
        */
        $(this).toggleClass('selected');
        
            $('#' + filter_option).parent('.checkbox-item').toggleClass('selected');
            $('.finder-question.multi-select li[data-value="' + filter_option + '"]').toggleClass('selected'); 
            
        //}
    });
    
    // Select filter checkbox options
    $('.checkbox-item label').on('click', function(){
        
        var filter_option = $(this).parents('.checkbox-item').find('input').attr('id');
        
        if ( $(this).parents('.filter-item').attr('id') == "audience" ) {
        
            if ($(this).parents('.checkbox-item').hasClass('none-of-these')) {
                
                if ($(this).hasClass('selected')) {
                    
                    console.log('selecting none');
                   
                    $('#question-audience .none-of-these').removeClass('selected');
                    $('#audience .finder-question.multi-select .none-of-these').removeClass('selected');
                    $(this).removeClass('selected');
                    
                } else if (!$(this).hasClass('selected')) {
                    
                    
                    $('#question-audience li').removeClass('selected');
                    $('#question-audience .none-of-these').addClass('selected');
                    
                    $('#audience .active-filters li').removeClass('selected');
                    $('#audience .active-filters .none-of-these').addClass('selected');
                    
                    $('#audience .checkbox-item').removeClass('selected');
                    $(this).parents('.checkbox-item').addClass('selected');
                }
                
  
            } 
            
            else {
                
                $('#question-audience .none-of-these').removeClass('selected');
                $('#question-audience li[data-value="' + filter_option + '"]').toggleClass('selected');
                
                $('#audience .active-filters li[data-value="' + filter_option + '"]').toggleClass('selected');
                $('#audience .active-filters .none-of-these').removeClass('selected');
                
                $(this).parents('.checkbox-item').toggleClass('selected');
                $('#audience .none-of-these').removeClass('selected');
                
            }


        } // end if audience
        
        else {       
            $(this).parents('.checkbox-item').toggleClass('selected');
            $(this).parents('.filter-item').find('.active-filters li[data-value="' + filter_option +'"]').toggleClass('selected ');
            $('.finder-question.multi-select li[data-value="' + filter_option + '"]').toggleClass('selected');
        } 
                  
    }); 
    
    
    // SINGLE SELECT FILTERS
    // Select filter 'bubble' options -single select
     $('.active-filters.single-select li').on('click', function(){
         $(this).removeClass('selected');
         
         var filter_type = $(this).parents('.filter-item').attr('id');
         
         $('#question-' + filter_type + ' select').val('select-option');     
         $('#' + filter_type + ' .filter-item-content select').val('select-option');
    });
    
    // Select single select options
    $('.filter-item-content select').change(function(){
        
        var filter_type = $(this).parents('.filter-item').attr('id');
        var filter_option = $(this).val();

        $('#' + filter_type + ' .active-filters.single-select li').removeClass('selected');
        $('#' + filter_type + ' .active-filters.single-select li[data-value="' + filter_option + '"]').addClass('selected');   
        $('#question-' + filter_type + ' select').val(filter_option);
    });
    
    
    // FINDER RESULTS CARDS
    $(".accordion-title").on('click', function(){
        $(this).parents('.search-accordion-expand-wrapper').find(".collapse").slideToggle();
        $(this).parents('.grant-expand-title').toggleClass('collapsed');
    });
   
    

    
    
}); // END doc ready

