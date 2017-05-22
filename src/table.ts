import { DynamoDB } from 'aws-sdk';

import {
  NoOutputError,
} from './errors';
import { handleOutput } from './util';

/**
 * DynamoDB Table
 */
export class Table {

  /**
   * Create a new `Table`.
   */
  static async create(options: DynamoDB.CreateTableInput): Promise<DynamoDB.TableDescription> {
    const result = await handleOutput(global.DynamoDB.createTable(options));

    if (!result.TableDescription) {
      throw new NoOutputError();
    }

    return result.TableDescription;
  }

  /**
   * Update an existing `Table`.
   */
  static async update(options: DynamoDB.UpdateTableInput): Promise<DynamoDB.TableDescription> {
    const result = await handleOutput(global.DynamoDB.updateTable(options));

    if (!result.TableDescription) {
      throw new NoOutputError();
    }

    return result.TableDescription;
  }

  /**
   * Delete a `Table`.
   */
  static async delete(options: DynamoDB.DeleteTableInput): Promise<DynamoDB.TableDescription> {
    const result = await handleOutput(global.DynamoDB.deleteTable(options));

    if (!result.TableDescription) {
      throw new NoOutputError();
    }

    return result;
  }

  TableName: DynamoDB.TableName;
  TableStatus: DynamoDB.TableStatus;

  private _options: TableOptions;

  constructor(name: string, options?: TableOptions) {
    this._options = Object.create(options || null);

    this.TableName = name;
  }

  get options(): TableOptions {
    return this._options;
  }

  /**
   * Get table description from AWS API.
   */
  async getDescription(): Promise<DynamoDB.TableDescription> {
    const tableInput: DynamoDB.DescribeTableInput = {
      TableName: this.TableName
    };

    const tableDescription = await handleOutput(global.DynamoDB.describeTable(
      tableInput
    ));

    if (!tableDescription.Table) {
      throw new NoOutputError();
    }

    for (const key in Object.keys(tableDescription)) {
      Object.defineProperty(this, key, {
        value: Object.getOwnPropertyDescriptor(
          tableDescription,
          key
        ).value
      });
    }

    return tableDescription;
  }

  /**
   * Wait for table to reach `'ACTIVE'` state, or
   * [[TableOptions.waitTimeout]] has been reached.
   */
  async waitForReady(): Promise<void> {
    const startTime = Date.now();
    const endTime = startTime + (this.options.waitTimeout || 5000);

    while (this.TableStatus !== 'ACTIVE') {
      if (Date.now() > endTime) {
        throw new Error();
      }

      const tableDescription = await this.getDescription();

      if (tableDescription.TableStatus) {
        this.TableStatus = tableDescription.TableStatus;
      }
    }
  }
}

/**
 * Table Options
 */
export interface TableOptions {
  /**
   * Time to wait for table to be reader in
   * milliseconds.
   */
  waitTimeout?: number;
}
