import { CLICK_ID_PARAM } from '@routers/router';
import { configApi } from '@services/api/apiLogin.service';
import { getAppLinkWithParam } from '@services/api/links.service';
import { selectBotUrl } from '@store/selectors/config.selectors';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export function MVSTMG () {
    configApi.useGetAppConfigQuery();
    const botUrl = useSelector(selectBotUrl);
    const { clickId } = useParams<{ clickId: string }>();

    useEffect(() => {
        console.log('botUrl', botUrl);
        console.log('clickId', clickId);

        if (!botUrl) return;

        if (!clickId) {
            window.location.href = botUrl;
            console.log('clickId is not defined');
            return;
        }

        const url = getAppLinkWithParam(clickId, CLICK_ID_PARAM);
        console.log('url', url);
        window.location.href = url;
    }, [botUrl, clickId]);

    return null;
}
