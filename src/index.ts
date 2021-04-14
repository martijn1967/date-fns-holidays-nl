import {Holidays} from "./lib/holidays";
import {format} from 'date-fns';


const h = new Holidays(2026);




h.common().forEach((d) => {
    console.table(format(d, "yyyy-MM-dd"))
})
