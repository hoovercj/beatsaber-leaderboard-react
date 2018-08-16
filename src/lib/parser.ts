// TODO: Remove when this is published to NPM as a standalone package

import {
    BeatSaberData,
    BeatSaberLeaderboardData,
    BeatSaberLeaderboardFile,
    Difficulty,
    SongDetails,
    SongScore,
} from './models';

export interface BeatsaberLeaderboardFile {
    _leaderboardsData?: BeatsaberLeaderboardData[];
}

export interface BeatsaberLeaderboardData {
    _leaderboardId: string;
    _scores: BeatsaberScoreData[];
}

interface BeatsaberScoreData {
    _score: number;
    _playerName: string;
    _fullCombo: boolean;
    _timestamp: number;
}

export interface ParserSongInfo {
    id: string;
    title: string;
    artist: string;
    author: string;
    bpm: number;
    difficulty: Difficulty;
    mode: string;
}

export class BeatsaberLeaderboardParser {
    public static ParseFile(input: BeatSaberLeaderboardFile): BeatSaberData {
        const ret: BeatSaberData = {
            players: {},
            songs: {},
        };

        const leaderboardData = input && input._leaderboardsData;

        if (!leaderboardData) {
            return ret;
        }
        const beatsaberDataWithSongs = leaderboardData.reduce(BeatsaberLeaderboardParser.reduceLeaderboardSongs, ret);
        const beatsaberDataWithSongsAndPlayers = leaderboardData.reduce(BeatsaberLeaderboardParser.reduceLeaderboardPlayers, beatsaberDataWithSongs);

        return beatsaberDataWithSongsAndPlayers;
    }

    protected static reduceLeaderboardSongs(data: BeatSaberData, leaderboard: BeatSaberLeaderboardData): BeatSaberData {
        const { id, artist, author, bpm, difficulty, mode, title } = BeatsaberLeaderboardParser.ParseLeaderboardId(leaderboard._leaderboardId);

        if (Object.is(data.songs[id], undefined)) {
            console.log(`Song ${id} is undefined. Initializing now`);
            data.songs[id] = {
                id,
                artist,
                author,
                bpm,
                title,
                mode,
                mostRecentScore: undefined,
                detailsByDifficulty: {
                    Easy: {
                        difficulty: Difficulty.Easy,
                        scores: [] as SongScore[],
                        summary: {
                            topPlayer: undefined,
                            topPlayerFullCombo: false,
                            players: [],
                        }
                    } as SongDetails,
                    Normal: {
                        difficulty: Difficulty.Normal,
                        scores: [] as SongScore[],
                        summary: {
                            topPlayer: undefined,
                            topPlayerFullCombo: false,
                            players: [],
                        }
                    } as SongDetails,
                    Hard: {
                        difficulty: Difficulty.Hard,
                        scores: [] as SongScore[],
                        summary: {
                            topPlayer: undefined,
                            topPlayerFullCombo: false,
                            players: [],
                        }
                    } as SongDetails,
                    Expert: {
                        difficulty: Difficulty.Expert,
                        scores: [] as SongScore[],
                        summary: {
                            topPlayer: undefined,
                            topPlayerFullCombo: false,
                            players: [],
                        }
                    } as SongDetails,
                    ExpertPlus: {
                        difficulty: Difficulty.ExpertPlus,
                        scores: [] as SongScore[],
                        summary: {
                            topPlayer: undefined,
                            topPlayerFullCombo: false,
                            players: [],
                        }
                    } as SongDetails,
                }
            }
        } else {
            console.log(`Song ${id} is already defined`);
        }

        return BeatsaberLeaderboardParser.reduceSongScores(data, id, difficulty, leaderboard);
    }

    protected static reduceLeaderboardPlayers(data: BeatSaberData, leaderboard: BeatSaberLeaderboardData): BeatSaberData {
        const { id, difficulty } = BeatsaberLeaderboardParser.ParseLeaderboardId(leaderboard._leaderboardId);

        if (Object.is(data.songs[id], undefined)) {
            throw new Error('Song data must be processed before processing player data');
        }

        return BeatsaberLeaderboardParser.reducePlayerScores(data, id, difficulty, leaderboard);
    }

