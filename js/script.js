/* =====================================================
   OPEN INVITATION
===================================================== */

const openInvitation =
    document.getElementById("openInvitation");

const cover =
    document.getElementById("cover");

const invitation =
    document.getElementById("invitation");


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
                                Browser may block
                                automatic playback.
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
    Wedding date:

    22 September 2026
    2:00 PM
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
   SCRATCH & REVEAL
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
    document.getElementById(
        "scratchCard"
    );


let scratching =
    false;

let revealed =
    false;



/*
    Create the scratch surface.
*/

function setupScratchCard() {

    const rect =
        scratchCard.getBoundingClientRect();


    const scale =
        window.devicePixelRatio ||
        1;


    canvas.width =
        Math.round(
            rect.width *
            scale
        );


    canvas.height =
        Math.round(
            rect.height *
            scale
        );


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
        Main scratch surface
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
        Decorative texture
    */

    context.fillStyle =
        "rgba(255,255,255,.12)";


    for (
        let i = 0;
        i < 350;
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
        Scratch instruction
    */

    context.fillStyle =
        "#fffaf2";


    context.font =
        "600 13px Montserrat";


    context.textAlign =
        "center";


    context.textBaseline =
        "middle";


    context.fillText(

        "SCRATCH TO REVEAL",

        rect.width / 2,

        rect.height / 2

    );

}


setupScratchCard();



/*
    Recreate the scratch surface
    if screen size changes.
*/

window.addEventListener(
    "resize",
    function () {

        if (
            !revealed
        ) {

            setupScratchCard();

        }

    }
);



/*
    Get pointer position.
*/

function getPointerPosition(
    event
) {

    const rect =
        canvas.getBoundingClientRect();


    let clientX;

    let clientY;


    if (
        event.touches &&
        event.touches.length > 0
    ) {

        clientX =
            event.touches[0].clientX;

        clientY =
            event.touches[0].clientY;

    } else {

        clientX =
            event.clientX;

        clientY =
            event.clientY;

    }


    return {

        x:
            clientX -
            rect.left,

        y:
            clientY -
            rect.top

    };

}



/*
    Scratch the surface.
*/

function scratch(
    event
) {

    if (
        !scratching ||
        revealed
    ) {

        return;

    }


    const position =
        getPointerPosition(
            event
        );


    context.globalCompositeOperation =
        "destination-out";


    context.beginPath();


    context.arc(

        position.x,

        position.y,

        32,

        0,

        Math.PI * 2

    );


    context.fill();


    checkScratchProgress();

}



/*
    Determine how much of the
    scratch surface has been removed.
*/

function checkScratchProgress() {

    if (
        revealed
    ) {

        return;

    }


    const width =
        canvas.width;

    const height =
        canvas.height;


    /*
        Read the alpha channel.

        We sample every 16th pixel
        for performance.
    */

    const imageData =
        context.getImageData(
            0,
            0,
            width,
            height
        );


    const data =
        imageData.data;


    let transparentPixels =
        0;

    let sampledPixels =
        0;


    for (
        let i = 3;
        i < data.length;
        i += 64
    ) {

        sampledPixels++;


        if (
            data[i] < 100
        ) {

            transparentPixels++;

        }

    }


    const percentage =
        (
            transparentPixels /
            sampledPixels
        ) * 100;


    /*
        Automatically reveal once
        enough has been scratched.
    */

    if (
        percentage >= 45
    ) {

        revealScratchCard();

    }

}



/*
    Completely remove the
    scratch layer.
*/

function revealScratchCard() {

    if (
        revealed
    ) {

        return;

    }


    revealed =
        true;


    scratching =
        false;


    context.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );


    canvas.style.pointerEvents =
        "none";


    const hint =
        document.querySelector(
            ".scratch-hint"
        );


    if (
        hint
    ) {

        hint.textContent =
            "✦ Revealed ✦";

    }

}



/* =====================================================
   DESKTOP SCRATCHING
===================================================== */

canvas.addEventListener(
    "mousedown",
    function () {

        if (
            !revealed
        ) {

            scratching =
                true;

        }

    }
);


canvas.addEventListener(
    "mousemove",
    function (
        event
    ) {

        scratch(
            event
        );

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



/* =====================================================
   MOBILE SCRATCHING
===================================================== */

canvas.addEventListener(
    "touchstart",
    function (
        event
    ) {

        if (
            revealed
        ) {

            return;

        }


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
    function (
        event
    ) {

        scratch(
            event
        );

    },
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

        ".verse, " +
        ".person, " +
        ".event-card, " +
        ".venue-card, " +
        ".count, " +
        ".gallery-grid img"

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
