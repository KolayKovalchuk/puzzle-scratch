import { IAffLinkAvailableData } from '@models/Notification.model';
import { selectLocalValueWithVars } from '@store/selectors/localization.selectors';
import { useSelector } from 'react-redux';

export interface IAffLinkAvailableBodyProps {
    notificationData: IAffLinkAvailableData;
}

export function AffLinkAvailableBody({ notificationData }: IAffLinkAvailableBodyProps) {
    const contentText = useSelector(selectLocalValueWithVars(
        { localizationKey: 'txt.affiliate.success' },
        notificationData.bonusAmount || 0
    ));
    return contentText
}
