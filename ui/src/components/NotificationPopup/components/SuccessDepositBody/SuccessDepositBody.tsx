import { IDepositSuccessData } from '@models/Notification.model';
import { selectLocalValueWithVars } from '@store/selectors/localization.selectors';
import { useSelector } from 'react-redux';

export interface ISuccessDepositBodyProps {
    notificationData: IDepositSuccessData;
}

export function SuccessDepositBody({ notificationData }: ISuccessDepositBodyProps) {
    const contentText = useSelector(selectLocalValueWithVars('txt.transfer.popup.success', notificationData.rbaxDepositAmount));
    return contentText
}
