export function newBoard(r, c) {
  const cols = Array(c);
  cols.fill(0);

  let b = Array(r);
  b.fill(0);
  b = b.map(() => [...cols]);
  return b;
}
