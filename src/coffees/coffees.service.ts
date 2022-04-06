import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Vanilla Frap',
      brand: 'Buddy Brew',
      flavors: ['vanilla', 'chocolate']
    }
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    // throw 'A random error'
    const coffee = this.coffees.find((item) => item.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Coffee ${id} not found`)
      // throw new HttpException(`Coffee ${id} not found`, HttpStatus.NOT_FOUND)
    }
    return coffee
  }

  create(createCoffee: any) {
    this.coffees.push(createCoffee);
    return createCoffee
  }

  update(id: string, updateCoffee: any) {
    console.log(updateCoffee, 'updateCoffee')
    const existCoffee = this.findOne(id)
    console.log(existCoffee, 'existCoffee')
    if (existCoffee) return 'updated'
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
