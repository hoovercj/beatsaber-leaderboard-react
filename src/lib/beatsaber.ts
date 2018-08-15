import {
    BeatSaberData,
    BeatSaberLeaderboardFile,
    IBeatSaber,
    Player,
    Song,
} from './models';

import { BeatsaberLeaderboardParser } from 'src/lib/parser.v2';

export class BeatSaber implements IBeatSaber {
    public static FromFile(input: string | BeatSaberLeaderboardFile): IBeatSaber {
        const leaderboardFile: BeatSaberLeaderboardFile =
            typeof(input) === 'string' ?
                JSON.parse(input) as BeatSaberLeaderboardFile :
                input;

        return new BeatSaber(BeatsaberLeaderboardParser.ParseFile(leaderboardFile));
    }

    constructor(private data: BeatSaberData) {}


    public song(id: string): Song {
        throw Error();
    }
    public songs(): Song[] {
        throw Error();
    }
    public songsByPopularity(): Song[] {
        throw Error();
    }
    public songsByMostRecentlyPlayed(): Song[] {
        throw Error();
    }


    public player(name: string): Player {
        throw Error();
    }
    public players(): Player[] {
        throw Error();
    }
    public playersByFirstPlaces(): Player[] {
        throw Error();
    }
    public playersByFullCombos(): Player[] {
        throw Error();
    }
    public playersByNumberOfScores(): Player[] {
        throw Error();
    }
}