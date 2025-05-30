export default function setUpDownloadPage(pageData) {
    const loadScreen = document.querySelector(".loader-screen");
    if (loadScreen) {
        console.log("is here");
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
            if (heroBottom <= 250 && heroBottom > 0) {
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
    let carouselInner = document.querySelector(".carousel-inner");
    const carouselIndicators = document.querySelector(".carousel-indicators");
    let carouselItems = document.querySelectorAll(".carousel-inner .carousel-item");
    if (carouselItems) {
        for (let i = 0; i < pageData.totalImg; i++) {
            let carouselItem = document.createElement("div");
            carouselItem.className = "carousel-item";
            if (i == 0) carouselItem.classList.add("active");
            carouselItem.setAttribute("data-bs-interval", "2000");
            carouselItem.style.backgroundImage = `url(${pageData.imgsPath}${i}.webp)`;
            carouselInner.appendChild(carouselItem);
            let indicatorsBtn = document.createElement("button");
            indicatorsBtn.type = "button";
            indicatorsBtn.setAttribute("data-bs-target", "#carouselWithCaptions");
            indicatorsBtn.setAttribute("data-bs-slide-to", `${i}`);
            indicatorsBtn.setAttribute("aria-label", `Slide ${i + 1}`);
            if (i === 0) {
                indicatorsBtn.className = "active";
                indicatorsBtn.setAttribute("aria-current", "true");
            }
            carouselIndicators.appendChild(indicatorsBtn);
        }

        // let carouselItemsData = pageData.carouselItems;
        // let allItems = [...Object.keys(carouselItemsData)];
        // carouselItems.forEach(function (ele, index) {
        //     ele.style.backgroundImage = `url(${carouselItemsData[allItems[index]].bgImg})`;
        // })
        document.querySelector(".carousel-control-next").click();
        setInterval(() => {
            if (window.innerWidth < 992) {
                document.getElementById("carouselWithCaptions").classList.remove("container");
            } else {
                document.getElementById("carouselWithCaptions").classList.add("container");
            }
        }, 500);
    }
}
