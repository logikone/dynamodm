import { DynamODM } from './dynamodm';

describe('Class: DynamODM', () => {
  let dynamODM: DynamODM;

  beforeEach(() => {
    dynamODM = new DynamODM();
  });

  it('Instantiates Class', () => {
    expect(dynamODM instanceof DynamODM)
      .toBeTruthy();
  });
});
