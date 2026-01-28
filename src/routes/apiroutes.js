const express = require('express');
const router = express.Router();
const data = require('../models/hotel');

router.get('/rooms', (req, res) => {
    const { type, price, features, isBooked } = req.query;

    let filteredrooms = data
        .filter(room => !type || room.type.toLowerCase() === type.toLowerCase())
        .filter(room => !price || room.price <= parseFloat(price))
        .filter(room => !features || room.features.some(f => f.toLowerCase().includes(features.toLowerCase())))
        .filter(room => isBooked === undefined || room.isBooked === (isBooked === 'true'));

    return filteredrooms.length === 0
        ? res.status(404).json({
            status: 404,
            message: 'No rooms found matching the criteria'
        })
        : res.status(200).json({
            status: 200,
            message: 'Retrieved rooms successfully',
            data: filteredrooms
        });
});

router.post('/rooms', (req, res) => {
    const { type, price, features, isBooked } = req.body || {};

    if (!type || !price || !features || isBooked === undefined) {
        return res.status(400).json({
            status: 400,
            message: 'Bad Request: Type, Price, Features, isBooked are required'
        });
    }

    const newRoom = { id: data.length + 1, type, price, features, isBooked };
    data.push(newRoom);

    res.status(201).json({
        status: 201,
        message: 'Room created successfully',
        data: newRoom
    });
});

router.put('/rooms/:id', (req, res) => {
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

router.delete('/rooms/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex(d => d.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: 404,
            message: `Room with id ${id} not found`
        });
    }

    data.splice(index, 1);
    res.status(203).json({
        status: 203,
        message: 'Room deleted successfully'
    });
});

module.exports = router;