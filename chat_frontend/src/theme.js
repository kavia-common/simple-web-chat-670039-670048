//
// Ocean Professional theme utilities and colors
//

// PUBLIC_INTERFACE
export const colors = {
  primary: '#3b82f6',
  secondary: '#64748b',
  success: '#06b6d4',
  error: '#EF4444',
  background: '#f9fafb',
  surface: '#ffffff',
  text: '#111827',
  gradient: 'linear-gradient(135deg, rgba(59,130,246,0.10), #f9fafb 60%)'
};

/**
 * Utility functions for shared styling
 */

// PUBLIC_INTERFACE
export const shadows = {
  soft: '0 2px 10px rgba(17, 24, 39, 0.06)',
  medium: '0 8px 24px rgba(17, 24, 39, 0.10)',
};

// PUBLIC_INTERFACE
export const radii = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  pill: '999px',
};

// PUBLIC_INTERFACE
export const transitions = {
  base: 'all 200ms ease',
};

// PUBLIC_INTERFACE
export function applyThemeToRoot() {
  /**
   * Applies CSS variables to document root so CSS can reference theme colors.
   */
  const root = document.documentElement;
  root.style.setProperty('--c-primary', colors.primary);
  root.style.setProperty('--c-secondary', colors.secondary);
  root.style.setProperty('--c-success', colors.success);
  root.style.setProperty('--c-error', colors.error);
  root.style.setProperty('--c-bg', colors.background);
  root.style.setProperty('--c-surface', colors.surface);
  root.style.setProperty('--c-text', colors.text);
  root.style.setProperty('--shadow-soft', shadows.soft);
  root.style.setProperty('--shadow-medium', shadows.medium);
  root.style.setProperty('--radius-sm', radii.sm);
  root.style.setProperty('--radius-md', radii.md);
  root.style.setProperty('--radius-lg', radii.lg);
  root.style.setProperty('--radius-pill', radii.pill);
  root.style.setProperty('--transition-base', transitions.base);
}
