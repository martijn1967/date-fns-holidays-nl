import {Holidays} from "../src/lib/holidays";

describe('Holidays', () => {

  let holidays: Holidays;

  beforeEach(() => {
    holidays = new Holidays()
  });

  it('create', () => {

    expect(holidays).toBeInstanceOf(Holidays);
  });


});
