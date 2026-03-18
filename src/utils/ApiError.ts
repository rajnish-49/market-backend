export class ApiError extends Error {
  // inherits from the built in error class ( message , stack trace etc )
  public readonly statusCode: number;
  public readonly isOperational: boolean;


  constructor(statusCode: number, message: string, isOperational = true) {
    super(message); // calls the parent constructor (Error) with the message eq to Error(message)
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    Object.setPrototypeOf(this, new.target.prototype); // TypeScript/JavaScript inheritance fix. Ensures that the prototype chain is correctly set up for instances of ApiError, allowing instanceof checks to work properly.
    Error.captureStackTrace(this);
  }
}
