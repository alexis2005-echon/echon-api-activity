const express = require('express');
const router = express.Router();
const data = require('../models/dishModel');

router.get('/dishes', (req, res) => {
    const { name, price, category, isVegetarian } = req.query;

    let filteredDishes = data
        .filter(dishes => !name || dishes.name.toLowerCase() === name.toLowerCase())
        .filter(dishes => !price || dishes.price <= parseFloat(price))
        .filter(dishes => !category || dishes.category.some(f => f.toLowerCase().includes(category.toLowerCase())))
        .filter(dishes => isVegetarian === undefined || dishes.isVegetarian === (isVegetarian === 'true'));

    return filteredDishes.length === 0
        ? res.status(404).json({
            status: 404,
            message: 'No dishes found matching the criteria'
        })
        : res.status(200).json({
            status: 200,
            message: 'Retrieved dishes successfully',
            data: filteredDishes
        });
});

router.post('/dishes', (req, res) => {
    const { name, price, category, isVegetarian } = req.body || {};

    if (!name || !price || !category || isVegetarian === undefined) {
        return res.status(400).json({
            status: 400,
            message: 'Bad Request: Name, Price, Category, isVegetarian are required'
        });
    }

    const newDish = { id: data.length + 1, name, price, category, isVegetarian };
    data.push(newDish);

    res.status(201).json({
        status: 201,
        message: 'Dish created successfully',
        data: newDish
    });
});

router.put('/dishes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex(d => d.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: 404,
            message: `Room with id ${id} not found`
        });
    }

    data[index] = { id, ...req.body };
    res.status(200).json({
        status: 200,
        message: 'Room updated successfully',
        data: data[index]
    });
});

router.delete('/dishes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex(d => d.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: 404,
            message: `Dish with id ${id} not found`
        });
    }

    data.splice(index, 1);
    res.status(203).json({
        status: 203,
        message: 'Dish deleted successfully'
    });
});

module.exports = router;