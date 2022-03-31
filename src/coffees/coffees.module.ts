import { Module } from '@nestjs/common';
import { coffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

// container 4 things (controller, exports, imports, provider)
@Module({
  controllers: [coffeesController],
  providers: [CoffeesService]
})
export class CoffeesModule {

}
