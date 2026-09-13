// Utility function for merging class names (replaces shadcn cn from @/lib/utils)
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
