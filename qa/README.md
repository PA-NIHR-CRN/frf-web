# frf-e2e-tests

Written in Typescript, using Playwright

## --------------------SETUP--------------------

Install Node on your local machine. e.g. If using a Mac `brew install node`  
Or Download and Install from here https://nodejs.org/en/download/

Clone repo to local directory  
Run the command `npm i` to install Playwright and other dependencies

Playwright Getting Started Documentation - https://playwright.dev/docs/intro

## --------------------RUN TESTS LOCALLY--------------------

Playwright is configured in the `playwright.config.ts` file  
It contains global properties, as well as project specific properties inside a **projects** array  
By default the tests run using the **FindRecruitFollow** project
The `BASE_URL` environment variable is populated in the `GlobalSetup.ts` file  
It is set to run in the Test environment by default

Should you wish to run the test in another environment  
Simply change the `BASE_URL` value to the desired environment   
**DO NOT ADD, COMMIT OR PUSH THIS CHANGE TO GITHUB**

To execute the tests  
Run the command `npx playwright test`  
Results will print to the console

To see HTML report generated once the test run has finished,  
run the command `npx playwright show-report`  
Will open a browser tab with report showing test results

To run individual tests or a specific group of tests:

- run using the test tag command 'npx playwright test --grep <tag name>' e.g. npx playwright test --grep @frf_22_ac2_6
- add the '.only' method on any individual tests blocks, e.g. test.only("Test Name"{...});
- add the '.only' method on any describe blocks, e.g. test.describe.only("Test Group Name"{ test("Test Name"{...} )});

Playwright Testing Documentation - https://playwright.dev/docs/api/class-test

## --------------------RUN ACCESSIBILITY TESTS LOCALLY--------------------

Go to `playwright.config.ts` file  
The FindRecruitFollow project within the **projects** array has a property called **testIgnore**  
Which is set to ignore all tests that fall within the **accessibiltyTests** folder.   
This is so that the accessibility tests are not included in the day to day runs.  

<img width="537" alt="accessConfig" src="https://github.com/PA-NIHR-CRN/frf-web/assets/57842230/7d84ed6a-9167-406e-b0dc-ad6fbaeeef8d">


To include the accessibilty tests in the run simply comment out this line.  
Alternatively, to run only the Accessibilty tests,  
change the property from testIgnore to **testMatch**  

**DO NOT ADD, COMMIT OR PUSH THIS CHANGE TO GITHUB**

You could also do any of the the following to run all the accessibilty tests, or specific ones  

- run using the test tag command 'npx playwright test --grep <tag name>' e.g. npx playwright test --grep @accessibility
- add the '.only' method on any individual tests blocks, e.g. test.only("Test Name"{...});
- add the '.only' method on any describe blocks, e.g. test.describe.only("Test Group Name"{ test("Test Name"{...} )});

## --------------------RUN TESTS LOCALLY in OTHER BROWSERS & DEVICES -----------------

Go to `playwright.config.ts` file  
There is a **projects** array containing multiple project objects  
Each project object is set to run using a different browser and/or device combination  
For example Firefox on Desktop and Safari on Mobile  
The default project has the name FindRecruitFollow  
And is set to run the tests in Playwrights default environment, Desktop Chromium  

All of the other projects have a **testIgnore** property  
With a value that is set to ignore all tests that fall within the **tests** folder, i.e all of them  

<img width="379" alt="otherProjects" src="https://github.com/PA-NIHR-CRN/frf-web/assets/57842230/0dabb0b3-91c9-45ef-b92c-e3511a41e74c">

To enable tests to run using the config from other project objects  
Simply comment out the line with the **testIgnore** property for the relevant project  
Or change its value so that it no longer ignores all tests  
For example its value could be changed to only ignore the accessibiltyTests folder  
In the same way the FindRecruitFollow project is set up  
If you wish to run only the selected project, and not include the default FindRecruitFollow project  
You would also be required to change its **testIgnore** value to ignore all tests before running

**DO NOT ADD, COMMIT OR PUSH THESE CHANGES TO GITHUB**

