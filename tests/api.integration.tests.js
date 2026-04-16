const request = require('supertest');
const app = require('../server');
const dbHelper = require('./dbHelper');
const Dish = require('../models/dishModel');

// Set up and tear down the database
beforeAll(async () => await dbHelper.connect());
afterEach(async () => await dbHelper.clearDatabase());
afterAll(async () => await dbHelper.closeDatabase());

describe('Integration Test: Dish API', () => {

  it('POST /api/v1/dishes - should physically save a dish to the database', async () => {
    // 1. Arrange: Prepare the fake payload
    const newDish = {
      name: 'Integration Burger',
      price: 250,
      category: 'Main'
    };

    // 2. Act: Use Supertest to simulate an HTTP POST request
    const response = await request(app)
      .post('/api/v1/dishes')
      .send(newDish);

    // 3. Assert (HTTP): Check the response from the API
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('Integration Burger');

    // 4. Assert (Database): VERIFY IT ACTUALLY SAVED IN THE DATABASE!
    const savedDish = await Dish.findOne({ name: 'Integration Burger' });
    expect(savedDish).toBeTruthy();
    expect(savedDish.price).toBe(250);
  });

  it('GET /api/v1/dishes - should return an empty array if DB is empty', async () => {
    // Remember: afterEach clears the database, so it should be empty here!
    const response = await request(app).get('/api/v1/dishes');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

});