import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { coffeesController } from './coffees/coffees.controller'
import { CoffeesService } from './coffees/coffees.service'

@Module({
  imports: [],
  controllers: [AppController, coffeesController],
  providers: [AppService, CoffeesService]
})
export class AppModule {}
