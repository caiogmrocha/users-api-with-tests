export class MinimumValueError extends Error {
  constructor (fieldName: string, field: any, min: number) {
    if (typeof field === 'string') {
      super(`O campo ${fieldName} deve ter ${min} caracteres.`);
    } else {
      super(`O campo ${fieldName} deve ser maior que ${min}.`);
    }

    this.name = 'MinimumValueError';
  }
}
