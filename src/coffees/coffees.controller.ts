import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res
} from '@nestjs/common'
import { response } from 'express'

@Controller('coffees')
export class coffeesController {
  @Get('flavors')
  findAll() {
    return 'This action return all the coffees'
  }
  // @Get('flavors')
  // findAll(@Res() response) {
  //   response.status(200).send('This action return all the coffees')
  // }

  @Get(':id/:page')
  findOne(@Param('id') id: string, @Param('page') page: string) {
    console.log(id, page)
    return `This action returns #${id} coffee by ${page}`
  }

  @Post()
  create(@Body() body: Record<string, string>) {
    console.log(body)
    return body
  }
  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // create(@Body() body: Record<string, string>) {
  //   console.log(body)
  //   return body
  // }
}
