import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth';
import { ProductService } from './product.service';
import type { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { of } from 'rxjs';

// GET POST PUT PATCH DELETE

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/phone')
  // @UseGuards(AuthGuard)
  async getPhone() {
    const value = this.productService.getPhone();
    return value;
  }

  @Get('/accessary')
  // @UseGuards(AuthGuard)
  async getAccessary() {
    const value = this.productService.getAccessary();
    return value;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    console.log(file.originalname);
    return of(file);
  }

  @Get('get-productImg/:imageName')
  // @UseGuards(AuthGuard)
  getFile(
    @Param('imageName') imageName,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    const file = createReadStream(join(process.cwd(), './upload/') + imageName);
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="${file}',
    });
    return new StreamableFile(file);
  }
}
