import { JSHelper } from "../../libs/JSHelper.js";
import { EntityLayer } from "../../source/core/layer/Entitylayer.js";
import { DEFAULT_PLOT_STYLE, DrawType, EnumState } from "../core/base/Constants";
import { DrawEvent } from "../core/event/DrawEvent.js";
import { DrawEventType, MouseEventType } from "../core/event/EventType";
import { DrawCircleAction } from "./DrawAction/DrawCircleAction.js";
import { DrawGatherSpotAction } from "./DrawAction/DrawGatherSpotAction.js";
import { DrawPointAction } from "./DrawAction/DrawPointAction.js";
import { DrawPolygonAction } from "./DrawAction/DrawPolygonAction";
import { DrawPolylineAction } from "./DrawAction/DrawPolylineAction.js";
import { DrawRectangleAction } from "./DrawAction/DrawRectangleAction.js";
import { DrawStraightArrowAction } from "./DrawAction/DrawStraightArrowAction.js";
import { DrawTailedSharpStraightArrowAction } from "./DrawAction/DrawTailedSharpStraightArrowAction.js";
import { DrawTextAction } from "./DrawAction/DrawTextAction.js";
import { Interaction } from "./Interaction.js";


/**
 *
 * @summary 绘制工具
 * 
 * @extends {Interaction}
 */
class DrawTool extends Interaction {
    // _map
    _activeAction
    _layer;
    _tempLayer;
    _floatingAnchor = undefined;
    _event = new DrawEvent();
    _style;

    /**
     * 绘制样式
     *
     * @memberof DrawTool
     */
    get style() {
        return this._style;
    }
    set style(value) {
        this._style = value;
    }



    /**
     * 当前绘制指令
     *
     * @readonly
     * @memberof DrawTool
     */
    get activeAction() {
        return this._activeAction;
    }


    // /**
    //  * 所属地图实例
    //  *
    //  * @readonly
    //  * @memberof DrawTool
    //  */
    // get map() {
    //     return this._map;
    // }


    /**
     * 绘制类型
     *
     * @readonly
     * @memberof DrawTool
     */
    get type() {
        return this._activeAction?.type
    }


    /**
     * 承载绘制结果的临时图层
     *
     * @readonly
     * @memberof DrawTool
     */
    get layer() {
        return this._layer;
    }

    get event() {
        return this._event;
    }

    /**
     * 
     * @param {Object} options 配置项
     * @param {EntityLayer} [options.layer] 绘制图层
     * @param {Object} [options.style] 绘制样式 
     * 
     * 
     *  @example
     * style示例:
     * {
     *  anchor: {
     *      size: 8,
     *      color: [245, 122, 122, 1],
     *      outlineColor: [255, 255, 255, 1],
     *      outlineWidth: 2
     *      },
     *  polygon: {
     *      color:  [255, 255, 0, 0.4]
     *  }
     *
     * @constructor
     */
    constructor(options) {
        super(options);
        this._interactionType = "draw"
        // //绘制图层
        // this._layer = options.layer || new EntityLayer({
        //     name: "plotLayer"
        // })
        this.style = options.style || JSHelper.DeepClone(DEFAULT_PLOT_STYLE);
        this._event.on(DrawEventType.DRAW_MOUNETD, this._onMounted, this);
        this._event.on(DrawEventType.DRAW_UNMOUNTED, this._onUnmounted, this);
    }


    /**
     * 激活绘制工具
     *
     * @param {String} type 绘制类型，可选值："point", "polyline","polygon","rectangle","circle","straight_arrow","gather_spot","tailed_sharp_straight_arrow"
     * @return {Boolean} 
     * @memberof DrawTool
     * 
     * @see DrawType
     */
    activate(type) {
        if (!this._map)
            return false;

        if (Object.values(DrawType).indexOf(type) == -1 || type == this._activeAction?.type)
            return false;

        //灭活其他交互组件
        Object.values(this.map._interactions).forEach(interaction => {
            if (interaction && interaction._interactionType != this._interactionType) {
                interaction.deactivate();
            }
        });

        //停止当前action
        if (this._activeAction)
            this._activeAction.stop();

        //重绑事件
        this._unSubscribeEvents();
        this._subscribeEvents();

        this._activeAction = this._createDrawAction(type);
        this._activeAction.start();

        return true
    }


