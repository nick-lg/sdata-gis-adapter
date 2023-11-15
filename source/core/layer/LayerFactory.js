import { LayerType } from "../base/Constants";
import { Layer } from "./Layer.js";
import { PointLayer } from "./PointLayer";
import { TileLayer } from "./TileLayer";
import { WMSLayer } from "./WMSLayer";
import { WMTSLayer } from "./WMTSLayer";
import { GeoJSONLayer } from "../..";





/**
 *
 *
 * @class LayerFactory
 */
class LayerFactory {

    /**
     * 创建指定类型图层
     *
     * @static
     * @param {String} type 图层类型，可选值：tile3d_layer、point_entity_layer、wms_layer、wmts_layer、tile_layer、geojson_layer
     * @param {Object} options 配置项
     * @return {Layer|undefined} 
     * @memberof LayerFactory
     */
    static async CreateAsync(type, options) {
        let layer;
        switch (type) {
            case LayerType.WMS_LAYER:
                layer = new WMSLayer(options);
                break;
            case LayerType.WMTS_LAYER:
                layer = new WMTSLayer(options);
                break;
            case LayerType.TILE_LAYER:
                layer = new TileLayer(options);
                break;
            case LayerType.POINT_LAYER:
                layer = new PointLayer(options);
                break;
            case LayerType.GEOJSON_LAYER:
                layer = new GeoJSONLayer(options);
                break;
            default:
                break;
        }
        return layer;
    }
}
export { LayerFactory };

