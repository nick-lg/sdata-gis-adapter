import { CesiumHelper } from "../../../libs/CesiumHelper";
import { JSHelper } from "../../../libs/JSHelper";
import { EnumState, LayerType, TargetType } from "../base/Constants";
import { ImageryProviderFactory } from "../datasource/imagery/ImageryProviderFactory";
import { MapEventType } from "../event/EventType";
import { ImageryLayer } from "./ImageryLayer.js";
import { queueLayer } from "./Layer";

/**
 * WMS服务图层
 * 
 * @param {Object} options 配置项
 * @param {String} options.url wms服务链接
 * @param {String} [options.id=GUID] 图层id
 * @param {String} [options.name=options.id] 图层名
 * @param {String} [options.cql_filter] 过滤条件
 * @param {String} [options.styles] 渲染样式
 * @param {Boolean} [options.pickable] 拾取开关
 * @param {String} [options.geometryField] 几何字段名
 * @param {Boolean} [options.renderMode] 渲染模式,可选值："tiled"、"single-tile"(默认2D启用且仅对2D有效)
 * @param {Integer} [options.priority=2] 图层优先级,可选值：0、1、2. 0为最高优先级
 * @param {Array<Number>} [options.extent] 范围,形如[xmin,ymin,xmax,ymax]
 *     
 *
 * @class WMSLayer
 * @extends {ImageryLayer}
 */
class WMSLayer extends ImageryLayer {
    /**
     * 要素筛选条件
     *
     * @memberof WMSLayer
     */
    get filter() {
    }
    set filter(value) {
    }

    /**
     * 要素渲染样式
     *
     * @memberof WMSLayer
     */
    get styles() {
    }
    set styles(value) {
    }



    /**
    *  不透明度
    *
    * @memberof WMSLayer
    */
    get alpha() {
    }
    set alpha(value) {
    }


    /**
     * wms服务链接
     *
     * @readonly
     * @memberof WMSLayer
     */
    get url() {
    }

    /**
     *是否支持要素拾取
     *
     * @memberof WMSLayer
     */
    get pickable() {
    }
    set pickable(value) {
    }

    get geometryField() {
    }
    set geometryField(value) {
    }



    /**
     * 渲染模式
     *
     * @readonly
     * @memberof WMSLayer
     */
    get renderMode() {

    }




    constructor(options) {
        super(innerOptions);
        this._type = LayerType.WMS_LAYER
    }


    /**
     * 获取指定字段的所有值 
     *
     * @param {String} field
     * @return {Promise.<Array>} 
     * @memberof WMSLayer
     */
    getFieldValues(field) {
    }

    /**
     * 拾取要素
     * 
     * @param {Object} wp 窗口坐标,形如 {x:95,y:27}
    //  * @param {*} options
     * @return {Promise|undefined} 
     * @memberof WMSLayer
     */
    pickFeatures(wp, options) {
    }



    /**
     *
     *
     * @memberof WMSLayer
     */
    clear() {
    }


    /**
     * 刷新图层
     *
     * @memberof WMSLayer
     */
    async refresh() {
    }

    toJSON() {

    }


    /**
    * 获取图层数据范围
    *
    * @return {Promise<Array|undefined>} 
    * 
    * @memberof WMSLayer
    */
    async getDataExtentAsync() {
    }

    _onAdded(map) {
    }


    _onRemoved(map) {
    }

    _setVisible(flag) {
    }
}

export { WMSLayer }