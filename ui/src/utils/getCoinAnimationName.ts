import { CoinAnimationName } from '@components/BigWinScreen/components/CoinAnimation';
import { WinType } from '@models/IBuyBatchCardData';

export function getCoinAnimationName(winType: WinType): CoinAnimationName {
    switch (winType) {
        case WinType.S:
            return CoinAnimationName.coint_s;
        case WinType.M:
            return CoinAnimationName.coint_m;
        case WinType.B:
            return CoinAnimationName.coint_l;
    }
}
