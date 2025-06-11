export default function setUpHomePage(homeData, allGames) {
    let loadScreen = document.querySelector(".loader-screen");
    if (loadScreen) {
        setTimeout(() => {
            loadScreen.remove();
        }, 1000);
    } else {
        setTimeout(() => {
            loadScreen = document.querySelector(".loader-screen");
            if (loadScreen) loadScreen.remove();
        }, 1000);
    }

    const Observe = new MutationObserver((mutations, obs) => {
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
            let allCarouselItems = homeData.carouselItems;
            for (let i = 0; i < allCarouselItems.length; i++) {
                let currentCarouselItem = allGames[allCarouselItems[i]];
                let carouselItem = document.createElement("div");
                carouselItem.className = `carousel-item ${i === 0 ? "active" : ""}`;
                carouselItem.setAttribute("data-bs-interval", "4000");
                carouselItem.style.backgroundImage = `url(${currentCarouselItem.bgImg})`
                carouselItem.innerHTML = `
                    <div class="carousel-caption d-none d-md-block">
                    <div class="game-info">
                    <img src="${currentCarouselItem.gameImage}" alt="">
                    <h2>${currentCarouselItem.gameName}</h2>
                    </div>
                    <a href="${currentCarouselItem.downloadPage}" class="dowBtn" data-link>Download <i class="fa-solid fa-download"></i></a>
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
            if (document.getElementById("carouselWithCaptions")) {
                let interval = setInterval(() => {
                    if (window.innerWidth < 992) {
                        document.getElementById("carouselWithCaptions").classList.remove("container");
                    } else {
                        document.getElementById("carouselWithCaptions").classList.add("container");
                    }
                    if (location.pathname !== "/home") clearInterval(interval);
                }, 500);
            }
        }


        // Trending Section
        const trendingGameSection = document.querySelector(".trend-section .trend-content");
        if (trendingGameSection) {
            const allTrendingGames = homeData.trendingGames;
            for (let i = 0; i < allTrendingGames.length; i++) {
                let currentGame = allGames[allTrendingGames[i]];
                const div = document.createElement("div");
                div.className = "box pt-3 pb-3";
                div.innerHTML = `
                <div class="content">
                    <div class="game-img relative">
                        <div class="download-btn"><a href="${currentGame.downloadPage}">Download</a></div>
                    </div>
                    <div class="info">
                        <div class="top-info d-flex gap-2">
                            <div class="stars"><i class="fa-solid fa-star"></i>${currentGame.stars}</div>
                            <div class="download-count"><i class="fa-solid fa-download"></i>${currentGame.dowCount}</div>
                        </div>
                        <div class="game-title">
                            ${currentGame.gameName}
                        </div>
                        <div class="category pt-2 pb-2 m-0">
                            <span>${currentGame.category}</span>
                        </div>
                    </div>
                </div>
                ` ;
                trendingGameSection.appendChild(div);
                document.querySelectorAll(".trend-section .row .game-img")[i].style.backgroundImage = `url(${currentGame.gameImage})`
            }
        }

        // Category Section
        const categorySection = document.querySelector(".category-section");
        if (categorySection) {
            let allCategorys = Object.keys(homeData.categorys);
            const dropdownMenu = document.querySelector(".dropdown-menu");
            for (let i = 0; i < allCategorys.length; i++) {
                let li = document.createElement("li");
                li.innerHTML = `
                    <a class="dropdown-item" data-category="${allCategorys[i]}" href="#">${allCategorys[i].toUpperCase()}</a>
                ` ;
                dropdownMenu.appendChild(li);
            }
            setUpCategory(allGames);

        }
        if (header && hero && carouselInner && trendingGameSection && categorySection) {
            obs.disconnect();
        }
    });
    Observe.observe(document.body, {
        childList: true,
        subtree: true
    })
}

export function setUpCategory(allGames) {
    let categoryContent = document.querySelector(".category-content");
    categoryContent.innerHTML = "";
    let allcategoryGames = Object.keys(allGames);
    for (let i = 0; i < allcategoryGames.length; i++) {
        let currentGame = allGames[allcategoryGames[i]];
        const div = document.createElement("div");
        if (categoryContent.classList.contains("list-mode")) {
            div.className = "box col-lg-6 col-md-12 col-12 pt-2 pb-2";
        } else {
            div.className = "box col-lg-3 col-md-4 col-6 pt-2 pb-2";
        }
        div.innerHTML = `
        <div class="content">
            <div class="game-img relative">
                <div class="download-btn"><a href="${currentGame.downloadPage}">Download</a></div>
            </div>
            <div class="info">
                <div class="top-info d-flex gap-2">
                    <div class="stars"><i class="fa-solid fa-star"></i>${currentGame.stars}</div>
                    <div class="download-count"><i class="fa-solid fa-download"></i>${currentGame.dowCount}</div>
                </div>
                <div class="game-title">
                    ${currentGame.gameName}
                </div>
                <div class="category pt-2 pb-2 m-0">
                    <span>${currentGame.category}</span>
                </div>
            </div>
        </div>
        ` ;
        categoryContent.appendChild(div);
        document.querySelectorAll(".category-content .box .game-img")[i].style.backgroundImage = `url(${currentGame.gameImage})`
    }

}
