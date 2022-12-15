import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AdregamdyException } from './error/exception';

export type AdregamdyAuthResponse = {
    status: boolean
}

const Auth = createParamDecorator(
    async (data: any, ctx: ExecutionContext): Promise<AdregamdyAuthResponse> => {
        try {
            const request = ctx.switchToHttp().getRequest();
            const { id, password, userid, usercode } = request.headers;
            if(id == "jeju" && password == "pwd") {
                return {
                    status: true
                } as AdregamdyAuthResponse
            } else {
                throw new AdregamdyException({
                    code: 'invalid header',
                    statusCode: 400
                });
            }
        } catch(e) {
            throw new AdregamdyException(e);
        }
    }
)

export const AdregamdyAuth = Auth;
