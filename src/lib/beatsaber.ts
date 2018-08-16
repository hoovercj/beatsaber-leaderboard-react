import {
    BeatSaberData,
    BeatSaberLeaderboardFile,
    Difficulty,
    IBeatSaber,
    Player,
    Song,
} from './models';

import { BeatsaberLeaderboardParser } from 'src/lib/parser';

export class BeatSaber implements IBeatSaber {
    public static FromFile(input: string | BeatSaberLeaderboardFile): IBeatSaber {
        const leaderboardFile: BeatSaberLeaderboardFile =
            typeof(input) === 'string' ?
                JSON.parse(input) as BeatSaberLeaderboardFile :
                input;

        return new BeatSaber(BeatsaberLeaderboardParser.ParseFile(leaderboardFile));
    }

    private readonly allPlayersForSongMap: {[songId: string]: Set<string>} = {};
    private readonly firstPlacesForPlayerMap: {[playerName: string]: number} = {};
    private readonly numScoresForPlayerMap: {[playerName: string]: number} = {};

    constructor(private data: BeatSaberData) {}


    public song(id: string): Song {
        return this.data.songs[id];
    }

    public songs(): Song[] {
        return Object.keys(this.data.songs).map(songId => this.data.songs[songId]);
    }

    public songsByNumberOfPlayers(): Song[] {
        return this.songs().sort((a, b) => this.allPlayersForSong(b).size - this.allPlayersForSong(a).size);
    }

    public songsByMostRecentlyPlayed(): Song[] {
        return this.songs().sort((a, b) =>
            (b.mostRecentScore && b.mostRecentScore.timestamp || 0) - (a.mostRecentScore && a.mostRecentScore.timestamp || 0));
    }


    public player(name: string): Player {
        return this.data.players[name];
    }

    public players(): Player[] {
        return Object.keys(this.data.players).map(playerName => this.data.players[playerName]);
    }

    public playersByFirstPlaces(): Player[] {
        return this.players().sort((a, b) => this.numFirstPlacesForPlayer(b) - this.numFirstPlacesForPlayer(a));
    }

    public playersByFullCombos(): Player[] {
        return this.players().sort((a, b) => b.fullCombos.length - a.fullCombos.length);
    }

    public playersByNumberOfScores(): Player[] {
        return this.players().sort((a, b) => this.numScoresForPlayer(b) - this.numScoresForPlayer(a));
    }

    private allPlayersForSong(song: Song): Set<string> {
        if (Object.is(this.allPlayersForSongMap[song.id], undefined)) {
            this.allPlayersForSongMap[song.id] = Object.keys(song.detailsByDifficulty)
                .reduce((players, difficulty: Difficulty) => {
                    song.detailsByDifficulty[difficulty]!.summary.players.forEach(player => players.add(player));

                    return players;
                }, new Set<string>())
        }
        return this.allPlayersForSongMap[song.id];
    }

    private numFirstPlacesForPlayer(player: Player): number {
        if (Object.is(this.firstPlacesForPlayerMap[player.name], undefined)) {
            this.firstPlacesForPlayerMap[player.name] = Object.keys(player.detailsByDifficulty)
                .reduce((count, difficulty: Difficulty) => {
                    return count + player.detailsByDifficulty[difficulty]!.firstPlaces.length;
                }, 0)
        }
        return this.firstPlacesForPlayerMap[player.name];
    }

    private numScoresForPlayer(player: Player): number {
        if (Object.is(this.numScoresForPlayerMap[player.name], undefined)) {
            this.numScoresForPlayerMap[player.name] = Object.keys(player.detailsByDifficulty)
                .reduce((count, difficulty: Difficulty) => {
                    return count + player.detailsByDifficulty[difficulty]!.songsPlayed.length;
                }, 0)
        }
        return this.firstPlacesForPlayerMap[player.name];
    }
}