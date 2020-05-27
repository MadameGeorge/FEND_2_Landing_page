/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 *  
*/

/**
 * Define Global Variables
 * 
*/

    // Select a ul tag in nav
    const navBar = document.querySelector('#navbar__list');
    // Select sections
    let sections = Array.from(document.querySelectorAll('section'));

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

    //Check if in viewport
    function isInViewport(section) {
        let rect = section.getBoundingClientRect();
        return (
            rect.top <= (navBar.offsetHeight + 100) &&
            rect.bottom >= (navBar.offsetHeight + 100)
        );
    }

    // Check when element is below fold
    function isBelowFold(element) {
        elementHeight = element.offsetHeight;
        return (
            document.body.scrollTop > elementHeight || document.documentElement.scrollTop > elementHeight
        )
    }


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

     // Build the nav
    function buildNav() {
        sections.forEach( section => {
            // Select section title
            let navLabel = section.getAttribute('data-nav');
            // Create a list element and save as navList
            let navList = document.createElement('li'); 
            // Create an 'a' element and save as navLink
            let navLink = document.createElement('a');
                // Add class to navigation link
                navLink.classList.add('menu__link');
            // Select section id text and add as href  
            let hrefText = section.getAttribute('id');
                // Add hash to a id name and add it to the href attribute of navLink
                navLink.href = '#' + hrefText;     
                // Add 'a' to list element in the nav
                navList.appendChild(navLink);
                // Add label to 'a'
                navLink.textContent = navLabel;
                // Append list element to the navigation
                navBar.appendChild(navList);
        });
    }

    // Add class 'active' to section when near top of viewport
    function addActiveStateSection() {
        
        sections.forEach( section => {
            if (isInViewport(section)) {
                section.classList.add('your-active-class');
            } else {
                section.classList.remove('your-active-class');
            }
        });

    }

     // Add an active state to your navigation items when a section is in the viewport.
    function addActiveStateLink() {
        let navLinks = document.getElementsByClassName('menu__link');
        
        for (let i = 0; i < sections.length; i++) {
            if (isInViewport(sections[i])) {
                navLinks[i].classList.add('current-link');
            } else {
                navLinks[i].classList.remove('current-link');
            }
        };
    }

    // Add a scroll to top button of the page that’s only visible when the user scrolls below the fold of the page
    function showButton() {
        const scrollButton = document.querySelector('.scroll-top__button');

        if (isBelowFold(scrollButton)) {
            scrollButton.classList.remove('hidden');
            scrollButton.addEventListener('click', () => {
                window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })})
        } else {
            scrollButton.classList.add('hidden');
        }
    }


    // Scroll to anchor ID using scrollTO event
    function scrollToSection(){
        const links = document.querySelectorAll('a[href*=\\#]');

        links.forEach( link => {
            link.addEventListener('click', event => {
                event.preventDefault();
                let linkName = link.getAttribute('href');
                let linkNumber = linkName.substr(-1);
                let section = sections[linkNumber-1];
                let top = section.getBoundingClientRect().top + window.pageYOffset - navBar.offsetHeight;
                window.scrollTo({
                    top,
                    behavior: 'smooth'
                });
            })
        })
    }

    // Hide fixed navigation bar while not scrolling (it should still be present on page load).
    // Hint: setTimeout can be used to check when the user is no longer scrolling.
    let userHasScrolled = false;
    let userHasHovered = false;
    const header = document.querySelector('header');

    function hideNav() {
        let userStoppedScrolling;
        if (document.body.scrollTop > 100 || 
            document.documentElement.scrollTop > 100) {
                console.log('false');
            if (userHasScrolled === true) {
                window.clearTimeout(userStoppedScrolling);
                header.classList.remove('hidden');
            }

            userStoppedScrolling = window.setTimeout( () => {
                header.classList.add('hidden');
            }, 1500);
        }   
    }

  

/**
 * End Main Functions
 * Begin Events
 * 
*/

    // Build menu 
    buildNav();

    // Scroll to section on link click
    scrollToSection();

    // Detect scrolling
    window.onscroll = () => {
        userHasScrolled = true;
    } 

    // Detect if user hovers over the navbar
    header.onmouseover = () => {
        userHasHovered = true;
        console.log('hovering');
    }

    // Activate scroll functions 
    window.addEventListener('scroll', () => { 
        addActiveStateSection(); // Set sections as active
        showButton(); // Display button on scroll
        hideNav();
        addActiveStateLink();
    });

    // Make sections collapsible