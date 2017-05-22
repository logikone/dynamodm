import { Request } from 'aws-sdk';

/**
 * Wrap output from AWS requests in a promise and
 * resolve or reject accordingly.
 *
 * @private
 */
export function handleOutput<D, E>(request: Request<D, E>): Promise<D> {
  return new Promise<D>((resolve, reject) => {
    request.send((err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });
}
