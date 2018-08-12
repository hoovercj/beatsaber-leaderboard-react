import { format } from 'date-fns';


export const dateToDateTimeString = (date: Date): string => {
    return format(date, 'MMMM Do[,] YYYY [at] h[:]mm a')
}
