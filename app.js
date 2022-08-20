const drawCardURL = "https://deckofcardsapi.com/api/deck/new/draw/?count=1"

//1.
$.getJSON(`${drawCardURL}`)
    .then(data=> {
        console.log(data.cards[0].value.toLowerCase() + " of " + data.cards[0].suit.toLowerCase());
    }) 

//2.  
    // new deck, get new deck id 
let firstCard = null
let res = $.getJSON('https://deckofcardsapi.com/api/deck/new/')
    .then(data=> {
        this.deckId = data.deck_id

        //shuffle the new deck
        $.getJSON(`https://deckofcardsapi.com/api/deck/${this.deckId}/shuffle/?remaining=true`)
            .then(data => {
                return $.getJSON(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count1`)

            })

        //draw the first card
            .then(data=> {
                firstCard = data.cards[0]
                return $.getJSON(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count1`)
            })

        //draw the second card and console.log each card
        .then(data=> {
                let secondCard = data.cards[0]
                console.log(`First card is: ${secondCard.value.toLowerCase()} of ${secondCard.suit.toLowerCase()}`)
                console.log(`Second card is: ${firstCard.value.toLowerCase()} of ${firstCard.suit.toLowerCase()}`)
            })
}) 


// 2.
// HTML page that lets you draw cards from a deck
// when deck loads, go to API to create new deck
// show button on the page that lets you draw a card
// everytime you click the button it draws a new card
// til there are no more cards left in the deck (52)

const loadButton = document.querySelector('#load-button')
let cardImage = null
let $btn = $('button');

// load a brand new deck
let res2 = $.getJSON('https://deckofcardsapi.com/api/deck/new/')
    .then(data => {
        this.deckId = data.deck_id
        $btn.show()
        
    // click event listener
    loadButton.addEventListener('click', () =>   {

    // shuffle the new deck
    $.getJSON(`https://deckofcardsapi.com/api/deck/${this.deckId}/shuffle/?remaining=true`)
        .then(data => {      
            return $.getJSON(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count1`)
        })

    //draw a card and display to webpage
        .then(data=> {
            cardImage = data.cards[0].image
        
            const newCard = makeCardDiv (
                cardImage
            )                

                if (data.remaining  === 0) {
                    $btn.remove()   

                }

            function makeCardDiv(src) {
                let img = document.createElement('img');
                img.setAttribute('src', src);

                const cardDiv = document.querySelector('#card-spot')
                cardDiv.setAttribute('class', 'cardDiv')
                cardDiv.appendChild(img)
            }
        })   
    })
})


