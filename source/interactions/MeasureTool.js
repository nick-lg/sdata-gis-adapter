import { MeasureType } from "../core/base/Constants";
import { DrawPolygonAction } from "./DrawAction/DrawPolygonAction";
import { DrawPolylineAction } from "./DrawAction/DrawPolylineAction.js";
import { DrawTool } from "./DrawTool.js";


/**
 * @summary 测量工具
 *
 * @extends {DrawTool}
 */
class MeasureTool extends DrawTool {

    #measureType;



    /**
     * 测量类型
     *
     * @readonly
     * @memberof MeasureTool
     */
    get type() {
        return this.#measureType;
    }



    /**
     * 
     * @param {Object} options 配置项
     * @param {EntityLayer} [options.layer] 绘制图层
     * @param {Object} [options.style] 测量样式 
     * 
     * 
     *  @example
     * //测量样式示例：
     * {
     *  anchor: {
     *      size: 8,
     *      color: [245, 122, 122, 1],
     *      outlineColor: [255, 255, 255, 1],
     *      outlineWidth: 2
     *      },
     *  polygon: {
     *      color:  [255, 255, 0, 0.4]
     *  },
     *  measurement: {
     *      font: "10px sans-serif",
     *      color: [136, 136, 136, 1],
     *      pixelOffset: [0, -32]
     *}
     * 
     *
     * @constructor
     */
    constructor(options) {
        super(options);
        this._interactionType = "measure";
    }


    _onMounted(map) {
    }


    /**
     * 激活测量工具
     *
     * @param {String} type 测量类型，可选值："distance","area"
     * @return {Boolean} 
     * @memberof MeasureTool
     * 
     * @see DrawType
     */
    activate(type) {
    }


    /**
     *清除量测
     *
     * @memberof MeasureTool
     */
    clear() {
    }


    /**
     *销毁量测工具
     *
     * @memberof MeasureTool
     */
    destrory() {
    }

    _createDrawAction(type, symbol) {
        switch (type) {
            case MeasureType.DISTANCE:
                return new DrawPolylineAction({
                    map: this._map,
                    drawTool: this,
                    enableMeasurement: true,
                });
            case MeasureType.AREA:
                return new DrawPolygonAction({
                    map: this._map,
                    drawTool: this,
                    enableMeasurement: true
                })
            default:
                throw new Error(`creae action failed:invalid measure type->${type}`)
        }
    }

    _onCreateAnchor({ position, isTemp, measureValue, parent, createPoint = true }) {
    }

    _updateAnchor(position) {
    }


    #getLengthString(length) {

    }

    #getAreaString(area) {
    }
}

export { MeasureTool };
