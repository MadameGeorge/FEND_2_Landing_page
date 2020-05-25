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
// let sectionNames = Array.from(sections);

/**
 * Define Global Variables
 * 
*/

    // Select a ul tag in nav
    const navBar = document.querySelector('#navbar__list');
    // Select sections
    let sections = Array.from(document.querySelectorAll('section'));
    // Select links
    let navLinks = document.querySelectorAll('a');
    // Select scroll to the top button
    const scrollButton = document.querySelector('.scroll-top__button');

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
    function addActiveState() {
        sections.forEach( section => {
            if (isInViewport(section)) {
                section.classList.add('your-active-class');
            } else {
                section.classList.remove('your-active-class');
            }
        });

    }

    // Add a scroll to top button of the page that’s only visible when the user scrolls below the fold of the page
    function showButton() {
        if (isBelowFold(scrollButton)) {
            console.log('true');
            scrollButton.classList.remove('hidden');
            scrollButton.addEventListener('click', () => {
                window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })})
        } else {
            console.log('false');
            scrollButton.classList.add('hidden', 'fixed');
        }
    }   

    // Add an active state to your navigation items when a section is in the viewport.


    // Scroll to anchor ID using scrollTO event
    function scrollToSection(){
        navLinks.forEach( navLink => {
            navLink.addEventListener('click', () => {
                let linkName = navLink.getAttribute('href');
                let linkNumber = linkName.substr(-1);
                let section = sections[linkNumber-1];
                let top = section.getBoundingClientRect().top + window.pageYOffset;
                console.log(top);
                window.scrollTo({
                    top,
                    behavior: 'smooth'     
                });
            })
        })
    }

    // Hide fixed navigation bar while not scrolling (it should still be present on page load).
    // Hint: setTimeout can be used to check when the user is no longer scrolling.



/**
 * End Main Functions
 * Begin Events
 * 
*/

    // Build menu 
    buildNav();

    // Scroll to section on link click
    scrollToSection();

    // Activate scroll functions 
    window.addEventListener('scroll', () => { 
        addActiveState(); // Set sections as active
        showButton(); // Display button on scroll
    });

    // Make sections collapsible