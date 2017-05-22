import { DynamODMError } from './dynamodm.error';

describe('Class: DynamODMError', () => {
  let error: DynamODMError;

  beforeEach(() => {
    error = new DynamODMError();
  });

  it('Instantiates Class', () => {
    expect(error instanceof DynamODMError)
      .toBeTruthy();
  });
});
