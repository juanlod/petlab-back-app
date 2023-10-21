import { Injectable, Logger } from '@nestjs/common';
import { Auth, google } from 'googleapis';

@Injectable()
export class GoogleAuthService {
  private readonly logger = new Logger(GoogleAuthService.name);

  private readonly oauth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'http://localhost:3000/auth/google/callback', // Asegúrate de cambiar esto a tu URL de callback real
    );
  }

  getAuthUrl(): string {
    const scopes = ['https://www.googleapis.com/auth/drive.file'];
    const url = this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
    return url;
  }

  async getTokens(code: string): Promise<Auth.Credentials> {
    const { tokens } = await this.oauth2Client.getToken(code);
    return tokens;
  }

  getOAuth2Client(): Auth.OAuth2Client {
    return this.oauth2Client;
  }
}