    protected static reduceSongScores(data: BeatSaberData, songId: string, difficulty: Difficulty, leaderboard: BeatsaberLeaderboardData): BeatSaberData {
        const scores = leaderboard._scores;

        const reduceScoresCore = (_data: BeatSaberData, score: BeatsaberScoreData): BeatSaberData => {
            const songData = _data.songs[songId];
            const songDetails = songData.detailsByDifficulty[difficulty];
            const { _fullCombo, _playerName, _score, _timestamp } = score;

            const songScore = {
                fullCombo: _fullCombo,
                playerName: _playerName,
                score: _score,
                timestamp: _timestamp,
            };

            // Require object to be initialized
            if (!songDetails) {
                console.log(JSON.stringify(_data));
                throw Error('Song details must be initialized before reducing scores for song');
            }

            // Add player to players list if not already present
            if (songDetails.summary.players.indexOf(_playerName) < 0) {
                songDetails.summary.players.push(_playerName);
            }

            // If no score is higher than this score, set them as top player
            if (songDetails.scores.findIndex(s => s.score > _score) < 0) {
                songDetails.summary.topPlayer = _playerName;
                songDetails.summary.topPlayerFullCombo = _fullCombo;
            }

            // Set as most recent song if it was more recent than current value
            if (!songData.mostRecentScore || songData.mostRecentScore.timestamp < _timestamp) {
                songData.mostRecentScore = songScore;
            }

            // Add score to the list of scores
            songDetails.scores.push(songScore);

            return data;
        }

        return scores.reduce(reduceScoresCore, data);
    }

    protected static reducePlayerScores(data: BeatSaberData, songId: string, difficulty: Difficulty, leaderboard: BeatsaberLeaderboardData): BeatSaberData {
        const scores = leaderboard._scores;

        const reduceScoresCore = (_data: BeatSaberData, score: BeatsaberScoreData, index: number, songScores: BeatsaberScoreData[]): BeatSaberData => {
            const players = _data.players;
            const { _fullCombo, _playerName, _score, _timestamp } = score;

            if (Object.is(players[_playerName], undefined)) {
                players[_playerName] = {
                    name: _playerName,
                    topScores: {},
                    fullCombos: [],
                    detailsByDifficulty: {
                        Easy: {
                            difficulty: Difficulty.Easy,
                            firstPlaces: [],
                            songsPlayed: [],
                        },
                        Normal: {
                            difficulty: Difficulty.Normal,
                            firstPlaces: [],
                            songsPlayed: [],
                        },
                        Hard: {
                            difficulty: Difficulty.Hard,
                            firstPlaces: [],
                            songsPlayed: [],
                        },
                        Expert: {
                            difficulty: Difficulty.Expert,
                            firstPlaces: [],
                            songsPlayed: [],
                        },
                        ExpertPlus: {
                            difficulty: Difficulty.ExpertPlus,
                            firstPlaces: [],
                            songsPlayed: [],
                        },
                    },
                };
            }

            const player = players[_playerName];
            const detailsForDifficulty = player.detailsByDifficulty[difficulty];

            const playerScore = {
                songId,
                difficulty,
                fullCombo: _fullCombo,
                time: _timestamp,
                score: _score,
                rank: index + 1,
                rankOf: songScores.length,
            };

            if (_fullCombo) {
                players[_playerName].fullCombos.push(playerScore)
            }

            // Handle "first places" list
            if (index === 0) {
                detailsForDifficulty!.firstPlaces.push(songId);
            }

            // Handle "songs played" list
            if (detailsForDifficulty!.songsPlayed.indexOf(songId) < 0) {
                detailsForDifficulty!.songsPlayed.push(songId);
            }

            // Handle "top scores" list
            const topScores = player.topScores;
            const setTopScore = Object.is(topScores[songId], undefined) || topScores[songId].score < _score;
            if (setTopScore) {
                topScores[songId] = playerScore;
            }

            return data;
        }

        // Sort scores in descending order
        return scores.sort((a, b) => b._score - a._score)
            .reduce(reduceScoresCore, data);
    }


    protected static ParseLeaderboardId = (leaderboardId: string): ParserSongInfo => {
        const customSeparator = '∎';

        // tslint:disable-next-line:one-variable-per-declaration
        let id: string, title: string, artist: string, author: string, bpm: string, difficultyMode: string, defaultTitle: string, difficulty: string, mode: string;

        if (leaderboardId.indexOf(customSeparator) >= 0) {
            [id, title, artist, author, bpm, difficultyMode] = leaderboardId.split('∎');
            [, difficulty, mode] = difficultyMode.split('_');
        } else {
            [defaultTitle, difficulty, mode] = leaderboardId.split('_');
        }


        // TODO: Split the "default" and "custom" parsers up
        // so that I can avoid the ! "initiazed" assertion operator
        // and the || fallback.
        return {
            id: id! || defaultTitle!,
            title: title! || defaultTitle!,
            artist: artist! || 'Beat Saber',
            author: author! || 'Default Song',
            bpm: Number(bpm! || 0),
            difficulty: Difficulty[difficulty as keyof typeof Difficulty],
            mode,
        }
    }
}
