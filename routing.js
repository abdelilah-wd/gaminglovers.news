let routes = {
    '/home': {
        path: "/html/home.html",
        pageDesc: "Discover the best games in the USA and across the globe with Gaming Lovers. we bring you game reviews, in-game top-ups, exclusive gift cards, free game downloads, and premium digital services—all in one platform. Elevate your gaming experience with curated recommendations and unbeatable deals!",
        title: "Gaming Lovers: Your Gateway to Top Games Worldwide",
        pageIcon: "",
    },
    '/download/monpoly-go': {
        path: "/html/mediafire-page.html",
        title: "Download Monopoly Go",
        pageDesc: "Download Monopoly Go Game For Free",
        pageIcon: "/assets/icons/monopoly-go.icon"
    }
}

let app = document.getElementById("app");
let links = document.querySelectorAll("a");
links.forEach(ele => {
    ele.addEventListener("click", event => {
        event.preventDefault() ;
    })
})
async function loadPage(page) {
    let route = routes[page] || routes["/home"];
    console.log(page);
    let response = await fetch(route.path);
    let html = await response.text();
    app.innerHTML = html;
    setUpPage(page, html);
}

function setUpPage(page, html) {
    app.innerHTML = html;
    const Observe = new MutationObserver((mutations, obs) => {

    });
    Observe.observe(document.body, {
        childList: true,
        subtree: true
    })
    document.head.querySelector("title").innerHTML = routes[page] ? routes[page].title: routes["/home"].title;
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
        console.log("is pressed it");
        event.preventDefault();
        const path = event.target.getAttribute("href");
        history.pushState({}, "", path);
        loadPage(path);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", onNavClick);
    loadPage(location.pathname);
});
