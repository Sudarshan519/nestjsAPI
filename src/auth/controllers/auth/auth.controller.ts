import { Controller, Post, UseGuards, Req, Get, Session } from '@nestjs/common';
import { AuthenticatedGuard, LocalAuthGuard } from 'src/auth/utils/LocalGuard';

@Controller('auth')
export class AuthController {

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(

    ) {

    }

    @Get('')
    async getAuthSession(
        @Session() session: Record<string, any>) {
        console.log(session);
        console.log(session.id)
    }

    @UseGuards(AuthenticatedGuard)
    @Get('status')
    async getAuthStatus(@Req() req: any) {
        return req.user;
    }

    @Get('/logout')
    logout(@Req() req): any {
        req.session.destroy();
        return { msg: 'The user session has ended' }
    }

}
