import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export const passwordHint = '**********';

export function classNames(...classes: string[] | Object[]) {
  return classes.filter(Boolean).join(' ');
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//@typescript-eslint/no-unsafe-function-type
export const debounce = (fn: Function, delay: number) => {
  let id: NodeJS.Timeout;
  return () => {
    if (id) clearTimeout(id);
    id = setTimeout(() => {
      fn();
    }, delay);
  };
};


export const generateSizeForInput = (size: 'sm' | 'lg' | 'full') => {
  return size === 'sm'
    ? 'w-[137px] h-[32px]'
    : size === 'lg'
    ? 'w-[233px] h-[49px]'
    : 'w-full h-[49px]';
};
