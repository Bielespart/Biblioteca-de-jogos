import type { GameFormInput } from './game';

export function validateGameInput(input: GameFormInput): string[] {
  const errors: string[] = [];

  if (!input.name?.trim()) {
    errors.push('name');
  }

  if (!input.platform?.trim()) {
    errors.push('platform');
  }

  if (!input.genre?.trim()) {
    errors.push('genre');
  }

  if (!input.developer?.trim()) {
    errors.push('developer');
  }

  if (typeof input.rating === 'number' && (input.rating < 0 || input.rating > 5)) {
    errors.push('rating');
  }

  if (input.coverImage && !/^https?:\/\//i.test(input.coverImage.trim())) {
    errors.push('coverImage');
  }

  return errors;
}
