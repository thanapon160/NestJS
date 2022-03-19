import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res
} from '@nestjs/common'
import { response } from 'express'

@Controller('coffees')
export class coffeesController {
  // #Method Get
  @Get('flavors')
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery
    return `This action return all the coffees. Limit: ${limit}, offset: ${offset}`
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

  // #Method Post
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

  // #Method Update
  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action updates #${id} coffee`
  }

  // #Method Delete
  @Delete(':id')
  remove(@Param('id') id: string, @Body() body) {
    return `This action removes #${id} coffee`
  }
}
