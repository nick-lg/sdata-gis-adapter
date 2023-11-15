import { JSHelper } from "../../../libs/JSHelper";
import { EnumState, LayerType } from "../base/Constants";
import { GeoJSONHelper } from "../datasource/vector/GeoJSONHelper";
import { Layer } from "./Layer";
import { LayerEventType } from "../event/EventType";

const STYLES = {
    point: {
        type: "simple-marker",
        size: 12,
        color: "rgba(255, 0, 0, 1)",
        outlineColor: "rgba(255,255,0,1)",
        outlineWidth: 1,
    },
    polyline: {
        width: 2,
        color: "rgba(252, 128, 70, 1)"
    },
    polygon: {
        // fill: "rgba(255, 255, 0, 0.2)",
        outlineColor: "rgba(245, 122, 122, 1)",
        outlineWidth: 2
    },
}


/**
 *
 * GeoJSON文件图层
 *
 * @param {Object} [options={}] 配置项
 * @param {String} [options.id=GUID] 图层id
 * @param {String} [options.name=options.id] 图层名
 * @param {Object} [options.styles={}] 样式配置
 * @param {Boolean} [options.clampToGround=false] 是否贴地
 * 
 * 
 * @example
 * 
 * const options={
 *   url: "./340000_full.json",
 *   styles: {
 *       point: {
 *           type: "simple-marker",
 *           size: 12,
 *           color: "rgba(255, 0, 0, 1)",
 *           outlineColor: "rgba(0,255,0,1)",
 *           outlineWidth: 2
 *       },
 *       polyline: {
 *           width: 1,
 *           color: "rgba(252, 128, 70, 1)"
 *       },
 *       polygon: {
 *           fill: "rgba(255, 255, 0, 0.2)",
 *           outlineColor: "rgba(245, 122, 122, 1)",
 *    };
 * }
 * const layer=new GeoJSONLayer(options);
 * 
 * 
 * @class GeoJSONLayer
 * @extends {Layer}
 * 
 */
class GeoJSONLayer extends Layer {
    /**
     * geojson文件链接
     *
     * @readonly
     * @memberof GeoJSONLayer
     */
    get url() {
    }


    /**
     * 标识数据是否加载完毕
     *
     * @readonly
     * @memberof GeoJSONLayer
     */
    get isLoaded() {
    }


    /**
     * 样式
     *
     * @readonly
     * @memberof GeoJSONLayer
     */
    get styles() {
    }

    /**
     * 要素集
     *
     * @readonly
     * @memberof GeoJSONLayer
     */
    get features() {
    }

    constructor(options = {}) {
        super(options)
    }



    /**
     * 获取指定id的要素
     *
     * @param {String} id 要素id
     * @return {Cesium.Entity|undefined} 
     * @memberof GeoJSONLayer
     */
    get(id) {
    }


    /**
     * 清除图层
     *
     * @memberof GeoJSONLayer
     */
    clear() {
    }

    each(func, context) {
    }

    _onAdded(map) {
    }

    _onRemoved(map) {
    }

    _setVisible(flag) {
    }

    #loadGeoJSON(url) {
    }
}

export { GeoJSONLayer }