export default function setUpDownloadPage(pageData) {
    let unlockGames = {};
    console.log(unlockGames);
    console.log(unlockGames["one"]);
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
            document.querySelector(".notification .unlock-now").href = `${pageData.downloadLink}`;
            document.querySelector(".download-game-btn").setAttribute("data-name", pageData.downloadPage.slice(1));
            document.querySelector(".download-game-btn.unlocked").href = `${pageData.originalLink}`;
            document.querySelector(".game-tag").innerHTML = `${pageData.category}`
            document.querySelector(".game-size").innerHTML = `${pageData.gameSize}`;
            document.querySelector(".rating").innerHTML = `${pageData.stars} (${pageData.reviewTime} reviews)`
            document.querySelector(".description").innerHTML = `${pageData.gameDesc}`;
            if (pageData.features) {
                document.querySelector(".features").innerHTML = `${pageData.features}`
            }
        }
        const cardHeader = document.querySelector(".card .card-header") ;
        if (cardHeader) {
            if (pageData.gameScreenShot) {
                const carouselInner = document.querySelector(".carousel-inner")
                const carouselIndicators = document.querySelector(".carousel-indicators");
                for (let i = 0; i < pageData.gameScreenShot.length; i++) {
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
        const downloadBtn = document.querySelector(".download-game-btn");
        if (downloadBtn) {
            downloadBtn.addEventListener("click", event => {
                let date = new Date();
                let finalDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                if (window.localStorage.unlockGames) {
                    unlockGames = JSON.parse(window.localStorage.unlockGames);
                    if (unlockGames[downloadBtn.getAttribute("data-name")]) {
                        unlockGames[downloadBtn.getAttribute("data-name")].time = finalDate;
                    } else {
                        unlockGames[downloadBtn.getAttribute("data-name")] = {time: finalDate};
                    }
                    window.localStorage.setItem("unlockGames", JSON.stringify(unlockGames));
                } else {
                    unlockGames[downloadBtn.getAttribute("data-name")] = { time: finalDate }
                    window.localStorage.setItem("unlockGames", JSON.stringify(unlockGames));
                }
                gtag('event', 'countdown_started', { game_name: downloadBtn.getAttribute("data-name") });
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            });
        }
        if (downloadBox && cardHeader && downloadBtn) {
            obs.disconnect();
        }
    });
    Observe.observe(app, {
        childList: true,
        subtree: true
    })
}
