import { ICardData } from '@models/IBuyBatchCardData';
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