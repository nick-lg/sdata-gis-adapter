import { DrawType } from "../../core/base/Constants";
import { DrawAction } from "./DrawAction.js";

class DrawPointAction extends DrawAction {
    constructor(options) {
        super(options);
        this._type = DrawType.POINT
    }

    _mounted() {
    }

    _onVertexAdded(position) {
    }
    _onCursourUpdated(position) {
    }

    _onDrawCompleted(position) {
    }
}

export { DrawPointAction };
