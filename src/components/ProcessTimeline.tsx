'use client';

import { useEffect, useRef, useState } from 'react';

type Step = { step: string; title: string; desc: string };

export default function ProcessTimeline({ steps }: { steps: Step[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const compute = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Anchor: top of element passes 70% of viewport → progress 0.
      // Bottom of element passes 30% of viewport → progress 1.
      const start = vh * 0.7;
      const end = vh * 0.3;
      const span = rect.height + (start - end);
      const travelled = start - rect.top;
      const p = Math.max(0, Math.min(1, travelled / span));
      setProgress(p);
    };

    compute();
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        compute();
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', compute);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={containerRef} className='relative max-w-3xl mx-auto'>
      {/* Track */}
      <div
        className='absolute top-2 bottom-2 w-px bg-stone-300/70'
        style={{ left: 'calc(0.5rem + 4px)' }}
        aria-hidden='true'
      />
      {/* Filling brass thread */}
      <div
        className='absolute top-2 w-px bg-brass'
        style={{
          left: 'calc(0.5rem + 4px)',
          height: `calc(${progress} * (100% - 1rem))`,
          transition: 'height 120ms linear',
        }}
        aria-hidden='true'
      />

      <ol className='space-y-24 md:space-y-32'>
        {steps.map((s, i) => (
          <Item key={s.step} step={s} index={i} total={steps.length} progress={progress} />
        ))}
      </ol>
    </div>
  );
}

function Item({
  step,
  index,
  total,
  progress,
}: {
  step: Step;
  index: number;
  total: number;
  progress: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: '0px 0px -10% 0px' }
    );
    const node = ref.current;
    if (node) obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // Node is "reached" when the brass thread crosses its slot
  const slot = (index + 0.5) / total;
  const reached = progress >= slot - 0.02;

  return (
    <li
      ref={ref}
      className='group relative pl-12 md:pl-20'
      data-seen={seen ? 'true' : 'false'}
    >
      {/* Node dot on the thread */}
      <span
        aria-hidden='true'
        className={[
          'absolute top-3 left-2 block rounded-full transition-all duration-700 ease-out',
          reached
            ? 'w-[14px] h-[14px] -translate-x-[3px] bg-brass shadow-[0_0_0_4px_rgba(248,246,243,1)]'
            : 'w-[8px] h-[8px] bg-stone-50 border border-stone-400',
        ].join(' ')}
      />
      {/* Pulse halo when reached */}
      <span
        aria-hidden='true'
        className={[
          'absolute top-3 left-2 -translate-x-[3px] w-[14px] h-[14px] rounded-full bg-brass/30 transition-opacity duration-700',
          reached ? 'opacity-100 animate-[ping_2.2s_ease-out_1]' : 'opacity-0',
        ].join(' ')}
      />

      <div
        className={[
          'transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
          'group-hover:translate-x-1',
          seen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        ].join(' ')}
      >
        {/* Eyebrow: step number + tick */}
        <div className='flex items-center gap-3 mb-5'>
          <span
            className={[
              'block h-px bg-brass origin-left transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
              'group-hover:w-16',
              seen ? 'scale-x-100' : 'scale-x-0',
            ].join(' ')}
            style={{ width: '2rem' }}
          />
          <span className='font-body text-xs uppercase tracking-[0.25em] text-brass'>
            {step.step}
          </span>
        </div>

        <h3
          className={[
            'font-display text-3xl md:text-[2.25rem] leading-[1.15] text-charcoal mb-5',
            'transition-[transform,opacity] duration-[900ms] delay-100 ease-[cubic-bezier(0.16,1,0.3,1)]',
            seen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
          ].join(' ')}
        >
          {step.title}
        </h3>

        <p
          className={[
            'text-warm-gray leading-relaxed text-base md:text-[1.0625rem] max-w-xl',
            'transition-[transform,opacity] duration-[900ms] delay-200 ease-[cubic-bezier(0.16,1,0.3,1)]',
            seen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
          ].join(' ')}
        >
          {step.desc}
        </p>
      </div>
    </li>
  );
}
