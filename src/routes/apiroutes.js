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
const { registerUser, loginUser, createAdmin } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.post('/auth/create-admin', protect, admin, createAdmin);

router.get('/dishes', getAllDishes);
router.post('/dishes', createDish);
router.get('/dishes/:id', getDishById);
router.put('/dishes/:id', updateDish);
router.delete('/dishes/:id', deleteDish);

router.post('/chefs', createChef);

module.exports = router;