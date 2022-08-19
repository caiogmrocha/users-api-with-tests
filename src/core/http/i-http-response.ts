import { ValidationError } from '@/validation/errors/validation-error';

export interface HttpResponse {
  body: any;
  statusCode: number;
}

export const ok = (data: any): HttpResponse => {
  return {
    body: data,
    statusCode: 200
  };
};

export const created = (): HttpResponse => {
  return {
    body: null,
    statusCode: 201
  };
};

export const clientError = (error: Error): HttpResponse => {
  return {
    body: {
      error
    },
    statusCode: 400
  };
};

export const notFound = (error: Error): HttpResponse => {
  return {
    body: {
      error
    },
    statusCode: 404
  };
};

export const unprocessable = (error: ValidationError): HttpResponse => {
  return {
    body: {
      error
    },
    statusCode: 422
  };
};

export const serverError = (message: string): HttpResponse => {
  return {
    body: {
      message
    },
    statusCode: 500
  };
};
