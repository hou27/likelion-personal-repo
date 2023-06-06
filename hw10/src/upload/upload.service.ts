import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { UploadModuleOptions } from './upload.module';
import { CONFIG_OPTIONS } from './upload.constants';

@Injectable()
export class UploadService {
  private readonly S3: AWS.S3;
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: UploadModuleOptions,
  ) {
    AWS.config.update({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: this.options.accesskey,
        secretAccessKey: this.options.secretkey,
      },
    });

    this.S3 = new AWS.S3();
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      const uploadKey = `${Date.now() + file.originalname}`;
      const upload = await this.S3.putObject({
        Key: uploadKey,
        Body: file.buffer,
        Bucket: this.options.bucketname,
      }).promise();

      console.log(upload);
      console.log(
        `https://${this.options.bucketname}.s3.ap-northeast-2.amazonaws.com/${uploadKey}`,
      );
    } catch (error) {
      console.log(error);
    }
  }
}
