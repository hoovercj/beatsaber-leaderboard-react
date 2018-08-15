import {
    BeatsaberLeaderboardData,
    BeatsaberLeaderboardFile,
    BeatsaberLeaderboardParser,
    ParserSongInfo,
} from './parser.v2';

import * as fs from 'fs';
import * as path from 'path';

// tslint:disable-next-line
const rawscores = require('../services/score-provider/data/scores.json');

describe('BeatsaberLeaderboard', () => {
    it('parses song info correctly', () => {
        fs.writeFileSync(path.join(__dirname, 'parsed.json'), JSON.stringify(BeatsaberLeaderboardParser.ParseFile(rawscores)));
    });
});