const { createChef } = require('../src/controllers/dishcontroller');
const Chef = require('../src/models/chefModel');
const httpMocks = require('node-mocks-http');

jest.mock('../src/models/chefModel');

describe('Chef Controller Unit Tests', () => {
let req;
let res;

beforeEach(() => {
req = httpMocks.createRequest();
res = httpMocks.createResponse();
jest.clearAllMocks();
});

it('should return 201 Created and the new chef', async () => {
req.body = { name: 'Maria', specialty: 'Main Course' };
const fakeSavedChef = { _id: '1', name: 'Maria', specialty: 'Main Course' };
Chef.create.mockResolvedValue(fakeSavedChef);

await createChef(req, res);

expect(res.statusCode).toBe(201);
expect(res._getJSONData()).toStrictEqual(fakeSavedChef);
expect(Chef.create).toHaveBeenCalledWith(req.body);
});

it('should return 400 Bad Request when create fails', async () => {
req.body = { name: 'Maria' };
Chef.create.mockRejectedValue(new Error('Validation failed'));

await createChef(req, res);

expect(res.statusCode).toBe(400);
expect(res._getJSONData()).toStrictEqual({ message: 'Validation failed' });
});
});