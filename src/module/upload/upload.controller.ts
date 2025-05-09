import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/common/decorators/public.decorator';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // 上传单张图片
  @Post()
  @Public()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile(
      new ParseFilePipeBuilder()
        // .addFileTypeValidator({ fileType: 'jpeg' })
        .addMaxSizeValidator({ maxSize: 2 * 1024 * 1024 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    // Create Supabase client
    const supabase = createClient(
      'https://sylzdgfhyzabhtfqqetz.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5bHpkZ2ZoeXphYmh0ZnFxZXR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1ODIxNjIsImV4cCI6MjA1OTE1ODE2Mn0._g0Vx9lbZzk0emWGfNZIs2iec2u5tU3arpTa59LjWTA',
    );

    try {
      const filePath = `/public/${uuidv4()}`;

      const result = await supabase.storage
        .from('base-bucket')
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });
      console.log(result);
      const { data } = supabase.storage
        .from('base-bucket')
        .getPublicUrl(filePath);
      return { ...data, ...{ id: result.data?.path } };
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  @Delete(':path')
  @Public()
  async remove(@Param('path') path: string) {
    console.log({ path });

    // Create Supabase client
    const supabase = createClient(
      'https://sylzdgfhyzabhtfqqetz.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5bHpkZ2ZoeXphYmh0ZnFxZXR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1ODIxNjIsImV4cCI6MjA1OTE1ODE2Mn0._g0Vx9lbZzk0emWGfNZIs2iec2u5tU3arpTa59LjWTA',
    );

    try {
      const result = await supabase.storage.from('base-bucket').remove([path]);
      console.log([path]);
      console.log({ result });
    } catch (error) {
      console.log({ error });
    }

    return { a: 1 };
  }
}
