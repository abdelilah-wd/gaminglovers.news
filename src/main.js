import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css'
import './css/mediafire-style.css'
import './css/style.css'
import setUpHomePage from './js/homepage';
import setUpDownloadPage from './js/downloadpage';
import { setUpCategory } from './js/homepage';

let previousPathname = window.location.pathname;

window.addEventListener('popstate', async () => {
    const allGames = await fetchData("/allGames.json");
    const homeData = await fetchData("/homeData.json")
    const currentPathname = window.location.pathname;
    if (currentPathname !== previousPathname) {
        if (location.pathname.match(/\/\w+/ig).includes("/Download")) {
            const downloadPageData = await fetchData("/routes.json")
            setUpDownloadPage(allGames[downloadPageData[location.pathname].gameName]);
        } else {
            setUpHomePage(homeData, allGames);
        }
        previousPathname = currentPathname;
    }
});
document.addEventListener("DOMContentLoaded", async () => {
    const allGames = await fetchData("/allGames.json");
    const homeData = await fetchData("/homeData.json");
    if (location.pathname != "") {
        if (location.pathname.match(/\/\w+/ig) ? location.pathname.match(/\/\w+/ig).includes("/Download") : false) {
            const downloadPageData = await fetchData("/routes.json")
            setUpDownloadPage(allGames[downloadPageData[location.pathname].gameName]);
        } else {
            setUpHomePage(homeData, allGames);
        }
    }

    const observe = new MutationObserver((mutations, obs) => {
        const allCategory = document.querySelectorAll(".dropdown-menu .dropdown-item");
        console.log(allCategory);
        if (allCategory) {
            allCategory.forEach((ele) => {
                ele.addEventListener("click", event => {
                    event.preventDefault();
                    if (event.target.dataset.category === "all") {
                        setUpCategory(allGames);
                    } else {
                        let allItems = homeData.categorys[event.target.dataset.category];
                        let categoryContent = document.querySelector(".category-content");
                        categoryContent.innerHTML = "";
                        for (let i = 0; i < allItems.length; i++) {
                            let currentGame = allGames[allItems[i]];
                            const div = document.createElement("div");
                            div.className = "box col-lg-3 col-md-4 col-6 pt-3 pb-3";
                            div.innerHTML = `
                            <div class="content">
                                <div class="game-img relative">
                                    <div class="download-btn"><a href="${currentGame.downloadPage}">Download</a></div>
                                </div>
                                <div class="info">
                                    <div class="top-info d-flex ">
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
                })
            })
        }
        if (allCategory) obs.disconnect();
    });
    observe.observe(document.body, {
        childList: true,
        subtree: true
    })

})

async function fetchData(filePath) {
    // let filePath = "/homeData.json";
    try {
        let response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`the path ${filePath} can't fetch data from it`);
        }
        let data = await response.json();
        return data;
    } catch {
        throw new Error("Error ! 404 page not found")
    }
}
