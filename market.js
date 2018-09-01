// From the div with class name full
const current = document.querySelector('#current'); // Current display img
const caption = document.querySelector('#caption p');
const capHeader = document.querySelector('#caption h4');
const descript = document.querySelector('#description');
const imgs = document.querySelectorAll('main .columns #imgs'); // gallery img
const listView = document.querySelectorAll('.grid img');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const pop = document.querySelector('#pop');
const span = document.querySelector(".close");
const darkTheme = document.querySelector('#dark-theme');
const lightTheme = document.querySelector('#light-theme');
const columns = document.querySelector('.columns');
let a = 0;
// Scroll Button
var html, body, scrollToTopButton;
window.onload = function () {
    html = document.documentElement;
    body = document.body;
    scrollToTopButton = document.getElementById("scrollToTopButton");
};

function scrollToTop(totalTime, easingPower) {
    //console.log("here");
    var timeInterval = 1; //in ms
    var scrollTop = Math.round(body.scrollTop || html.scrollTop);
    //var by=- scrollTop;
    var timeLeft = totalTime;
    var scrollByPixel = setInterval(function () {
        var percentSpent = (totalTime - timeLeft) / totalTime;
        if (timeLeft >= 0) {
            var newScrollTop = scrollTop * (1 - easeInOut(percentSpent, easingPower));
            body.scrollTop = newScrollTop;
            html.scrollTop = newScrollTop;
            //console.log(easeInOut(percentSpent,easingPower));
            timeLeft--;
        } else {
            clearInterval(scrollByPixel);
            //Add hash to the url after scrolling
            //window.location.hash = hash;
        }
    }, timeInterval);
}

function easeInOut(t, power) {
    if (t < 0.5) {
        return 0.5 * Math.pow(2 * t, power);
    } else {
        return 0.5 * (2 - Math.pow(2 * (1 - t), power));
    }
}

window.onscroll = controlScrollToTopButton;

function controlScrollToTopButton() {
    var windowInnerHeight = 1 * window.innerHeight;
    if (
        body.scrollTop > windowInnerHeight ||
        html.scrollTop > windowInnerHeight
    ) {
        scrollToTopButton.classList.add("show");
    } else {
        scrollToTopButton.classList.remove("show");
    }
}

// Theme
darkTheme.addEventListener('click', function (event) {
    event.preventDefault();
    document.body.style.background = '#111';
    columns.style.background = '#111';
});
lightTheme.addEventListener('click', function (event) {
    event.preventDefault();
    document.body.style.background = '#fff';
    columns.style.background = '#fff';
});

// Previous button
prev.addEventListener('click', function () {
    toggle(-1);

});
// Next button
next.addEventListener('click', function () {
    toggle(1);

});
var toggle = function (g) {
    a = a + g;
    if (a > imgs.length - 1) {
        a = 0;
    };
    if (a < 0) {
        a = imgs.length - 1;
    };
    current.src = imgs[a].src;
    // Calling extra images
    var imgList = imgs[a].parentElement.querySelectorAll('#img-list img');
    listPreview(imgList);

    // Change Description
    description();

    // Change Price-Tag
    var img = imgs[a].parentElement.querySelector('.price-tag').children;
    price(img);

    // Short Description
    var short = imgs[a].parentElement.querySelector('.short').children;
    shortDescription(short);
};

// close pop
span.addEventListener('click', () => {
    pop.style.display = 'none';
});
window.addEventListener('click', event => {
    if (event.target == pop) {
        pop.style.display = 'none';
    }
});
document.body.addEventListener('keyup', function (e) {
    if (e.keyCode == 27) {
        pop.style.display = 'none';
    }
});

// Changing from preview
listView.forEach(img => img.addEventListener('click', (e) => current.src = e.target.src));

// Changing from gallery
imgs.forEach((img) => {
    img.addEventListener('click', (e) => {
        current.src = e.target.src; //Changing img source

        //img description
        const short = e.target.nextElementSibling.children;
        shortDescription(short);

        // Changing price
        let priceTag = e.target.nextElementSibling.nextElementSibling.children;
        price(priceTag);

        // Chang Description
        description();


        // List Preview(Extract Images)
        var imgList = e.target.parentNode.querySelectorAll('#img-list img');
        listPreview(imgList);

        // Full Image Display
        pop.style.display = 'block';
    });
});

// List Preview(Extract Image)
function listPreview(el) {
    let i = 0;
    listView.forEach(items => {
        var imgList = el;
        if (imgList.length == 0) {
            items.src = '';
        } else if (imgList.length == 1) {
            for (i = 0; i <= 0; i++) {
                listView[i].src = imgList[i].src;
                items.src = '';
                break
            }
        } else if (imgList.length == 2) {
            for (i = 0; i <= 1; i++) {
                listView[i].src = imgList[i].src;
                items.src = '';
            }
        } else if (imgList.length == 3) {
            items.src = imgList[i].src;
            i++;
        }
    });
};

// Chang Description
function description() {
    descript.firstElementChild.textContent = document.querySelector('.columns .full-descript h3').textContent;
    descript.lastElementChild.textContent = document.querySelector('.columns .full-descript p').textContent;
};
// Change Price
function price(cash) {
    let priceTag = cash; // Get price tag
    let coins = [{
        price: priceTag[0].textContent
    }, {
        priceBefore: priceTag[1].textContent
    }];

    // Changing the prices
    var price = document.querySelector('.two #after-price'); //Getting after price
    var priceBefore = document.querySelector('.two #price'); // Getting price

    price.textContent = coins[0].price;
    priceBefore.textContent = coins[1].priceBefore;
};

function shortDescription(loc) {
    const shortEl = loc;
    let h4 = shortEl[0].textContent;
    let p = shortEl[1].textContent;
    caption.textContent = p;
    capHeader.textContent = h4;
};