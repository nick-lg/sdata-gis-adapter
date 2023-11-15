import { DrawType } from "../../core/base/Constants";
import { DrawAction } from "./DrawAction.js";

class DrawStraightArrowAction extends DrawAction {
    constructor(options) {
        super(options);
        this._type = DrawType.STRAIGHT_ARROW
    }

    _mounted() {
    }


    _onVertexAdded(position) {

    }

    _onDrawCompleted(position) {
    }
}

export { DrawStraightArrowAction };
