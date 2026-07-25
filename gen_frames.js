// Compact letter definitions
const L = {
  H: ['#...#', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  I: ['###', '.#.', '.#.', '.#.', '.#.', '.#.', '###'],
  M: ['#...#', '##.##', '#.#.#', '#.#.#', '#...#', '#...#', '#...#'],
  APOS: ['#', '#', '.', '.', '.', '.', '.'],
};

// HI: H(5) + space(3) + I(3) = 11 => pad to 13 with 1 on each side
const hi = [0,1,2,3,4,5,6].map(r => {
  return '.' + L.H[r] + '...' + L.I[r] + '.';
});

// I'M: I(3) + dot(1) + apos(1) + dot(1) + M(5) = 11 => pad to 13
const im = [0,1,2,3,4,5,6].map(r => {
  return '.' + L.I[r] + '.' + L.APOS[r] + '.' + L.M[r] + '.';
});

console.log('Raw HI:');
hi.forEach((r,i) => console.log(i, r.length, r));
console.log('\nRaw IM:');
im.forEach((r,i) => console.log(i, r.length, r));

function padToSize(grid, targetCols, targetRows) {
  const padded = grid.map(row => {
    const left = Math.floor((targetCols - row.length) / 2);
    const right = targetCols - row.length - left;
    return '.'.repeat(Math.max(0,left)) + row + '.'.repeat(Math.max(0,right));
  });
  const topPad = Math.floor((targetRows - padded.length) / 2);
  const botPad = targetRows - padded.length - topPad;
  const emptyRow = '.'.repeat(targetCols);
  const result = [];
  for (let i = 0; i < topPad; i++) result.push(emptyRow);
  result.push(...padded);
  for (let i = 0; i < botPad; i++) result.push(emptyRow);
  return result;
}

const hiPadded = padToSize(hi, 13, 13);
const imPadded = padToSize(im, 13, 13);

console.log('\n=== HI_GRID ===');
hiPadded.forEach(r => console.log("  '" + r + "',"));
console.log('\n=== IM_GRID ===');
imPadded.forEach(r => console.log("  '" + r + "',"));
console.log('\nVerify HI:', hiPadded.every(r => r.length === 13));
console.log('Verify IM:', imPadded.every(r => r.length === 13));
