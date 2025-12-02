const express = require('express');
const router = express.Router();
const {
    getAllPuppies,
    getPuppy,
    createPuppy,
    updatePuppy,
    deletePuppy
} = require('../controllers/puppyController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Define upload fields for puppy creation
const uploadFields = upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'fatherImage', maxCount: 1 },
    { name: 'motherImage', maxCount: 1 }
]);

router.route('/')
    .get(getAllPuppies)
    .post(protect, uploadFields, createPuppy);

router.route('/:id')
    .get(getPuppy)
    .put(protect, uploadFields, updatePuppy)
    .delete(protect, deletePuppy);

module.exports = router;
