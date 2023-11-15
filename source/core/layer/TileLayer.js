import { JSHelper } from "../../../libs/JSHelper.js";
import { LayerType } from "../base/Constants.js";
import { ImageryLayer } from "./ImageryLayer.js";


/**
 * 渲染栅格瓦片的通用图层
 * 
 * @param {Object} options 配置项
 * @param {String} options.url 瓦片链接
 * @param {String} [options.tileType="normal"] 瓦片类型,可选值："normal","tms","bd"
 * @param {Interger} [options.lodMinLevel=2] LOD最小层级
 * @param {Interger} [options.lodMaxLevel=20] LOD最大层级
 * @param {Array.<Number>} [options.extent] 覆盖范围
 * @param {String} [options.id] 图层id
 * @param {String} [options.name=options.id] 图层名
 * @param {Number} [options.alpha=1.0] 图层透明度，取值范围：[0,1]
 * @param {Boolean} [options.correct=undefined] 是否应用纠偏处理。仅对gaode-xxx、baidu-xxx有效
 * @param {Integer} [options.priority=2] 图层优先级,可选值：0、1、2. 0为最高优先级
 *
 * @class TileLayer
 * @extends {ImageryLayer}
 */
class TileLayer extends ImageryLayer {
    get url() {
    }

    get tileType() {
    }


    constructor(options = {}) {
        super(options);
        this._type = LayerType.TILE_LAYER;
        createImageryProvider(options);
    }

    toJSON() {
    }
}


function createImageryProvider(options) {
    const levels = [
        JSHelper.IsInteger(options.lodMinLevel) ? options.lodMinLevel : 2,
        JSHelper.IsInteger(options.lodMaxLevel) ? options.lodMaxLevel : 20,
    ]
    const type = options.tileType || "normal";
    switch (type) {
        case "normal":
            break;
        case "tms":
            break;
        case "bd":
            break;
        default:
            throw new Error(`unsupported tile type:${type}`)
    }
}

export { TileLayer };
