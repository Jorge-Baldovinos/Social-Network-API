const router = require('express').Router();
const {
    getThought,
    getSingleThought,
    createNewThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router
.route('/thoughts')
.get(getThought)
.post(createNewThought);

// /api/thoughts/:thoughtId
router
.route(':thoughtId')
.get(getSingleThought)
.delete(deleteThought)
.put(updateThought);

// /api/thoughts/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.post(createReaction)
.delete(deleteReaction);

module.exports = router;