import { selectSendRBaxMaxPerUserDaily } from '@store/selectors/config.selectors';
import { selectLocalValueWithVars } from '@store/selectors/localization.selectors';
import { useSelector } from 'react-redux';

export function OnePerXGiftBody() {
    const sendRBaxMaxPerUserDaily = useSelector(selectSendRBaxMaxPerUserDaily) || 0;
    const contentText = useSelector(selectLocalValueWithVars({ localizationKey: 'txt.limit.collection' }, sendRBaxMaxPerUserDaily));
    return (<>
        {contentText}
    </>);
}
