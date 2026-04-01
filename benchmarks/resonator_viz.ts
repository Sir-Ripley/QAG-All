const physics = {
  resonanceQuality: 0.8,
  energyDensity: 1500,
  isLevitating: false,
};
const inputAmplitude = 0.5;
const radius = 140;
const time = 10.0;

function originalLoop(ctx: any, time: number, radius: number, physics: any, inputAmplitude: number) {
    for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI * 2) / 12;
        ctx.save();
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(radius, 0);
        ctx.strokeStyle = `rgba(148, 163, 184, 0.3)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        if (inputAmplitude > 0) {
            const waveCount = 3;
            for(let w=0; w<waveCount; w++) {
                const speed = 1 + physics.resonanceQuality * 2;
                const wavePos = (time * speed + w * (radius/waveCount)) % radius;
                const currentR = radius - wavePos;
                const opacity = (1 - (currentR/radius)) * inputAmplitude * 0.1;

                ctx.beginPath();
                ctx.arc(currentR, 0, 2, 0, Math.PI*2);
                ctx.fillStyle = `rgba(56, 189, 248, ${opacity})`;
                ctx.fill();
            }
        }
        ctx.restore();
    }
}

function optimizedLoopV6(ctx: any, time: number, radius: number, physics: any, inputAmplitude: number) {
    const channelStrokeStyle = `rgba(148, 163, 184, 0.3)`;

    if (inputAmplitude > 0) {
        const speed = 1 + physics.resonanceQuality * 2;
        const waveCount = 3;
        const p1r = (time * speed + 0 * (radius / 3)) % radius;
        const p1R = radius - p1r;
        const p1o = (1 - (p1R / radius)) * inputAmplitude * 0.1;
        const p1s = `rgba(56, 189, 248, ${p1o})`;

        const p2r = (time * speed + 1 * (radius / 3)) % radius;
        const p2R = radius - p2r;
        const p2o = (1 - (p2R / radius)) * inputAmplitude * 0.1;
        const p2s = `rgba(56, 189, 248, ${p2o})`;

        const p3r = (time * speed + 2 * (radius / 3)) % radius;
        const p3R = radius - p3r;
        const p3o = (1 - (p3R / radius)) * inputAmplitude * 0.1;
        const p3s = `rgba(56, 189, 248, ${p3o})`;

        for (let i = 0; i < 12; i++) {
            const angle = (i * Math.PI * 2) / 12;
            ctx.save();
            ctx.rotate(angle);

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(radius, 0);
            ctx.strokeStyle = channelStrokeStyle;
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(p1R, 0, 2, 0, Math.PI * 2);
            ctx.fillStyle = p1s;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(p2R, 0, 2, 0, Math.PI * 2);
            ctx.fillStyle = p2s;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(p3R, 0, 2, 0, Math.PI * 2);
            ctx.fillStyle = p3s;
            ctx.fill();

            ctx.restore();
        }
    } else {
        for (let i = 0; i < 12; i++) {
            const angle = (i * Math.PI * 2) / 12;
            ctx.save();
            ctx.rotate(angle);

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(radius, 0);
            ctx.strokeStyle = channelStrokeStyle;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
        }
    }
}

const mockCtx = {
    save: () => {},
    restore: () => {},
    rotate: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    stroke: () => {},
    arc: () => {},
    fill: () => {},
    strokeStyle: '',
    fillStyle: '',
    lineWidth: 0,
};

const iterations = 1000000;

console.log(`Running ${iterations} iterations...`);

const startOriginal = performance.now();
for (let i = 0; i < iterations; i++) {
    originalLoop(mockCtx, time, radius, physics, inputAmplitude);
}
const endOriginal = performance.now();
console.log(`Original loop: ${(endOriginal - startOriginal).toFixed(2)}ms`);

const startOptimized = performance.now();
for (let i = 0; i < iterations; i++) {
    optimizedLoopV6(mockCtx, time, radius, physics, inputAmplitude);
}
const endOptimized = performance.now();
console.log(`Optimized loop: ${(endOptimized - startOptimized).toFixed(2)}ms`);
