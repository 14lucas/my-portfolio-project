// ================ Resizing the navigation bar on scrolling ==============

var nav = document.querySelector(".nav-bar");

// when the scroll is above 20 viewport height add sticky class to the tag named navbar
window.onscroll = () => {
    this.scrollY > 20 ? nav.classList.add("sticky") : nav.classList.remove("sticky");
}

// Nav toggle
const navMenu = document.querySelector(".menu"),
navToggle = document.querySelector(".menu-btn");

if(navToggle){
    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    })
}


// closing menu when link is clicked

const navLink = document.querySelectorAll(".nav-link");

function linkAction(){

    const navMenu = document.querySelector(".menu");  
    navMenu.classList.remove("active");
    
}


navLink.forEach(n => n.addEventListener("click", linkAction));

// Scroll section Active link

const section = document.querySelectorAll('section[id]')

function scrollActive(){

    const scrollY = window.scrollY;

    section.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50,
        sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight)
        {
            document.querySelector('.links a[href*=' + sectionId +']').classList.add('active')
        }

        else{
            document.querySelector('.links a[href*=' + sectionId +']').classList.remove('active')
        }
    })

}

window.addEventListener('scroll', scrollActive);
window.addEventListener('load', scrollActive);





// skills bar animation

const skill_wrap = document.querySelector(".about-skills");
skill_bar = document.querySelectorAll(".progress-line");

window.addEventListener("scroll", () => {
    skillsEffect();
})



function checkScroll(el){

    //getting the top position of the about-skills relative to the viewport in other words getting the pixels between the about-skil and
    //the top edge of the window

    let rect = el.getBoundingClientRect();

    //checking if we exceeded the bottom edge of the about-skills or not
    if(window.innerHeight >= rect.top + el.offsetHeight) return true;
    return false;
        
}

function skillsEffect(){

    if(!checkScroll(skill_wrap)) return;
    skill_bar.forEach((skill) => (skill.style.width = skill.dataset.progress))

}


// ===================== Portifolio Item filter =============================

const FilterContainer = document.querySelector(".portifolio-filter"),
filterBtns = FilterContainer.children;

totalFilterBtn = filterBtns.length;
PortifolioItems = document.querySelectorAll(".portifolio-item"),
totalportifolioItems = PortifolioItems.length;

for(let i = 0; i < totalFilterBtn; i ++){
    
    filterBtns[i].addEventListener("click", function(){

        FilterContainer.querySelector(".active").classList.remove("active");
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");
        // console.log(filterValue)
    
        
        for(let k=0; k < totalportifolioItems; k ++){
            if(filterValue === PortifolioItems[k].getAttribute("data-category")){
                PortifolioItems[k].classList.remove("hide");
                PortifolioItems[k].classList.add("show");
            }
            else{
                PortifolioItems[k].classList.remove("show");
                PortifolioItems[k].classList.add("hide");
            }
            if(filterValue === "all"){
                PortifolioItems[k].classList.remove("hide");
                PortifolioItems[k].classList.add("show");
            }
            
            
        }

    })
}

// ================================== lightbox =======================================================

const lightbox = document.querySelector(".lightbox"),
lightboxImg = lightbox.querySelector(".lightbox-img"),
lightboxCLose = lightbox.querySelector(".lightbox-close"),
lightboxText = lightbox.querySelector(".caption-text"),
lightboxCounter = lightbox.querySelector(".caption-counter");

let itemIndex = 0;

for(let i=0; i<totalportifolioItems; i ++){
    PortifolioItems[i].addEventListener("click", function () {
        itemIndex = i;
        changeItem();
        toggleLightbox(); 
    })
}

function nextItem(){
    if(itemIndex === totalportifolioItems - 1){
        itemIndex = 0;
    }
    else{
        itemIndex ++;
    }
    changeItem();
}

function previousItem(){
    if(itemIndex === 0){
        itemIndex = totalportifolioItems - 1;
    }
    else{
        itemIndex --;
    }
    changeItem();
}

function toggleLightbox(){
    lightbox.classList.toggle("open");
}

function changeItem(){
    imgsrc = PortifolioItems[itemIndex].querySelector(".portifolio-image img").getAttribute("src");
    // console.log(imgsrc)

    lightboxImg.src = imgsrc

    lightboxText.innerHTML = PortifolioItems[itemIndex].querySelector("h4").innerHTML;
    lightboxCounter.innerHTML = (itemIndex + 1) + " of " + totalportifolioItems;
    
}

// closing the lightbox

lightbox.addEventListener("click", function(event) {
    if(event.target === lightboxCLose || event.target === lightbox){
        toggleLightbox();
    }
})




