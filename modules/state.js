class GameState {
  constructor(level) {
    const belowZero = !level || (level && level - 1 < 0);
    this.level = belowZero ? 0 : level;
    this.rows = this.levels[this.level]["rows"];
    this.columns = this.levels[this.level]["columns"];
  }

  get target() {
    return this.levels[this.level].targetLength;
  }

  changeLevel(level) {
    const belowZero = !level || (level && level - 1 < 0);
    const limit = this.levels.length - 1;
    const aboveLimit = level && level > limit;
    this.level = belowZero ? 0 : aboveLimit ? limit : level;
    this.rows = this.levels[this.level]["rows"];
    this.columns = this.levels[this.level]["columns"];
  }

  levels = [
    {
      level: 1,
      targetLength: 8,
      rows: 6,
      columns: 6,
    },
    {
      level: 2,
      targetLength: 15,
      rows: 8,
      columns: 8,
    },
    {
      level: 3,
      targetLength: 25,
      rows: 10,
      columns: 10,
    },
    {
      level: 4,
      targetLength: 30,
      rows: 10,
      columns: 10,
    },
  ];
}

const state = new GameState(0);

export default state;
