import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any> {
        // Replace this logic with your user validation (like from a database)
        const user = { username: 'test', password: 'test123' }; // Mocked user
    
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (passwordIsValid) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

      async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }

}
