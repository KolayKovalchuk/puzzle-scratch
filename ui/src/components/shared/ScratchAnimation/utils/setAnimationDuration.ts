import { Spine } from 'pixi-spine';

export function setAnimationDuration(desiredDurationSec: number, animation: Spine, animationName: string) {
    const animationState = animation.state;
    const animationData = animationState.data.skeletonData.findAnimation(animationName);
    if (animationData) {
        console.log(`Duration of animation "${animationName}" at normal speed: ${animationData.duration} seconds`);
        const timeScale = animationData.duration / desiredDurationSec;
        animationState.timeScale = timeScale;
        console.log(`Setting timeScale to ${timeScale} to achieve a duration of ${desiredDurationSec} seconds`);
    }
}
