import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiExcludeEndpoint,
  ApiTags,
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

@ApiTags('Swagger')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiExcludeEndpoint()
  @Get('api')
  getApiJson(): any {
    const swagger = SwaggerModule.createDocument(
      this.appService.getApp(),
      new DocumentBuilder().build(),
    );

    return swagger;
  }
}
