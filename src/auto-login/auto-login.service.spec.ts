import { Test, TestingModule } from '@nestjs/testing';
import { AutoLoginService } from './auto-login.service';

describe('AutoLoginService', () => {
  let service: AutoLoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutoLoginService],
    }).compile();

    service = module.get<AutoLoginService>(AutoLoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
