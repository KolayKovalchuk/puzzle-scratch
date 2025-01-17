export const isCellWinnings = (winningCells: [number, number][], row: number, col: number) => {
    return winningCells.some(([x, y]) => x === row && y === col);
}
