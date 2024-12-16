import { ITRowData } from '@components/shared/Table/Table.models';
import { usePafination } from '@hooks/usePagination';
import { IReferralData } from '@models/IGetReferralsResponse';
import { getUserReferrals } from '@services/api/referrals.service';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export function useInvitedFriendsTBodyData() {
    const contianerRef = useRef<HTMLDivElement>(null);
    const { data: referrals, isLoading } = usePafination<IReferralData[] | null>({
        size: 50,
        dataLoaderCb: getUserReferrals,
        ref: contianerRef
    });

    const noInvitetFriendsTxt = useSelector(selectLocalValue('txt.invite.noInvitedFriendsYet'));
    const loadingTxt = useSelector(selectLocalValue('txt.loading'));

    const [tBodyData, setTBodyData] = useState<ITRowData[]>([]);

    useEffect(() => {
        if (!referrals) return;

        const newTBodyData = referrals.map((referral, index) => {
            return {
                key: `row-${index}`,
                cellData: [
                    {
                        key: `cell-${index}-1`, data: `${index + 1}.`
                    },
                    { key: `cell-${index}-2`, data: referral.nickname },
                ],
            }
        });

        setTBodyData(newTBodyData);
    }, [referrals, referrals?.length, isLoading]);

    const emptyText = isLoading ? loadingTxt : noInvitetFriendsTxt;
    return { tBodyData, isLoading, emptyText, contianerRef };
}