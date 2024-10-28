import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSizeForInput = (size: 'sm' | 'lg' | 'full') => {
  return size === 'sm'
    ? 'w-[137px] h-[32px]'
    : size === 'lg'
    ? 'w-[233px] h-[49px]'
    : 'w-full h-[49px]';
};
