import { DrawType } from "../../core/base/Constants";
import { DrawAction } from "./DrawAction.js";

class DrawGatherSpotAction extends DrawAction {
    constructor(options) {
        super(options);
        this._type = DrawType.GATHER_SPOT
    }

    _mounted() {
    }


    _onVertexAdded(position) {
    }

    _onDrawCompleted(position) {
    }
}



export { DrawGatherSpotAction };
