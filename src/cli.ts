import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

async function bootstrap() {
  process.env.CLI_MODE = 'true';
  await CommandFactory.run(AppModule, {
    logger: ['error', 'warn'], // only show errors and warnings
  });
}

bootstrap();
