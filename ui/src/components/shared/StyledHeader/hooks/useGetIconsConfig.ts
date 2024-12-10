import { useEffect, useState } from 'react';
import { StyledHeaderType } from '../StyledHeader';


import main_header_bg_blue from '@icons/styledHeader/main_header_bg_blue.svg';
import main_header_bg_pink from '@icons/styledHeader/main_header_bg_pink.svg';
import main_header_bg_red from '@icons/styledHeader/main_header_bg_red.svg';
import main_header_bg from '@icons/styledHeader/main_header_bg.svg';

import left_dialog_wing_blue from '@icons/styledHeader/left_dialog_wing_blue.svg';
import left_dialog_wing_pink from '@icons/styledHeader/left_dialog_wing_pink.svg';
import left_dialog_wing_red from '@icons/styledHeader/left_dialog_wing_red.svg';
import left_dialog_wing from '@icons/styledHeader/left_dialog_wing.svg';

import right_dialog_wing_blue from '@icons/styledHeader/right_dialog_wing_blue.svg';
import right_dialog_wing_pink from '@icons/styledHeader/right_dialog_wing_pink.svg';
import right_dialog_wing_red from '@icons/styledHeader/right_dialog_wing_red.svg';
import right_dialog_wing from '@icons/styledHeader/right_dialog_wing.svg';

function getIconsConfig(type: StyledHeaderType) {
    let mainHeaderBgIconName = ''
    let leftWingIconName = ''
    let rightWingIconName = ''

    switch (type) {
        case StyledHeaderType.BLUE:
            mainHeaderBgIconName = main_header_bg_blue;
            leftWingIconName = left_dialog_wing_blue;
            rightWingIconName = right_dialog_wing_blue;
            break;

        case StyledHeaderType.PINK:
            mainHeaderBgIconName = main_header_bg_pink;
            leftWingIconName = left_dialog_wing_pink;
            rightWingIconName = right_dialog_wing_pink;
            break;

        case StyledHeaderType.RED:
            mainHeaderBgIconName = main_header_bg_red;
            leftWingIconName = left_dialog_wing_red;
            rightWingIconName = right_dialog_wing_red;
            break;
    
        default:
            mainHeaderBgIconName = main_header_bg;
            leftWingIconName = left_dialog_wing;
            rightWingIconName = right_dialog_wing;
            break;
    }
    return {
        mainHeaderBgIconName,
        leftWingIconName,
        rightWingIconName,
    }
}

export function useGetIconsConfig(type: StyledHeaderType) {
    const [ mainHeaderBgIconName, setMainHeaderBgIconName ] = useState<string>('');
    const [ leftWingIconName, setLeftWingIconName ] = useState<string>('');
    const [ rightWingIconName, setRightWingIconName ] = useState<string>('');

    useEffect(() => {
        const iconsConfig = getIconsConfig(type);
        setMainHeaderBgIconName(iconsConfig.mainHeaderBgIconName);
        setLeftWingIconName(iconsConfig.leftWingIconName);
        setRightWingIconName(iconsConfig.rightWingIconName);
    }, [type]);

    return {
        mainHeaderBgIconName,
        leftWingIconName,
        rightWingIconName,
    }
}