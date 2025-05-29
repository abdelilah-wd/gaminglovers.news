export default function setUpDownloadPage(homeData) {
    const loadScreen = document.querySelector(".loader-screen");
    if (loadScreen) {
        setTimeout(() => {
            loadScreen.remove();
        }, 1000);
    }

    // Create Scrolling Smooth to the Header 
    const header = document.getElementById("navbar");
    const hero = document.getElementById("carouselWithCaptions");
    if (header && hero) {
        window.addEventListener("scroll", () => {
            const heroBottom = hero.getBoundingClientRect().bottom;
            if (heroBottom <= 400 && heroBottom > 0) {
                header.classList.add("in-middle")
                header.classList.remove("in-bottom");
                header.classList.remove("in-top");
            }
            else if (heroBottom <= 0) {
                header.classList.add("in-bottom");
                header.classList.remove("in-top");
                header.classList.remove("in-middle");
            } else {
                header.classList.add("in-top")
                header.classList.remove("in-bottom");
                header.classList.remove("in-middle");
            }
        });
    }

    // change carousel-item background
    let carouselItems = document.querySelectorAll(".carousel-inner .carousel-item");
    if (carouselItems) {
        let carouselItemsData = homeData.carouselItems;
        let allItems = [...Object.keys(carouselItemsData)];
        carouselItems.forEach(function (ele, index) {
            ele.style.backgroundImage = `url(${carouselItemsData[allItems[index]].bgImg})`;
            document.querySelectorAll(".carousel-item .game-info img")[index].src = `${carouselItemsData[allItems[index]].gameIcon}`
            document.querySelectorAll(".carousel-item .game-info h2")[index].innerHTML = `${carouselItemsData[allItems[index]].gameTitle}`
            document.querySelectorAll(".carousel-item .dowBtn")[index].href = `${carouselItemsData[allItems[index]].downloadLink}`
        })
        // document.querySelector(".carousel-control-next").click();
        setInterval(() => {
            if (window.innerWidth < 992) {
                document.getElementById("carouselWithCaptions").classList.remove("container");
            } else {
                document.getElementById("carouselWithCaptions").classList.add("container");
            }
        }, 500);
    }
}
