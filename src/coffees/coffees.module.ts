import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { coffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';

// container 4 things (controller, exports, imports, provider)
@Module({
  imports: [TypeOrmModule.forFeature([Coffee])], // 👈 Adding Coffee Entity here to TypeOrmModule.forFeatureimports:
  controllers: [coffeesController],
  providers: [CoffeesService]
})
export class CoffeesModule {

}
