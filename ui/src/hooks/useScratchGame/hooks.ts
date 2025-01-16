import { AppSounds } from '@config/sounds';
import { useGetSounds } from '@hooks/usePlaySound';
import { IBuyBatchCardData, ICardData, WinType } from '@models/IBuyBatchCardData';
import { useBuyCard } from '@services/api/cards.service';
import { updateUserBalanceWithChangeAnimation } from '@store/actions/user.actions';
import store from '@store/store';
import { useCallback } from 'react';

export function useBuyCardWithBalanceChange<CardData extends ICardData = ICardData>() {
    const { buyCard, card, loading: isCardBuying } = useBuyCard<CardData>();

    const buyCardWithBalanceChange = useCallback(async (batchId: string) => {
        if (!batchId) return null;

        const card = await buyCard(batchId);

        if (!card) return;

        const balanceCange = card.rbaxBalance - card.rbaxBalanceBefore - card.cardData.winAmount;
        const total = card.rbaxBalanceBefore + balanceCange;

        store.dispatch(
            updateUserBalanceWithChangeAnimation(
                { total: total },
                balanceCange
            )
        );

        return card;
    }, [buyCard]);

    return {
        buyCardWithBalanceChange,
        isCardBuying,
        card,
    }
}

export function useStopWinSound() {
    const { stopSound } = useGetSounds();

    const stopWinSound = useCallback((card: IBuyBatchCardData | null) => {
        if (!card) return;

        switch (card.winType) {
            case WinType.B:
                stopSound(AppSounds.BigWin);
                break;
            case WinType.M:
                stopSound(AppSounds.MedWin);
                break;
            case WinType.S:
                stopSound(AppSounds.SmallWin);
                break;
        }
    }, [stopSound]);

    return {stopWinSound}
}