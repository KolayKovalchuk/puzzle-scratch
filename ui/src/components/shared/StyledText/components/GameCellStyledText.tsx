import { ITextStyle } from 'pixi.js-legacy';
import { StyledText } from '../StyledText';
import { IStyledTextProps } from '../StyledText.models';

export const GameCellTextStyle: Partial<ITextStyle> = {
    fill: 'white',
    fontWeight: 'bold',
    stroke: '#090A58',
    strokeThickness: 2,
};

export function GameCellStyledText(props: IStyledTextProps) {
    const textStyle: Partial<ITextStyle> = {
        ...GameCellTextStyle,
        ...props.textStyles,
    };

    return (<StyledText
        {...props}
        textStyles={textStyle}
    ></StyledText>)
}
