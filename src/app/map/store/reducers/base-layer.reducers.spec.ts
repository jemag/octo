/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {AddBaseLayer, SetCurrentBaseLayer} from '../actions/base-layer.actions';
import * as fromBaseLayer from './base-layer.reducers';
import {baseLayerReducer} from './base-layer.reducers';
import {BingLayer} from '@app/shared/models';

describe('BaseLayerReducer', () => {

  it('should return default state when no state and no action passed', () => {
    expect(baseLayerReducer(undefined, <any>{})).toEqual(fromBaseLayer.initialState);
  });

  it('should have immutable payload', () => {
    const layer = new BingLayer();
    layer.id = 1;
    const action = new SetCurrentBaseLayer(layer);
    const finalState = baseLayerReducer(fromBaseLayer.initialState, action);
    layer.code = 'test-code';
    expect(finalState.currentBaseLayer).not.toEqual(layer);
  });

  it('should add layer to state.baseLayers', () => {
    const layer = new BingLayer();
    layer.id = 1;
    const action = new AddBaseLayer(layer);
    const finalState = baseLayerReducer(fromBaseLayer.initialState, action);
    const finalLayers = getArrayFromEntities(finalState.entities);
    expect(finalState.currentBaseLayer).toEqual(null);
    expect(finalLayers).toEqual([layer]);
  });

  it('should set currentBaseLayer in state', () => {
    const layer = new BingLayer();
    layer.id = 1;
    const action = new SetCurrentBaseLayer(layer);
    const finalState = baseLayerReducer(fromBaseLayer.initialState, action);
    expect(finalState.currentBaseLayer).toEqual(layer);
  });

});

function getArrayFromEntities(entities) {
  return Object.keys(entities).map(id => entities[id]);
}
