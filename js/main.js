$(document).ready(function ($) {
    // scroll to top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $(".back-to-top").fadeIn("slow");
        } else {
            $(".back-to-top").fadeOut("slow");
        }
    });
    $(".back-to-top").click(function () {
        $("html, body").animate({
                scrollTop: 0
            },
            1500,
            "easeInOutExpo"
        );
        return false;
    });
});
// wow.js
new WOW().init();
// MENU
const app = (() => {
    const init = () => {
        body = document.querySelector('body');
        menu = document.querySelector('.menu-icon');
        menuItems = document.querySelectorAll('.nav__list-item');

        applyListeners();
    };

    const applyListeners = () => {
        menu.addEventListener('click', () => toggleClass(body, 'nav-active'));
    };

    const toggleClass = (element, stringClass) => {
        if (element.classList.contains(stringClass))
            element.classList.remove(stringClass);
        else
            element.classList.add(stringClass);
    };

    init();
})();

$(".scrollto").on("click", function () {
    if (
        location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
    ) {
        var target = $(this.hash);
        if (target.length) {
            var top_space = 0;

            $("html, body").animate({
                    scrollTop: target.offset().top - top_space
                },
                1500,
                "easeInOutExpo"
            );

            return false;
        }
    }
});

///////////////////////////////////////////////////////
//                 CANVAS Start
//////////////////////////////////////////////////////
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split("&"),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split("=");

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

let field = document.getElementById("field");
let f = field.getContext("2d");

let stars = {};
let starIndex = 0;
let numStars = 0;
let acceleration = 1;
let starsToDraw = (field.width * field.height) / 200;
if (getUrlParameter("stars")) {
    starsToDraw = getUrlParameter("stars");
}
if (getUrlParameter("accel")) {
    acceleration = getUrlParameter("accel");
}

function Star() {
    this.X = field.width / 2;
    this.Y = field.height / 2;

    this.SX = Math.random() * 10 - 5;
    this.SY = Math.random() * 10 - 5;

    var start = 0;

    if (field.width > field.height) start = field.width;
    else start = field.height;

    this.X += (this.SX * start) / 10;
    this.Y += (this.SY * start) / 10;

    this.W = 1;
    this.H = 1;

    this.age = 0;
    this.dies = 500;

    starIndex++;
    stars[starIndex] = this;

    this.ID = starIndex;
    this.C = "white";
}

Star.prototype.Draw = function () {
    this.X += this.SX;
    this.Y += this.SY;

    this.SX += this.SX / (50 / acceleration);
    this.SY += this.SY / (50 / acceleration);

    this.age++;

    if (
        (this.age == Math.floor(50 / acceleration)) |
        (this.age == Math.floor(150 / acceleration)) |
        (this.age == Math.floor(300 / acceleration))
    ) {
        this.W++;
        this.H++;
    }

    if (
        (this.X + this.W < 0) |
        (this.X > field.width) |
        (this.Y + this.H < 0) |
        (this.Y > field.height)
    ) {
        delete stars[this.ID];
        numStars--;
    }

    f.fillStyle = this.C;
    f.fillRect(this.X, this.Y, this.W, this.H);
};

field.width = window.innerWidth;
field.height = window.innerHeight;

function draw() {
    if (field.width != window.innerWidth) field.width = window.innerWidth;
    if (field.height != window.innerHeight) field.height = window.innerHeight;
    

    f.fillStyle = "#4BB3FD";
    f.fillRect(0, 0, field.width, field.height);

    for (var i = numStars; i < starsToDraw; i++) {
        new Star();
        numStars++;
    }

    for (var star in stars) {
        stars[star].Draw();
    }
}

// Original timing of the screensaver
setInterval(draw, 40);

///////////////////////////////////////////////////////
//                 CANVAS end
//////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//                Rotating text
//////////////////////////////////////////////////////

var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 100) || 500;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    var that = this;
    var delta = 150 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 1000;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName("txt-rotate");
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute("data-rotate");
        var period = elements[i].getAttribute("data-period");
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid white }";
    document.body.appendChild(css);
};
(function ($) {
    "use strict";

    $(".card").tilt({
        maxTilt: 15,
        perspective: 1400,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        speed: 1200,
        glare: false,
        maxGlare: 0.2,
        scale: 1.04
    });
})(jQuery);

/////////////////////////////////////////////
//  Rotate end
/////////////////////////////////////////////
