import { RefObject, useCallback, useEffect, useState } from 'react';

export interface IUsePaginationParams<TReturnData> {
    size: number;
    dataLoaderCb: (arg: { page: number, size: number }) => Promise<TReturnData>;
    ref: RefObject<HTMLDivElement>;
    initPage?: number;
}

export function usePafination<TReturnData>(
    {
        initPage = 0,
        size,
        dataLoaderCb,
        ref
    }: IUsePaginationParams<TReturnData>): { data: TReturnData, isLoading: boolean }
{
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<any>([]);
    const [page, setPage] = useState(initPage);

    // handle scroll event on ref element 
    const handleScroll = useCallback(async () => {
        console.log('handleScroll');
        if (!ref.current) return;

        const { scrollTop, scrollHeight, clientHeight } = ref.current;
        if (scrollTop + clientHeight >= scrollHeight && !isLoading) {
            const nextPage = page + 1;
            setIsLoading(true);
            
            const result = await dataLoaderCb({ page: nextPage, size });

            if (!result) return;
            
            setPage(nextPage);
            setData((prevData: any) => [...prevData, ...result as Array<any>]);
            setIsLoading(false);
        }
    }, [page, isLoading]);

    // add event listener for scroll event on ref element
    useEffect(() => {
        if (isLoading) return;

        const currentRef = ref.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', handleScroll);
            }
        };
    }, [page, isLoading]);

    // init data loading on component mount
    useEffect(() => {
        if (isLoading) return;

        const fetchData = async () => {
            console.log('init fetchData', page, size);
            
            setIsLoading(true);
            const result = await dataLoaderCb({ page, size });
            setData(result);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    return {
        isLoading,
        data
    };
}
