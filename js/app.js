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
//  createNewSections function must be implemented before other functions
createNewSections();

/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll('section');
const ul = document.querySelector('#navbar__list');

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
            }); 
        }) 
    })
}

// Add Back To Top (btt) button
// Reference: https://gist.github.com/ricardozea/abb9f98a19f6d04a0269
let btt = document.createElement('button');
btt.setAttribute('onclick', 'toTheTop()');
btt.setAttribute('id', 'bttButton');
btt.innerHTML = '<i class="far fa-arrow-alt-circle-up"></i>';
main.appendChild(btt);

function toTheTop() {
    let position =
        document.body.scrollTop || document.documentElement.scrollTop;
        if (position) {
            window.scrollBy(0, -Math.max(1, Math.floor(position / 10)));
            scrollAnimation = setTimeout("toTheTop()", 30);
        } else clearTimeout(scrollAnimation);
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