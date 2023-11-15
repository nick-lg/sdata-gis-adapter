import { DrawType } from "../../core/base/Constants";
import { DrawPointAction } from "./DrawPointAction";

class DrawTextAction extends DrawPointAction {
    constructor(options) {
        super(options);
        this._type = DrawType.TEXT
    }

    _mounted() {
    }

    _onVertexAdded(position) {
    }


    _onDrawCompleted(position) {
    }
}

export { DrawTextAction };
