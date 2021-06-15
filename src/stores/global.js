import { writable } from "svelte/store";

export const painting_index = writable(0);
export const hoveredColor = writable(0);

export const prefersReducedMotion = writable(false);
export const windowWidth = writable(0);
export const windowHeight = writable(0);
export const scrollY = writable(0);

export const desisted = writable(true);
