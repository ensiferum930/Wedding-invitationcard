/* =====================================================
   OPEN INVITATION
===================================================== */

const openInvitation =
    document.getElementById(
        "openInvitation"
    );

const cover =
    document.getElementById(
        "cover"
    );

const invitation =
    document.getElementById(
        "invitation"
    );


openInvitation.addEventListener(
    "click",
    function () {

        cover.style.transition =
            "opacity 1s ease";

        cover.style.opacity =
            "0";


        setTimeout(
            function () {

                cover.style.display =
                    "none";

                invitation.classList.remove(
                    "hidden"
                );

                window.scrollTo(
                    0,
                    0
                );


                /*
                    Try to start music.
                    Browsers may block autoplay.
                */

                const music =
                    document.getElementById(
                        "weddingMusic"
                    );


                music.play()
                    .then(
                        function () {

                            document
                                .getElementById(
                                    "musicButton"
                                )
                                .classList.add(
                                    "playing"
                                );

                        }
                    )
                    .catch(
                        function () {

                            /*
                                User can start it
                                using the music button.
                            */

                        }
                    );

            },
            1000
        );

    }
);



/* =====================================================
   MUSIC
===================================================== */

const music =
    document.getElementById(
        "weddingMusic"
    );

const musicButton =
    document.getElementById(
        "musicButton"
    );


musicButton.addEventListener(
    "click",
    function () {

        if (
            music.paused
        ) {

            music.play()
                .then(
                    function () {

                        musicButton
                            .classList
                            .add(
                                "playing"
                            );

                    }
                )
                .catch(
                    function () {

                        alert(
                            "Please tap the invitation first to enable music."
                        );

                    }
                );

        } else {

            music.pause();

            musicButton
                .classList
                .remove(
                    "playing"
                );

        }

    }
);



/* =====================================================
   COUNTDOWN
===================================================== */

/*
    Wedding:
    22 September 2026
    2:00 PM

    The browser interprets this in the
    visitor's local timezone.
*/

const weddingDate =
    new Date(
        "2026-09-22T14:00:00"
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();


    const distance =
        weddingDate -
        now;


    if (
        distance <= 0
    ) {

        document
            .getElementById(
                "days"
            )
            .textContent =
            "00";


        document
            .getElementById(
                "hours"
            )
            .textContent =
            "00";


        document
            .getElementById(
                "minutes"
            )
            .textContent =
            "00";


        document
            .getElementById(
                "seconds"
            )
            .textContent =
            "00";


        return;

    }


    const days =
        Math.floor(
            distance /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    const hours =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            ) /
            (
                1000 *
                60 *
                60
            )
        );


    const minutes =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60 *
                    60
                )
            ) /
            (
                1000 *
                60
            )
        );


    const seconds =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60
                )
            ) /
            1000
        );


    document
        .getElementById(
            "days"
        )
        .textContent =
        String(
            days
        ).padStart(
            2,
            "0"
        );


    document
        .getElementById(
            "hours"
        )
        .textContent =
        String(
            hours
        ).padStart(
            2,
            "0"
        );


    document
        .getElementById(
            "minutes"
        )
        .textContent =
        String(
            minutes
        ).padStart(
            2,
            "0"
        );


    document
        .getElementById(
            "seconds"
        )
        .textContent =
        String(
            seconds
        ).padStart(
            2,
            "0"
        );

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);



/* =====================================================
   SCRATCH CARD
===================================================== */

const canvas =
    document.getElementById(
        "scratchCanvas"
    );

const context =
    canvas.getContext(
        "2d"
    );

const scratchCard =
    document.querySelector(
        ".scratch-card"
    );


let scratching =
    false;



function setupScratchCard() {

    const rect =
        scratchCard
            .getBoundingClientRect();


    const scale =
        window.devicePixelRatio ||
        1;


    canvas.width =
        rect.width *
        scale;


    canvas.height =
        rect.height *
        scale;


    canvas.style.width =
        rect.width +
        "px";


    canvas.style.height =
        rect.height +
        "px";


    context.setTransform(
        scale,
        0,
        0,
        scale,
        0,
        0
    );


    context.globalCompositeOperation =
        "source-over";


    /*
        Gold scratch surface
    */

    context.fillStyle =
        "#b8914c";


    context.fillRect(
        0,
        0,
        rect.width,
        rect.height
    );


    /*
        Subtle texture
    */

    context.fillStyle =
        "rgba(255,255,255,.12)";


    for (
        let i = 0;
        i < 250;
        i++
    ) {

        context.beginPath();


        context.arc(
            Math.random() *
                rect.width,

            Math.random() *
                rect.height,

            Math.random() * 2,

            0,
            Math.PI * 2
        );


        context.fill();

    }


    /*
        Instruction
    */

    context.fillStyle =
        "#fffaf2";


    context.font =
        "600 13px Montserrat";


    context.textAlign =
        "center";


    context.fillText(
        "SCRATCH TO REVEAL",
        rect.width / 2,
        rect.height / 2
    );

}



setupScratchCard();


window.addEventListener(
    "resize",
    setupScratchCard
);



function scratch(
    event
) {

    if (
        !scratching
    ) {

        return;

    }


    const rect =
        canvas.getBoundingClientRect();


    const clientX =
        event.touches
            ? event.touches[0].clientX
            : event.clientX;


    const clientY =
        event.touches
            ? event.touches[0].clientY
            : event.clientY;


    const x =
        clientX -
        rect.left;


    const y =
        clientY -
        rect.top;


    context.globalCompositeOperation =
        "destination-out";


    context.beginPath();


    context.arc(
        x,
        y,
        32,
        0,
        Math.PI * 2
    );


    context.fill();

}



/* Desktop */

canvas.addEventListener(
    "mousedown",
    function () {

        scratching =
            true;

    }
);


canvas.addEventListener(
    "mouseup",
    function () {

        scratching =
            false;

    }
);


canvas.addEventListener(
    "mouseleave",
    function () {

        scratching =
            false;

    }
);


canvas.addEventListener(
    "mousemove",
    scratch
);



/* Mobile */

canvas.addEventListener(
    "touchstart",
    function (event) {

        scratching =
            true;

        scratch(
            event
        );

    },
    {
        passive: true
    }
);


canvas.addEventListener(
    "touchmove",
    scratch,
    {
        passive: true
    }
);


canvas.addEventListener(
    "touchend",
    function () {

        scratching =
            false;

    }
);



/* =====================================================
   SCROLL REVEAL
===================================================== */

const animatedElements =
    document.querySelectorAll(
        ".verse, .person, .event-card, .venue-card, .count, .gallery-grid img"
    );


const observer =
    new IntersectionObserver(
        function (
            entries
        ) {

            entries.forEach(
                function (
                    entry
                ) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold:
                0.15
        }
    );


animatedElements.forEach(
    function (
        element
    ) {

        observer.observe(
            element
        );

    }
);
