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
        if (downloadBox) {
            obs.disconnect();
        }
    });
    Observe.observe(app, {
        childList: true,
        subtree: true
    })
}
