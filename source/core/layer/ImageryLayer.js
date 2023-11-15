

import { Layer, queueLayer } from "./Layer.js";
import { LayerType, EnumState } from "../base/Constants.js"


/**
 * @summary 影像图层
 *
 * @extends {Layer}
 */
class ImageryLayer extends Layer {
    #icon;//图标
    _isBaseLayer = false;//标识是否是底图图层

    /**
     * 不透明度
     *
     * @memberof ImageryLayer
     */
    get alpha() {
    }
    set alpha(value) {
    }


    /**
     * 标识是否是底图图层
     *
     * @readonly
     * @memberof ImageryLayer
     */
    get isBaseLayer() {
    }

    get icon() {
    }


    /**
     * 
     * @param {Object} options 配置项
     * @param {Cesium.ImageryProvider} imageryProvider  Cesium.ImageryProvider实例
     * @param {String} [options.id] 图层id
     * @param {String} [options.name=options.id] 图层名
     * @param {Number} [options.alpha=1.0] 图层透明度，取值范围：[0,1],
     * @param {Array.<Number>} [options.extent] 覆盖范围
     * 
     * @constructor
     */
    constructor(options) {
        super(options);
        this._type = LayerType.IMAGERY_LAYER;
    }

    toJSON() {
    }

    _setVisible(flag) {
    }

    _onAdded(map) {
    }

    _onRemoved(map) {
    }
}

export { ImageryLayer };