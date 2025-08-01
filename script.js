$(document).ready(function(){
    // Impressive Loading Animation with Dynamic Effects
    function initLoader() {
        var $progressFill = $('.progress-fill');
        var $progressPercentage = $('.progress-percentage');
        var $statusText = $('.status-text');
        var $loader = $('#loader');
        
        var progress = 0;
        var isMobile = window.innerWidth <= 768;
        
        // Dynamic status messages with cybersecurity theme
        var messages = [
            'Initializing Security Protocols...',
            'Scanning Network Perimeter...',
            'Establishing Encrypted Tunnels...',
            'Verifying Digital Certificates...',
            'Deploying Threat Detection...',
            'Loading Security Dashboard...',
            'Finalizing Secure Environment...'
        ];
        
        var messageIndex = 0;
        
        // Enhanced progress animation with better performance
        function updateProgress(targetProgress) {
            return new Promise((resolve) => {
                var duration = isMobile ? 400 : 600;
                var startProgress = progress;
                var startTime = Date.now();
                
                function animate() {
                    var elapsed = Date.now() - startTime;
                    var ratio = Math.min(elapsed / duration, 1);
                    
                    // Smooth easing function
                    var easedRatio = 1 - Math.pow(1 - ratio, 3); // easeOutCubic
                    progress = startProgress + (targetProgress - startProgress) * easedRatio;
                    
                    // Use transform for better performance
                    $progressFill.css('transform', `scaleX(${progress / 100})`);
                    $progressPercentage.text(Math.round(progress) + '%');
                    
                    // Add milestone effects
                    if (Math.round(progress) % 25 === 0 && Math.round(progress) > 0 && Math.round(progress) < 100) {
                        $progressPercentage.addClass('milestone-glow');
                        setTimeout(() => $progressPercentage.removeClass('milestone-glow'), 600);
                    }
                    
                    if (ratio < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        resolve();
                    }
                }
                
                animate();
            });
        }
        
        // Dynamic message update with typing effect
        function updateMessage() {
            if (messageIndex < messages.length) {
                var message = messages[messageIndex];
                var currentText = '';
                var charIndex = 0;
                
                // Clear current text
                $statusText.text('');
                
                // Typing animation
                function typeChar() {
                    if (charIndex < message.length) {
                        currentText += message[charIndex];
                        $statusText.text(currentText);
                        charIndex++;
                        setTimeout(typeChar, isMobile ? 30 : 20);
                    }
                }
                
                typeChar();
                messageIndex++;
            }
        }
        
        // Enhanced loading sequence with dynamic timing
        async function loadingSequence() {
            // Initial delay with dramatic entry
            await new Promise(resolve => setTimeout(resolve, isMobile ? 500 : 800));
            
            // Phase 1: Initialize (0-15%)
            updateMessage();
            await updateProgress(15);
            await new Promise(resolve => setTimeout(resolve, isMobile ? 300 : 500));
            
            // Phase 2: Scanning (15-35%)
            updateMessage();
            await updateProgress(35);
            await new Promise(resolve => setTimeout(resolve, isMobile ? 300 : 500));
            
            // Phase 3: Connecting (35-55%)
            updateMessage();
            await updateProgress(55);
            await new Promise(resolve => setTimeout(resolve, isMobile ? 300 : 400));
            
            // Phase 4: Verifying (55-75%)
            updateMessage();
            await updateProgress(75);
            await new Promise(resolve => setTimeout(resolve, isMobile ? 300 : 400));
            
            // Phase 5: Deploying (75-90%)
            updateMessage();
            await updateProgress(90);
            await new Promise(resolve => setTimeout(resolve, isMobile ? 300 : 400));
            
            // Phase 6: Loading (90-98%)
            updateMessage();
            await updateProgress(98);
            await new Promise(resolve => setTimeout(resolve, isMobile ? 200 : 300));
            
            // Phase 7: Finalizing (98-100%)
            updateMessage();
            await updateProgress(100);
            await new Promise(resolve => setTimeout(resolve, isMobile ? 400 : 600));
            
            // Completion message with effect
            $statusText.text('Security Environment Ready!');
            $progressPercentage.addClass('completion-glow');
            
            await new Promise(resolve => setTimeout(resolve, 400));
            
            // Hide loader with enhanced transition
            $loader.addClass('hidden');
            
            // Clean up and trigger events
            setTimeout(() => {
                $loader.remove();
                $(document).trigger('loaderComplete');
                
                // Analytics tracking
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'loader_complete', {
                        'event_category': 'User Experience',
                        'event_label': 'impressive_loader',
                        'value': Math.round(Date.now() - startTime)
                    });
                }
                
                // Trigger scroll to activate other animations
                $(window).trigger('scroll');
            }, 800);
        }
        
        // Store start time for analytics
        var startTime = Date.now();
        
        // Add CSS for milestone and completion effects
        if (!document.getElementById('loader-effects-styles')) {
            var style = document.createElement('style');
            style.id = 'loader-effects-styles';
            style.textContent = `
                .milestone-glow {
                    animation: milestoneGlow 0.6s ease-out;
                }
                
                @keyframes milestoneGlow {
                    0% { 
                        transform: scale(1);
                        text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
                    }
                    50% { 
                        transform: scale(1.1);
                        text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
                    }
                    100% { 
                        transform: scale(1);
                        text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
                    }
                }
                
                .completion-glow {
                    animation: completionGlow 1s ease-out;
                }
                
                @keyframes completionGlow {
                    0% { 
                        transform: scale(1);
                        text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
                    }
                    50% { 
                        transform: scale(1.2);
                        text-shadow: 0 0 30px rgba(255, 215, 0, 1);
                    }
                    100% { 
                        transform: scale(1);
                        text-shadow: 0 0 15px rgba(255, 215, 0, 0.7);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Start the impressive loading sequence
        loadingSequence();
        
        // Add click to skip loader (for development/testing)
        $loader.on('click', function(e) {
            if (e.detail === 3) { // Triple click to skip
                $loader.addClass('hidden');
                setTimeout(() => {
                    $loader.remove();
                    $(document).trigger('loaderComplete');
                }, 800);
            }
        });
    }
    
    // Initialize the impressive loader
    initLoader();
    
    // Theme Toggle Functionality
    function initThemeToggle() {
        var $themeToggle = $('.theme-toggle');
        var currentTheme = localStorage.getItem('theme') || 'dark';
        
        // Apply saved theme
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        $themeToggle.on('click', function() {
            var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            currentTheme = newTheme;
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add click animation
            $(this).css('transform', 'scale(0.9)');
            setTimeout(() => {
                $(this).css('transform', '');
            }, 150);
            
            // Track theme change
            if (typeof gtag !== 'undefined') {
                gtag('event', 'theme_change', {
                    'event_category': 'UI',
                    'event_label': newTheme
                });
            }
        });
    }
    
    // Back to Top Button
    function initBackToTop() {
        var $backToTop = $('.back-to-top');
        
        $(window).on('scroll', throttle(function() {
            if ($(window).scrollTop() > 300) {
                $backToTop.addClass('show');
            } else {
                $backToTop.removeClass('show');
            }
        }, 100));
        
        $backToTop.on('click', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
            
            // Track back to top usage
            if (typeof gtag !== 'undefined') {
                gtag('event', 'back_to_top', {
                    'event_category': 'Navigation',
                    'event_label': 'button_click'
                });
            }
        });
    }
    
    // Live Chat Widget
    function initLiveChat() {
        var $chatToggle = $('.chat-toggle');
        var $chatWindow = $('.chat-window');
        var $chatClose = $('.chat-close');
        var $chatInput = $('.chat-input');
        var $chatSend = $('.chat-send');
        var $chatMessages = $('.chat-messages');
        var $chatNotification = $('.chat-notification');
        
        var isOpen = false;
        var messageCount = 0;
        
        // Auto-responses for demo
        var responses = [
            "Thank you for your message! How can I help you with your cybersecurity needs?",
            "I'd be happy to discuss our penetration testing services with you.",
            "Our security experts are available for consultation. Would you like to schedule a call?",
            "We offer comprehensive vulnerability assessments. Let me get you more information.",
            "Is there a specific security concern you'd like us to address?"
        ];
        
        $chatToggle.on('click', function() {
            isOpen = !isOpen;
            $chatWindow.toggleClass('open', isOpen);
            
            if (isOpen) {
                $chatNotification.hide();
                $chatInput.focus();
                
                // Track chat open
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'chat_open', {
                        'event_category': 'Engagement',
                        'event_label': 'widget_click'
                    });
                }
            }
        });
        
        $chatClose.on('click', function() {
            isOpen = false;
            $chatWindow.removeClass('open');
        });
        
        function addMessage(content, isUser = false) {
            var messageHtml = `
                <div class="message ${isUser ? 'user-message' : 'agent-message'}">
                    <div class="message-avatar">
                        <i class="fas ${isUser ? 'fa-user' : 'fa-shield-alt'}"></i>
                    </div>
                    <div class="message-content">
                        <p>${content}</p>
                        <span class="message-time">Just now</span>
                    </div>
                </div>
            `;
            
            $chatMessages.append(messageHtml);
            $chatMessages.scrollTop($chatMessages[0].scrollHeight);
        }
        
        function sendMessage() {
            var message = $chatInput.val().trim();
            if (!message) return;
            
            // Add user message
            addMessage(message, true);
            $chatInput.val('');
            
            // Simulate typing indicator
            setTimeout(() => {
                var response = responses[Math.floor(Math.random() * responses.length)];
                addMessage(response);
            }, 1000 + Math.random() * 2000);
            
            messageCount++;
            
            // Track message sent
            if (typeof gtag !== 'undefined') {
                gtag('event', 'chat_message', {
                    'event_category': 'Engagement',
                    'event_label': 'user_message'
                });
            }
        }
        
        $chatSend.on('click', sendMessage);
        
        $chatInput.on('keypress', function(e) {
            if (e.which === 13) {
                sendMessage();
            }
        });
        
        // Show notification after delay
        setTimeout(() => {
            if (!isOpen) {
                $chatNotification.show();
            }
        }, 10000);
    }
    
    // Blog Functionality
    function initBlog() {
        var $filterBtns = $('.filter-btn');
        var $blogCards = $('.blog-card');
        var $paginationBtns = $('.pagination-btn');
        var $pageNumbers = $('.page-number');
        
        // Filter functionality
        $filterBtns.on('click', function() {
            var filter = $(this).data('filter');
            
            $filterBtns.removeClass('active');
            $(this).addClass('active');
            
            $blogCards.each(function() {
                var category = $(this).data('category');
                var show = filter === 'all' || category === filter;
                
                $(this).toggleClass('hidden', !show);
            });
            
            // Track filter usage
            if (typeof gtag !== 'undefined') {
                gtag('event', 'blog_filter', {
                    'event_category': 'Content',
                    'event_label': filter
                });
            }
        });
        
        // Pagination functionality
        $pageNumbers.on('click', function() {
            if (!$(this).hasClass('active')) {
                $pageNumbers.removeClass('active');
                $(this).addClass('active');
                
                // Smooth scroll to blog section
                $('html, body').animate({
                    scrollTop: $('#blog').offset().top - 100
                }, 600);
            }
        });
        
        // Read more tracking
        $('.read-more').on('click', function(e) {
            e.preventDefault();
            var title = $(this).closest('.blog-card').find('.blog-title').text();
            
            // Track read more clicks
            if (typeof gtag !== 'undefined') {
                gtag('event', 'blog_read_more', {
                    'event_category': 'Content',
                    'event_label': title
                });
            }
            
            // Here you would typically redirect to the full article
            console.log('Opening article:', title);
        });
    }
    
    // Utility function for throttling
    function throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
    
    // Initialize all new features
    initLoader();
    initThemeToggle();
    initBackToTop();
    initLiveChat();
    initBlog();

    // Cache frequently used elements for better performance
    var $window = $(window);
    var $document = $(document);
    var $navbar = $('.navbar');
    var $menu = $('.menu');
    var $menuBtn = $('.menu-btn');
    var $scrollUpBtn = $('.scroll-up-btn');
    var $body = $('body');
    
    // Performance optimization variables
    var isScrolling = false;
    var scrollTimeout;
    var lastScrollTop = 0;
    
    // Optimized scroll handler with throttling
    function handleScroll() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                var scrollTop = $window.scrollTop();
                
                // Only update if scroll position changed significantly
                if (Math.abs(scrollTop - lastScrollTop) > 5) {
                    // Sticky navbar with smooth transition
                    if (scrollTop > 20) {
                        $navbar.addClass("sticky");
                    } else {
                        $navbar.removeClass("sticky");
                    }
                    
                    // Scroll up button
                    if (scrollTop > 500) {
                        $scrollUpBtn.addClass("show");
                    } else {
                        $scrollUpBtn.removeClass("show");
                    }
                    
                    // Update active menu item
                    updateActiveMenuItem(scrollTop);
                    
                    lastScrollTop = scrollTop;
                }
                
                isScrolling = false;
            });
        }
        isScrolling = true;
    }
    
    // Throttled scroll event for maximum performance
    $window.on('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 8);
    });
    
    // Fast and accurate active menu item detection
    function updateActiveMenuItem(scrollTop) {
        var sections = $('section[id]');
        var current = '';
        
        sections.each(function() {
            var $section = $(this);
            var sectionTop = $section.offset().top - 120;
            var sectionHeight = $section.outerHeight();
            var sectionId = $section.attr('id');
            
            if (scrollTop >= sectionTop && scrollTop < (sectionTop + sectionHeight)) {
                current = sectionId;
                return false; // Break the loop for performance
            }
        });
        
        if (current) {
            $menu.find('a').removeClass('active');
            $menu.find('a[href="#' + current + '"]').addClass('active');
        }
    }
    
    // Ultra-smooth scrolling with easing
    function smoothScrollTo(target, callback) {
        var $target = $(target);
        if ($target.length) {
            var offsetTop = $target.offset().top - 70;
            $('html, body').animate({
                scrollTop: offsetTop
            }, {
                duration: 800,
                easing: 'swing',
                complete: callback
            });
            return true;
        }
        return false;
    }
    
    // Optimized menu click handling
    $menu.on('click', 'a', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        
        // Instant visual feedback
        $menu.find('a').removeClass('active');
        $(this).addClass('active');
        
        // Handle different types of links
        if (href === '#' || href === '#home') {
            $('html, body').animate({ scrollTop: 0 }, 800);
        } else if (href && href.startsWith('#')) {
            smoothScrollTo(href);
        }
        
        // Close mobile menu instantly
        closeMobileMenu();
    });
    
    // Scroll to top button
    $scrollUpBtn.on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });
    
    // Optimized mobile menu functions
    function openMobileMenu() {
        $menu.addClass("active");
        $menuBtn.addClass("active");
        $body.addClass('menu-open');
    }
    
    function closeMobileMenu() {
        $menu.removeClass("active");
        $menuBtn.removeClass("active");
        $body.removeClass('menu-open');
    }
    
    function toggleMobileMenu() {
        if ($menu.hasClass('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    // Mobile menu toggle
    $menuBtn.on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Close menu when clicking outside
    $document.on('click', function(e) {
        if (!$(e.target).closest('.navbar').length && $menu.hasClass('active')) {
            closeMobileMenu();
        }
    });
    
    // Keyboard navigation
    $document.on('keydown', function(e) {
        switch(e.keyCode) {
            case 27: // ESC key
                if ($menu.hasClass('active')) {
                    closeMobileMenu();
                }
                break;
            case 9: // TAB key
                $body.addClass('using-keyboard');
                break;
        }
    });
    
    $document.on('mousedown', function() {
        $body.removeClass('using-keyboard');
    });
    
    // Enhanced typing animations with error handling
    function initTypingAnimations() {
        if (typeof Typed !== 'undefined') {
            try {
                // Main typing animation
                new Typed(".typing", {
                    strings: [
                        "Cybersecurity Expert", 
                        "Penetration Tester", 
                        "Security Consultant", 
                        "Ethical Hacker",
                        "Vulnerability Analyst"
                    ],
                    typeSpeed: 80,
                    backSpeed: 50,
                    backDelay: 1200,
                    startDelay: 500,
                    loop: true,
                    showCursor: true,
                    cursorChar: "|",
                    smartBackspace: true
                });
                
                // Secondary typing animation
                new Typed(".typing-2", {
                    strings: [
                        "Cybersecurity Specialist", 
                        "Security Analyst", 
                        "Digital Forensics Expert",
                        "Threat Hunter"
                    ],
                    typeSpeed: 90,
                    backSpeed: 55,
                    backDelay: 1500,
                    startDelay: 1000,
                    loop: true,
                    showCursor: true,
                    cursorChar: "|",
                    smartBackspace: true
                });
            } catch (error) {
                console.warn('Typed.js not available:', error);
            }
        }
    }
    
    // Initialize carousel with error handling
    function initCarousel() {
        if (typeof $.fn.owlCarousel !== 'undefined') {
            try {
                $('.owl-carousel, .carousel').owlCarousel({
                    margin: 20,
                    loop: true,
                    autoplay: true,
                    autoplayTimeout: 3500,
                    autoplaySpeed: 1000,
                    autoplayHoverPause: true,
                    smartSpeed: 800,
                    nav: false,
                    dots: true,
                    lazyLoad: true,
                    responsive: {
                        0: { items: 1, nav: false },
                        600: { items: 2, nav: false },
                        1000: { items: 3, nav: false }
                    }
                });
            } catch (error) {
                console.warn('Owl Carousel not available:', error);
            }
        }
    }
    
    // Enhanced form handling with real-time validation
    function initFormHandling() {
        var $contactForm = $('.contact-form');
        
        // Real-time input validation
        $contactForm.on('input focus blur', 'input, select, textarea', function(e) {
            var $input = $(this);
            var $group = $input.closest('.input-group');
            var value = $input.val().trim();
            
            // Handle focus states
            if (e.type === 'focus' || value.length > 0) {
                $group.addClass('focused');
            } else if (e.type === 'blur' && value.length === 0) {
                $group.removeClass('focused');
            }
            
            // Validation
            if ($input.prop('required') && e.type === 'blur') {
                if (value.length === 0) {
                    $group.addClass('error');
                } else {
                    $group.removeClass('error');
                }
            }
            
            // Email validation
            if ($input.attr('type') === 'email' && value.length > 0) {
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(value)) {
                    $group.removeClass('error');
                } else {
                    $group.addClass('error');
                }
            }
        });
        
        // Form submission
        $contactForm.on('submit', function(e) {
            e.preventDefault();
            
            var $form = $(this);
            var $submitBtn = $form.find('.submit-btn');
            var $btnText = $submitBtn.find('.btn-text');
            var $btnIcon = $submitBtn.find('i');
            var originalText = $btnText.text();
            
            // Validate all required fields
            var isValid = true;
            $form.find('[required]').each(function() {
                var $field = $(this);
                var $group = $field.closest('.input-group');
                
                if (!$field.val().trim()) {
                    $group.addClass('error');
                    isValid = false;
                }
            });
            
            if (!isValid) {
                $btnText.text('Please fill all required fields');
                $btnIcon.removeClass().addClass('fas fa-exclamation-triangle');
                
                setTimeout(function() {
                    $btnText.text(originalText);
                    $btnIcon.removeClass().addClass('fas fa-paper-plane');
                }, 3000);
                return;
            }
            
            // Simulate sending
            $submitBtn.prop('disabled', true);
            $btnText.text('Sending...');
            $btnIcon.removeClass().addClass('fas fa-spinner fa-spin');
            
            setTimeout(function() {
                $btnText.text('Message Sent Successfully!');
                $btnIcon.removeClass().addClass('fas fa-check');
                $form[0].reset();
                $('.input-group').removeClass('focused error');
                
                setTimeout(function() {
                    $btnText.text(originalText);
                    $btnIcon.removeClass().addClass('fas fa-paper-plane');
                    $submitBtn.prop('disabled', false);
                }, 3000);
            }, 2000);
        });
    }
    
    // Skills animation with intersection observer
    function initSkillsAnimation() {
        if ('IntersectionObserver' in window) {
            var skillsObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var $skillsSection = $(entry.target);
                        var $progressBars = $skillsSection.find('.skill-progress, .progress-line span');
                        
                        $progressBars.each(function() {
                            var $bar = $(this);
                            var width = $bar.data('width') || $bar.parent().data('percent') || '0%';
                            
                            setTimeout(function() {
                                $bar.css('width', width);
                            }, Math.random() * 500);
                        });
                        
                        skillsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            $('.skills').each(function() {
                skillsObserver.observe(this);
            });
        } else {
            // Fallback for older browsers
            $window.on('scroll', function() {
                var $skillsSection = $('.skills');
                if ($skillsSection.length && !$skillsSection.hasClass('animated')) {
                    var skillsTop = $skillsSection.offset().top;
                    var windowHeight = $window.height();
                    var scrollTop = $window.scrollTop();
                    
                    if (scrollTop + windowHeight > skillsTop + 200) {
                        $skillsSection.addClass('animated');
                        var $progressBars = $skillsSection.find('.skill-progress, .progress-line span');
                        
                        $progressBars.each(function() {
                            var $bar = $(this);
                            var width = $bar.data('width') || $bar.parent().data('percent') || '0%';
                            $bar.css('width', width);
                        });
                    }
                }
            });
        }
    }
    
    // Initialize all components
    function initializeWebsite() {
        initTypingAnimations();
        initCarousel();
        initFormHandling();
        initSkillsAnimation();
        initRatingSystem();
        
        // Add loaded class for animations
        $body.addClass('loaded');
        
        // Performance monitoring
        console.log('🔒 DarkHolds website loaded with optimized performance!');
        
        // Initial scroll position check
        setTimeout(function() {
            handleScroll();
        }, 100);
    }
    
    // Rating System Implementation
    function initRatingSystem() {
        var currentRating = 0;
        var $stars = $('.rating-stars .star');
        var $ratingValue = $('.rating-value');
        var $ratingName = $('#rating-name');
        var $ratingEmail = $('#rating-email');
        var $ratingService = $('#rating-service');
        var $ratingComment = $('#rating-comment');
        var $ratingSubmit = $('.rating-submit');
        var $charCount = $('.current-chars');
        var $ratingLabels = $('.rating-label');
        var $ratingFormSection = $('#rating-form-section');
        var $alreadyRatedSection = $('#already-rated-section');
        var $liveReviewsContainer = $('#live-reviews-container');
        
        // Check for existing rating on page load
        checkExistingRating();
        
        // Load and display existing reviews
        loadExistingReviews();
        
        // Character counter for comment
        $ratingComment.on('input', function() {
            var length = $(this).val().length;
            $charCount.text(length);
            
            if (length > 500) {
                $(this).val($(this).val().substring(0, 500));
                $charCount.text(500);
            }
        });
        
        // Star hover and click functionality
        $stars.on('mouseenter', function() {
            var rating = parseInt($(this).data('rating'));
            highlightStars(rating);
            showRatingLabel(rating);
        });
        
        $('.rating-stars-container').on('mouseleave', function() {
            highlightStars(currentRating);
            showRatingLabel(currentRating);
        });
        
        $stars.on('click', function() {
            currentRating = parseInt($(this).data('rating'));
            highlightStars(currentRating);
            showRatingLabel(currentRating);
            $ratingValue.text(currentRating);
            
            // Add animation to clicked star
            $(this).addClass('clicked');
            setTimeout(() => {
                $(this).removeClass('clicked');
            }, 300);
        });
        
        function highlightStars(rating) {
            $stars.each(function(index) {
                if (index < rating) {
                    $(this).addClass('active');
                } else {
                    $(this).removeClass('active');
                }
            });
        }
        
        function showRatingLabel(rating) {
            $ratingLabels.removeClass('active');
            if (rating > 0) {
                $ratingLabels.eq(rating - 1).addClass('active');
            }
        }
        
        // Enhanced form validation
        function validateRatingForm() {
            var isValid = true;
            var errors = [];
            
            if (currentRating === 0) {
                errors.push('Please select a rating');
                $stars.addClass('flash');
                setTimeout(() => {
                    $stars.removeClass('flash');
                }, 600);
                isValid = false;
            }
            
            if ($ratingName.val().trim().length < 2) {
                errors.push('Please enter your name');
                $ratingName.css('border-color', '#ff6b6b');
                isValid = false;
            } else {
                $ratingName.css('border-color', '');
            }
            
            var email = $ratingEmail.val().trim();
            if (!email || !isValidEmail(email)) {
                errors.push('Please enter a valid email address');
                $ratingEmail.css('border-color', '#ff6b6b');
                isValid = false;
            } else {
                $ratingEmail.css('border-color', '');
            }
            
            if ($ratingService.val() === '') {
                errors.push('Please select a service');
                $ratingService.css('border-color', '#ff6b6b');
                isValid = false;
            } else {
                $ratingService.css('border-color', '');
            }
            
            if ($ratingComment.val().trim().length < 20) {
                errors.push('Please write at least 20 characters in your review');
                $ratingComment.css('border-color', '#ff6b6b');
                isValid = false;
            } else {
                $ratingComment.css('border-color', '');
            }
            
            return { isValid, errors };
        }
        
        // Rating submission
        $ratingSubmit.on('click', function() {
            var validation = validateRatingForm();
            
            if (!validation.isValid) {
                showValidationErrors(validation.errors);
                return;
            }
            
            var email = $ratingEmail.val().trim();
            
            // Check if user has already rated
            if (hasUserAlreadyRated(email)) {
                showValidationErrors(['You have already submitted a review with this email address.']);
                return;
            }
            
            var $btn = $(this);
            var $btnText = $btn.find('span');
            var $btnIcon = $btn.find('i');
            var originalText = $btnText.text();
            
            // Get form data
            var reviewData = {
                rating: currentRating,
                name: $ratingName.val().trim(),
                email: email,
                service: $ratingService.val(),
                comment: $ratingComment.val().trim(),
                date: new Date().toISOString()
            };
            
            // Animate submission
            $btn.prop('disabled', true);
            $btnText.text('Submitting Review...');
            $btnIcon.removeClass('fa-paper-plane').addClass('fa-spinner fa-spin');
            
            // Simulate API call
            setTimeout(function() {
                $btnText.text('Review Submitted!');
                $btnIcon.removeClass('fa-spinner fa-spin').addClass('fa-check');
                
                // Store the review
                storeUserRating(reviewData);
                
                // Show success animation
                showRatingSuccess(reviewData);
                
                // Update stats
                updateRatingStats();
                
                // Add review to live display
                addReviewToDisplay(reviewData);
                
                // Show already rated section
                showAlreadyRatedSection(reviewData);
                
                setTimeout(function() {
                    // Reset form
                    resetRatingForm();
                    $btnText.text(originalText);
                    $btnIcon.removeClass('fa-check').addClass('fa-paper-plane');
                    $btn.prop('disabled', false);
                }, 4000);
            }, 2000);
        });
        
        function showValidationErrors(errors) {
            var errorHtml = errors.map(error => `<div class="error-item"><i class="fas fa-exclamation-circle"></i> ${error}</div>`).join('');
            var $errorNotification = $(`
                <div class="error-notification">
                    <div class="error-header">
                        <i class="fas fa-times-circle"></i>
                        <span>Please fix the following errors:</span>
                    </div>
                    ${errorHtml}
                </div>
            `);
            
            $('body').append($errorNotification);
            
            setTimeout(() => {
                $errorNotification.addClass('show');
            }, 100);
            
            setTimeout(() => {
                $errorNotification.removeClass('show');
                setTimeout(() => {
                    $errorNotification.remove();
                }, 300);
            }, 4000);
        }
        
        function showRatingSuccess(data) {
            var $notification = $(`
                <div class="success-notification">
                    <div class="success-icon">
                        <i class="fas fa-star"></i>
                    </div>
                    <div class="success-content">
                        <h4>Thank You, ${data.name}!</h4>
                        <p>Your ${data.rating}-star review for ${$ratingService.find('option:selected').text()} has been submitted.</p>
                    </div>
                </div>
            `);
            
            $('body').append($notification);
            
            setTimeout(() => {
                $notification.addClass('show');
            }, 100);
            
            setTimeout(() => {
                $notification.removeClass('show');
                setTimeout(() => {
                    $notification.remove();
                }, 300);
            }, 5000);
        }
        
        function resetRatingForm() {
            currentRating = 0;
            highlightStars(0);
            showRatingLabel(0);
            $ratingValue.text('0');
            $ratingName.val('');
            $ratingEmail.val('');
            $ratingService.val('');
            $ratingComment.val('');
            $charCount.text('0');
            
            // Reset border colors
            $ratingName.css('border-color', '');
            $ratingEmail.css('border-color', '');
            $ratingService.css('border-color', '');
            $ratingComment.css('border-color', '');
        }
        
        // New functions for handling user ratings and storage
        function checkExistingRating() {
            var userRating = getUserRating();
            if (userRating) {
                showAlreadyRatedSection(userRating);
            }
        }
        
        function hasUserAlreadyRated(email) {
            var ratings = getAllRatings();
            return ratings.some(rating => rating.email === email);
        }
        
        function storeUserRating(reviewData) {
            // Store individual user rating for this device
            localStorage.setItem('userRating', JSON.stringify(reviewData));
            
            // Store in collection of all ratings
            var allRatings = getAllRatings();
            allRatings.push(reviewData);
            localStorage.setItem('allRatings', JSON.stringify(allRatings));
        }
        
        function getUserRating() {
            var userRating = localStorage.getItem('userRating');
            return userRating ? JSON.parse(userRating) : null;
        }
        
        function getAllRatings() {
            var ratings = localStorage.getItem('allRatings');
            return ratings ? JSON.parse(ratings) : [];
        }
        
        function showAlreadyRatedSection(userRating) {
            // Hide rating form and show already rated message
            $ratingFormSection.hide();
            $alreadyRatedSection.show();
            
            // Display user's rating
            var $userStars = $('.user-stars');
            $userStars.empty();
            
            for (var i = 1; i <= 5; i++) {
                var starClass = i <= userRating.rating ? 'star' : 'star empty';
                $userStars.append(`<span class="${starClass}">★</span>`);
            }
            
            // Display date
            var ratingDate = new Date(userRating.date);
            $('#user-rating-date').text(ratingDate.toLocaleDateString());
        }
        
        function loadExistingReviews() {
            var allRatings = getAllRatings();
            
            if (allRatings.length === 0) {
                // Show no reviews message
                $liveReviewsContainer.html(`
                    <div class="no-reviews">
                        <i class="fas fa-comments"></i>
                        <p>No reviews yet. Be the first to share your experience!</p>
                    </div>
                `);
            } else {
                // Display existing reviews
                allRatings.slice(-5).reverse().forEach(function(review, index) {
                    setTimeout(function() {
                        addReviewToDisplay(review);
                    }, index * 200);
                });
            }
        }
        
        function addReviewToDisplay(reviewData) {
            // Remove no reviews message if it exists
            $liveReviewsContainer.find('.no-reviews').remove();
            
            var reviewDate = new Date(reviewData.date);
            var initials = reviewData.name.split(' ').map(n => n[0]).join('').toUpperCase();
            var serviceName = $ratingService.find(`option[value="${reviewData.service}"]`).text() || reviewData.service;
            
            // Generate stars HTML
            var starsHtml = '';
            for (var i = 1; i <= 5; i++) {
                var starClass = i <= reviewData.rating ? 'star' : 'star empty';
                starsHtml += `<span class="${starClass}">★</span>`;
            }
            
            var reviewHtml = `
                <div class="review-item">
                    <div class="review-header">
                        <div class="reviewer-info">
                            <div class="reviewer-avatar">${initials}</div>
                            <div class="reviewer-details">
                                <h5>${reviewData.name}</h5>
                                <p class="service-used">${serviceName}</p>
                            </div>
                        </div>
                        <div class="review-rating">
                            ${starsHtml}
                        </div>
                    </div>
                    <div class="review-text">${reviewData.comment}</div>
                    <div class="review-date">${reviewDate.toLocaleDateString()}</div>
                </div>
            `;
            
            $liveReviewsContainer.prepend(reviewHtml);
            
            // Limit to 10 reviews max
            var reviews = $liveReviewsContainer.find('.review-item');
            if (reviews.length > 10) {
                reviews.last().remove();
            }
        }
        
        function updateRatingStats() {
            var $avgRating = $('.stat-number').first();
            var $totalReviews = $('.stat-number').eq(1);
            
            var currentAvg = parseFloat($avgRating.text());
            var currentTotal = parseInt($totalReviews.text());
            
            var newTotal = currentTotal + 1;
            var newAvg = ((currentAvg * currentTotal) + currentRating) / newTotal;
            
            animateNumber($avgRating, currentAvg, newAvg.toFixed(1));
            animateNumber($totalReviews, currentTotal, newTotal);
        }
        
        function animateNumber($element, start, end) {
            var range = end - start;
            var steps = 30;
            var increment = range / steps;
            var current = start;
            var timer = setInterval(() => {
                current += increment;
                if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                    current = end;
                    clearInterval(timer);
                }
                $element.text(typeof end === 'string' ? current.toFixed(1) : Math.floor(current));
            }, 50);
        }
        
        // Newsletter subscription
        $('.newsletter-btn').on('click', function() {
            var email = $('.newsletter-input').val().trim();
            var $btn = $(this);
            
            if (!email || !isValidEmail(email)) {
                $('.newsletter-input').css('border-color', '#ff6b6b');
                return;
            }
            
            $('.newsletter-input').css('border-color', '');
            $btn.html('<i class="fas fa-spinner fa-spin"></i>');
            
            setTimeout(() => {
                $btn.html('<i class="fas fa-check"></i>');
                $('.newsletter-input').val('').attr('placeholder', 'Successfully subscribed!');
                
                setTimeout(() => {
                    $btn.html('<i class="fas fa-arrow-right"></i>');
                    $('.newsletter-input').attr('placeholder', 'Your email address');
                }, 3000);
            }, 1500);
        });
        
        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
        
        // Add enhanced CSS for notifications and animations
        var enhancedStyles = `
            .star.clicked {
                animation: starPulse 0.3s ease;
            }
            
            .star.flash {
                animation: starFlash 0.6s ease;
            }
            
            @keyframes starPulse {
                0% { transform: scale(1.15); }
                50% { transform: scale(1.4); }
                100% { transform: scale(1.15); }
            }
            
            @keyframes starFlash {
                0%, 50%, 100% { color: #ddd; }
                25%, 75% { color: #ff6b6b; }
            }
            
            .success-notification,
            .error-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #fff;
                padding: 20px;
                border-radius: 12px;
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: flex-start;
                gap: 15px;
                transform: translateX(400px);
                transition: all 0.3s ease;
                z-index: 10000;
                max-width: 350px;
                border-left: 4px solid #FFD700;
            }
            
            .error-notification {
                border-left-color: #ff6b6b;
            }
            
            .success-notification.show,
            .error-notification.show {
                transform: translateX(0);
            }
            
            .success-icon,
            .error-header i {
                width: 40px;
                height: 40px;
                background: linear-gradient(45deg, #FFD700, #FF8C00);
                color: #fff;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                flex-shrink: 0;
            }
            
            .error-header i {
                background: linear-gradient(45deg, #ff6b6b, #ff5252);
            }
            
            .success-content h4,
            .error-header span {
                margin: 0 0 8px 0;
                font-size: 16px;
                font-weight: 600;
                color: #0a1628;
            }
            
            .success-content p {
                margin: 0;
                font-size: 14px;
                color: #666;
                line-height: 1.4;
            }
            
            .error-item {
                display: flex;
                align-items: center;
                gap: 8px;
                margin: 8px 0;
                font-size: 14px;
                color: #666;
            }
            
            .error-item i {
                color: #ff6b6b;
                font-size: 12px;
            }
        `;
        
        if (!document.getElementById('enhanced-rating-styles')) {
            var style = document.createElement('style');
            style.id = 'enhanced-rating-styles';
            style.textContent = enhancedStyles;
            document.head.appendChild(style);
        }
    }
    
    // Start initialization
    initializeWebsite();
    
    // Global performance optimizations
    $body.on('mouseenter', '.service-card, .testimonial-card, .profile-card', function() {
        $(this).addClass('hover-active');
    }).on('mouseleave', '.service-card, .testimonial-card, .profile-card', function() {
        $(this).removeClass('hover-active');
    });
    
    // Prevent menu close on menu item click in desktop
    $menu.on('click', function(e) {
        if ($window.width() > 947) {
            e.stopPropagation();
        }
    });
    
    // Expose useful functions globally
    window.DarkHolds = {
        smoothScrollTo: smoothScrollTo,
        closeMobileMenu: closeMobileMenu,
        openMobileMenu: openMobileMenu,
        isMenuOpen: function() { return $menu.hasClass('active'); }
    };
});