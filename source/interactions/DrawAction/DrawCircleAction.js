import { CesiumHelper } from "../../../libs/CesiumHelper";
// import { JSHelper } from "../../../libs/JSHelper";
import { DEFAULT_PLOT_STYLE, DrawType } from "../../core/base/Constants";
import { DrawEventType } from "../../core/event/EventType";
import { DrawAction } from "./DrawAction.js";

class DrawCircleAction extends DrawAction {
    constructor(options) {
        super(options);
        this._type = DrawType.CIRCLE
    }

    _mounted() {

    }


    _onVertexAdded(position) {

    }

    _onDrawCompleted(position) {

    }
}

export { DrawCircleAction }