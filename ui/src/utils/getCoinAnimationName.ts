import { CoinAnimationName } from '@components/BigWinScreen/components/CoinAnimation';

export function getCoinAnimationName(winAmount: number, topPrize: number): CoinAnimationName {
    if (winAmount <= 0.3 * topPrize) {
        return CoinAnimationName.coint_s;
    } else if (winAmount > 0.3 * topPrize && winAmount <= 0.8 * topPrize) {
        return CoinAnimationName.coint_m;
    } else {
        return CoinAnimationName.coint_l;
    }
}
