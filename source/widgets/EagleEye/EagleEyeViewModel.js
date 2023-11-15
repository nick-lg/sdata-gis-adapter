import { WidgetViewModel } from "../WidgetViewModel.js"
import { MapEventType } from "../../index.js";
import { JSHelper } from "../../../libs/JSHelper.js";

import * as L from "leaflet";
import "leaflet/dist/leaflet.css"

// 鹰眼ViewModel。(限于2.5D地图范围计算的跳变性，暂不支持2.5D鹰眼)
class EagleEyeViewModel extends WidgetViewModel {
    //二维地图容器ID
    map2DContainerID;

    //二维地图对象
    #map2D;
    #rectangle;
    #indicatorStyle;

    #Map2DContainerVisibleDisplay;

    get strokeColor() {
        return this.#indicatorStyle.show.color;
    }
    get strokeOpacity() {
        return this.#indicatorStyle.show.opacity;
    }

    get fillColor() {
        return this.#indicatorStyle.show.fillColor;
    }
    get fillOpacity() {
        return this.#indicatorStyle.show.fillOpacity;
    }

    get strokeWidth() {
        return this.#indicatorStyle.show.weight;
    }

    get eagleEyeMap() {
        return this.#map2D;
    }


    constructor(options) {
        super(options);
    }

    #mapviewLoaded(map) {

    }

    //限于2.5D地图范围计算精度问题，暂不支持2.5D鹰眼
    #sceneModeChanged(eventArg) {

    }


    //同步视图(仅对2D/3D模式有效)
    #synchronizeView(eventArg) {

    }
    destrory() {
    }
}

export { EagleEyeViewModel }