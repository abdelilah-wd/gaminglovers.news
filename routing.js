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
        console.log(data);
        console.log(page);
        console.log(data[page]);
        let route = data[page] || data["/home"];
        if (route.path !== location.pathname) history.pushState({}, "", "/home");

        let htmlResponse = await fetch(route.filePath);
        let html = await htmlResponse.text();
        app.innerHTML = html;
        setUpPage(route);
        return data;
    } catch {
        throw new Error("Error ! 404 page not found")
    }
}

function setUpPage(pageInfo) {
    document.head.querySelector("meta[name=description]").content = pageInfo.pageDesc;
    document.head.querySelector("title").innerHTML = pageInfo.title;
    document.head.querySelector("link[rel=icon]").href = pageInfo.pageIcon;
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
let previousPathname = window.location.pathname;

window.addEventListener('popstate', () => {
    const currentPathname = window.location.pathname;
    if (currentPathname !== previousPathname) {
        loadPage(currentPathname);
        previousPathname = currentPathname;
    }
});
