const rooms = [
    {
        id: 101,
        type: 'single',
        price: 100,
        isBooked: false,
        features: ['WiFi', 'TV'],
    },
    {
        id: 102,
        type: 'double',
        price: 150,
        isBooked: true,
        features: ['WiFi', 'TV', 'Mini-bar'],
    },
    {
        id: 201,
        type: 'suite',
        price: 300,
        isBooked: false,
        features: ['WiFi', 'TV', 'Mini-bar', 'Jacuzzi'],
    },
    {
        id: 202,
        type: 'single',
        price: 100,
        isBooked: false,
        features: ['WiFi'],
    },
];

module.exports = rooms;