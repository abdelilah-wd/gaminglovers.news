let app = document.getElementById("app");
let links = document.querySelectorAll("a");

links.forEach(ele => {
    ele.addEventListener("click", event => {
        event.preventDefault();
    })
})

async function loadPage(page) {
    let routeFile = "/routes.json";
    try {
        let response = await fetch(routeFile);
        if (!response.ok) throw new Error(`can't fetching data from ${routeFile}...`);
        let data = await response.json();
        let route = data[page] || data["/home"];
        if (route.path !== location.pathname) history.pushState({}, "", "/home");
        let htmlResponse = await fetch(route.filePath);
        let html = await htmlResponse.text();
        app.innerHTML = html;
        return data;
    } catch {
        throw new Error("Error ! 404 page not found")
    }
}

function setUpPage(page, html, pageInfo) {
    app.innerHTML = html;
    document.querySelectorAll("script[type=module]")[2].src = pageInfo.script;
    const Observe = new MutationObserver((mutations, obs) => {
        const downloadBtn = document.querySelector(".input.popsok");
        if (downloadBtn) {
            console.log("element is finded")
            downloadBtn.href = `${pageInfo.downloadGameLink}`;
            downloadBtn.innerHTML = `DOWNLOAD (${pageInfo.gameSize}MB)`;
        }
        if (downloadBtn) {
            obs.disconnect();
        }
    });
    Observe.observe(document.body, {
        childList: true,
        subtree: true
    })
    document.head.querySelector("title").innerHTML = routes[page] ? routes[page].title : routes["/home"].title;
    // document.querySelector("title").innerHTML = routes[page].title;
    // if (page != "/home") {
    //     console.log("is not home page")
    //     if (document.querySelector('rel["icon"]')) {
    //         document.querySelector('rel["icon"]').setAttribute("href", routes[page].pageIcon);
    //     }
    // }
}

function onNavClick(event) {
    if (event.target.matches("[data-link]")) {
        // event.preventDefault();
        const path = event.target.getAttribute("href");
        history.pushState({}, "", path);
        loadPage(path);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", onNavClick);
    loadPage(location.pathname);
});
