import { Injectable } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

@Injectable()
export class AppService {
  private app: NestExpressApplication;

  setApp(app: any) {
    this.app = app;
  }

  getApp(): any {
    return this.app;
  }
}
