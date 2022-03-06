import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { coffeesController } from './coffees/coffees.controller'

@Module({
  imports: [],
  controllers: [AppController, coffeesController],
  providers: [AppService]
})
export class AppModule {}
