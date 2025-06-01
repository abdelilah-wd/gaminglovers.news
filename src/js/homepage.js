export default function setUpHomePage(homeData) {
    const Observe = new MutationObserver((mutations, obs) => {
        const loadScreen = document.querySelector(".loader-screen");
        if (loadScreen) {
            setTimeout(() => {
                loadScreen.remove();
            }, 1000);
        } else {
            setTimeout(() => {
                loadScreen = document.querySelector(".loader-screen");
                loadScreen.remove();
            }, 1000);
        }
        // Create Scrolling Smooth to the Header 
        const header = document.getElementById("navbar");
        const hero = document.getElementById("carouselWithCaptions");
        if (header && hero) {
            window.addEventListener("scroll", () => {
                const heroBottom = hero.getBoundingClientRect().bottom;
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

        // add carousel Items
        const carouselInner = document.querySelector(".carousel-inner");
        const carouselIndicators = document.querySelector(".carousel-indicators");
        if (carouselInner) {
            let carouselItemsData = homeData.carouselItems;
            let allCarouselItems = Object.keys(homeData.carouselItems);
            for (let i = 0; i < allCarouselItems.length; i++) {
                let carouselItem = document.createElement("div");
                carouselItem.className = `carousel-item ${i === 0 ? "active" : ""}`;
                carouselItem.setAttribute("data-bs-interval", "4000");
                carouselItem.style.backgroundImage = `url(${carouselItemsData[allCarouselItems[i]].bgImg})`
                carouselItem.innerHTML = `
                    <div class="carousel-caption d-none d-md-block">
                    <div class="game-info">
                    <img src="${carouselItemsData[allCarouselItems[i]].gameIcon}" alt="">
                    <h2>${carouselItemsData[allCarouselItems[i]].gameTitle}</h2>
                    </div>
                    <a href="${carouselItemsData[allCarouselItems[i]].downloadLink}" class="dowBtn" data-link>Download <i class="fa-solid fa-download"></i></a>
                    </div>
                    ` ;
                carouselInner.appendChild(carouselItem);
                let IndicatorBtn = document.createElement("button");
                IndicatorBtn.type = "button";
                IndicatorBtn.setAttribute("data-bs-target", "#carouselWithCaptions");
                IndicatorBtn.setAttribute("data-bs-slide-to", `${i}`);
                if (i === 0) {
                    IndicatorBtn.className = "active";
                    IndicatorBtn.setAttribute("aria-current", "true")
                }
                IndicatorBtn.setAttribute("aria-label", `Slide ${i + 1}`);
                carouselIndicators.appendChild(IndicatorBtn);
            }
            document.querySelector(".carousel-control-next").click();
            if (window.innerWidth < 992) {
                document.getElementById("carouselWithCaptions").classList.remove("container");
            } else {
                document.getElementById("carouselWithCaptions").classList.add("container");
            }
        }


        // Trending Section
        const trendingGameSection = document.querySelector(".trend-section .trend-content");
        if (trendingGameSection) {
            const trendingGameData = homeData.trendingGames;
            const allItems = [...Object.keys(trendingGameData)];
            for (let i = 0; i < allItems.length; i++) {
                let currentGame = trendingGameData[allItems[i]];
                const div = document.createElement("div");
                div.className = "pt-3 pb-3";
                div.innerHTML = `
                <div class="content">
                    <div class="game-img relative" style="background-image: url("${currentGame.bgImg}");">
                        <div class="download-btn"><a href="${currentGame.downloadLink}">Download</a></div>
                    </div>
                    <div class="info">
                        <div class="top-info d-flex ">
                            <div class="stars"><i class="fa-solid fa-star"></i>${currentGame.stars}</div>
                            <div class="download-count"><i class="fa-solid fa-download"></i>${currentGame.dowCount}</div>
                        </div>
                        <div class="game-title">
                            ${currentGame.gameTitle}
                        </div>
                        <div class="category pt-2 pb-2 m-0">
                            <span>${currentGame.category}</span>
                        </div>
                    </div>
                </div>
                ` ;
                trendingGameSection.appendChild(div);
                document.querySelectorAll(".trend-section .row .game-img")[i].style.backgroundImage = `url(${currentGame.bgImg})`
            }
        }
        if (loadScreen && header && hero && carouselInner && trendingGameSection) {
            obs.disconnect();
        }
    });
    Observe.observe(document.body, {
        childList: true,
        subtree: true
    })
}
