export default function() {
    const setps = [];

    return {
        push(step) {
            steps.push(step);
        }
        steps: () => steps,
    };
}
