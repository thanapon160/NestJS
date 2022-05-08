import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,

  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeRepository.find({
      relations: ['flavors'], // for get data from aother table,
      skip: offset,
      take: limit
    })
  }

  async findOne(id: string) { // type should be string
    const coffee = await this.coffeeRepository.findOne({where: {id: +id}, relations: ['flavors']})
    if (!coffee) {
      throw new NotFoundException(`Coffee ${id} not found`)
      // throw new HttpException(`Coffee ${id} not found`, HttpStatus.NOT_FOUND)
    }
    return coffee
  }

  async create(createCoffee: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffee.flavors.map(name => this.preloadFlavorByName(name)),
    );
    console.log(flavors, 'create')

    const coffee = this.coffeeRepository.create({
      ...createCoffee,
      flavors,
    });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors = updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
      ));
      console.log(updateCoffeeDto.flavors, 'updateCoffeeDto.flavors')
      console.log(flavors, 'update')

    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors
    });
    console.log(coffee, 'coffee')
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({where: {name}});
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}
