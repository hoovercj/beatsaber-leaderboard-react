import { BeatsaberLeaderboard, BeatsaberLeaderboardData } from 'src/lib/parser';

// tslint:disable-next-line
const rawscores = require('./data/scores.json');

export interface ScoreProvider {
    scores(): BeatsaberLeaderboardData;
}

export class LocalFileScoreProvider implements ScoreProvider {
    private readonly leaderboards = BeatsaberLeaderboard.FromFile(rawscores);

    public scores(): BeatsaberLeaderboardData {
        throw Error();
    }
}