import { createFeatureSelector } from '@ngrx/store';
import { CharacterState } from './character.state';

export const charactersState = createFeatureSelector<CharacterState>('characters');
