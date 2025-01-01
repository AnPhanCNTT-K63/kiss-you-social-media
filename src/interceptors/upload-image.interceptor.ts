import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { appSettings } from 'src/configs/app-settings';

@Injectable()
export class UploadFileInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return new Observable((observer) => {
      const multerInterceptor = new (FileInterceptor('file', {
        limits: {
          fileSize: 1024 * 1024 * appSettings.maxFileSize.front,
        },
        fileFilter: (req, file, callback) => {
          if (!file.mimetype.match(/^image\/(jpeg|png|webp)$/)) {
            return callback(
              new BadRequestException('Only image files are allowed!'),
              false,
            );
          }
          callback(null, true);
        },
      }))();

      multerInterceptor.intercept(context, {
        handle: () => {
          observer.next();
          observer.complete();
          return next.handle();
        },
      });
    });
  }
}
