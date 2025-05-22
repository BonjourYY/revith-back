import { registerAs } from '@nestjs/config';

export default registerAs('wechat', () => ({
  appid: process.env.APPID,
  appsecret: process.env.APPSECRET,
  redirect_uri: process.env.REDIRECT_URI,
  response_type: process.env.RESPONSE_TYPE,
  scope: process.env.SCOPE,
  state: process.env.STATE,
}));
