import { distanceInWordsToNow, format } from 'date-fns';


export const dateToDateTimeString = (date: Date): string => {
    return format(date, 'MMMM Do[,] YYYY [at] h[:]mm a')
}

export const dateToTimeDifferenceInWords = (date: Date): string => {
    return `${distanceInWordsToNow(date)} ago`;
}

export const titleArtistString = (title: string, artist?: string): string => {
    return artist ?
        `${title} by ${artist}` :
        title;
}