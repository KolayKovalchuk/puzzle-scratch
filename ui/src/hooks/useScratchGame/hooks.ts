import { ICardData } from '@models/IBuyBatchCardData';
import { ROUTES } from '@routers/routerConfig';
import { useBuyCard } from '@services/api/cards.service';
import { setAppError } from '@store/actions/appState.actions';
import { updateUserBalanceWithChangeAnimation } from '@store/actions/user.actions';
import { AppErrors } from '@store/reducers/appState.reducer';
import { selectAppError } from '@store/selectors/appState.selectors';
import store from '@store/store';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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

export function useRedirectOnBatchFinished() {
    const appError = useSelector(selectAppError);
    const navigate = useNavigate();

    useEffect(() => {
        if (appError === AppErrors.NoAvailableCards) {
            store.dispatch(setAppError(AppErrors.NoError));
            navigate(ROUTES.Home);
        }
    }, [appError]);
}