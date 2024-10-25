import clsx from 'clsx';
import { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
