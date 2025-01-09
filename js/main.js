let carouselItems = document.querySelectorAll(".carousel-inner .carousel-item");
setInterval(function () {
    carouselItems.forEach(function (ele, index) {
        if (ele.className.includes("active")) {
            ele.style.backgroundImage = `url(../images/home-bg-${index + 1}.jpg`
        }
    })
    if (window.innerWidth < 992) {
        document.getElementById("carouselWithCaptions").classList.remove("container");
    } else {
        document.getElementById("carouselWithCaptions").classList.add("container");
    }
}, 200)


// Create Scrolling Smooth to the Header 
const header = document.getElementById("navbar");
const hero = document.getElementById("carouselWithCaptions");

window.addEventListener("scroll", () => {
    const heroBottom = hero.getBoundingClientRect().bottom;
    console.log(heroBottom);
    if (heroBottom <= 400 && heroBottom > 0) {
        header.classList.add("in-middle")
        header.classList.remove("in-bottom");
        header.classList.remove("in-top");
    }
    else if (heroBottom <= 0) {
        header.classList.add("in-bottom");
        header.classList.remove("in-top");
        header.classList.remove("in-middle");
    } else {
        header.classList.add("in-top")
        header.classList.remove("in-bottom");
        header.classList.remove("in-middle");
    }
});
