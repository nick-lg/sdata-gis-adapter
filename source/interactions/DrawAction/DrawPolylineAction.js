import { CesiumHelper } from "../../../libs/CesiumHelper";
import { DEFAULT_PLOT_STYLE, DrawType } from "../../core/base/Constants";
import { DrawEventType } from "../../core/event/EventType";
import { DrawAction } from "./DrawAction.js";

class DrawPolylineAction extends DrawAction {

    _latestMeasureAnchor;


    constructor(options) {
        super(options);
        this._type = DrawType.POLYLINE
    }
    _mounted() {
    }

    _onVertexAdded(position) {
    }


    _onDrawCompleted(position) {
    }
}

export { DrawPolylineAction }