## --------------------RUN TESTS via GITHUB ACTIONS--------------------

GitHub Actions are configured in the playwright.yml file  
Tests are set to run and publish an HTML report to a GitHub page on a scheduled daily morning run

To trigger the test run manually  
Go the the repo's GitHub actions page - https://github.com/PA-NIHR-CRN/frf-web/actions  
Select **FRF E2E Tests** from the workflow's options on the left  
Set the **Upload test report** input field to either true or false, default value is false  
This value dictates whether the HTML test report is published to a GitHub Page and the Managed Services Slack channel  
Set the **Select which Tests** input field to either 'all' or '@<test_tag>' e.g. @frf_13, default is all  
This value dictates which tests are included in the run,  
'all' will run everything, @<test_tag will run any tests with that tag

GitHub Page is found here - https://pa-nihr-crn.github.io/frf-web/  
The GitHub page stores and displays the latest published HTML test report  
Setting this value to true will therefore overwrite the currently stored report

Regardless of whether the HTML report is published, each test run will upload the report as an artifact  
This can be accessed in the Artifacts section of the completed **FRF E2E Tests** summary page  
To view it, click it and it will be downloaded as a Zip file  
However the Traces section of the report will not work  
As The Playwright Trace Viewer must be loaded over the http:// or https:// protocols

## --------------------GITHUB PAGES--------------------

**DO NOT DELETE THE `gh-pages` BRANCH FROM THE REPO**

When a report is to be published to the GitHub page this will trigger a different Actions workflow  
This workflow is called **pages-build-deployment**  
It is configured to run off the `gh-pages` branch  
This configuration can be seen here in the repo settings - https://github.com/PA-NIHR-CRN/frf-web/settings/pages  
Any change to the `gh-pages` pages branch will trigger the workflow  
If the **Upload test report** input is not false,  
Then the `Download HTML Report Artifact` & `Publish to GH Pages` steps in the `playwright.yml` file are executed  
This pushes the newly generated `test-report` folder to the `gh-pages` branch  
Triggering the **pages-build-deployment** workflow

## --------------------TEST REPORT--------------------

The Test Report summary page will look something like the image shown below  
It shows a collapsible list of each test feature file and any tests it contains  
Tests that have passed will have a Green tick next to them, failing tests have a red cross  
For example the image below shows a test report with 2 feature files named `postAndSearchOrgs` and `postAndSearchTermsets`  
The `postAndSearchOrgs` feature has a single test block called `Search Organisation Endpoint`  
The test block contains 2 tests `Response matches expected JSON Schema & Default Page Size is 10` which has failed  
And `GET Organisation by Name 'test', all Orgs returned contain the word 'test'` which has passed

<img width="996" alt="reportHomePage" src="https://user-images.githubusercontent.com/57842230/199301677-5810df39-82c8-4773-8f9a-192349f24fcd.png">
  
You can filter the results using the tabs at the top of the report to show:
* Only tests that Passed
* Only tests that Failed
* Only tests that are Flaky
* Only tests that were Skipped
  
<img width="980" alt="reportFails" src="https://user-images.githubusercontent.com/57842230/199304970-185fa311-f4ca-4769-bbf6-cd4cfd68cc54.png">

Clicking a test will take you to the test details page  
Here you can see any errors that have been detected, along with each step in the test  
Console .logs .info .error etc steps are excluded from test steps  
Test failures picked up using Playwrights built in assertions are automatically added to the Errors section, along with the reason for failure  
Along with any Errors that are thrown in the code if a certain condition is/is not met, for example in a try catch block

<img width="988" alt="reportErrorSteps" src="https://user-images.githubusercontent.com/57842230/199369236-83d325fc-d457-4175-9b96-ee73bf64f318.png">
  
The test details page also contains a Traces section with the Call/Network trace for that particular test  
There is also an Attachments section. Any outputs to the console, in the context of that particular test, will be shown here in a `stdout` file  
When writing tests we should log things such as relevant Response Bodies to the console to aid debugging.
  
