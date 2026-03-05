import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { SkillCardData } from '../../models/data.models';

@Component({
  selector: 'app-skill-card',
  imports: [NgOptimizedImage],
  templateUrl: './skill-card.html',
  styleUrl: './skill-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillCard {
  readonly skill = input.required<SkillCardData>();
  readonly isActive = input<boolean>(true);

  getIconPath(name: string) {
    const lowerName = name.toLowerCase();
    if (lowerName === 'uml') return `images/tecnologies/uml.svg`;
    // Map pngs
    const pngs = ['c', 'c++', 'css', 'express', 'html', 'mongodb', 'node', 'prisma', 'react', 'tailwind', 'typescript'];
    if (pngs.includes(lowerName)) return `images/tecnologies/${lowerName}.png`;
    return `images/tecnologies/default.png`; 
  }

  getBorderColor() {
    if (!this.isActive()) return 'border-transparent opacity-40 grayscale';
    
    const typeColors: Record<string, string> = {
      'backend': 'border-lime-500 shadow-lime-100',
      'frontend': 'border-rose-500 shadow-rose-100',
      'database': 'border-amber-500 shadow-amber-100',
      'infra': 'border-blue-500 shadow-blue-100',
      'all': 'border-purple-500 shadow-purple-100',
    };
    return typeColors[this.skill().type] || 'border-slate-200';
  }
}
