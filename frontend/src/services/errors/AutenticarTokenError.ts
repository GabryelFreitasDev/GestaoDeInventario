export class AutenticarTokenError extends Error{
    constructor(){
      super('Error with authentication token.')
    }
  }