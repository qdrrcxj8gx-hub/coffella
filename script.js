/* =========================================================
                           HEADER
========================================================= */

const body =
    document.body;


const header =
    document.getElementById("header");


const burger =
    document.getElementById("burger");


const mobileMenu =
    document.getElementById("mobileMenu");



function updateHeader() {

    const menuOpen =
        mobileMenu.classList.contains("active");


    if (
        window.scrollY > 40 ||
        menuOpen
    ) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);


updateHeader();



/* =========================================================
                      LOGO FALLBACK
========================================================= */

/*
    Если logo.png ещё не существует,
    вместо broken image будет буква C.
*/

const brandLogo =
    document.getElementById("brandLogo");


if (brandLogo) {

    brandLogo.addEventListener(
        "error",
        () => {

            brandLogo.style.display =
                "none";


            const fallback =
                brandLogo
                    .parentElement
                    .querySelector(
                        ".brand-logo-placeholder"
                    );


            if (fallback) {

                fallback.style.display =
                    "grid";

            }

        }
    );

}


document
    .querySelectorAll(".footer-logo")
    .forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.display =
                    "none";


                const fallback =
                    image
                        .parentElement
                        .querySelector(
                            ".footer-logo-fallback"
                        );


                if (fallback) {

                    fallback.style.display =
                        "grid";

                }

            }
        );

    });



/* =========================================================
                       MOBILE MENU
========================================================= */

function openMobileMenu() {

    mobileMenu
        .classList
        .add("active");


    burger
        .classList
        .add("active");


    header
        .classList
        .add("menu-open");


    burger.setAttribute(
        "aria-expanded",
        "true"
    );


    body
        .classList
        .add("no-scroll");


    updateHeader();

}


function closeMobileMenu() {

    mobileMenu
        .classList
        .remove("active");


    burger
        .classList
        .remove("active");


    header
        .classList
        .remove("menu-open");


    burger.setAttribute(
        "aria-expanded",
        "false"
    );


    body
        .classList
        .remove("no-scroll");


    updateHeader();

}


function toggleMobileMenu() {

    if (
        mobileMenu
            .classList
            .contains("active")
    ) {

        closeMobileMenu();

    } else {

        openMobileMenu();

    }

}


burger.addEventListener(
    "click",
    toggleMobileMenu
);


document
    .querySelectorAll(
        ".mobile-menu a"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });



/* =========================================================
                     SCROLL REVEALS
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal, .reveal-image"
    );


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry
                            .target
                            .classList
                            .add(
                                "visible"
                            );


                        revealObserver
                            .unobserve(
                                entry.target
                            );

                    }

                }
            );

        },

        {
            threshold: .12,

            rootMargin:
                "0px 0px -25px 0px"
        }

    );


revealElements
    .forEach(element => {

        revealObserver.observe(
            element
        );

    });



/* =========================================================
                       STORY DATA
========================================================= */

const stories = {

    menu: [

        "images/menu-1.jpg",
        "images/menu-2.jpg",
        "images/menu-3.jpg",
        "images/menu-4.jpg",
        "images/menu-5.jpg",
        "images/menu-6.jpg",
        "images/menu-7.jpg",
        "images/menu-8.jpg"

    ],


    special: [

        "images/special-1.jpg",
        "images/special-2.jpg",
        "images/special-3.jpg",
        "images/special-4.jpg",
        "images/special-5.jpg",
        "images/special-6.jpg"

    ]

};



/* =========================================================
                       STORY ELEMENTS
========================================================= */

const story =
    document.getElementById("story");


const storyBackdrop =
    document.getElementById(
        "storyBackdrop"
    );


const storyProgress =
    document.getElementById(
        "storyProgress"
    );


const storyLabel =
    document.getElementById(
        "storyLabel"
    );


const storyClose =
    document.getElementById(
        "storyClose"
    );


const storyStage =
    document.getElementById(
        "storyStage"
    );


const storySlide =
    document.getElementById(
        "storySlide"
    );


const storyImage =
    document.getElementById(
        "storyImage"
    );


const storyPlaceholder =
    document.getElementById(
        "storyPlaceholder"
    );


const storyFilename =
    document.getElementById(
        "storyFilename"
    );


const storyPrev =
    document.getElementById(
        "storyPrev"
    );


const storyNext =
    document.getElementById(
        "storyNext"
    );


