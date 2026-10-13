import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

export interface ParticleCanvasHandle {
  spawnParticles: (originX: number, originY: number) => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  decay: number;
  color: string;
}

export const ParticleCanvas = forwardRef<ParticleCanvasHandle>((_props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  const spawnParticles = (originX: number, originY: number) => {
    for (let i = 0; i < 60; i++) {
      particlesRef.current.push({
        x: originX,
        y: originY,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
        size: Math.random() * 4 + 2,
        life: 1,
        decay: Math.random() * 0.02 + 0.015,
        color: Math.random() > 0.5 ? '#00ff66' : '#10b981',
      });
    }
  };

  useImperativeHandle(ref, () => ({
    spawnParticles,
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const animLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // gravity
        p.life -= p.decay;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillRect(p.x, p.y, p.size, p.size);

        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }
      animId = requestAnimationFrame(animLoop);
    };

    animLoop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas id="fx-canvas" ref={canvasRef} />;
});

ParticleCanvas.displayName = 'ParticleCanvas';
