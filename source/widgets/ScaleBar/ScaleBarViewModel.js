// import Cesium from "../../../libs/Cesium/Cesium.js";
import { JSHelper } from "../../../libs/JSHelper.js";
import { MapEventType } from "../../index.js";
import { WidgetViewModel } from "../WidgetViewModel.js"


const distances = [
    1, 2, 3, 5,
    10, 20, 30, 50,
    100, 200, 300, 500,
    1000, 2000, 3000, 5000,
    10000, 20000, 30000, 50000,
    100000, 200000, 300000, 500000,
    1000000, 2000000, 3000000, 5000000,
    10000000, 20000000, 30000000, 50000000]

class ScaleBarViewModel extends WidgetViewModel {


    barWidth;//比例尺宽度
    distanceLabel;//距离
    enabled = true;//启用标识


    _lastUpdateTimeStamp;//上次更新时间
    _now;
    _updateInterval = 250;//更新间隔
    _geodesic = new Cesium.EllipsoidGeodesic()
    constructor(options) {
        super(options);

        this.#subscibeEvent();
    }

    #subscibeEvent() {
    }




    destrory() {

    }
}

export { ScaleBarViewModel }