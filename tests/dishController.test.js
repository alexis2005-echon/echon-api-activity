// tests/dishController.test.js

const { getAllDishes, createDish } = require('../src/controllers/dishcontroller');
const Dish = require('../src/models/dishModel');
const httpMocks = require('node-mocks-http');

// TELL JEST TO MOCK THE DATABASE MODEL
jest.mock('../src/models/dishModel');

describe('Dish Controller Unit Tests', () => {

let req, res;

// This runs BEFORE every test. It resets our fake Request and Response objects.
beforeEach(() => {
req = httpMocks.createRequest();
res = httpMocks.createResponse();
});

describe('GET /dishes (getDishes)', () => {
it('should return 200 OK and a list of dishes', async () => {
// 1. Arrange: Setup the fake data and force the mock DB to return it
const fakeData = [{ name: 'Adobo', price: 150 }, { name: 'Sinigang', price: 200 }];
Dish.find.mockResolvedValue(fakeData);

// 2. Act: Call the controller function
await getAllDishes(req, res);

// 3. Assert: Verify the results
expect(res.statusCode).toBe(200);
expect(res._getJSONData()).toStrictEqual(fakeData);
expect(Dish.find).toHaveBeenCalledTimes(1);
});

it('should return 500 Internal Server Error if database crashes', async () => {
// 1. Arrange: Force the DB to throw an error
Dish.find.mockRejectedValue(new Error('DB Connection Lost'));

// 2. Act
await getAllDishes(req, res);

// 3. Assert
expect(res.statusCode).toBe(500);
expect(res._getJSONData()).toStrictEqual({ message: 'DB Connection Lost' });
});
});

describe('POST /dishes (createDish)', () => {
it('should return 201 Created and the new dish', async () => {
// 1. Arrange
req.body = { name: 'Pancit', price: 100 };
const fakeSavedDish = { _id: '12345', name: 'Pancit', price: 100 };
Dish.create.mockResolvedValue(fakeSavedDish); // Mock the create method

// 2. Act
await createDish(req, res);

// 3. Assert
expect(res.statusCode).toBe(201);
expect(res._getJSONData()).toStrictEqual(fakeSavedDish);
expect(Dish.create).toHaveBeenCalledWith(req.body);
});
});
});