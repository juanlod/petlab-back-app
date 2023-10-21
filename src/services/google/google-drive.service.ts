import { drive_v3, google } from 'googleapis';
import { Injectable, Logger } from '@nestjs/common';
import { ClinicImageConfigurationService } from '../master/clinic-image-configuration.service';

@Injectable()
export class GoogleDriveService {
  private readonly logger = new Logger(GoogleDriveService.name);
  private drive: drive_v3.Drive;

  constructor(
    private clinicImageConfiguration: ClinicImageConfigurationService,
  ) {}

  async getAuthConfig(): Promise<any> {
    // Obtén la configuración de tu base de datos o de otro almacenamiento
    const config = await this.clinicImageConfiguration.getConfig();
    console.log(config);
    return config;
  }

  async getAuthClient(config: any) {
    const auth = new google.auth.OAuth2(
      config.clientId,
      config.clientSecret,
      'urn:ietf:wg:oauth:2.0:oob',
    );
    // Aquí deberás obtener y establecer el token de acceso
    // auth.setCredentials({access_token: 'YOUR_ACCESS_TOKEN'});
    return auth;
  }

  async upload(image: any[]): Promise<void> {
    if (!this.drive) await this.initDriveClient();

    const config = await this.getAuthConfig();
    const auth = await this.getAuthClient(config);

    for (const img of image) {
      const fileMetadata = {
        name: img.originalname,
        parents: [config.historyFolder], // Asumiendo que la imagen es para un historial
      };

      const media = {
        mimeType: img.mimetype,
        body: img.buffer,
      };

      try {
        const response = await this.drive.files.create({
          auth,
          requestBody: fileMetadata,
          media,
        });
        this.logger.log(`File Id: ${response.data.id}`);
      } catch (error) {
        this.logger.error('Error uploading file:', error.message);
      }
    }
  }

  async download(fileId: string): Promise<any> {
    if (!this.drive) await this.initDriveClient();

    const config = await this.getAuthConfig();
    const auth = await this.getAuthClient(config);

    try {
      const response = await this.drive.files.get(
        {
          auth,
          fileId,
          alt: 'media',
        },
        {
          // Esta opción es necesaria para obtener el cuerpo de respuesta como un stream
          responseType: 'stream',
        },
      );

      // Crear un array para almacenar los chunks de data
      const chunks: any[] = [];
      return new Promise((resolve, reject) => {
        response.data
          .on('data', (chunk) => chunks.push(chunk)) // Almacenar los chunks de data en el array
          .on('end', () => resolve(Buffer.concat(chunks))) // Concatenar los chunks y resolver la promesa
          .on('error', reject); // Rechazar la promesa si hay un error
      });
    } catch (error) {
      this.logger.error('Error downloading file:', error.message);
      throw new Error(`Error downloading file: ${error.message}`);
    }
  }

  async remove(imageName: string): Promise<string> {
    if (!this.drive) await this.initDriveClient();

    const config = await this.getAuthConfig();
    const auth = await this.getAuthClient(config);

    try {
      const response = await this.drive.files.list({
        auth,
        q: `name='${imageName}' and trashed=false`,
        spaces: 'drive',
        fields: 'files(id, name)',
      });

      if (response.data.files.length > 0) {
        const file = response.data.files[0];
        await this.drive.files.delete({
          auth,
          fileId: file.id,
        });
        return `Removed file ${file.name} with id ${file.id}`;
      } else {
        return `No file found with name ${imageName}`;
      }
    } catch (error) {
      this.logger.error('Error removing file:', error.message);
      return `Error removing file: ${error.message}`;
    }
  }

  async initDriveClient(): Promise<void> {
    const config = await this.getAuthConfig();
    const auth = await this.getAuthClient(config);
    this.drive = google.drive({ version: 'v3', auth });
  }

  async getThumbnailLink(fileId: string): Promise<string | null> {
    if (!this.drive) await this.initDriveClient();

    try {
      const response = await this.drive.files.get({
        fileId,
        fields: 'thumbnailLink',
      });
      return response.data.thumbnailLink || null;
    } catch (error) {
      this.logger.error('Error fetching thumbnail link:', error.message);
      throw new Error(`Error fetching thumbnail link: ${error.message}`);
    }
  }
}
