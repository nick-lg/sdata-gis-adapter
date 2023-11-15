import { DrawType } from "../../core/base/Constants";
import { DrawStraightArrowAction } from "./DrawStraightArrowAction";



class DrawTailedSharpStraightArrowAction extends DrawStraightArrowAction {
    constructor(options) {
        super(options);
        this._type = DrawType.TAILED_SHARP_STRAIGHT_ARROW
    }

    _mounted() {
    }
}

export { DrawTailedSharpStraightArrowAction };
