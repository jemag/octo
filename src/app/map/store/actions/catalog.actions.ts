import {Action} from '@ngrx/store';
import {Category} from '@app/shared/models';
import {CatalogSelectedLayer} from '@app/shared/models';
import {Topic} from '@app/shared/models';
import {TopicGroup} from '@app/shared/models';

export enum CatalogActionTypes {
  FETCH_TOPIC_GROUP = '[Catalog] Fetch topic group',
  SET_TOPIC_GROUP = '[Catalog] Set topic group',
  FETCH_TOPIC = '[Catalog] Fetch topic',
  FETCH_TOPIC_FOR_CODE = '[Catalog] Fetch topic for code',
  APPEND_TOPIC = '[Catalog] Append topic',
  SET_TOPIC_EXPANDED = '[Catalog] Set topic expanded',
  FETCH_CATEGORY_HIERARCHY = '[Catalog] Fetch category hierarchy',
  SET_CATEGORIES = '[Catalog] Set categories',
  UPDATE_CATEGORY = '[Catalog] Update category',
  ADD_SELECTED_LAYER = '[Catalog] Add selected layer',
  REMOVE_SELECTED_LAYER = '[Catalog] Remove selected layer',
}

/**
 * Trigger an effect to fetch a topic group
 *
 * @export
 * @class FetchTopicGroup
 * @implements {Action}
 */
export class FetchTopicGroup implements Action {
  readonly type = CatalogActionTypes.FETCH_TOPIC_GROUP;

  /**
   * Creates an instance of FetchTopicGroup.
   * @param {number} payload - The id of the topic group in mapapi
   * @memberof FetchTopicGroup
   */
  constructor(public payload: { languageCode: string, code: string }) {
  }
}

/**
 * Use the reducer to store the FetchTopicGroup result
 *
 * @export
 * @class SetTopicGroup
 * @implements {Action}
 */
export class SetTopicGroup implements Action {
  readonly type = CatalogActionTypes.SET_TOPIC_GROUP;

  /**
   * Creates an instance of SetTopicGroup.
   * @param {TopicGroup} payload - The TopicGroup result from mapapi
   * @memberof SetTopicGroup
   */
  constructor(public payload: TopicGroup) {
  }
}

/**
 * Fetch a topic using its id and then append it to the list of topics
 *
 * @export
 * @class FetchTopic
 * @implements {Action}
 */
export class FetchTopic implements Action {
  readonly type = CatalogActionTypes.FETCH_TOPIC;

  /**
   * Creates an instance of FetchTopic.
   * @param {number} payload - The id of the topic in mapapi
   * @memberof FetchTopic
   */
  constructor(public payload: number) {
  }
}

/**
 * Fetch a topic using its code and language-code and then append it to the list of topics
 *
 * @export
 * @class FetchTopicForCode
 * @implements (Action)
 */
export class FetchTopicForCode implements Action {
  readonly type = CatalogActionTypes.FETCH_TOPIC_FOR_CODE;

  constructor(public payload: { languageCode: string, code: string }) {
  }
}

/**
 * Append the result of FetchTopic to the reducer
 *
 * @export
 * @class AppendTopic
 * @implements {Action}
 */
export class AppendTopic implements Action {
  readonly type = CatalogActionTypes.APPEND_TOPIC;

  /**
   * Creates an instance of AppendTopic.
   * @param {Topic} payload - The Topic result from mapapi
   * @memberof AppendTopic
   */
  constructor(public payload: Topic) {
  }
}

/**
 * Set a topic to expanded for display in the UI, trigger an action to fetch
 * the category hierarchy.
 *
 * @export
 * @class SetTopicExpanded
 * @implements {Action}
 */
export class SetTopicExpanded implements Action {
  readonly type = CatalogActionTypes.SET_TOPIC_EXPANDED;

  /**
   * Creates an instance of SetTopicExpanded.
   * @param {{
     *         topicIndex: number, - The index of the topic in the reducer topic
     *                               list
     *         expanded: boolean - The new expanded setting for the target topic
     *     }} payload
   * @memberof SetTopicExpanded
   */
  constructor(public payload: {
    topicIndex: number,
    expanded: boolean
  }) {
  }
}

/**
 * Trigger an effect to fetch the category hierarchy from mapapi
 *
 * @export
 * @class FetchCategoryHierarchy
 * @implements {Action}
 */
export class FetchCategoryHierarchy implements Action {
  readonly type = CatalogActionTypes.FETCH_CATEGORY_HIERARCHY;

  /**
   * Creates an instance of FetchCategoryHierarchy.
   * @param {number} payload - The index of the topic in the reducer topic list
   * @memberof FetchCategoryHierarchy
   */
  constructor(public payload: number) {
  }
}

/**
 * Use the reducer to store the result of the FetchCategoryHierarchy effect in
 * the relevant topic in the reduceer
 *
 * @export
 * @class SetCategories
 * @implements {Action}
 */
export class SetCategories implements Action {
  readonly type = CatalogActionTypes.SET_CATEGORIES;

  /**
   * Creates an instance of SetCategories.
   * @param {{
     *         topicId: number, - The id of the topic in mapapi
     *         category: Category - The category hierarchy result from mapapi
     *     }} payload
   * @memberof SetCategories
   */
  constructor(public payload: {
    topicId: number,
    category: Category
  }) {
  }
}

/**
 * Update a category that's nested in the category hierarchy
 *
 * @export
 * @class UpdateCategory
 * @implements {Action}
 */
export class UpdateCategory implements Action {
  readonly type = CatalogActionTypes.UPDATE_CATEGORY;

  /**
   * Creates an instance of UpdateCategory.
   * @param {{
     *         treeLocation: number[], - The list of indices for traversing into
     *                                   the category hierarchy to access the
     *                                   category to be replaced.
     *         newCategory: Category - The replacement category to be used
     *     }} payload
   * @memberof UpdateCategory
   */
  constructor(public payload: {
    treeLocation: number[],
    newCategory: Category
  }) {
  }
}

/**
 * Add a SelectedLayer to the selectedLayer list in the reducer. This list is
 * used to track the treeLocations of the categories for currently
 * selected layers so that they can be easily updated and modified based on
 * their unique layerid.
 *
 * @export
 * @class AddSelectedLayer
 * @implements {Action}
 */
export class AddSelectedLayer implements Action {
  readonly type = CatalogActionTypes.ADD_SELECTED_LAYER;

  /**
   * Creates an instance of AddSelectedLayer.
   * @param {CatalogSelectedLayer} payload - The CataLogSelectedLayer to add
   * @memberof AddSelectedLayer
   */
  constructor(public payload: CatalogSelectedLayer) {
  }
}

/**
 * Remove a SelectedLayer from the selectedLayer list in the reducer
 *
 * @export
 * @class RemoveSelectedLayer
 * @implements {Action}
 */
export class RemoveSelectedLayer implements Action {
  readonly type = CatalogActionTypes.REMOVE_SELECTED_LAYER;

  /**
   * Creates an instance of RemoveSelectedLayer.
   * @param {string} payload - The unique layerid of the selectedLayer entry
   *                           to be removed
   * @memberof RemoveSelectedLayer
   */
  constructor(public payload: string) {
  }
}

export type CatalogActionsUnion =
  FetchTopicGroup |
  FetchTopicForCode |
  SetTopicGroup |
  FetchTopic |
  AppendTopic |
  SetTopicExpanded |
  FetchCategoryHierarchy |
  SetCategories |
  UpdateCategory |
  AddSelectedLayer |
  RemoveSelectedLayer;
