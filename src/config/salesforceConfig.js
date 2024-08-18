export default {
  url: getEnvironmentVariable('SALESFORCE_ORG_URL'),
  grantType: getEnvironmentVariable('SALESFORCE_ORG_GRANT_TYPE'),
  clientId: getEnvironmentVariable('SALESFORCE_ORG_CLIENT_ID'),
  clientSecret: getEnvironmentVariable('SALESFORCE_ORG_CLIENT_SECRET'),
  apiVersion: getEnvironmentVariable('SALESFORCE_ORG_API_VERSION'),
};

function getEnvironmentVariable(name) {
  let value = process.env[name];

  if (!value) {
    throw new Error(`Environment variable ${name} is not set`);
  }

  return value;
}
