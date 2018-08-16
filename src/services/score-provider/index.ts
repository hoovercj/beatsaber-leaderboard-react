import { BeatsaberLeaderboardFile } from 'src/lib/parser';

// tslint:disable-next-line
const rawscores = require('./data/scores.json');

export interface BeatSaberFileProvider {
    scores(): Promise<BeatsaberLeaderboardFile>;
}

export class LocalFileScoreProvider implements BeatSaberFileProvider {
    public async scores(): Promise<BeatsaberLeaderboardFile> {
        return rawscores as BeatsaberLeaderboardFile;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class RemoteFileScoreProvider implements BeatSaberFileProvider {
    constructor(private url: string) {}

    public async scores(): Promise<BeatsaberLeaderboardFile> {
        return (await fetch(this.url)).json();
    }
}