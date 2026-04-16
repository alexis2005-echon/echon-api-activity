#RESTful API Activity - [Alexis Echon]
## Best Practices Implementation
**1. Environment Variables:**
- Why did we put BASE_URI in .env instead of hardcoding it?

Answer: using .env config values for BASE_URI allows flexibility across environments and secures sensitive values
unlike hardcoding it

**2. Resource Modeling**
- Why did we use plural nouns for our routes?

Answer: using plural nouns complies with RESTful conventions

**3. Status Codes**
- When do we use `201 Created` vs `200 OK`?

Answer: `201 Created` is used only when a new resource is created such as after a POST request, `200 OK` is used
when a request succeeds and returns data

- Why is it important to return `404` instead of just an empty array or a generic error?

Answer: it is important to show the error code as this error clearly communicates that the requested resource does not exist where no
error indicators and lack of conext lead to inaccuracies

**4. Testing**
- ![GET request screenshot](./GET_request.png)

## Second Activity Practice
**1. GET Method 1**
- ![GET request screenshot 1](./img/GET.png)

**2. POST Methods 1 & 2**
- ![POST method screenshot 1](./img/POST_1.png)
- ![POST method screenshot 2](./img/POST_2.png)

## Activity 5: Jest Testing

1. [/] Code runs via npm run test:coverage with all tests passing (Green).
2. [/] The Jest Coverage Table is copied and pasted into your README.
3. [/] The Formal Unit Test Documentation Table (from Part 5) is completed and included in
your/README.
4. [/] GitHub Repo link submitted.

| Test ID | Module         | Function     | Scenario (Description)        | Expected Output | Status |
| UT-001  | DishController | getAllDishes | Fetch all dishes successfully | HTTP 200, Array of Dish Objects | Pass |
| UT-002  | DishController | getAllDishes | Database throws a connection error | HTTP 500, JSON message | Pass |
| UT-003  | DishController | createDish   | Valid dish payload is provided | HTTP 201, Created Dish Object | Pass |
| UT-004  | ChefController | createChef   | Valid chef payload is provided | HTTP 201, Created Chef Object | Pass |
| UT-005  | ChefController | createChef   | Model validation fails during create | HTTP 400, JSON message | Pass |

1. Mocking:
Explain in your own words why we mocked Dish.find and jwt.verify. What
specific problem does mocking solve in Unit Testing?
Answer: 

Mocking in unit testing solves the problem of external dependencies. It enables us to run fast, reliable, and focused unit tests by replacing slow or unpredictable parts with predictable, fake versions.

2. Code Coverage:
Look at your Jest Coverage report. Explain what % Branch coverage means. If your
Branch coverage is at 50%, what does that tell you about your tests? (Hint: Think
about if/else statements).
Answer:

It means the tests are only executing 50% or half of the conditional paths in your code. For example, if you have an if/else block, your tests might be covering the if path but completely missing the else path. The application may fail if under such untested conditions.

3. Testing Middleware:
In our authMiddleware.test.js, why did we use jest.fn() for the next variable, and
why did we assert expect(next).not.toHaveBeenCalled() in the failure scenario?
Answer:

We use a mock function (jest.fn()) for next to check if it gets called. In a failure test, we assert it was not called to confirm the middleware correctly blocked the request from continuing.

## Activity 6: Integration Testing

1. [/] Code runs via npm test with all integration tests passing (Green).
2. [/] dbHelper.js successfully creates and clears the in-memory database.
3. [/] GitHub Repo link submitted.
4. [/] README.md updated with the following answers:

1. Unit vs. Integration: Explain the difference between the Unit Test you wrote in Activity 5 and the
Integration Test you wrote today. What does the Integration Test check that the
Unit Test does not?
o Answer:

Integration tests examine how various components of your application interact with one another. They test every step of the process, from routing to the database answer, by sending actual API requests to your server. The integration test verifies that the database, controller, and HTTP endpoint are all linked and functioning properly together.

2. In-Memory Databases: Why did we install mongodb-memory-server instead of just connecting our tests
to our real MongoDB Atlas URI? Mention at least two reasons.
Answer:

It runs in the computer's RAM, making tests much faster than connecting to a remote database over the internet. For each test run, a new, empty database is created. This keeps untidy, leftover data in your actual database and stops tests from interacting with one another.

3. Supertest: What is the role of supertest in our test file? Why didn't we use Postman for this?
Answer:

Supertest enables you to use your test script to send actual HTTP requests (such as GET and POST) to your Express application and monitor the answers. It is how you test your API endpoints programmatically. A manual tool for investigating APIs is called Postman. Supertest enables you to automate these tests, ensuring that nothing breaks when you make changes.

## Activity 7: