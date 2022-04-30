import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpService) {}

  async login(username: string, password: string) {
    const { data } = await firstValueFrom(
      this.http.post(
        'http://host.docker.internal:8080/auth/realms/fullcycle/protocol/openid-connect/token',
        new URLSearchParams({
          client_id: 'nest',
          client_secret: 'cc48f4c5-99f5-48d8-9cbc-023d92869d6b',
          grant_type: 'password',
          username,
          password,
        }),
      ),
    );
    return data;
  }
}
