import { DynamicModule, Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { CONFIG_OPTIONS } from './upload.constants';

export interface UploadModuleOptions {
  accesskey: string;
  secretkey: string;
  bucketname: string;
}

@Module({})
export class UploadModule {
  static forRoot(options: UploadModuleOptions): DynamicModule {
    return {
      module: UploadModule,
      controllers: [UploadController],
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        UploadService,
      ],
      exports: [UploadService],
    };
  }
}
