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
  Res,
} from '@nestjs/common';
import { response } from 'express';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class coffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  // #Method Get
  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll();
    // return `This action return all the coffees. Limit: ${limit}, offset: ${offset}`;
  }
  // @Get('flavors')
  // findAll(@Res() response) {
  //   response.status(200).send('This action return all the coffees')
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(id);
  }
  // @Get(':id/:page')
  // findOne(@Param('id') id: string, @Param('page') page: string) {
  //   console.log(id, page);
  //   return `This action returns #${id} coffee by ${page}`;
  // }

  // #Method Post
  // @Post()
  // create(@Body() body: Record<string, string>) {
  //   console.log(body);
  //   return body;
  // }
  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto, @Res() response) {
    console.log(createCoffeeDto instanceof CreateCoffeeDto)
    response.status(201).send(createCoffeeDto)
    return this.coffeesService.create(createCoffeeDto)
  }
  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // create(@Body() body: Record<string, string>) {
  //   console.log(body)
  //   return body
  // }

  // #Method Update
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    this.coffeesService.update(id, updateCoffeeDto);
    return `This action updates #${id} coffee`;
  }

  // #Method Delete
  @Delete(':id')
  remove(@Param('id') id: string, @Body() body) {
    return this.coffeesService.remove(id);
    // return `This action removes #${id} coffee`;
  }
}
