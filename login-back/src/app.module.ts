import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthGuard } from './login/auth.guard';

@Module({
  imports: [LoginModule, UserModule, DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useValue: AuthGuard,
    },
  ],
})
export class AppModule {}
