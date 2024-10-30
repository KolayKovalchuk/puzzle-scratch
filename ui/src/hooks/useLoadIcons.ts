import { useEffect } from 'react';

// loadIcons.ts
const svgContainerId = 'svg-icons';

export function useLoadIcons() {
    useEffect(() => {
        const loadIcons = async () => {
            try {
                const response = await fetch('src/assets/icons-sprite.svg');
                const svg = await response.text();

                document.getElementById(svgContainerId)?.remove();

                const div = document.createElement('div');
                div.style.position = 'absolute';
                div.style.width = '0';
                div.style.height = '0';
                div.style.overflow = 'hidden';
                div.id = svgContainerId;
                div.innerHTML = svg;
                document.body.insertBefore(div, document.body.childNodes[0]);
            } catch (error) {
                console.error('Error loading SVG icons:', error);
            }
        }

        loadIcons();
    }, []);
};