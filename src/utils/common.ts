import _clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const clsx = (...classes: ClassValue[]) => twMerge(_clsx(...classes));
