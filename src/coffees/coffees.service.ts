import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: '',
      brand: '',
      flavors: ['vanilla', 'chocolate']
    }
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    return this.coffees.find((item) => item.id === +id);
  }

  create(createCoffee: any) {
    this.coffees.push(createCoffee);
  }

  update(id: string, updateCoffee: any) {
    const existCoffee = this.findOne(id)
    if (existCoffee) {
      return 'updated'
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
