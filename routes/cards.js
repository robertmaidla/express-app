const express = require('express');
const router = express.Router();
//or const data = require('../data/flashcardData.json).data
const { data } = require('../data/flashcardData.json');
//or cards = data.cards
const { cards } = data;

// Cards routes
router.get('/', (req, res) => {
    const numberOfCards = cards.length;
    const randCard = Math.floor(Math.random() * numberOfCards);
    res.redirect(`/cards/${randCard}`);
});

// Route treats ':id' as req parameter (i.e. full url accessed by ../cards/0)
router.get('/:id', (req, res) => {
    const side = req.query.side;
    const {id} = req.params;

    if ( !side ) {
        return res.redirect(`/cards/${id}?side=question`);
    }
    const name = req.cookies.username;
    const text = cards[id][side];
    const {hint} = cards[id];

    const templateData = { text, id, name, side };

    if (side === 'question') {
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
    } else if (side === 'answer') {
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';
    }

    // Render template with 'locals' variables for placeholders and serve
    res.render('card', templateData);
});

module.exports = router;