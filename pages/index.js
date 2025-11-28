import { useEffect, useRef } from 'react';
import Head from 'next/head';

const features = [
  {
    title: 'Adaptive Hyperdrive',
    description:
      'Dynamic physics-driven boosters respond to every drift angle, delivering a seamless fusion of speed, grip, and cinematic control.',
    icon: '⚡️',
  },
  {
    title: 'Neural Road AI',
    description:
      'Race through cities that reconfigure in real time, powered by synaptic AI that predicts your racing style and builds stunning worlds on the fly.',
    icon: '🧠',
  },
  {
    title: 'Pulsewave Multiplayer',
    description:
      'Heart-thumping cooperative raids and rivalries with zero-latency netcode and haptic synced feedback across every cockpit.',
    icon: '🌐',
  },
  {
    title: '4K Raytrace Suite',
    description:
      'Next-gen lighting layers and volumetric neon atmospherics tuned for ultra-wide 4K displays and high-refresh competitive rigs.',
    icon: '🎮',
  },
];

const timeline = [
  {
    title: 'Prototype Ignite',
    text: 'Vertical slice playable on PC with two neon mega-city districts and 20 legendary hypercars to master.',
  },
  {
    title: 'Legends Closed Beta',
    text: 'Global leaderboard rollout, esports-ready spectator tools, and cinematic replay editor for content creators.',
  },
  {
    title: 'Full Spectrum Launch',
    text: 'Cross-platform release with raytraced storm tracks, adaptive weather, and yearly narrative expansions.',
  },
];

export default function Home() {
  const carRef = useRef(null);

  useEffect(() => {
    const elements = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.35 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const car = carRef.current;
    if (!car) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      car.style.transform = `translate3d(0, ${-scrollY * 0.06}px, 0) rotate(-6deg)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = document.getElementById('pulseCanvas');
    if (!canvas) return;

    const context = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let animationFrame;

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);
    };

    const draw = (time) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      context.clearRect(0, 0, width, height);

      const layers = 5;
      for (let layer = 0; layer < layers; layer += 1) {
        const intensity = 1 - layer / layers;
        const hue = 320 - layer * 35;
        context.beginPath();
        context.moveTo(0, height / 2);
        for (let x = 0; x <= width; x += 6) {
          const frequency = 0.0025 + layer * 0.0008;
          const amplitude = 40 + layer * 14;
          const offset = (time * 0.0008 + layer * 0.4) * Math.PI * 2;
          const y =
            height / 2 +
            Math.sin(x * frequency + offset) * amplitude * 0.7 +
            Math.cos(x * frequency * 0.6 + offset) * amplitude * 0.3;
          context.lineTo(x, y);
        }
        context.strokeStyle = `hsla(${hue}, 100%, ${50 + intensity * 10}%, ${0.4 + intensity * 0.2})`;
        context.lineWidth = 2 + layer * 1.2;
        context.shadowBlur = 35 * intensity;
        context.shadowColor = `hsla(${hue}, 100%, 65%, 0.6)`;
        context.stroke();
      }

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    animationFrame = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Pulse Drift — 4K Cyber Racer</title>
        <meta
          name="description"
          content="Immerse yourself in Pulse Drift, the definitive 4K neon hypercar game with cinematic racing, adaptive AI, and a gravity-teasing soundtrack."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <section className="section" id="hero">
          <div className="section-content">
            <p style={{ letterSpacing: '0.6em', textTransform: 'uppercase', opacity: 0.6, marginBottom: '1rem' }}>
              Neon Racing Universe
            </p>
            <h1 className="hero-title">Pulse Drift</h1>
            <p className="hero-description">
              Sculpted for 4K dreamers and competitive racers, Pulse Drift fuses precision-engineered hypercars with a
              living neon metropolis. Glide through vertical circuits, orchestrate perfect drifts, and command the
              soundtrack of a city that pulses with your every move.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#features">
                Enter the Grid
              </a>
              <a className="button secondary" href="#timeline">
                Watch the Vision
              </a>
            </div>
          </div>
          <img ref={carRef} src="/cyber-car.svg" alt="Pulse Drift Hypercar" className="cinematic-car" />
        </section>

        <section className="section" id="features">
          <div className="section-content">
            <h2 className="section-title">Engineered for Ultra-Cinematic Play</h2>
            <p className="section-text">
              Every kilometer is crafted for towering LED walls and razor-sharp OLED rigs. Pulse Drift blends volumetric
              fog, particle turbulence, and adaptive neon reflections to fill 4K canvases with pure velocity art.
            </p>
            <div className="features-grid">
              {features.map((feature) => (
                <article key={feature.title} className="feature-card">
                  <div className="feature-icon" aria-hidden>
                    {feature.icon}
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="showcase">
          <div className="section-content">
            <h2 className="section-title">Cinematic Showcase</h2>
            <p className="section-text">
              Drift through hovering highways while the skyline shimmers in photonic rain. Our art pipeline blends
              raymarched atmospherics, holographic signage, and particle-reactive tracks so every frame feels born from a
              sci-fi blockbuster.
            </p>
            <div className="showcase">
              <video
                src="https://cdn.coverr.co/videos/coverr-neon-lights-traffic-1622344564223?download=1"
                autoPlay
                loop
                muted
                playsInline
              />
              <canvas id="pulseCanvas" />
            </div>
          </div>
        </section>

        <section className="section" id="timeline">
          <div className="section-content">
            <h2 className="section-title">Launch Trajectory</h2>
            <p className="section-text">
              From prototype ignition to global arenas, the Pulse Drift roadmap accelerates through three legendary
              milestones. Strap in for the ride.
            </p>
            <div className="timeline">
              {timeline.map((item) => (
                <div key={item.title} className="timeline-item">
                  <span className="timeline-bullet" aria-hidden />
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-text">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        &copy; {new Date().getFullYear()} Pulse Drift Studios. All rights reserved. Crafted for 4K dreamers.
      </footer>
    </>
  );
}
