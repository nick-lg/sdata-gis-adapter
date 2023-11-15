import { DrawType } from "../../core/base/Constants";
import { DrawAction } from "./DrawAction.js";

class DrawRectangleAction extends DrawAction {
    constructor(options) {
        super(options);
        this._type = DrawType.RECTANGLE
    }

    _mounted() {
    }


    _onVertexAdded(position) {
    }

    _onDrawCompleted(position) {
    }
}

export { DrawRectangleAction };
