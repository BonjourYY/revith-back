
import {ApiProperty} from '@nestjs/swagger'




export class ConnectUserDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
}
