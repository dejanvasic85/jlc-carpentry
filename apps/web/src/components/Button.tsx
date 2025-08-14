import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}
const baseClasses =
  'font-bold tracking-wide transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

const variantClasses = {
  primary: 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl focus:ring-slate-500',
  outline: 'border-3 border-jlc-black text-jlc-black hover:bg-jlc-black hover:text-white focus:ring-jlc-black',
};

const sizeClasses = {
  sm: 'py-2 px-6 text-sm',
  md: 'py-4 px-10 text-lg',
  lg: 'py-4 px-12 text-xl',
};

export default function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
