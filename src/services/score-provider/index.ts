import { BeatsaberLeaderboardFile } from 'src/lib/parser';

// tslint:disable-next-line
const rawscores = require('./data/scores.json');

export interface BeatSaberFileProvider {
    scores(): BeatsaberLeaderboardFile;
}

export class LocalFileScoreProvider implements BeatSaberFileProvider {
    public scores(): BeatsaberLeaderboardFile {
        return rawscores as BeatsaberLeaderboardFile;
    }
}