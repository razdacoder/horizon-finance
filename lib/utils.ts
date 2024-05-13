import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertAmountToMilliUnit(amount: number) {
  return Math.round(amount * 1000);
}

export function convertMilliUnitToAmoun(unit: number) {
  return unit / 1000;
}
