import { BeatSaberLeaderboardFile } from 'beatsaber-leaderboard-parser';

// tslint:disable-next-line
const rawscores = require('./data/scores.json');

export interface BeatSaberFileProvider {
    scores(id?: string): Promise<BeatSaberLeaderboardFile>;
}

export class LocalFileScoreProvider implements BeatSaberFileProvider {
    public async scores(id?: string): Promise<BeatSaberLeaderboardFile> {
        return rawscores as BeatSaberLeaderboardFile;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class RemoteFileScoreProvider implements BeatSaberFileProvider {
    constructor(public baseUrl: string) {}

    public async scores(id?: string): Promise<BeatSaberLeaderboardFile> {
        const idParam = id ? `/${id}/` : '';
        return (await fetch(`${this.baseUrl}${idParam}`)).json();
    }
}