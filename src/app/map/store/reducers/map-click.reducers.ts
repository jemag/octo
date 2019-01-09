/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {MapClickInfo} from '@app/shared/models';
import {cloneDeep} from 'lodash';
import {MapClickActionsUnion, MapClickActionTypes} from '../actions/map-click.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface MapClickState extends EntityState<MapClickInfo> { }

export const adapter: EntityAdapter<MapClickInfo> = createEntityAdapter<MapClickInfo>({
  selectId: (mapClickInfo: MapClickInfo) => mapClickInfo.layerId,
  sortComparer: false
});

export function mapClickReducer(state = adapter.getInitialState(), action: MapClickActionsUnion): MapClickState {
  switch (action.type) {
    case MapClickActionTypes.SET_MAP_CLICK_INFO:
      const id = action.payload.layerId;
      if (id in state.ids) {
        state = adapter.removeOne(id, state);
      }
      return adapter.addOne(action.payload, state);
    case MapClickActionTypes.CLEAR_MAP_CLICK_INFO:
      return adapter.removeOne(action.payload, state);
    default:
      return state;
  }
}

export const {
  selectIds: selectMapClickIds,
  selectEntities: selectMapClickEntities,
  selectAll: selectAllMapClicks,
  selectTotal: selectMapClickTotal,
} = adapter.getSelectors();
