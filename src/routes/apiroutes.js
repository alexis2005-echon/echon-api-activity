const express = require('express');
const router = express.Router();
exports.router = router;

const {
    getAllDishes,
    createDish,
    getDishById,
    updateDish,
    deleteDish,
    createChef,
} = require('../controllers/dishcontroller');

router.get('/dishes', getAllDishes);
router.post('/dishes', createDish);
router.get('/dishes/:id', getDishById);
router.put('/dishes/:id', updateDish);
router.delete('/dishes/:id', deleteDish);

router.post('/chefs', createChef);

module.exports = router;