import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css'
import './css/style.css'
import setUpHomePage from './js/homepage';
import setUpDownloadPage from './js/downloadpage';

document.addEventListener("DOMContentLoaded", async () => {
    const homeData = await fetchData("/homeData.json")
    if (location.pathname == "/home") {
        console.log(homeData);
        setUpHomePage(homeData);
    } else if (location.pathname == "/download/last-war") {
        const downloadPageData = await fetchData("/downloadpage.json")
        setUpDownloadPage(homeData);
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
