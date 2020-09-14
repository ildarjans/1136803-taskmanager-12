import Observer from "../utils/observer.js";
import {FilterType} from "../consts.js";

export default class FiltersModel extends Observer {
  constructor() {
    super();
    this._applyFilter = FilterType.ALL;
  }

  getFilter() {
    return this._applyFilter;
  }

  setFilter(updateType, filter) {
    this._applyFilter = filter;
    this._notify(updateType, filter);
  }

}
