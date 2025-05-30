export default function setUpHomePage(homeData) {
    const Observe = new MutationObserver((mutations, obs) => {
        console.log("observ in download page is working fine");
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
                console.log(heroBottom);
                if (heroBottom <= 250 && heroBottom > 0) {
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
            let carouselItemsData = homeData.carouselItems;
            let allItems = [...Object.keys(carouselItemsData)];
            carouselItems.forEach(function (ele, index) {
                ele.style.backgroundImage = `url(${carouselItemsData[allItems[index]].bgImg})`;
                document.querySelectorAll(".carousel-item .game-info img")[index].src = `${carouselItemsData[allItems[index]].gameIcon}`
                document.querySelectorAll(".carousel-item .game-info h2")[index].innerHTML = `${carouselItemsData[allItems[index]].gameTitle}`
                document.querySelectorAll(".carousel-item .dowBtn")[index].href = `${carouselItemsData[allItems[index]].downloadLink}`
            })
            document.querySelector(".carousel-control-next").click();
            setInterval(() => {
                if (window.innerWidth < 992) {
                    document.getElementById("carouselWithCaptions").classList.remove("container");
                } else {
                    document.getElementById("carouselWithCaptions").classList.add("container");
                }
            }, 500);
        }

        // Trending Section
        const trendingGameImg = document.querySelectorAll(".trend-section .row .game-img");
        if (trendingGameImg) {
            let trendingGameData = homeData.trendingGames;
            let allItems = [...Object.keys(trendingGameData)];
            trendingGameImg.forEach((ele, index) => {
                ele.style.backgroundImage = `url(${trendingGameData[allItems[index]].bgImg})`;
                document.querySelectorAll(".trend-section .row .info .stars")[index].innerHTML = `<i class="fa-solid fa-star"></i>${trendingGameData[allItems[index]].stars}`
                document.querySelectorAll(".trend-section .row .info .download-count")[index].innerHTML = `<i class="fa-solid fa-download"></i>${trendingGameData[allItems[index]].dowCount}M`
                document.querySelectorAll(".trend-section .row .info .game-title")[index].innerHTML = `${trendingGameData[allItems[index]].gameTitle}`;
                document.querySelectorAll(".trend-section .row .info .category")[index].innerHTML = `<span>${trendingGameData[allItems[index]].category}</span>`;
                document.querySelectorAll(".trend-section .row .game-img .download-btn a")[index].href = `${trendingGameData[allItems[index]].downloadLink}`;
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
}
