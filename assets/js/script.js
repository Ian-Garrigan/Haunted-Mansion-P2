/* jshint esversion: 11 */
// Declaring const variables for game
const mansionExterior = document.querySelector('.mansion-exterior');
const playerLives = document.querySelector('#playerLives');
let playerLivesValue = 12;

// Setting the playersLives text content 
playerLives.textContent = playerLivesValue;

// Created an array of objects for my cards
const getData = () => [{
        imgSrc: 'assets/images/scary-pumpkin.png',
        name: 'scary pumpkin'
    },
    {
        imgSrc: 'assets/images/dracula.png',
        name: 'dracula'
    },
    {
        imgSrc: 'assets/images/ghost.png',
        name: 'ghost'
    },
    {
        imgSrc: 'assets/images/grim-reaper.png',
        name: 'grim reaper'
    },
    {
        imgSrc: 'assets/images/frankenstein.png',
        name: 'frankenstein'
    },
    {
        imgSrc: 'assets/images/mummy.png',
        name: 'mummy'
    },
    {
        imgSrc: 'assets/images/wicked-witch.png',
        name: 'wicked witch'
    },
    {
        imgSrc: 'assets/images/skeleton.png',
        name: 'skeleton'
    },
    {
        imgSrc: 'assets/images/scary-clown.png',
        name: 'scary clown'
    },
    {
        imgSrc: 'assets/images/scary-pumpkin.png',
        name: 'scary pumpkin'
    },
    {
        imgSrc: 'assets/images/dracula.png',
        name: 'dracula'
    },
    {
        imgSrc: 'assets/images/ghost.png',
        name: 'ghost'
    },
    {
        imgSrc: 'assets/images/grim-reaper.png',
        name: 'grim reaper'
    },
    {
        imgSrc: 'assets/images/frankenstein.png',
        name: 'frankenstein'
    },
    {
        imgSrc: 'assets/images/mummy.png',
        name: 'mummy'
    },
    {
        imgSrc: 'assets/images/wicked-witch.png',
        name: 'wicked witch'
    },
    {
        imgSrc: 'assets/images/skeleton.png',
        name: 'skeleton'
    },
    {
        imgSrc: 'assets/images/scary-clown.png',
        name: 'scary clown'
    }
];

// Function for shuffling and retrieving the card data
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

// Function for generating cards (imagined as the windows of the mansion exterior) inside html file
const cardGenerator = () => {
    const cardData = randomize();

    // Loop for 18 individual cards from the array
    cardData.forEach((item) => {
        let mansion = document.createElement('div');
        let mansionWindowOpened = document.createElement('img');
        let mansionWindowClosed = document.createElement('img');
        mansionWindowClosed.setAttribute('src', 'assets/images/creepy-window.png');

        // Setting some class names
        mansion.classList = 'mansion';
        mansionWindowOpened.classList = 'window-opened';
        mansionWindowClosed.classList = 'window-closed';
        mansionWindowOpened.setAttribute('alt', 'halloween monster');


        // Getting the halloween characters by accessing the objects>imgSrc
        mansionWindowOpened.src = item.imgSrc;
        mansion.setAttribute('name', item.name);

        // Placing the windows onto the mansion
        mansionExterior.appendChild(mansion);
        mansion.appendChild(mansionWindowOpened);
        mansion.appendChild(mansionWindowClosed);

        // Reveal monster behind window on click 
        mansion.addEventListener('click', (event) => {
            mansion.classList.toggle('reveal-monster');
            checkForMatch(event);
        });
    });
};

// Countdown timer 
var timeleft = 100;
setInterval(function () {
    if (timeleft <= 0 || playerLivesValue === 0) {
        restart('You got spooked!');
        document.getElementById('timeRemaining').innerHTML = 'Try Again! Don\'t be scared!';
        timeleft = 100;
    } else {
        document.getElementById('timeRemaining').innerHTML = timeleft + ' seconds remaining..';
    }
    timeleft -= 1;
}, 1000);

// Checking for possible card matches
const checkForMatch = (event) => {
    const clickedCard = event.target;
    clickedCard.classList.add('cardFlipped');
    const flippedWindows = document.querySelectorAll('.cardFlipped');
    var allCardsToggled = document.querySelectorAll('.reveal-monster');

    if (flippedWindows.length === 2) {
        if (
            flippedWindows[0].getAttribute('name') ===
            flippedWindows[1].getAttribute('name')
        ) {

            flippedWindows.forEach((mansion) => {
                mansion.classList.remove('cardFlipped');
                mansion.style.pointerEvents = 'none';
            });
        } else {

            flippedWindows.forEach(mansion => {
                mansion.classList.remove('cardFlipped');
                setTimeout(() => mansion.classList.remove('reveal-monster'), 850);
            });
            playerLivesValue--;
            playerLives.textContent = playerLivesValue;
            // Run check for player lives equal 0 
            if (playerLivesValue === 0) {
                restart('You ran out of lives! The halloween monsters escaped, better luck next year!');
            }
        }
    }
    // Check to see if user won the game
    if (allCardsToggled.length === 18) {
        restart('You caught all the monsters, Happy Halloween!');
    }
};

// Restart game funct when lives = 0 
function restart(text) {
    let cardData = randomize();
    let revealedMonsters = document.querySelectorAll('.window-opened');
    let cards = document.querySelectorAll('.mansion');
    // Fix for bug whislt cards flipping back not able to click on anything on the screen
    mansionExterior.style.pointerEvents = 'none';

    // If lives run out flip all the cards back to original position
    cardData.forEach((item, index) => {
        cards[index].classList.remove('reveal-monster');
        // making the cards random again and adding back pointer event when game restarts
        setTimeout(() => {
            cards[index].style.pointerEvents = 'all';
            revealedMonsters[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name);
            mansionExterior.style.pointerEvents = 'all';
        }, 1000);
    });
    // Updating player lives count back to original state and showing monsters briefly again
    playerLivesValue = 12;
    timeleft = 100;
    playerLives.textContent = playerLivesValue;
    setTimeout(() => window.alert(text), 100);
    setTimeout(() => {
        var memoryHelp = document.querySelectorAll('.window-closed');
        for (let element of memoryHelp) {
            element.style.display = 'none';
        }
        setTimeout(() => {
            var memoryHelp = document.querySelectorAll('.window-closed');
            for (let element of memoryHelp) {
                element.style.display = 'unset';
            }
        }, 2000);
    }, 1600);
}

// display monsters for a couple of seconds when page loads then hide

setTimeout(() => {
    var memoryHelp = document.querySelectorAll('.window-closed');
    for (let element of memoryHelp) {
        element.style.display = 'none';
    }
    setTimeout(() => {
        var memoryHelp = document.querySelectorAll('.window-closed');
        for (let element of memoryHelp) {
            element.style.display = 'unset';
        }
    }, 2000);
}, 1600);

cardGenerator();