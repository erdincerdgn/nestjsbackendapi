import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from 'src/controller/http/auth.controller';
import { UserModule } from 'src/application/user.module';
import { UserPrismaRepository } from '../prisma/user-prisma.repository';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRETS } from './configs/jwt-secrets';
import { PassportModule } from '@nestjs/passport';
import { PassportAuthController } from 'src/controller/http/passport-auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    providers: [
        AuthService,
        UserPrismaRepository,
        PrismaService,
        LocalStrategy,
        JwtStrategy
    ],
    controllers: [AuthController, PassportAuthController],
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: JWT_SECRETS,
            signOptions: {expiresIn: '12h'}
        }),
        PassportModule
    ]
})
export class AuthModule {}
