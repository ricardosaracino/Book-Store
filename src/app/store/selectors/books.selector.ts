import {createFeatureSelector} from '@ngrx/store';
import {AppState} from '../reducers';

export const getAppState = createFeatureSelector<AppState>('state');
