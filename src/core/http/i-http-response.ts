import { ValidationError } from '@/validation/errors/validation-error';

export interface HttpResponse {
  body: any;
  statusCode: number;
}

export const unprocessable = (error: ValidationError): HttpResponse => {
  return {
    body: error.errors,
    statusCode: 422
  };
};