<img width="997" alt="reportTracesOutput" src="https://user-images.githubusercontent.com/57842230/199370505-a7d9b770-ae9c-4687-9384-2f60cb9ef886.png">
  
Clicking the trace object (the image) takes you into the API call logs relevant to that particular test  
**NOTE THAT THIS ONLY WORKS IF VIEWING THE REPORT OVER HTTP(S), FOR EXAMPLE ON A GITHUB PAGE OR LOCALHOST**  
It shows the requests made and the responses recieved on the left, and Call, Console, Network & Source tabs on the right  
Clicking on a request or response will show details for it on the right, relevant to the tab selected  
The Call tab shows details such as request duration, request method, parameters and header logs, as shown below  
  
<img width="1669" alt="reportTraceCall" src="https://user-images.githubusercontent.com/57842230/199381854-80a34827-0192-44d0-ba0f-816f11f12f91.png">
  
The Console tab shows anything output to the console for the request/response  
The Source tab shows the line of source code from which the request/response was generated in the test  
The Network tab shows the Response Code, Request Headers, Response Headers and Response Body, in a simlar format to Postman  
  
<img width="1658" alt="reportTraceNetwork" src="https://user-images.githubusercontent.com/57842230/199382891-5c8e3f26-928c-46bf-91a5-89657cb5b6f1.png">
  
The Trace View is a useful tool for testers to debug exactly why a test has failed


## --------------------TEST MAINTENANCE--------------------

One of the features of the FRF site is that any Service Providers that have been published withinn the last 90 days  
Will have a red 'New' icon next to the Service Providers name on the DSP list page.  

There is a test in place for this in the dspListBaseTest.e2e.ts feature file,  
The test is tagged **@frf_11_ac4_0**.  
It simply navigates to the DSP list, sorts the list to show the most recently published at the top.  
Then asserts that the top result has been published wothin the last 90 days,  
And the 'New' icon appears as expected

In order for this test to work there needs to be a Service Provider published within the last 90 days via Contentful.  
So roughly every 3 months this test will begin to fail as the most recently published Service Provider,  
Will no longer fall under the 'New' criteria.

To correct this go to the Test environment in Contentful and select the Service Provider content type.  
There is a Service Provider called '**Recently Published DSP**'.  
Tick the checkbox next to it and select the **Duplicate** option.  

<img width="854" alt="mostRecentDSP" src="https://github.com/PA-NIHR-CRN/frf-web/assets/57842230/f9b9f495-ea33-471f-a545-e3714627acec">

This will created an identical Service Provider with a '(1)' after the name.  
This new Service Provider will have a status of **Draft**.  
Tick the checkbox of the original 'Recently Published DSP' again,  
This time select the **Unpublish** option

<img width="835" alt="unpublish" src="https://github.com/PA-NIHR-CRN/frf-web/assets/57842230/7ea251c6-5eb7-4bfd-80bf-92cdc5e9deac">

This will move the 'Recently Published DSP' into Draft.  
Now tick the checkbox of the original 'Recently Published DSP' again,  
This time select the **Delete** option  
And choose to permanently delete the 'Recently Published DSP'  

<img width="707" alt="delete" src="https://github.com/PA-NIHR-CRN/frf-web/assets/57842230/77c3b8ed-aaf7-4d05-a613-c1ba2979c4ff">

Now click on the the new Service Provider named 'Recently Published DSP (1)'  
And edit the name to remove the '(1)'.  
Then select the Publish option.  

<img width="1374" alt="publishNew" src="https://github.com/PA-NIHR-CRN/frf-web/assets/57842230/26448897-dc8c-4197-af68-800938d1b091">

This will publish the new Service Proivder on the FRF site  
And will have te current date as the **Published Date**
And will display the 'New' icon next to its name on the DSP list  
Meaning that the test should now pass once again  

<img width="724" alt="newDsp" src="https://github.com/PA-NIHR-CRN/frf-web/assets/57842230/cc3d1488-38db-49c0-8a22-55cf3698bc66">
