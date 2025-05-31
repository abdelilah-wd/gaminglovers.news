export default function setUpDownloadPage(pageData) {
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
        const downloadLink = document.querySelector(".download_link");
        if (downloadLink) {
            document.querySelector(".download_link > img").src = `${pageData.gameImage}`
            document.querySelector(".input.popsok").href = `${pageData.downloadLink}`;
            document.querySelector(".input.popsok").innerHTML = `DOWNLOAD (${pageData.gameSize})`;
        }
        const promoDownloadName = document.querySelector(".promoDownloadName .dl-btn-label");
        if (promoDownloadName) {
            promoDownloadName.innerHTML = `${pageData.gameName}`;
        }
        if (downloadLink && promoDownloadName) {
            obs.disconnect();
        }
    });
    Observe.observe(app, {
        childList: true,
        subtree: true
    })
}