    /**
     * 失活当前绘制工具
     *
     * @return {*} 
     * @memberof DrawTool
     */
    deactivate() {
        if (!this._map)
            return;

        this._unSubscribeEvents();
        this._activeAction?.stop();
        this._activeAction = undefined;

        //清空锚点
        this._tempLayer.removeAll();
        this._floatingAnchor = undefined;
    }



    /**
     * 订阅绘制事件
     *
     * @param {String} type 事件名，可选值："draw_start"、"draw_complete"
     * @param {Function} listener 事件处理函数
     * @param {Object|undefined} [context=this] this上下文
     * @memberof DrawTool
     * 
     * @see DrawEventType
     */
    on(type, listener, context = this) {
        this._event.on(type, listener, context || this);
    }

    /**
      * 取消绘制事件订阅
      *
      * @param {String} type 事件名，可选值："draw_start"、"draw_complete"
      * @param {Function} listener 事件处理函数
      * @param {Object|undefined} [context=this] this上下文
      * @memberof DrawTool
      * 
      *  @see DrawEventType
      */
    off(type, listener, context = this) {
        this._event.off(type, listener, context || this);
    }


    /**
     * 清除标绘
     *
     * @memberof DrawTool
     */
    clear() {
        this.layer.clear();
        this._tempLayer.removeAll();
    }


    destrory() {
        this.deactivate();
        this.clear();
    }

    _subscribeEvents() {
        this._map.mouseEvent.on(MouseEventType.CLICK, this._onMouseClicked, this);
        this._map.mouseEvent.on(MouseEventType.DOUBLE_CLICK, this._onMouseDbClicked, this);
        this._map.mouseEvent.on(MouseEventType.MOUSE_MOVE, this._onMouseMoving, this);
    }

    _unSubscribeEvents() {
        this._map.mouseEvent.off(MouseEventType.CLICK, this._onMouseClicked, this);
        this._map.mouseEvent.off(MouseEventType.DOUBLE_CLICK, this._onMouseDbClicked, this);
        this._map.mouseEvent.off(MouseEventType.MOUSE_MOVE, this._onMouseMoving, this);
    }

    _onMounted(map) {
        this._map = map;

        if (this._layer.state != EnumState.ADDED)
            this._map.addLayer(this._layer);
        //锚点图层
        this._tempLayer = this._map.graphics;
    }

    _onUnmounted() {
        this.deactivate();
        this._map = undefined;
    }

    _onMouseClicked(e) {
        if (!e.surfacePosition)
            return;

        let position = e.surfacePosition.clone();
        this._activeAction._onVertexAdded(position);

        // if (!this._floatingAnchor)
        //     this._floatingAnchor = this._onCreateAnchor(position, true)
    }

    _onMouseDbClicked(e) {
        if (!e.surfacePosition)
            return;
        let position = e.surfacePosition.clone();
        this._activeAction._onDrawCompleted(position);
    }

    _onMouseMoving(e) {
        if (!e.surfacePosition)
            return;
        let position = e.surfacePosition.clone();
        //更新锚点
        // if (this._activeAction.isDrawing)
        this._activeAction._onCursourUpdated(position);
    }

    _createDrawAction(type, symbol) {
        switch (type) {
            case DrawType.POINT:
                return new DrawPointAction({
                    map: this._map,
                    drawTool: this
                })
            case DrawType.POLYLINE:
                return new DrawPolylineAction({
                    map: this._map,
                    drawTool: this
                })
            case DrawType.POLYGON:
                return new DrawPolygonAction({
                    map: this._map,
                    drawTool: this
                });

            case DrawType.RECTANGLE:
                return new DrawRectangleAction({
                    map: this._map,
                    drawTool: this
                })

            case DrawType.CIRCLE:
                return new DrawCircleAction({
                    map: this._map,
                    drawTool: this
                })
            case DrawType.STRAIGHT_ARROW:
                return new DrawStraightArrowAction({
                    map: this._map,
                    drawTool: this
                })
            case DrawType.TAILED_SHARP_STRAIGHT_ARROW:
                return new DrawTailedSharpStraightArrowAction({
                    map: this._map,
                    drawTool: this
                })
            case DrawType.GATHER_SPOT:
                return new DrawGatherSpotAction({
                    map: this._map,
                    drawTool: this
                })
            case DrawType.TEXT:
                return new DrawTextAction({
                    map: this._map,
                    drawTool: this
                })
            default:
                throw new Error(`creae action failed:invalid draw type->${type}`)
        }
    }

    _onCreateAnchor({ position, isTemp, createPoint = true }) {
    }

    _updateAnchor(position) {

    }
}

export { DrawTool };
