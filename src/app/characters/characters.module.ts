import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '@core/material.module';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';

import { CharactersEffects } from './_store/character.effects';
import { charactersReducer } from './_store/character.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CharactersRoutingModule,
    MaterialModule,
    StoreModule.forFeature('characters', charactersReducer),
    EffectsModule.forFeature([CharactersEffects]),
  ],
  declarations: [CharactersListComponent, CharacterDetailsComponent],
})
export class CharactersModule { }
