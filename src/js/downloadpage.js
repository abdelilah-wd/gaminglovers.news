export default function setUpDownloadPage(pageData) {
    const loadScreen = document.querySelector(".loader-screen");
    if (loadScreen) {
        setTimeout(() => {
            loadScreen.remove();
        }, 1000);
    }
    const Observe = new MutationObserver((mutations, obs) => {
        console.log("observ in download page is working fine");

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
        const carouselInner = document.querySelector(".carousel-inner");
        const carouselIndicators = document.querySelector(".carousel-indicators");
        if (carouselIndicators && carouselInner) {
            for (let i = 0; i < pageData.totalImg; i++) {
                let carouselItem = document.createElement("div");
                carouselItem.className = "carousel-item";
                if (i == 0) carouselItem.classList.add("active");
                carouselItem.setAttribute("data-bs-interval", "3000");
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
            document.querySelector(".carousel-control-next").click();
            setInterval(() => {
                if (window.innerWidth < 992) {
                    document.getElementById("carouselWithCaptions").classList.remove("container");
                } else {
                    document.getElementById("carouselWithCaptions").classList.add("container");
                }
            }, 500);
        }
        if (header && hero && carouselIndicators && carouselInner) {
            obs.disconnect();
        }
    });
    Observe.observe(document.body, {
        childList: true,
        subtree: true
    })
}
