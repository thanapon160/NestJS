import { Test, TestingModule } from '@nestjs/testing'
import { coffeesController } from './coffees.controller'

describe('coffeesController', () => {
  let controller: coffeesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [coffeesController]
    }).compile()

    controller = module.get<coffeesController>(coffeesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
