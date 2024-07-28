Clone Repository using the shared link.
Install Playwright - npm install playwright
Run Command to get all the dependencies - npm i
Now Once all the above steps are done, use below commands to run the tests.
Initiall run the LOGIN test inorder to login to application with - npx playwright test --project=login
once the login is successful, we are storing a session into one json file and the same will be utilized by rest of the tests.
Now run the command - npx playwright test --project=tests
Running the above command will actually utilize the session stored by login test and directly starts testing the functionality.
when we run the tests project, all the tests will run parallely.
