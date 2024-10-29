import { FC } from 'react';
import { IScratchCardProps, ScratchCard } from './ScratchCard';
import { useContainerDimensions } from '@hooks/useContainerDimensions';
import { Stage } from '@pixi/react';

export const ScratchCardApp: FC<IScratchCardProps> = ({ bundleName }) => {
    const { containerRef, dimensions } = useContainerDimensions();

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
            {dimensions.width && dimensions.height && (
                <Stage width={dimensions.width} height={dimensions.height}>
                    <ScratchCard bundleName={bundleName} />
                </Stage>
            )}
        </div>
    );
};
