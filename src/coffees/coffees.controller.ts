import { Controller, Get } from '@nestjs/common'

@Controller('coffees')
export class coffeesController {
  @Get('flavors')
  findAll() {
    return 'This action return all the coffees'
  }
}
