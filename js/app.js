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

// Add a new section
const main = document.querySelector('main');
function createNewSections() {
    for(let i = 4; i <= 5; i++) {
        let newSection = document.createElement('section')
        let newDiv = document.createElement('div')
        let newHeading = document.createElement('h2')
        let newParaOne = document.createElement('p')
        let newParaTwo = document.createElement('p')
        newSection.setAttribute('id', `section${i}`)
        newSection.setAttribute('data-nav', `Section ${i}`)
        newDiv.classList.add('landing__container')
        newHeading.innerText = `Section  ${i}`
        newParaOne.innerText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.'
        newParaTwo.innerText = 'Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.'
        newDiv.appendChild(newHeading)
        newDiv.appendChild(newParaOne)
        newDiv.appendChild(newParaTwo)
        newSection.appendChild(newDiv)
        main.appendChild(newSection)
    }
}
// createNewSections function must be implemented before other functions
createNewSections();

/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll('section');
const ul = document.querySelector('#navbar__list');
const body = document.querySelector('body');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


// build the nav
function generateNav() {
    sections.forEach(section => {
        let listItem = document.createElement('li')
        let anchorItem = document.createElement('a')
        anchorItem.classList.add('menu__link', `${section.id}`) //add class attribute to anchorItem
        anchorItem.setAttribute('href', `#${section.id}`) //add href attribute to anchorItem, which links to each sections of the page
        anchorItem.innerText = section.dataset.nav //make section IDs visible as menu link on navigation bar
        listItem.appendChild(anchorItem) //append <a> element to <li>
        ul.appendChild(listItem) //append <li> element to <ul>
    })
}

// Add class 'active' to section when it is near top of viewport
// Reference: https://knowledge.udacity.com/questions/85408#96950
// Reference: https://knowledge.udacity.com/questions/66312#66326
function makeActive() {
    sections.forEach(section => {
        let box = section.getBoundingClientRect();
        // section.addEventListener('click', function() {
            // console.log(box)
        // })
        if (box.top <= 150 && box.bottom >= 150) {
            document.querySelector(`.${section.id}`).classList.add('active')
            section.classList.add('your-active-class')
        } else {
            document.querySelector(`.${section.id}`).classList.remove('active')
            section.classList.remove('your-active-class')
        }
    })
}

// Scroll to anchor ID using scrollTO event
// Reference: https://www.geeksforgeeks.org/how-to-set-smooth-scroll-after-clicking-the-link-using-javascript/
function smoothScroll() {
    let anchorList = document.querySelectorAll('a[href^="#"]');
    anchorList.forEach(link => { 
        link.addEventListener('click', function(e) { 
      
            // Prevent default scrolling event
            e.preventDefault(); 
          
            // Get the destination to scroll to using the hash property
            let destination = document.querySelector(this.hash); 
          
            // Scroll to the destination using scrollIntoView method
            destination.scrollIntoView({ 
                behavior: 'smooth' 
            })
        })
    })
}

// Create Back To Top (btt) button
let btt = document.createElement('button');
btt.setAttribute('id', 'js-button');
btt.setAttribute('class', 'scroll-top' + ' arrow');
btt.innerHTML = '<i class="fas fa-arrow-up"></i>';
main.appendChild(btt);

// Detect the number of pixels a user has vertically scrolled
// Reference: https://hiroshi-yokota.com/2019/12/10/back-to-top/
function getScrolled() {
    if (window.pageYOffset !== undefined) {
        return window.pageYOffset
    } else {
        return document.documentElement.scrollTop
    }
}

// Show or hide btt based on how much a user has vertically scrolled
window.onscroll = () => {
    if (getScrolled() > 500 ) {
        btt.classList.add('is-shown')
    } else {
        btt.classList.remove('is-shown')
    }
}

// Add smooth scroll event to btt when a user clicks
// Reference: https://code-r-dev.com/scroll-top-button/
function scrollToTheTop(element, duration) {
    btt.addEventListener('click', function() {

        // Get the current vertical scrolled position - (a)
        let currentY = window.pageYOffset;

        // If (a) is close to the top, scroll back to the top
        // by 10px, otherwise by 100px
        let step = duration/currentY > 1 ? 10 : 100;

        // Calculate how many milliseconds are needed
        // for one scroll to the top - (b)
        let timeStep = duration/currentY * step;

        // Call and repeat a function 'scrollUp' in (b)
        let intervalID = setInterval(scrollUp, timeStep);

        function scrollUp(){
            currentY = window.pageYOffset;

            // If the current vertical scrolled position is
            // equal to 0, stop the function 'scrollUp'
            if(currentY === 0) {
                clearInterval(intervalID);

            // If not, keep scrolling back to the top
            } else {
                scrollBy(0, -step);
            }
        }
    })
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
generateNav();

// Scroll to section on link click
smoothScroll();

// Set sections and links as active
document.addEventListener("scroll", function() {
    makeActive();
  });

// Scroll back to the top in 500 milliseconds (0.5secs)
scrollToTheTop('js-button', 500);