const storyCounter =
    document.getElementById(
        "storyCounter"
    );



/* =========================================================
                        STORY STATE
========================================================= */

let currentStoryType =
    "menu";


let currentStoryIndex =
    0;


let storyAnimating =
    false;



/* =========================================================
                       OPEN STORY
========================================================= */

document
    .querySelectorAll(
        "[data-story]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const type =
                    button.dataset.story;


                openStory(type);

            }
        );

    });



function openStory(type) {

    if (!stories[type]) {
        return;
    }


    closeMobileMenu();


    currentStoryType =
        type;


    currentStoryIndex =
        0;


    storyLabel.textContent =
        type === "menu"
            ? "main menu"
            : "special menu";


    createProgress();


    renderStory(
        "none"
    );


    story
        .classList
        .add("active");


    story.setAttribute(
        "aria-hidden",
        "false"
    );


    body
        .classList
        .add("no-scroll");

}



/* =========================================================
                       CLOSE STORY
========================================================= */

function closeStory() {

    story
        .classList
        .remove("active");


    story.setAttribute(
        "aria-hidden",
        "true"
    );


    body
        .classList
        .remove("no-scroll");


    storyAnimating =
        false;

}


storyClose.addEventListener(
    "click",
    closeStory
);


storyBackdrop.addEventListener(
    "click",
    closeStory
);



/* =========================================================
                     STORY PROGRESS
========================================================= */

function createProgress() {

    storyProgress.innerHTML =
        "";


    const total =
        stories[
            currentStoryType
        ].length;


    for (
        let index = 0;
        index < total;
        index++
    ) {

        const part =
            document.createElement(
                "div"
            );


        part.className =
            "story-progress-part";


        const fill =
            document.createElement(
                "div"
            );


        fill.className =
            "story-progress-fill";


        part.appendChild(
            fill
        );


        storyProgress.appendChild(
            part
        );

    }

}



function updateProgress() {

    const parts =
        storyProgress
            .querySelectorAll(
                ".story-progress-part"
            );


    parts.forEach(
        (
            part,
            index
        ) => {

            part
                .classList
                .remove(
                    "done",
                    "current"
                );


            if (
                index <
                currentStoryIndex
            ) {

                part
                    .classList
                    .add(
                        "done"
                    );

            }


            if (
                index ===
                currentStoryIndex
            ) {

                part
                    .classList
                    .add(
                        "current"
                    );

            }

        }
    );

}



/* =========================================================
                       RENDER STORY
========================================================= */

function renderStory(
    direction = "next"
) {

    const collection =
        stories[
            currentStoryType
        ];


    const source =
        collection[
            currentStoryIndex
        ];


    const current =
        String(
            currentStoryIndex + 1
        ).padStart(
            2,
            "0"
        );


    const total =
        String(
            collection.length
        ).padStart(
            2,
            "0"
        );


    storyCounter.textContent =
        `${current} / ${total}`;


    storyFilename.textContent =
        source;



    /*
        Сначала показываем fallback.

        Если картинка существует,
        onload заменит fallback.
    */

    storyImage.style.display =
        "none";


    storyPlaceholder.style.display =
        "flex";


    storyImage.onload =
        () => {

            storyImage.style.display =
                "block";


            storyPlaceholder.style.display =
                "none";

        };


    storyImage.onerror =
        () => {

            storyImage.style.display =
                "none";


            storyPlaceholder.style.display =
                "flex";

        };


    /*
        Добавляем timestamp не нужно.

        Поэтому браузер нормально
        кэширует картинки.
    */

    storyImage.src =
        source;


    updateProgress();


    animateStory(
        direction
    );

}



/* =========================================================
                     STORY ANIMATION
========================================================= */

function animateStory(
    direction
) {

    storySlide
        .classList
        .remove(
            "next-animation",
            "prev-animation"
        );


    void storySlide.offsetWidth;


    if (
        direction === "next"
    ) {

        storySlide
            .classList
            .add(
                "next-animation"
            );

    }


    if (
        direction === "prev"
    ) {

        storySlide
            .classList
            .add(
                "prev-animation"
            );

    }

}



/* =========================================================
                          NEXT
========================================================= */

