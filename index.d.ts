export function isValidIRDNumber(irdNumber: string): boolean

interface ValidationOptions {
  requireFormat: 'dashes' | 'numeric' | 'either'
}

export function configureValidator(options: ValidationOptions): typeof isValidIRDNumber
