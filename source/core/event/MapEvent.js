import { Event } from "./Event.js";

import { MapEventType } from "./EventType.js"

/**
 * @summary 地图事件。请勿自行创建该类实例
 * @see MapEventType
 * @extends {Event}
 */
class MapEvent extends Event {
    #viewer;
    constructor(viewer) {
        super();
        this.#viewer = viewer;
        this._init();
    }
    _init() {
    }
}

export { MapEvent }