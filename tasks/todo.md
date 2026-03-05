# Portfolio Development Todo

## Research & Strategy
- [x] Analyze current codebase and data structures (DataService, models)
- [x] Confirm Angular v21+ and Tailwind CSS v4 environment
- [x] Define component architecture (Header, Hero, Projects, Skills, Experiences, Footer)

## Implementation Phase 1: Core Layout
- [x] Clear boilerplate from `app.html` and `app.ts`
- [x] Create `components/` directory
- [x] Implement `HeaderComponent` (Navigation and logo)
- [x] Implement `HeroComponent` (Introduction and call to action)
- [x] Implement `FooterComponent`

## Implementation Phase 2: Content Components
- [x] Implement `ProjectCardComponent` (with signal inputs)
- [x] Implement `ProjectsComponent` (Grid of project cards)
- [x] Implement `SkillCardComponent`
- [x] Implement `SkillsComponent` (Categorized skill list)
- [x] Implement `ExperienceCardComponent`
- [x] Implement `ExperiencesComponent` (Timeline or list of experiences)

## Implementation Phase 3: Integration
- [x] Integrate components into `App` component
- [x] Use `DataService` to provide data to components using signals
- [x] Ensure `OnPush` change detection throughout

## Validation & Polishing
- [ ] Verify accessibility (AXE checks)
- [ ] Responsive design check (Mobile first)
- [ ] Optimize images with `NgOptimizedImage` (In progress)
- [x] Run build and lint checks
