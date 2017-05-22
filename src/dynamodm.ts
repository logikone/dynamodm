import { DynamoDB } from 'aws-sdk';

/**
 * DynamODM Main Entrypoint
 */
export class DynamODM {
  constructor(options?: DynamoDB.ClientConfiguration) {
    global.DynamoDB = new DynamoDB(options);
  }
}

declare global {
  namespace NodeJS {
    export interface Global {
      DynamoDB: DynamoDB;
    }
  }
}
