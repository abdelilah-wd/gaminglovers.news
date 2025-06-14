export default function setUpDownloadPage(pageData) {
    console.log(pageData);
    console.log(pageData);
    const app = document.getElementById("app");
    let loadScreen = document.querySelector(".loader-screen");
    if (loadScreen) {
        setTimeout(() => {
            loadScreen.remove();
        }, 500);
    } else {
        setTimeout(() => {
            loadScreen = document.querySelector(".loader-screen");
            loadScreen.remove();
        }, 1000);
    }
    const Observe = new MutationObserver((mutations, obs) => {
        loadScreen = document.querySelector(".loader-screen");
        const downloadBox = document.querySelector(".download-box");
        if (downloadBox) {
            document.querySelector(".title").innerHTML = `${pageData.gameName}`
            document.querySelector(".card .game-logo").src = `${pageData.gameImage}`
            document.querySelector(".download-game-btn").href = `${pageData.downloadLink}`;
            document.querySelector(".game-tag").innerHTML = `${pageData.category}`
            document.querySelector(".game-size").innerHTML = `${pageData.gameSize}`;
            document.querySelector(".rating").innerHTML = `${pageData.stars} (${pageData.reviewTime} reviews)`
            document.querySelector(".description").innerHTML = `${pageData.gameDesc}`;
            if (pageData.features) {
                document.querySelector(".features").innerHTML = `${pageData.features}`
            }
            // document.querySelector(".go-down").addEventListener("click", event => {
            //     window.scrollTo(0, document.body.scrollHeight);
            // })
        }
        const cardHeader = document.querySelector(".card .card-header") ;
        if (cardHeader) {
            if (pageData.gameScreenShot) {
                console.log(pageData.gameScreenShot);
                const carouselInner = document.querySelector(".carousel-inner")
                const carouselIndicators = document.querySelector(".carousel-indicators");
                for (let i = 0; i < pageData.gameScreenShot.length; i++) {
                    console.log(i);
                    let IndicatorBtn = document.createElement("button");
                    IndicatorBtn.type = "button";
                    IndicatorBtn.setAttribute("data-bs-target", "#carouselWithCaptions");
                    IndicatorBtn.setAttribute("data-bs-slide-to", `${i}`);
                    if (i === 0) {
                        IndicatorBtn.className = "active";
                        IndicatorBtn.setAttribute("aria-current", "true")
                    }
                    IndicatorBtn.setAttribute("aria-label", `Slide ${i + 1}`);
                    console.log(IndicatorBtn);
                    carouselIndicators.appendChild(IndicatorBtn);


                    let currentCarouselItem = pageData.gameScreenShot[i];
                    let carouselItem = document.createElement("div");
                    carouselItem.className = `carousel-item ${i === 0 ? "active" : ""} rm-before`;
                    carouselItem.setAttribute("data-bs-interval", "4000");
                    carouselItem.style.backgroundImage = `url(${currentCarouselItem})`
                    carouselInner.appendChild(carouselItem);
                }
                setTimeout(() => {
                    document.querySelector(".carousel-control-next").click();
                }, 1000);

            }
        }
        if (downloadBox && cardHeader) {
            obs.disconnect();
        }
    });
    Observe.observe(app, {
        childList: true,
        subtree: true
    })
}
