import got from 'got';
import salesforceConfig from '../../config/salesforceConfig.js';
import { SalesforceAuthService } from './SalesforceAuthService.js';

export async function getLimits() {
  try {
    const salesforceAuthResponse = await SalesforceAuthService.getAccessToken();

    const response = await got.get(
      `${salesforceAuthResponse.instance_url}/services/data/v${salesforceConfig.apiVersion}/limits`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${salesforceAuthResponse.access_token}`,
        },
        responseType: 'json',
      },
    );
    return response.body;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
