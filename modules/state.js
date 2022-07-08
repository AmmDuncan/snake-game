class GameState {
  constructor(level) {
    const belowZero = !level || (level && level - 1 < 0);
    this.level = belowZero ? 0 : level;
    this.rows = 15;
    this.columns = 15;
  }

  get target() {
    return this.levels[this.level].targetLength;
  }

  changeLevel(level) {
    const belowZero = !level || (level && level - 1 < 0);
    const limit = this.levels.length - 1;
    const aboveLimit = level && level > limit;
    this.level = belowZero ? 0 : aboveLimit ? limit : level;
  }

  reset() {
    changeLevel(0);
    this.gameOver(0);
  }

  levels = [
    {
      level: 1,
      targetLength: 8,
    },
    {
      level: 2,
      targetLength: 15,
    },
    {
      level: 3,
      targetLength: 25,
    },
    {
      level: 4,
      targetLength: 30,
    },
    {
      level: 5,
      targetLength: 50,
    },
  ];
}

const state = new GameState(0);

export default state;
