/**
 * Base Error Class
 *
 * @public
 */
export class DynamODMError extends Error {
  constructor(message?: string) {
    super(message);
  }
}
