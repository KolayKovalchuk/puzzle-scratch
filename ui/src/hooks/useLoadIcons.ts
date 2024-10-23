// loadIcons.ts
const svgContainerId = 'svg-icons';

export const useLoadIcons = () => {
    fetch('/icons/sprite.svg')
        .then(response => response.text())
        .then(svg => {
            document.getElementById(svgContainerId)?.remove();

            const div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.width = '0';
            div.style.height = '0';
            div.style.overflow = 'hidden';
            div.id = svgContainerId;
            div.innerHTML = svg;
            document.body.insertBefore(div, document.body.childNodes[0]);
        });
};