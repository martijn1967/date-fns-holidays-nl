import {Holidays} from "../src/lib/holidays";

describe('Holidays', () => {

    let holidays: Holidays;

    beforeEach(() => {
        holidays = new Holidays()
    });

    it('create', () => {
        expect(holidays).toBeInstanceOf(Holidays);
    });


    it('goodFriday', () => {

        const date = holidays.goodFriday();
        expect(date).toBeInstanceOf(Date);
    });

    it('bevrijdingsdag', () => {

        const date = holidays.bevrijdingsdag();
        expect(date).toBeNull()
    });

    it('liberationDay', () => {

        const date = holidays.liberationDay();
        expect(date).toBeNull()
    });

    it('koningsdag', () => {

        const date = holidays.koningsdag();
        expect(date).toBeInstanceOf(Date);
    });

    it('kingsday', () => {

        const date = holidays.kingsDay();
        expect(date).toBeInstanceOf(Date);
    });

    it('pinksteren', () => {

        const dates = holidays.pinksteren();
        expect(dates).toBeInstanceOf(Array);
    });

    it('pentecost', () => {

        const dates = holidays.pentecost();
        expect(dates).toBeInstanceOf(Array);
    });

    it('pasen', () => {

        const dates = holidays.pasen();
        expect(dates).toBeInstanceOf(Array);
    });

    it('easter', () => {

        const dates = holidays.easter();
        expect(dates).toBeInstanceOf(Array);
    });

    it('setYear', () => {

        const entity = new Holidays();
        entity.year = 2022;

        expect(entity.year).toEqual(2022);
    })

});
