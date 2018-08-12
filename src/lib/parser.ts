// TODO: Remove when this is published to NPM as a standalone package

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

export interface Leaderboards {
    [id: string]: SongLeaderboard;
}

export interface SongInfo {
    id: string;
    title: string;
    artist: string;
    author: string;
    bpm: number;
    difficultyMode: string;
    difficulty: Difficulty;
    mode: Mode;
}

export interface SongLeaderboard {
    id: string;
    title: string;
    artist: string;
    author: string;
    bpm: number;
    difficultyLeaderboards: { [key: string]: DifficultyLeaderboard };
}

export interface DifficultyLeaderboard {
    difficulty: Difficulty;
    mode: Mode;
    scores: Score[];
}

export enum Difficulty {
    Easy = 'Easy',
    Normal = 'Normal',
    Hard = 'Hard',
    Expert = 'Expert',
    ExpertPlus = 'ExpertPlus',
}

export enum Mode {
    PartyStandard = 'PartyStandard',
}

interface Score {
    score: number;
    playerName: string;
    fullCombo: boolean;
    timestamp: number;
}

export class BeatsaberLeaderboard {
    // public static FromFile(input: string): BeatsaberLeaderboard {
    //     const leaderboardFile = JSON.parse(input) as BeatsaberLeaderboardFile;
    //     return new BeatsaberLeaderboard(
    //         BeatsaberLeaderboard.BeatsaberLeaderboardDataToSongLeaderboards(
    //             leaderboardFile && leaderboardFile._leaderboardsData || []
    //         )
    //     );
    // }

    protected static BeatsaberLeaderboardDataToSongLeaderboards = (beatsaberLeaderboards: BeatsaberLeaderboardData[]): Leaderboards => {
        return beatsaberLeaderboards.reduce((leaderboards, currentLeaderboard) => {
            const { id, title, artist, author, bpm, difficultyMode, difficulty, mode } = BeatsaberLeaderboard.ParseLeaderboardId(currentLeaderboard._leaderboardId);

            if (!leaderboards[id]) {
                leaderboards[id] = {
                    id,
                    title,
                    artist,
                    author,
                    bpm,
                    difficultyLeaderboards: {}
                }
            }

            leaderboards[id].difficultyLeaderboards[difficultyMode] = {
                difficulty,
                mode,
                scores: currentLeaderboard._scores.map(BeatsaberLeaderboard.mapBeatSaberScoreDataToScore),
            };


            return leaderboards;
        }, {} as Leaderboards)
    }

    protected static ParseLeaderboardId = (leaderboardId: string): SongInfo => {
        const [id, title, artist, author, bpm, difficultyMode] = leaderboardId.split('∎');
        const [, difficulty, mode] = difficultyMode.split('_');

        return {
            id,
            title,
            artist,
            author,
            bpm: Number(bpm),
            difficultyMode,
            difficulty: Difficulty[difficulty as keyof typeof Difficulty],
            mode: Mode[mode as keyof typeof Mode],
        }
    }

    private static mapBeatSaberScoreDataToScore = (scoreData: BeatsaberScoreData): Score => {
        return {
            playerName: scoreData._playerName,
            score: scoreData._score,
            fullCombo: scoreData._fullCombo,
            timestamp: scoreData._timestamp,
        };
    }

    // protected constructor(private leaderboards: Leaderboards)  {}
}