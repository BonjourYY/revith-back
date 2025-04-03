
import {ApiProperty} from '@nestjs/swagger'




export class CreateUserDto {
  @ApiProperty({
  type: 'string',
})
firstName: string ;
@ApiProperty({
  type: 'string',
})
lastName: string ;
}
