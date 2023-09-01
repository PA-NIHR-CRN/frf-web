async function globalSetup() {
  if (process.env.ENV_CONTEXT == 'DEV') {
    process.env.BASE_URL = 'https://dev.findrecruitandfollowup.nihr.ac.uk/'
  } else if (process.env.ENV_CONTEXT == 'TEST') {
    process.env.BASE_URL = 'https://test.findrecruitandfollowup.nihr.ac.uk/'
  } else {
    throw Error('NO ENVIRONMENT SPECIFIED - STOPPING TEST EXECUTION')
  }
}
export default globalSetup
//figure out flaky external site nav tests on the workflow
//add more specific block tags
