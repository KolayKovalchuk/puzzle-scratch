import { selectIsMainLoaderOpen, selectIsModalDialogOpen } from '@store/selectors/appState.selectors';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export function useGetCanRender(isLoaderPixiEl: boolean, isModalDialogPixiEl: boolean) {
    const isMainLoaderOpen = useSelector(selectIsMainLoaderOpen);
    const isModalDialogOpen = useSelector(selectIsModalDialogOpen);

    return useMemo(() => {
        if (isLoaderPixiEl) {
            return isMainLoaderOpen;
        }

        if (!isLoaderPixiEl && isModalDialogPixiEl) {
            return isModalDialogOpen;
        }

        return !isMainLoaderOpen && !isModalDialogOpen;

    }, [
        isLoaderPixiEl,
        isMainLoaderOpen,
        isModalDialogPixiEl,
        isModalDialogOpen
    ]);
}