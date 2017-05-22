import { Table } from './table';

describe('Class Table', () => {
  let table: Table;

  beforeEach(() => {
    table = new Table('testTable');
  });

  it('Instantiates Class', () => {
    expect(table instanceof Table)
      .toBeTruthy();
  });
});
