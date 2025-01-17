import { ISpriteCellData } from '@components/shared/IconMatrix';
import { ICardData } from '@models/IBuyBatchCardData';
import { isCellWinnings } from './isCellWinnings';

export function mapMatrixToSpriteCellData<CellData extends ISpriteCellData = ISpriteCellData>(
    cardData: ICardData | null,
    textureNameList: string[],
    itemMapper: (textureName: string) => CellData,
) {
    if (!cardData) return [];

    return cardData.matrix.reduce<(CellData)[][]>((acc, row, rowIndex) => {
        const newRow = row.map((cell, cellIndex) => {
            const cellStr = cell.toString();
            const textureName = (textureNameList.find((_, index) => {
                return (index + 1).toString() === cellStr;
            })) || cellStr;
            const isWinning = isCellWinnings(cardData.winningCells || [], rowIndex, cellIndex);

            return { isWinning, ...itemMapper(textureName) }
        })
        acc.push(newRow)
        return acc;
    }, []);
}
