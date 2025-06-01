import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css'
import './css/mediafire-style.css'
import './css/style.css'
import setUpHomePage from './js/homepage';
import setUpDownloadPage from './js/downloadpage';

let previousPathname = window.location.pathname;

window.addEventListener('popstate', async () => {
    const homeData = await fetchData("/homeData.json")
    const currentPathname = window.location.pathname;
    if (currentPathname !== previousPathname) {
        if (location.pathname.match(/\/\w+/ig).includes("/Download")) {
            const downloadPageData = await fetchData("/routes.json")
            setUpDownloadPage(downloadPageData[location.pathname]);
        } else {
            setUpHomePage(homeData);
        }
        previousPathname = currentPathname;
    }
});
document.addEventListener("DOMContentLoaded", async () => {
    const homeData = await fetchData("/homeData.json")
    console.log(location.pathname);
    if (location.pathname != "") {
        if (location.pathname.match(/\/\w+/ig) ? location.pathname.match(/\/\w+/ig).includes("/Download") : false) {
            const downloadPageData = await fetchData("/routes.json")
            setUpDownloadPage(downloadPageData[location.pathname]);
        } else {
            setUpHomePage(homeData);
        }
    }
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
