import { DrawType } from "../../core/base/Constants";
import { DrawAction } from "./DrawAction.js";

class DrawPolygonAction extends DrawAction {
    constructor(options) {
        super(options);
        this._type = DrawType.POLYGON
    }
    _mounted() {
    }

    _onVertexAdded(position) {
    }

    _onDrawCompleted(position) {
    }

    //计算粗略面积
    _getArea() {
    }

    _getCenter() {
    }
}

export { DrawPolygonAction };
