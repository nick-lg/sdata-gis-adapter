import { JSHelper } from "../../../libs/JSHelper";
import { EnumState, LayerType } from "../base/Constants";
import { Layer } from "./Layer";

import { SimpleRenderer } from "../renderer/SimpleRenderer";
import { PictureMarkerSymbol } from "../symbol/PictureMarkerSymbol";

import defaultImage from "../../assets/image/fighter-red.png";
import { Event } from "../event/Event";
import { LayerEventType, MouseEventType } from "../event/EventType";
import { EntityLayer } from "./Entitylayer";


const DEFAULT_FIELDS_INFO = {
    time: "time",
    position: "position",
    rotation: "rotaion",
    id: "id",
    name: "name",
}

/**
 *
 * 点状要素渲染图层
 * 
 * @param {Object} [options={}] 配置项
 * @param {String} [options.id=GUID] 图层id
 * @param {String} [options.name=options.id] 图层名
 * @param {Object} [options.fields] 映射字段,形如 {id:"data_id",name:"data_name",...}
 * @param {String} [options.outFields] 输出字段，形如"id,name,..."
 * @param {Interger} [options.updateMode] 更新模式 可选值：0:增量更新、1：全量更新
 * @param {Object} [options.trail] 
 * @param {String} [options.trail.lineColor="rgba(255,255,0,1)"] 轨迹颜色
 * @param {String} [options.trail.nodeColor="rgba(255,0,0,1)"] 节点颜色
 * @param {String} [options.trail.lineWidth=1] 轨迹宽度
 * @param {Number} [options.trail.nodeSize= 8] 节点大小
 * @param {String} [options.trail.maxCount=5] 最大节点数
 * 
 * @extends {Layer}
 * 
 * @example
 * 
 *  let layer = new PointLayer({
 *   id: "pointLayer_9527",
 *   fields: {
 *       id: "id",
 *       position: "geom",
 *       rotation: "rotation",
 *   },
 *   renderer: new PredicateRenderer({
 *       infos: [
 *           {
 *               fields: "group,type",
 *               values: "us,fighter",
 *               comparators: "==,==",
 *               symbol: new PictureMarkerSymbol({
 *                   image: "../assets/images/fighter-red.png",
 *                   width: 30,
 *                   height: 30,
 *               })
 *           },
 *           {
 *               fields: "group,type",
 *               values: "us,tank",
 *               comparators: "==",
 *               symbol: new PictureMarkerSymbol({
 *                   image: "../assets/images/tank-red.png",
 *                   width: 30,
 *                   height: 30,
 *               })
 *           },
 *           {
 *               fields: "group,type",
 *               values: "enemy,fighter",
 *               comparators: "==",
 *               symbol: new PictureMarkerSymbol({
 *                   image: "../assets/images/fighter-blue.png",
 *                   width: 30,
 *                   height: 30,
 *               })
 *           },
 *           {
 *               fields: "group,type",
 *               values: "enemy,tank",
 *               comparators: "==",
 *               symbol: new PictureMarkerSymbol({
 *                   image: "../assets/images/tank-blue.png",
 *                   width: 30,
 *                   height: 30,
 *               })
 *           },
 *           {
 *               fields: "group",
 *               values: "enemyAlly",
 *               comparators: "==",
 *               symbol: new PictureMarkerSymbol({
 *                   image: "../assets/images/fighter-green.png",
 *                   width: 30,
 *                   height: 30,
 *               })
 *           },
 *       ],
 *       defaultSymbol:
 *           new PictureMarkerSymbol({
 *               image: "../assets/images/unknown.png",
 *               width: 30,
 *               height: 30,
 *           })
 *   }),
 *   )
 *   map.addLayer(layer);
 *  
 *  //示例数据
 *  const testData = [
 *   //我
 *   {
 *       id: "j1",
 *       geom: { "type": "Point", "coordinates": [120, 30] },
 *       value: 0,
 *       group: "us",
 *       type: "fighter",
 *       // rotation: 30 * Math.PI / 180,
 *   },
 *   {
 *       id: "j2",
 *       geom: { "type": "Point", "coordinates": [119, 25] },
 *       value: 2,
 *       group: "us",
 *       type: "fighter",
 *       rotation: 90 * Math.PI / 180,
 *   
 *   },
 *   {
 *       id: "j3",
 *       geom: { "type": "Point", "coordinates": [120, 27] },
 *       value: -9999,
 *       group: "us",
 *       type: "fighter"
 *   },
 *   {
 *       id: "t1",
 *       geom: { "type": "Point", "coordinates": [119, 26] },
 *       value: 0,
 *       group: "us",
 *       type: "tank"
 *   },
 *   //敌
 *   {
 *       id: "f1",
 *       geom: { "type": "Point", "coordinates": [119.4220, 23.5678] },
 *       value: 2,
 *       group: "enemy",
 *       type: "fighter"
 *   },
 *   {
 *       id: "f2",
 *       geom: { "type": "Point", "coordinates": [119.9490, 24.4990] },
 *       value: 1,
 *       group: "enemy",
 *       type: "fighter"
 *   },
 *   {
 *       id: "et1",
 *       geom: { "type": "Point", "coordinates": [120.3278, 23.2492] },
 *       value: 2,
 *       group: "enemy",
 *       type: "tank"
 *   },
 *   {
 *       id: "et2",
 *       geom: { "type": "Point", "coordinates": [120.2959, 22.8747] },
 *       value: 2,
 *       group: "enemy",
 *       type: "tank"
 *   },
 *   //敌友
 *   {
 *       id: "f3",
 *       geom: { "type": "Point", "coordinates": [123, 27] },
 *       value: 2,
 *       group: "enemyAlly",
 *       type: "fighter"
 *   },
 *   {
 *       id: "f4",
 *       geom: { "type": "Point", "coordinates": [119, 20] },
 *       value: 2,
 *       group: "enemyAlly",
 *       type: "fighter"
 *   },
 *   //不识别
 *   {
 *       id: "u1",
 *       geom: { "type": "Point", "coordinates": [123.3280, 24.3467] },
 *       value: 2,
 *       group: "",
 *       type: "fighter"
 *   },
 *   ]
 * 
 *  //设置数据源
 *   layer.data = testData;
 * 
 */
