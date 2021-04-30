import {addDays} from 'date-fns';
import {parseISO, formatISO} from 'date-fns';

export class Holidays {

    private _year: number;

    constructor(year?: number) {

        // @ts-ignore
        this._year = year;

        if (isNaN(this._year)) {
            this._year = (new Date()).getFullYear();
        }
    }

    /**
     * Common dutch holidays
     */
    common(): Date[] {

        const holidays = [this.newYearsDay(), this.kingsDay(), ...this.easter(), this.ascension(),
            ...this.pentecost(), ...this.christmas()];

        const liberationDay = this.liberationDay();

        if (liberationDay instanceof Date) {
            holidays.push(liberationDay);
        }

        return holidays.sort((a: Date, b: Date) => {
            return Number(a) - Number(b);
        });
    }

    /**
     * Check if the given date is a holiday. The input maybe a date a=or a string representing
     * the date in the yyyy-mm-dd format
     * @param entity
     */
    isHoliday(entity: string | Date): boolean{

        let date: Date;

        if(entity instanceof Date){

            date = entity;
            this.year = date.getFullYear();

        } else if (typeof entity === 'string'){

            date = parseISO(entity);
            this.year = date.getFullYear();

        }

        const common = this.common().map((d: Date) => {
            return formatISO(d, { representation: 'date' })
        });

        // @ts-ignore
        if(date instanceof Date){
           return common.indexOf(formatISO(date, { representation: 'date' })) !== -1;
        }

        return false;
    }

    /**
     * Alias function for christmas
     * @see christmas()
     */
    kerstmis(): Date[] {
        return this.christmas();
    }

    /**
     * Kerstmis
     */
    christmas(): Date[] {
        return [new Date(this.year, 11, 25), new Date(this.year, 11, 26)];
    }

    /**
     * Nieuwjaar
     */
    newYearsDay() {
        return new Date(this.year, 0, 1);
    }

    /**
     * Alias
     */
    hemelvaart(): Date {
        return this.ascension();
    }

    /**
     * Hemelvaart
     */
    ascension(): Date {

        const [first] = this.easter();

        return addDays(first, 40 - 1);
    }

    /**
     * Alias
     */
    pinksteren(): Date[] {
        return this.pentecost();
    }

    /**
     * Pinksteren
     */
    pentecost(): Date[] {

        const [first] = this.easter();
        const entity = addDays(first, 50 - 1);

        return [entity, addDays(entity, 1)];
    }

    /**
     * Alias
     */
    pasen(): Date[] {
        return this.easter();
    }

    /**
     * Pasen
     *
     * @thanks to Jon Stuebe
     */
    easter(): Date[] {

        if (this._year < 325) {
            throw new RangeError("Cannot calculate Easter dates before 325 AD.");
        }

        const mod = (a: number, b: number) => {
            return a % b;
        }

        const div = (a: number, b: number) => {

            const q = a / b;

            if (q < 0) {
                throw new Error("Unexpected negative q");
            }

            return Math.floor(q);
        }

        const y = this._year,

            skipMarchDays = 21,

            a = mod(y, 19),
            b = div(y, 100),
            c = mod(y, 100),
            d = div(b, 4),
            e = mod(b, 4),
            f = div(b + 8, 25),
            g = div(b - f + 1, 3),
            h = mod(19 * a + b - d - g + 15, 30),
            i = div(c, 4),
            k = mod(c, 4),
            l = mod(32 + 2 * e + 2 * i - h - k, 7),
            m = div(a + 11 * h + 22 * l, 451),
            t = h + l - 7 * m + skipMarchDays,
            n = div(t, 31) + 3,
            p = mod(t, 31);

        const entity = new Date(this._year, n - 1, p + 1);

        return [entity, addDays(entity, 1)]
    }

    /**
     * Goede vrijdag
     */
    goodFriday(): Date {

        const [first] = this.easter();

        return addDays(first, -2);
    }

    /**
     * Alias
     */
    bevrijdingsdag(): Date | null {
        return this.liberationDay();
    }

    /**
     * Bevrijdingsdag
     */
    liberationDay(): Date | null {

        if ((this._year % 5) === 0) {
            return new Date(this._year, 4, 5);
        }

        return null;
    }

    /**
     * Alias
     */
    koningsdag(): Date {
        return this.kingsDay();
    }

    /**
     * Koningsdag
     */
    kingsDay() {
        return new Date(this.year, 3, 27);
    }


    get year(): number {
        return this._year;
    }

    set year(value: number) {
        this._year = value;
    }
}
