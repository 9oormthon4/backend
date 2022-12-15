import { v4 as uuidv4 } from 'uuid';

export type ExceptionOptions = {
  code?: string,
  statusCode?: number,
  expands?: ExceptionExpands,
  quite?: boolean,
  messageParams?: Record<string, any>
}

export type ExceptionExpands = {
  message?: string,
  detail?: any,
  messageParams?: Record<string, any>
};

export type ExceptionResponse = {
  code: string,
  traceId: string,
  statusCode: number
} & ExceptionExpands;

export class AdregamdyException {
  public readonly traceId: string = uuidv4();
  
  public readonly code: string;
  public readonly messageParams: Record<string, any>;
  public readonly statusCode: number;
  public readonly expands: ExceptionExpands;
  public readonly quite: boolean;

  constructor({ code, statusCode, expands, quite, messageParams }: ExceptionOptions) {
    this.code = code || 'unknown';
    this.statusCode = statusCode || 500;
    this.expands = expands || {};
    this.quite = quite || false;
    this.messageParams = messageParams || null;
  }

  get response(): ExceptionResponse {
    const { traceId, code, statusCode, messageParams } = this;
    const { message, detail } = this.expands;

    const response: ExceptionResponse = { traceId, code, statusCode, message, detail };

    if (messageParams) {
      response.messageParams = messageParams;
    }

    return response;
  }
}
