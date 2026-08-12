/* =====================================================
   WEDDING T2 — AQIB & ROMAISA
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const cover =
    document.getElementById("wed2-session-cover");

const invite =
    document.getElementById("wed2-session-invite");

const envelope =
    document.getElementById("wed2-envelope");

const tassel =
    document.getElementById("wed2-tassel");

const seal =
    document.getElementById("wed2-save-date-btn");

const music =
    document.getElementById("wed2-music");

const muteButton =
    document.getElementById("wed2-mute-btn");



/* =====================================================
   OPEN INVITATION
===================================================== */

let invitationOpened = false;


function openInvitation() {

    if (invitationOpened) {
        return;
    }

    invitationOpened = true;


    /*
        Envelope animation
    */

    envelope.classList.add(
        "is-opening"
    );


    tassel.classList.add(
        "is-opening"
    );


    seal.classList.add(
        "is-falling"
    );


    /*
        Give the envelope animation
        time to play before fading.
    */

    setTimeout(
        function () {

            cover.classList.add(
                "is-opened"
            );


            invite.classList.add(
                "is-visible"
            );


            invite.setAttribute(
                "aria-hidden",
                "false"
            );


            startPetals();


            music.play()
                .then(
                    function () {

                        muteButton.textContent =
                            "🔊";

                    }
                )
                .catch(
                    function () {

                        /*
                            Browser autoplay policies
                            may prevent audio.
                        */

                    }
                );

        },
        850
    );

}


seal.addEventListener(
    "click",
    openInvitation
);


tassel.addEventListener(
    "click",
    openInvitation
);


tassel.addEventListener(
    "keydown",
    function (
        event
    ) {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            openInvitation();

        }

    }
);



/* =====================================================
   MUSIC
===================================================== */

muteButton.addEventListener(
    "click",
    function () {

        if (
            music.paused
        ) {

            music.play();

            muteButton.textContent =
                "🔊";

        } else {

            music.pause();

            muteButton.textContent =
                "🔇";

        }

    }
);



/* =====================================================
   FALLING PETALS
===================================================== */

function startPetals() {

    const container =
        document.getElementById(
            "wed2-petals"
        );


    if (!container) {
        return;
    }


    /*
        Don't duplicate petals.
    */

    if (
        container.children.length
    ) {

        return;

    }


    const colors = [
        "#fde8ec",
        "#f8d0d8",
        "#f0b4c0",
        "#e8a0ad",
        "#d98595",
        "#c96b7e",
        "#b8556a"
    ];


    for (
        let i = 0;
        i < 28;
        i++
    ) {

        const petal =
            document.createElement(
                "span"
            );


        petal.className =
            "wed2-petal";


        const size =
            8 +
            Math.random() * 9;


        petal.style.left =
            Math.random() * 100 +
            "%";


        petal.style.width =
            size + "px";


        petal.style.height =
            size * 1.2 +
            "px";


        petal.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        petal.style.animationDuration =
            15 +
            Math.random() * 18 +
            "s";


        petal.style.animationDelay =
            -Math.random() * 20 +
            "s";


        container.appendChild(
            petal
        );

    }

}



/* =====================================================
   SCRATCH CARD
===================================================== */

const scratchCanvas =
    document.getElementById(
        "wed2-scratch-canvas"
    );


const scratchContext =
    scratchCanvas.getContext(
        "2d"
    );


let isScratching =
    false;

let scratchRevealed =
    false;



function setupScratchCard() {

    const rect =
        scratchCanvas.getBoundingClientRect();


    const ratio =
        window.devicePixelRatio ||
        1;


    scratchCanvas.width =
        rect.width * ratio;


    scratchCanvas.height =
        rect.height * ratio;


    scratchContext.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );


    /*
        Scratch layer
    */

    scratchContext.globalCompositeOperation =
        "source-over";


    scratchContext.fillStyle =
        "#b88a3b";


    scratchContext.fillRect(
        0,
        0,
        rect.width,
        rect.height
    );


    /*
        Metallic texture
    */

    scratchContext.fillStyle =
        "rgba(255,255,255,.12)";


    for (
        let i = 0;
        i < 500;
        i++
    ) {

        scratchContext.beginPath();


        scratchContext.arc(

            Math.random() *
                rect.width,

            Math.random() *
                rect.height,

            Math.random() * 2,

            0,
            Math.PI * 2

        );


        scratchContext.fill();

    }


    /*
        Text on scratch layer
    */

    scratchContext.fillStyle =
        "#fff8ec";


    scratchContext.textAlign =
        "center";


    scratchContext.textBaseline =
        "middle";


    scratchContext.font =
        "600 13px Nunito";


    scratchContext.fillText(

        "SCRATCH TO REVEAL",

        rect.width / 2,

        rect.height / 2

    );

}


