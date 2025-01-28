import TonWeb from 'tonweb';

export const getIsTonAddress = (address: string): boolean => {
    try {
        const tonweb = new TonWeb();
        new tonweb.utils.Address(address);
        return true;
    } catch (e) {
        return false;
    }
};