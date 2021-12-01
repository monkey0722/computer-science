import {linearSearch} from './linearSearch';

describe('linear-search', () => {
  const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'indigo',
    'violet',
  ];

  it('normal', () => {
    expect(linearSearch(colors, 'red')).toEqual(0);
    expect(linearSearch(colors, 'violet')).toEqual(6);
    expect(linearSearch(colors, 'rainbow')).toEqual(undefined);
  });
});
