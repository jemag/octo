/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {CatalogActionsUnion, CatalogActionTypes} from '../actions/catalog.actions';
import {TopicGroup} from '@app/shared/models';
import {Topic} from '@app/shared/models';
import {CatalogSelectedLayer} from '@app/shared/models';
import Utils from '@app/map/utils/category.util';

export interface CatalogState {
  topicGroup: TopicGroup;
  topics: Topic[];
  selectedLayers: CatalogSelectedLayer[];
}

export const initialState: CatalogState = {
  topicGroup: new TopicGroup(-1, 'placeholder', null, []),
  topics: [],
  selectedLayers: []
};

// TODO: Use cloneDeep when object has multiple nesting levels
export function catalogReducer(state: CatalogState = initialState, action: CatalogActionsUnion): CatalogState {
  switch (action.type) {
    case CatalogActionTypes.SET_TOPIC_GROUP:
      return {
        ...state,
        topicGroup: (<any>action).payload
      };
    case CatalogActionTypes.APPEND_TOPIC:
      const topics: Topic[] = [...state.topics, (<any>action).payload];
      return {
        ...state,
        topics: topics
      };
    case CatalogActionTypes.SET_TOPIC_EXPANDED:
      const topic: Topic = <Topic>{...state.topics[(<any>action).payload.topicIndex]};
      topic.expanded = (<any>action).payload.expanded;

      const oldTopics: Topic[] = [...state.topics];
      oldTopics[(<any>action).payload.topicIndex] = topic;
      return {
        ...state,
        topics: oldTopics
      };
    case CatalogActionTypes.SET_CATEGORIES:
      let idToUpdate = -1;
      for (let i = 0; i < state.topics.length; i++) {
        if (state.topics[i].id === (<any>action).payload.topicId) {
          idToUpdate = i;
          break;
        }
      }
      const updatedTopic: Topic = <Topic>{
        ...state.topics[idToUpdate],
        category: (<any>action).payload.category
      };
      const updatedTopics: Topic[] = [...state.topics];
      updatedTopics[idToUpdate] = updatedTopic;
      return {
        ...state,
        topics: updatedTopics
      };
    case CatalogActionTypes.UPDATE_CATEGORY:
      const updatedTopicList = Utils.updateCategory(
        state,
        (<any>action).payload.treeLocation,
        (<any>action).payload.newCategory
      );
      return {
        ...state,
        topics: updatedTopicList
      };
    case CatalogActionTypes.ADD_SELECTED_LAYER:
      return <any>{
        ...state,
        selectedLayers: [...state.selectedLayers, (<any>action).payload]
      };
    case CatalogActionTypes.REMOVE_SELECTED_LAYER:
      const selectedLayers = [...state.selectedLayers];
      for (let i = 0; i < selectedLayers.length; i++) {
        if (selectedLayers[i].layerUniqueId === (<any>action).payload) {
          const targetSelectedLayer = selectedLayers[i];
          selectedLayers.splice(i, 1);

          const tempTreeLoc = [...targetSelectedLayer.treeLocation];
          const topicId = tempTreeLoc.shift();
          const topicToUpdate: Topic = {...state.topics[topicId]};
          const categoryToUpdate = Utils.getCategory(
            topicToUpdate.category,
            tempTreeLoc
          );
          const newCategory = {
            ...categoryToUpdate,
            layerUniqueId: null,
            isChecked: false
          };
          const updatedTopicList_l = Utils.updateCategory(
            state,
            targetSelectedLayer.treeLocation,
            newCategory
          );
          return {
            ...state,
            topics: updatedTopicList_l
          };
        }
      }
      return {
        ...state,
        selectedLayers: selectedLayers
      };
    default:
      return state;
  }
}