class PointLayer extends Layer {
    /**
     * 事件。支持的事件类型:feature_picked
     *
     * @readonly
     * @memberof PointLayer
     */
    get event() {
    }

    /**
     * 渲染器
     *
     * @readonly
     * @memberof PointLayer
     */
    get renderer() {
    }


    /**
     *@deprecated
     *
     * @readonly
     * @memberof PointLayer
     */
    get fieldsInfo() {
    }


    get fields() {
    }

    get outFields() {
    }

    get data() {
    }

    set data(value) {
    }

    get updateMode() {
    }


    get filter() {
    }

    set filter(value) {
    }

    constructor(options = {}) {
        super(options)
        this._type = LayerType.POINT_LAYER;
    }

    refresh() {
    }

    /**
      * 清除图层
      *
      * @memberof PointLayer
      */
    clear() {
    }




    /**
     * 添加点位要素
     *
     * @param {Object} data 数据项
     * @param {Array.<Number>} data.position 地理坐标，形如 [120,30] or [120,30,100]
     * @param {Date|Cesium.JulianDate|String} [data.time] 时刻
     * @param {String} [data.id=GUID] 要素id
     * @return {Cesium.Entity|undefined} 
     * @memberof PointLayer
     * 
     * @example
     *  
     * 
     *  // 添加坐标点
     *  let entity_01 = pointLayer.add({
     *     id: "entity_01",
     *     position: [120, 30],
     * })
     * 
     */
    add(data) {
    }

    /**
     * 添加多个点位要素
     *
     * @param {Array.<Object>} arr_data 点位数据列表。数组元素格式参见 add方法
     * @memberof PointLayer
     */
    addMany(arr_data) {
    }

    /**
     * 移除点要素
     *
     * @param {String|Cesium.Entity} entityOrID
     * @return {Boolean} 
     * @memberof PointLayer
     */
    remove(entityOrID) {
    }

    /**
    * 获取指定id要素
    *
    * @param {String} id 要素id
    * @return {Cesium.Entity|undefined} 
    * @memberof PointLayer
    */
    get(id) {
    }


    find(predicate) {
    }

    eachEntity(func, context) {
    }

    toObject(featuresOnly = false) {
    }


    toJSON() {
    }


    loadFeaturesFromObjectAsync(object) {
    }
    _onAdded(map) {
    }

    _onRemoved(map) {
    }

    _setVisible(flag) {

    }

    _applyRenderer(entity) {


    }

    _getPosition(position) {

    }


    _predicate(a, b, comparator = "==") {
        if (b == "undefined" || b == "null")
            b = undefined

        switch (comparator) {
            case "==":
                return a == b
            case "!=":
                return a != b
            case ">":
                return a > b
            case "<":
                return a < b
            default:
                return false
        }
    }
}

export { PointLayer }