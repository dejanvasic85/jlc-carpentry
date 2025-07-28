import { ReactNode } from 'react';

interface CardProps {
  variant?: 'glass' | 'glass-dark' | 'solid';
  className?: string;
  children: ReactNode;
  hover?: boolean;
}

export default function Card({ variant = 'glass', className = '', children, hover = true }: CardProps) {
  const baseClasses = 'border-radius-lg';

  const variantClasses = {
    glass: `
      bg-white/85 
      border border-white/20 
      rounded-xl 
      shadow-[0_10px_25px_-5px_rgba(0,0,0,0.15)]
      backdrop-blur-[8px]
      [-webkit-backdrop-filter:blur(8px)]
      [contain:layout_style]
      [transform:translateZ(0)]
      ${hover ? 'transition-[box-shadow,transform] duration-200 ease-[will-change:transform] hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.25)] hover:translate-y-[-2px] hover:[transform:translateY(-2px)_translateZ(0)]' : ''}
    `,
    'glass-dark': `
      bg-black/20 
      border border-white/10 
      rounded-xl 
      backdrop-blur-[8px] 
      [-webkit-backdrop-filter:blur(8px)]
      [will-change:auto]
    `,
    solid: `
      bg-white 
      border border-gray-200 
      rounded-xl 
      shadow-lg
      ${hover ? 'hover:shadow-xl transition-shadow duration-200' : ''}
    `,
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.replace(/\s+/g, ' ').trim();

  return <div className={classes}>{children}</div>;
}