function nextStory() {

    if (storyAnimating) {
        return;
    }


    const collection =
        stories[
            currentStoryType
        ];


    if (
        currentStoryIndex <
        collection.length - 1
    ) {

        storyAnimating =
            true;


        currentStoryIndex++;


        renderStory(
            "next"
        );


        setTimeout(
            () => {

                storyAnimating =
                    false;

            },
            330
        );

    } else {

        closeStory();

    }

}



/* =========================================================
                          PREVIOUS
========================================================= */

function previousStory() {

    if (storyAnimating) {
        return;
    }


    if (
        currentStoryIndex > 0
    ) {

        storyAnimating =
            true;


        currentStoryIndex--;


        renderStory(
            "prev"
        );


        setTimeout(
            () => {

                storyAnimating =
                    false;

            },
            330
        );

    }

}



storyNext.addEventListener(
    "click",
    nextStory
);


storyPrev.addEventListener(
    "click",
    previousStory
);



/* =========================================================
                          KEYBOARD
========================================================= */

document.addEventListener(

    "keydown",

    event => {

        if (
            !story
                .classList
                .contains("active")
        ) {

            return;

        }


        if (
            event.key === "Escape"
        ) {

            closeStory();

        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            nextStory();

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            previousStory();

        }

    }

);



/* =========================================================
                           SWIPE
========================================================= */

let touchStartX = 0;
let touchStartY = 0;

let touchEndX = 0;
let touchEndY = 0;


storyStage.addEventListener(

    "touchstart",

    event => {

        const touch =
            event.changedTouches[0];


        touchStartX =
            touch.clientX;


        touchStartY =
            touch.clientY;

    },

    {
        passive: true
    }

);


storyStage.addEventListener(

    "touchend",

    event => {

        const touch =
            event.changedTouches[0];


        touchEndX =
            touch.clientX;


        touchEndY =
            touch.clientY;


        handleSwipe();

    },

    {
        passive: true
    }

);



function handleSwipe() {

    const xDifference =
        touchEndX -
        touchStartX;


    const yDifference =
        touchEndY -
        touchStartY;



    /*
        Если человек свайпнул
        вертикально — ничего не делаем.
    */

    if (
        Math.abs(yDifference) >
        Math.abs(xDifference)
    ) {

        return;

    }


    if (
        Math.abs(xDifference) <
        50
    ) {

        return;

    }


    if (
        xDifference < 0
    ) {

        nextStory();

    } else {

        previousStory();

    }

}



/* =========================================================
                     DESKTOP DRAG
========================================================= */

let mousePressed =
    false;


let mouseStartX =
    0;


storyStage.addEventListener(

    "mousedown",

    event => {

        mousePressed =
            true;


        mouseStartX =
            event.clientX;

    }

);


window.addEventListener(

    "mouseup",

    event => {

        if (!mousePressed) {
            return;
        }


        mousePressed =
            false;


        const difference =
            event.clientX -
            mouseStartX;


        if (
            Math.abs(difference) <
            70
        ) {

            return;

        }


        if (
            difference < 0
        ) {

            nextStory();

        } else {

            previousStory();

        }

    }

);



/* =========================================================
                 OPTIONAL DESKTOP PARALLAX
========================================================= */

const heroPhoto =
    document.querySelector(
        ".hero-photo"
    );


let scrollTicking =
    false;


function updateParallax() {

    /*
        Только desktop.

        На телефоне parallax не нужен:
        Safari работает заметно плавнее
        без постоянного transform.
    */

    if (
        window.innerWidth > 680
    ) {

        const scrollY =
            window.scrollY;


        if (
            scrollY <
            window.innerHeight
        ) {

            heroPhoto.style.transform =
                `translate3d(
                    0,
                    ${scrollY * 0.06}px,
                    0
                )
                scale(1)`;

        }

    } else {

        heroPhoto.style.transform =
            "";

    }


    scrollTicking =
        false;

}



window.addEventListener(

    "scroll",

    () => {

        if (!scrollTicking) {

            requestAnimationFrame(
                updateParallax
            );


            scrollTicking =
                true;

        }

    },

    {
        passive: true
    }

);



/* =========================================================
                         RESIZE
========================================================= */

window.addEventListener(

    "resize",

    () => {

        if (
            window.innerWidth >
            980
        ) {

            if (
                mobileMenu
                    .classList
                    .contains("active")
            ) {

                closeMobileMenu();

            }

        }


        if (
            window.innerWidth <=
            680
        ) {

            heroPhoto.style.transform =
                "";

        }

    }

);