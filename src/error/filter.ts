import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';

import { AdregamdyException, ExceptionExpands } from 'src/error/exception';

const getRequestExtras = (request: any): Record<string, any> => {
  const {
    method, path, params, url, httpVersion,
    headers, query, ip, body, protocol,
  } = request;

  return {
    method, path, params, url, httpVersion,
    headers, query, ip, body, protocol,
  };
};

export const HttpExceptionFilter = (debug: boolean): ExceptionFilter => {
  @Catch()
  class HttpExceptionFilter implements ExceptionFilter {
    private logger: Logger = new Logger('HttpExceptionFilter');

    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();

      const logs: any[] = [];
  
      if (!(exception instanceof AdregamdyException)) {
        const expands: ExceptionExpands = {};
  
        let statusCode: number = 500;
        let code: string = 'unknown';

        if ('getResponse' in exception) {
          const { error, message } = exception.getResponse();

          statusCode = exception.getStatus();
          code = `common/${error.toLowerCase().replace(/ /g, '-')}`

          expands.message = message
        } else {
          const { message, stack, name } = exception as Error;
  
          if (message.length) {
            expands.message = message;
          }
  
          if (debug) {
            logs.push(stack);
            expands.detail = { name, stack };
          }
        }
  
        exception = new AdregamdyException({
          code,
          statusCode,
          expands
        });
      }

      logs.unshift({
        ...exception.response,
        request: getRequestExtras(request)
      });

      if (exception.statusCode >= 500 && exception.statusCode <= 599) {
        logs.forEach(log => this.logger.error(log));
      }

      response.status(exception.statusCode).json(exception.response);
    }
  }             

  return new HttpExceptionFilter();
}
