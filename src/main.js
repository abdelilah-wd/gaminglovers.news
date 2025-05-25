import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css'
import './css/style.css'

document.addEventListener("DOMContentLoaded", () => {
    const Observe = new MutationObserver((mutations, obs) => {
        const loadScreen = document.querySelector(".loader-screen");
        if (loadScreen) {
            setTimeout(() => {
                loadScreen.remove();
            }, 1000);
        }

        // Create Scrolling Smooth to the Header 
        const header = document.getElementById("navbar");
        const hero = document.getElementById("carouselWithCaptions");
        if (header && hero) {
            window.addEventListener("scroll", () => {
                const heroBottom = hero.getBoundingClientRect().bottom;
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
        }
        
        // change carousel-item background
        let carouselItems = document.querySelectorAll(".carousel-inner .carousel-item");
        if (carouselItems) {
            setInterval(function () {
                carouselItems.forEach(function (ele, index) {
                    if (ele.className.includes("active")) {
                        ele.style.backgroundImage = `url(/assets/images/home-bg-${index + 1}.jpg`;
                    }
                })
                if (window.innerWidth < 992) {
                    document.getElementById("carouselWithCaptions").classList.remove("container");
                } else {
                    document.getElementById("carouselWithCaptions").classList.add("container");
                }
            }, 200)
        }

        // Trending Section
        const trendingGameImg = document.querySelectorAll(".trend-section .row .col .game-img");
        if (trendingGameImg) {
            trendingGameImg.forEach((ele, index) => {
                let gameBgName = ele.getAttribute("bg-img-name");
                console.log(gameBgName);
                ele.style.backgroundImage = `url(/assets/images/${gameBgName})`;
            })
        }
        if (loadScreen && header && hero && carouselItems && trendingGameImg) {
            obs.disconnect();
        }
    });
    Observe.observe(document.body, {
        childList: true,
        subtree: true
    })
})
