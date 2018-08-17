import { BeatSaberLeaderboardFile } from 'beatsaber-leaderboard-parser';

// tslint:disable-next-line
const rawscores = require('./data/scores.json');

export interface BeatSaberFileProvider {
    scores(): Promise<BeatSaberLeaderboardFile>;
}

export class LocalFileScoreProvider implements BeatSaberFileProvider {
    public async scores(): Promise<BeatSaberLeaderboardFile> {
        return rawscores as BeatSaberLeaderboardFile;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class RemoteFileScoreProvider implements BeatSaberFileProvider {
    constructor(private url: string) {}

    public async scores(): Promise<BeatSaberLeaderboardFile> {
        return (await fetch(this.url)).json();
    }
}