import { selectSendRBaxMaxUses } from '@store/selectors/config.selectors';
import { selectLocalValueWithVars } from '@store/selectors/localization.selectors';
import { useSelector } from 'react-redux';

export function TooManyGifts() {
    const sendRBaxMaxPerUserDaily = useSelector(selectSendRBaxMaxUses) || 0;
    const contentText = useSelector(selectLocalValueWithVars('txt.limit.reached', sendRBaxMaxPerUserDaily));
    return (<>
        {contentText}
    </>);
}
