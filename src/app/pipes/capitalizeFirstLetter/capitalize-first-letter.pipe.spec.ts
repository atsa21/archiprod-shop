import { CapitalizeFirstLetterPipe } from './capitalize-first-letter.pipe';

describe('CapitalizeFisrtLetterPipe', () => {
  it('create an instance', () => {
    const pipe = new CapitalizeFirstLetterPipe();
    expect(pipe).toBeTruthy();
  });
});
