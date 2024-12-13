import { ITRowData } from '@components/shared/Table/Table.models';
import { useGetUserReferrals } from '@services/api/referrals.service';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export function useInvitedFriendsTBodyData() {
    const { referrals, isLoading } = useGetUserReferrals({ page: 0, size: 10 });

    const noInvitetFriendsTxt = useSelector(selectLocalValue('txt.invite.noInvitedFriendsYet'));
    const loadingTxt = useSelector(selectLocalValue('txt.loading'));

    const [tBodyData, setTBodyData] = useState<ITRowData[]>([]);

    useEffect(() => {
        if (!referrals.length) {
            referrals.push({ nickname: isLoading ? loadingTxt : noInvitetFriendsTxt });
        }

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
    }, [referrals]);

    return { tBodyData, isLoading };
}