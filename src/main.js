import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/downloadpage.css';
import './css/mediafire-style.css';
import './css/style.css';
import setUpHomePage from './js/homepage';
import setUpDownloadPage from './js/downloadpage';
import { setUpCategory } from './js/homepage';

let previousPathname = window.location.pathname;

window.addEventListener('popstate', async () => {
    const allGames = await fetchData("/allGames.json");
    const homeData = await fetchData("/homeData.json")
    const currentPathname = window.location.pathname;
    if (currentPathname !== previousPathname) {
        if (!location.pathname.match(/\/\w+/ig).includes("/home")) {
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
        if (location.pathname.match(/\/\w+/ig) ? !location.pathname.match(/\/\w+/ig).includes("/home") : false) {
            const downloadPageData = await fetchData("/routes.json")
            setUpDownloadPage(allGames[downloadPageData[location.pathname].gameName]);
            let pageOfGame = allGames[downloadPageData[location.pathname].gameName].downloadPage.slice(1);
            if (window.localStorage.unlockGames) {
                if (JSON.parse(window.localStorage.unlockGames)[pageOfGame]) {
                    let unlockedTime = JSON.parse(window.localStorage.unlockGames)[pageOfGame].time;
                    checkGameUnlocked(unlockedTime, pageOfGame);
            }
            }
        } else {
            setUpHomePage(homeData, allGames);
        }
    }
    console.log(allGames);

    const observe = new MutationObserver((mutations, obs) => {
        const allCategory = document.querySelectorAll(".dropdown-menu .dropdown-item");
        if (allCategory) {
            allCategory.forEach((ele) => {
                ele.addEventListener("click", event => {
                    document.querySelector(".view-title").innerHTML = event.target.dataset.category
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
                            if (categoryContent.classList.contains("list-mode"))
                                div.className = "box col-lg-6 col-md-12 col-12 pt-2 pb-2";
                            else {
                                div.className = "box col-lg-3 col-md-4 col-6 pt-2 pb-2";
                            };
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
        const categoryViewBtn = document.querySelector(".view-mode");
        if (categoryViewBtn) {
            const categoryContent = document.querySelector(".category-content");
            categoryViewBtn.addEventListener("click", event => {
                const allElement = document.querySelectorAll(".category-content .box");
                event.preventDefault();
                categoryContent.classList.toggle("list-mode")
                document.querySelector(".view-mode .list-icon").classList.toggle("d-none");
                document.querySelector(".view-mode .box-icon").classList.toggle("d-none");
                if (categoryContent.classList.contains("list-mode")) {
                    allElement.forEach(ele => ele.className = "box col-lg-6 col-md-12 col-12 pt-2 pb-2");
                } else {
                    allElement.forEach(ele => ele.className = "box col-lg-3 col-md-4 col-6 pt-2 pb-2");
                }
            })
        }
        const subscribeForm = document.getElementById('subscribe-form');
        const endpoint = 'https://script.google.com/macros/s/AKfycbyqPhgLGZVV3877jZCGqxildnbEIUs6UYtEVX4FS8wTQVJuxJcB1P2q9gSLvrSCBLuUwg/exec'; // URL from Apps Script
        if (subscribeForm) {
            subscribeForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
            
                try {
                    const res = await fetch(endpoint, {
                        method: 'POST',
                        body: new URLSearchParams({ email, token: "MY2025GAMINGTOKENQV01TOLOVERS" })
                    });
            
                    const result = await res.json();
                    console.log(result);
                    if (result.result === 'success') {
                        alert("Thanks for subscribing!");
                        subscribeForm.reset();
                    }
                } catch (error) {
                    alert("Something went wrong. Try again later.");
                }
            });
            
        }
        if (allCategory) obs.disconnect();
    });
        observe.observe(document.body, {
            childList: true,
            subtree: true
        })

})

function checkGameUnlocked(date, gameName) {
    let currentDate = new Date();
    let oldDate = new Date(date);
    if (oldDate.getFullYear() != currentDate.getFullYear() || oldDate.getMonth() + 1 != currentDate.getMonth() + 1 || oldDate.getDate() != currentDate.getDate()) {
        return null;
    }
    let currentSecondTime = currentDate.getHours() * 3600 + currentDate.getMinutes() * 60 + currentDate.getSeconds();
    let oldSecondTime = oldDate.getHours() * 3600 + oldDate.getMinutes() * 60 + oldDate.getSeconds();
    let timeAfterLock = (currentSecondTime - oldSecondTime);
    let unlockGameFor = 30 * 60; // by second
    if (timeAfterLock / 60 > 60) return null;
    const observe = new MutationObserver((mutations, obs) => {
        let lockedBtn = document.querySelector(".download-game-btn")
        let unlockedBtn = document.querySelector(".download-game-btn.unlocked")
        if (lockedBtn && unlockedBtn) {
            if (timeAfterLock > unlockGameFor) {
                unlockedBtn.classList.remove("hidden");
                lockedBtn.classList.add("hidden");
            } else {
                unlockedBtn.classList.add("hidden");
                lockedBtn.classList.remove("hidden");
                let counterBeforeUnlock = unlockGameFor - ((currentSecondTime - oldSecondTime));
                let interval = setInterval(() => {
                    console.log(counterBeforeUnlock) ;
                    counterBeforeUnlock--;
                    if (counterBeforeUnlock < 0) {
                        clearInterval(interval);
                        checkGameUnlocked(date, gameName);
                    }
                }, 1000);
            }
            obs.disconnect();
        }
    });
    observe.observe(document.body, {
        childList: true,
        subtree: true
    })
}


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
