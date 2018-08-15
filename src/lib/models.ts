/**
 * PRIMARY EXPORT
 */

export interface IBeatSaber  {
    song(id: SongId): Song;
    songs(): Song[];
    player(name: string): Player;
    players(): Player[];

    songsByPopularity(): Song[];
    songsByMostRecentlyPlayed(): Song[];

    playersByFirstPlaces(): Player[];
    playersByFullCombos(): Player[];
    playersByNumberOfScores(): Player[];
}

/**
 * HELPER TYPES
 */

type SongId = string;

export enum Difficulty {
    Easy = 'Easy',
    Normal = 'Normal',
    Hard = 'Hard',
    Expert = 'Expert',
    ExpertPlus = 'ExpertPlus',
}

const DIFFICULTY_KEYS = Object.keys(Difficulty);

/**
 * Given two difficulties, returns a positive number if the first is
 * more difficult than the second, a negative number if the second is
 * more difficult than the first, and 0 if they are the same.
 */
export const CompareDifficulties = (a: Difficulty, b: Difficulty): number  => {
    return DIFFICULTY_KEYS.indexOf(a) - DIFFICULTY_KEYS.indexOf(b);
}

export type DifficultyMap<T> = {
    [key in Difficulty]?: T;
}

export interface BeatSaberData {
    songs: {[songId: string]: Song};
    players: {[playerName: string]: Player};
}

/**
 * SONG INTERFACES
 */

export interface Song {
    id: SongId;
    title: string;
    artist: string;
    author: string;
    bpm: number;
    mode: string;
    detailsByDifficulty: DifficultyMap<SongDetails>;
}

export interface SongDetails {
    summary: SongSummary;
    scores: SongScore[];
}

export interface SongSummary {
    topPlayer?: string;
    topPlayerFullCombo: boolean;
    players: string[];
}

export interface SongScore {
    score: number;
    playerName: string;
    fullCombo: boolean;
    timestamp: number;
}

/**
 * PLAYER INTERFACES
 */

export interface PlayerDetails {
    songsPlayed: SongId[];
    firstPlaces: SongId[];
}

export interface Player {
    // TODO: May need to add count or list of FCs
    name: string;
    detailsByDifficulty: DifficultyMap<PlayerDetails>;
    topScores: {[songId: string]: PlayerScore};
}

export interface PlayerScore {
    songId: string;
    difficulty: Difficulty;
    score: number;
    time: number;
    rank: number;
    rankOf: number;
    fullCombo: boolean;
}

/**
 * RAW FILE
 */

export interface BeatSaberLeaderboardFile {
    _leaderboardsData?: BeatSaberLeaderboardData[];
}

export interface BeatSaberLeaderboardData {
    _leaderboardId: string;
    _scores: BeatSaberScoreData[];
}

interface BeatSaberScoreData {
    _score: number;
    _playerName: string;
    _fullCombo: boolean;
    _timestamp: number;
}

// Songs:
//     * Sort order:
//         * Most popular (most players)
//         * Most recent
//     * Information:
//         * Title
//         * Artist
//         * Author
//         * Summaries:
//             * Difficulty
//             * Player
//             * FC
//             * Num Players
//         * Details:
//             * Difficulty
//             * Score list
// Players:
    // * Sort order:
    //     * "Top player" (most 1st places)
    //     * "Most FCs"
    //     * "Most Active" (most scores on the scoreboard)
    // * Information:
    //     * Name
    //     * Summaries
    //         * Number of FCs
    //         * Difficulties
    //             * Number of first places
    //             * Number of songs played
    //     * Details:
    //         * Top score for each song
    //             * Song
    //             * Difficulty
    //             * Score
    //             * Time
    //             * Rank / Total
    //             *
