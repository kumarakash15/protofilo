// Tab functionality
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(event, tabname) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// Side menu functionality
var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px";
}

// Google Sheets form submission
const scriptURL = 'https://script.google.com/macros/s/AKfycbzm-9AmNJq1-o13ve4qKoTD_jt5rXUmDnOymWs3u-T_S7mxnJ1bdPdP3ks_fxqysQjA2w/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Message sent successfully";
            setTimeout(function() {
                msg.innerHTML = ""
            }, 5000);
            form.reset();
        })
        .catch(error => console.error('Error!', error.message))
})

// Typewriter effect for the name
function typeWriter() {
    const nameElement = document.querySelector('.header-text h1');
    
    // Clear the original content
    nameElement.innerHTML = '';
    
    const textBeforeName = "Hi, i'm ";
    const name = "Akash";
    const textAfterName = " Kumar<br>Sahoo From India";
    
    let phase = 0; // 0: before name, 1: typing name, 2: after name
    let charIndex = 0;
    
    function type() {
        if (phase === 0) {
            // Typing text before name
            if (charIndex < textBeforeName.length) {
                nameElement.innerHTML = textBeforeName.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(type, 50 + Math.random() * 50);
            } else {
                // Start opening span tag
                nameElement.innerHTML = textBeforeName + '<span>';
                phase = 1;
                charIndex = 0;
                setTimeout(type, 100);
            }
        } else if (phase === 1) {
            // Typing the name letter by letter
            if (charIndex < name.length) {
                nameElement.innerHTML = textBeforeName + '<span>' + name.substring(0, charIndex + 1) + '</span>';
                charIndex++;
                setTimeout(type, 100 + Math.random() * 50); // Slightly slower for the name
            } else {
                // Name is complete, move to after name
                phase = 2;
                charIndex = 0;
                setTimeout(type, 100);
            }
        } else if (phase === 2) {
            // Typing text after name
            if (charIndex < textAfterName.length) {
                nameElement.innerHTML = textBeforeName + '<span>' + name + '</span>' + textAfterName.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(type, 50 + Math.random() * 50);
            }
        }
    }
    
    // Start the typewriter effect after a short delay
    setTimeout(type, 1000);
}
// Add smooth scrolling animation
document.addEventListener('DOMContentLoaded', function() {
    // Start typewriter effect
    typeWriter();
    
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.services-list div, .work');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const elementsToAnimate = document.querySelectorAll('.services-list div, .work');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});