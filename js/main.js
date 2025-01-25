window.onload = function () {
    document.querySelector(".loader-screen").remove();
}

let carouselItems = document.querySelectorAll(".carousel-inner .carousel-item");
setInterval(function () {
    carouselItems.forEach(function (ele, index) {
        if (ele.className.includes("active")) {
            if (index < 1) {
                ele.style.backgroundImage = `url(../images/home-bg-${index + 1}.webp`
            } else
                ele.style.backgroundImage = `url(../images/home-bg-${index + 1}.jpg` || `url(../images/home-bg-${index + 1}.webp`
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

    if (heroBottom <= -700) {
        console.log("is here is here ????");
    }
});


// STart Trending Section 
// let trendingGameImg = document.querySelectorAll(".trend-section .row .col .game-img");

// for (let i = 0; i < trendingGameImg.length; i++) {
//     let getBgName = trendingGameImg[i].getAttribute("bg-img-name");
//     trendingGameImg[i].style.backgroundImage = `url(../images/${getBgName})`
// }
// End Trending Section 
