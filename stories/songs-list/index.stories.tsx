import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { AppDecorator } from '../decorators';

import {
  Score,
  SongsList,
  SongsListItem,
} from 'src/components/songs-list';
import {
  Difficulty,
  DifficultyLeaderboard,
  Mode,
  SongLeaderboard,
} from 'src/lib/parser';

const generateLeaderboards = (num: number): SongLeaderboard[] => {
  const ret: SongLeaderboard[] = [];
  for (let i = 0; i < num; i++) {
    ret.push(generateLeaderboard(num));
  }

  return ret;
}

const generateLeaderboard = (id: string | number): SongLeaderboard => {
  return {
    id: String(id),
    artist: `Artist ${id}`,
    author: `Author ${id}`,
    title: `Title ${id}`,
    bpm: Math.random() * 100,
    difficultyLeaderboards: {
      [`${id}_${Difficulty.Expert}`]: generateDifficultyLeaderboard(id, Difficulty.Expert),
      [`${id}_${Difficulty.Hard}`]: generateDifficultyLeaderboard(id, Difficulty.Hard),
    }
  };
}

const generateDifficultyLeaderboard = (id: string | number, songDifficulty: Difficulty): DifficultyLeaderboard => {
  return {
    difficulty: songDifficulty,
    mode: Mode.PartyStandard,
    scores: [{
      fullCombo: false,
      playerName: `Player ${id}` ,
      score: Math.random() * 1000,
      timestamp: Date.now() - Math.random() * 1000,
    }]
  }
}

const leaderboards: SongLeaderboard[] = generateLeaderboards(3);

const { title, author, difficultyLeaderboards } = leaderboards[0];

const { difficulty, scores } = difficultyLeaderboards[Object.keys(difficultyLeaderboards)[0]]
const scoreItems: Score[] = scores.map(s => {
  return {
    difficulty,
    topPlayer: s.playerName,
    fullCombo: s.fullCombo,
  };
});

storiesOf('Songs List', module)
  .addDecorator(AppDecorator)
  .add('Song Item', () => <SongsListItem
      title={title}
      author={author}
      scores={scoreItems}
    />
  )
  .add('Song List', () => <SongsList
      leaderboards={leaderboards}
    />
  );
