import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpInterceptorService } from 'src/common/interceptors/http-interceptor/http-interceptor.service';

@Injectable()
export class Oauth2Service {
  constructor(private readonly httpService: HttpInterceptorService) {}
  async OAuth2_CG(body: Record<string, any>) {
    // return body;
    const data1: any = await firstValueFrom(
      this.httpService.axios.post(
        'https://uctest.xiao5.cn/api/oauth2/access_token',
        body,
      ),
    );

    const access_token = data1.data.access_token;
    const open_id = data1.data.open_id;
    const data2: any = await firstValueFrom(
      this.httpService.axios.post(
        'https://uctest.xiao5.cn/api/oauth2/user_info',
        { access_token, open_id },
      ),
    );
    return data2;
  }
}
