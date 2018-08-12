import {
    BeatsaberLeaderboard,
    BeatsaberLeaderboardData,
    BeatsaberLeaderboardFile,
    Difficulty,
    Leaderboards,
    Mode,
    SongInfo,
} from './parser';

class BeatsaberLeaderboardTestability extends BeatsaberLeaderboard {
    public static ParseLeaderboardId(id: string) {
        return BeatsaberLeaderboard.ParseLeaderboardId(id);
    }

    public static BeatsaberLeaderboardDataToSongLeaderboards(leaderboardData: BeatsaberLeaderboardData[]): Leaderboards {
        return BeatsaberLeaderboard.BeatsaberLeaderboardDataToSongLeaderboards(leaderboardData);
    }
}

describe('BeatsaberLeaderboard', () => {
    it('parses song info correctly', () => {
        expect(BeatsaberLeaderboardTestability.ParseLeaderboardId('IDSTRING∎Song Title∎Song Artist∎Song Author∎999∎_Easy_PartyStandard')).toMatchObject({
            id: 'IDSTRING',
            artist: 'Song Artist',
            author: 'Song Author',
            bpm: 999,
            difficultyMode: '_Easy_PartyStandard',
            difficulty: Difficulty.Easy,
            mode: Mode.PartyStandard
        } as SongInfo);
    });

    it('parses multiple leaderboards correctly', () => {
        const leaderboards = BeatsaberLeaderboardTestability.BeatsaberLeaderboardDataToSongLeaderboards(RAW_LEADERBOARDS._leaderboardsData!);
        expect(leaderboards).toMatchObject(PARSED_LEADERBOARDS);
    });

    it('Parses default songs correctly', () => {
        expect(BeatsaberLeaderboardTestability.ParseLeaderboardId('Level4_Normal_PartyStandard')).toMatchObject({
            id: 'Level4',
            artist: 'Beat Saber',
            author: 'Default Song',
            bpm: 0,
            difficultyMode: '_Normal_PartyStandard',
            difficulty: Difficulty.Normal,
            mode: Mode.PartyStandard
        } as SongInfo);
    })
});

const RAW_LEADERBOARDS: BeatsaberLeaderboardFile = {
    _leaderboardsData: [{
        _leaderboardId: 'ID1∎Title1∎Artist1∎Author1∎160∎_Normal_PartyStandard',
        _scores: [
            {
                _score: 1,
                _playerName: 'Player 1',
                _fullCombo: false,
                _timestamp: 1
            }
        ]
    },
    {
        _leaderboardId: 'ID2∎Title2∎Artist2∎Author2∎125∎_Expert_PartyStandard',
        _scores: [
            {
                _score: 1,
                _playerName: 'Player 1',
                _fullCombo: true,
                _timestamp: 1
            },
            {
                _score: 2,
                _playerName: 'Player 2',
                _fullCombo: false,
                _timestamp: 2
            },
        ]
    },
    {
        _leaderboardId: 'ID1∎Title1∎Artist1∎Author1∎160∎_Hard_PartyStandard',
        _scores: [
            {
                _score: 3,
                _playerName: 'Player 3',
                _fullCombo: false,
                _timestamp: 3
            },
            {
                _score: 4,
                _playerName: 'Player 4',
                _fullCombo: false,
                _timestamp: 4
            }
        ]
    }]
};

const PARSED_LEADERBOARDS: Leaderboards = {
    ID1: {
        id: 'ID1',
        title: 'Title1',
        artist: 'Artist1',
        author: 'Author1',
        bpm: 160,
        difficultyLeaderboards: {
            '_Normal_PartyStandard': {
                difficulty: Difficulty.Normal,
                mode: Mode.PartyStandard,
                scores: [{
                    playerName: 'Player 1',
                    score: 1,
                    fullCombo: false,
                    timestamp: 1,
                }],
            },
            '_Hard_PartyStandard': {
                difficulty: Difficulty.Hard,
                mode: Mode.PartyStandard,
                scores: [{
                    playerName: 'Player 3',
                    score: 3,
                    fullCombo: false,
                    timestamp: 3,
                },{
                    playerName: 'Player 4',
                    score: 4,
                    fullCombo: false,
                    timestamp: 4,
                }],
            },
        },
    },
    'ID2': {
        id: 'ID2',
        title: 'Title2',
        artist: 'Artist2',
        author: 'Author2',
        bpm: 125,
        difficultyLeaderboards: {
            '_Expert_PartyStandard': {
                difficulty: Difficulty.Expert,
                mode: Mode.PartyStandard,
                scores: [{
                    score: 1,
                    playerName: 'Player 1',
                    fullCombo: true,
                    timestamp: 1
                },{
                    score: 2,
                    playerName: 'Player 2',
                    fullCombo: false,
                    timestamp: 2
                }],
            }
        }
    }
}