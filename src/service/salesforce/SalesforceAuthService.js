import got from 'got';
import qs from 'qs';
import salesforceConfig from '../../config/salesforceConfig.js';
import { CacheService } from '../CacheService.js';

export class SalesforceAuthService {
  static async getAccessToken() {
    let existsAccessTokenInCache = await CacheService.get(`sf_access_token`);

    if (existsAccessTokenInCache) {
      return existsAccessTokenInCache;
    }

    let responseAuth = await this.auth();

    CacheService.set(`sf_access_token`, responseAuth, 3600);

    return responseAuth;
  }

  static async auth() {
    let requestBody = qs.stringify({
      grant_type: salesforceConfig.grantType,
      client_id: salesforceConfig.clientId,
      client_secret: salesforceConfig.clientSecret,
    });

    try {
      const response = await got.post(
        `${salesforceConfig.url}/services/oauth2/token`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          responseType: 'json',
          body: requestBody,
        },
      );
      const expires_in = response.headers.expires;
      const responseData = {
        ...response.body,
        expiresIn: expires_in,
      };

      return responseData;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
