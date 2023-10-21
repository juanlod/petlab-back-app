import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { GoogleDriveService } from 'src/services/google/google-drive.service';

@Controller('api/google-drive')
@ApiTags('GoogleDrive')
export class GoogleDriveController {
  private readonly logger = new Logger(GoogleDriveController.name);

  constructor(private readonly googleDriveService: GoogleDriveService) {}

  /**
   * uploadFile
   * @param file
   * @returns
   */
  @Post('upload')
  @ApiOperation({
    summary: 'Upload a file to Google Drive',
    operationId: 'uploadFile',
  })
  async uploadFile(@Body() file: any): Promise<any> {
    return this.googleDriveService.upload([file]);
  }

  /**
   * downloadFile
   * @param fileId
   * @returns
   */
  @Get('download/:fileId')
  @ApiOperation({
    summary: 'Download a file from Google Drive',
    operationId: 'downloadFile',
  })
  @ApiParam({
    name: 'fileId',
    description: 'The ID of the file to download from Google Drive',
  })
  async downloadFile(@Param('fileId') fileId: string): Promise<any> {
    return this.googleDriveService.download(fileId);
  }

  /**
   * deleteFile
   * @param fileName
   * @returns
   */
  @Delete('delete/:fileName')
  @ApiOperation({
    summary: 'Delete a file from Google Drive',
    operationId: 'deleteFile',
  })
  @ApiParam({
    name: 'fileName',
    description: 'The name of the file to delete from Google Drive',
  })
  async deleteFile(@Param('fileName') fileName: string): Promise<any> {
    return this.googleDriveService.remove(fileName);
  }

  /**
   * getThumbnail
   * @param fileId
   * @returns
   */
  @Get('thumbnail/:fileId')
  @ApiOperation({
    summary: 'Get thumbnail link of a file from Google Drive',
    operationId: 'getThumbnail',
  })
  @ApiParam({
    name: 'fileId',
    description:
      'The ID of the file to get the thumbnail link from Google Drive',
  })
  async getThumbnail(
    @Param('fileId') fileId: string,
  ): Promise<{ thumbnailLink: string | null }> {
    const thumbnailLink = await this.googleDriveService.getThumbnailLink(
      fileId,
    );
    return { thumbnailLink };
  }
}
