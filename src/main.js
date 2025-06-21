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
    console.log(gameName);
    let currentDate = new Date();
    let oldDate = new Date(date);
    if (oldDate.getFullYear() != currentDate.getFullYear() || oldDate.getMonth() != currentDate.getMonth() || oldDate.getDate() != currentDate.getDate()) {
        return null;
    }
    const toSeconds = date =>
        date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
    let secondPassed = toSeconds(currentDate) - toSeconds(oldDate);
    let unlockAfter = 10 * 60; // by second
    let maxTime = 60; // by minuts
    if (secondPassed / 60 > maxTime) return null;
    const observe = new MutationObserver((mutations, obs) => {
        let lockedBtn = document.querySelector(".download-game-btn")
        let unlockedBtn = document.querySelector(".download-game-btn.unlocked")
        let notification = document.querySelector(".notification");
        let timerCountdown = document.querySelector(".timer-countdown");
        let closeNotiBtn = document.querySelector(".closebtn");
        if (!lockedBtn || !unlockedBtn || !notification || !timerCountdown || !closeNotiBtn) return;
        unlockedBtn.addEventListener("click", event => {
            event.preventDefault();
            gtag('event', 'download_clicked', {
                'game_name': gameName,
            });
            window.open("https://otieu.com/4/9475152", "_blank");

            window.location.href = unlockedBtn.href;


        })
        if (secondPassed > unlockAfter) {
            unlockedBtn.classList.remove("hidden");
            lockedBtn.classList.add("hidden");
            notification.classList.add("hidden");
            gtag('event', 'game_unlocked', {
                'game_name': gameName,
            });
        } else {
            unlockedBtn.classList.add("hidden");
            lockedBtn.classList.remove("hidden");
            notification.classList.remove("hidden");

            let secondsLeft = unlockAfter - secondPassed;
            const updateTimerDisplay = () => {
                let minutes = Math.floor(secondsLeft / 60);
                let seconds = secondsLeft % 60;
                timerCountdown.innerHTML = `<span>${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</span>`
            };
            closeNotiBtn.addEventListener("click", event => {
                event.preventDefault();
                notification.classList.add("hidden");
            })
            document.querySelector(".unlock-now").addEventListener('click', event => {
                gtag('event', 'offer_clicked', {
                    'game_name': gameName,
                });
            })
            updateTimerDisplay();
            let interval = setInterval(() => {
                updateTimerDisplay();
                secondsLeft --;
                if (secondsLeft  < 0) {
                    clearInterval(interval);
                    notification.classList.add("hidden");
                    gtag('event', 'game_unlocked', {
                        'game_name': gameName,
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 200);
                }
            }, 1000);
        }
        obs.disconnect();
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
