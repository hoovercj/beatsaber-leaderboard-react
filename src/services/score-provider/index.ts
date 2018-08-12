import { BeatsaberLeaderboard } from 'src/lib/parser';

// tslint:disable-next-line
const rawscores = require('./data/scores.json');

export interface ScoreProvider {
    scores(): BeatsaberLeaderboard;
}

export class LocalFileScoreProvider implements ScoreProvider {
    private readonly leaderboards = BeatsaberLeaderboard.FromFile(rawscores);

    public scores(): BeatsaberLeaderboard {
        return this.leaderboards;
    }
}