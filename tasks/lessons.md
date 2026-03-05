# Lessons Learned

## Angular v21 (Future/Simulated)
- Standalone is default (no `standalone: true` needed).
- Tailwind CSS v4 setup with `@tailwindcss/postcss`.
- Use `input()` and `output()` signals.
- Use `ChangeDetectionStrategy.OnPush`.
- Prefer signals for state management.
- Native control flow `@if`, `@for`, etc.

## Project Specifics
- `DataService` provides central data repository.
- Models defined in `src/app/models/data.models.ts`.
- Public images and icons are located in `public/images/`.
- Component architecture implemented with `OnPush` and signals.
- `NgOptimizedImage` works well for local assets in `public/` directory.
- Tailwind CSS 4 simplifies a lot of classes (like `animate-in fade-in` with simple plugins or standard utilities).
- Use `input.required<T>()` for clean type safety in components.