setupScratchCard();


window.addEventListener(
    "resize",
    function () {

        if (
            !scratchRevealed
        ) {

            setupScratchCard();

        }

    }
);



/*
   Pointer coordinates
*/

function pointerPosition(
    event
) {

    const rect =
        scratchCanvas.getBoundingClientRect();


    let clientX;
    let clientY;


    if (
        event.touches &&
        event.touches.length
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
   Scratch
*/

function scratch(
    event
) {

    if (
        !isScratching ||
        scratchRevealed
    ) {

        return;

    }


    const position =
        pointerPosition(
            event
        );


    scratchContext.globalCompositeOperation =
        "destination-out";


    scratchContext.beginPath();


    scratchContext.arc(

        position.x,

        position.y,

        27,

        0,
        Math.PI * 2

    );


    scratchContext.fill();


    checkScratchAmount();

}



/*
   Check transparency
*/

function checkScratchAmount() {

    const data =
        scratchContext.getImageData(
            0,
            0,
            scratchCanvas.width,
            scratchCanvas.height
        ).data;


    let transparent =
        0;

    let sampled =
        0;


    /*
        Sample pixels instead of checking
        every single pixel.
    */

    for (
        let i = 3;
        i < data.length;
        i += 64
    ) {

        sampled++;


        if (
            data[i] < 80
        ) {

            transparent++;

        }

    }


    const percentage =
        transparent /
        sampled *
        100;


    /*
        Reveal when approximately
        45% has been scratched.
    */

    if (
        percentage >= 45
    ) {

        revealDate();

    }

}



/*
   Reveal date
*/

function revealDate() {

    if (
        scratchRevealed
    ) {

        return;

    }


    scratchRevealed =
        true;


    isScratching =
        false;


    scratchContext.clearRect(
        0,
        0,
        scratchCanvas.width,
        scratchCanvas.height
    );


    scratchCanvas.style.pointerEvents =
        "none";


    const hint =
        document.querySelector(
            ".wed2-scratch-hint"
        );


    if (hint) {

        hint.textContent =
            "✦ 22 September 2026 ✦";

    }

}



/* =====================================================
   DESKTOP SCRATCH
===================================================== */

scratchCanvas.addEventListener(
    "mousedown",
    function () {

        isScratching =
            true;

    }
);


scratchCanvas.addEventListener(
    "mousemove",
    function (
        event
    ) {

        scratch(
            event
        );

    }
);


window.addEventListener(
    "mouseup",
    function () {

        isScratching =
            false;

    }
);



/* =====================================================
   MOBILE SCRATCH
===================================================== */

scratchCanvas.addEventListener(
    "touchstart",
    function (
        event
    ) {

        isScratching =
            true;


        scratch(
            event
        );

    },
    {
        passive: true
    }
);


scratchCanvas.addEventListener(
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


scratchCanvas.addEventListener(
    "touchend",
    function () {

        isScratching =
            false;

    }
);



/* =====================================================
   COUNTDOWN
===================================================== */

const weddingDate =
    new Date(
        "2026-09-22T14:00:00"
    ).getTime();


function updateCountdown() {

    const now =
        Date.now();


    const difference =
        weddingDate -
        now;


    if (
        difference <= 0
    ) {

        setCounter(
            "wed2-days",
            0
        );

        setCounter(
            "wed2-hours",
            0
        );

        setCounter(
            "wed2-minutes",
            0
        );

        setCounter(
            "wed2-seconds",
            0
        );

        return;

    }


    const days =
        Math.floor(
            difference /
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
                difference %
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
                difference %
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
                difference %
                (
                    1000 *
                    60
                )
            ) /
            1000
        );


    setCounter(
        "wed2-days",
        days
    );

    setCounter(
        "wed2-hours",
        hours
    );

    setCounter(
        "wed2-minutes",
        minutes
    );

    setCounter(
        "wed2-seconds",
        seconds
    );

}


function setCounter(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (!element) {
        return;
    }


    element.textContent =
        String(
            value
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
