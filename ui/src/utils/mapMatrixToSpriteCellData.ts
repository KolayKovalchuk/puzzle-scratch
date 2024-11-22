import { ISpriteCellData } from '@components/shared/IconMatrix';

export function mapMatrixToSpriteCellData<CellData extends ISpriteCellData = ISpriteCellData>(
    matrix: (string | number)[][],
    textureNameList: string[],
    itemMapper: (textureName: string) => CellData,
) {
    return matrix.reduce<(CellData)[][]>((acc, row) => {
        const newRow = row.map(cell => {
            const cellStr = cell.toString();
            const textureName = (textureNameList.find((_, index) => {
                return (index + 1).toString() === cellStr;
            })) || cellStr;

            return { ...itemMapper(textureName) }
        })
        acc.push(newRow)
        return acc;
    }, []);
}
