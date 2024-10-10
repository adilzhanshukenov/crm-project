import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization; // 'Bearer <token>'
    console.log({ headers: request.headers });
    const token = authorization?.split(' ')[1];
    if (!token) {
      console.error('Token empty');

      throw new UnauthorizedException();
    }

    try {
      const tokenPayload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      console.log({ tokenPayload });
      request.user = {
        userId: tokenPayload.sub,
        username: tokenPayload.username,
      };
      return true;
    } catch (error) {
      console.error({ error });

      throw new UnauthorizedException(error);
    }
  }
}
