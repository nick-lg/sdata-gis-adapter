import { MapEvent } from "../event/MapEvent.js";
import { MouseEvent } from "../event/MouseEvent.js";
import { Layer } from "../layer/Layer.js";
import { WidgetManager } from "../../widgets/WidgetManager.js";
import { LayerGroup } from "../layer/LayerGroup.js";
import { ViewPoint } from "../base/ViewPoint.js";




/**
     * 
     * Map类包含用于渲染、管理覆盖2/2.5/3D模式场景的属性、方法和事件。 
     * 
     * @param {HTMLElement|String} mapContainer 地图容器(dom element or id 均可)
     * @param {Object} options 配置项
     * @param {String|Object|Array<String|Object>} [options.baseMap="gaode-street"] 底图配置。默认使用高德街道图。更多参数配置参见{@link Map.setBaseMap}
     * @param {Object} [options.widgets={zoom_button:true,home_button:true,attribution:true,scene_mode_picker:true}] 底图组件配置。默认加载缩放按钮、主视图、版权组件、场景切换器
     * @param {Integer} [options.sceneMode=3] 底图模式。可选值：3(3D),2(2D),1(2.5D) 
     * @param {Integer} [options.minLevel=2] 最小缩放级别
     * @param {Integer} [options.maxLevel=20] 最大缩放级别
     * @param {Array<Number>} [options.homeViewExtent=[73.55, 3.85, 135.09, 53.55]] 主视图范围。默认为中国地理范围
     * @param {ViewPoint} [options.homeViewPoint] 主视点。当主视点存在时，忽略主视图范围和地图中心点。
     * @param {Array.<Number>} [options.center] 主视图地图中心点。当地图中心点存在时，忽略主视点和地图范围。
     * @param {Integer} [options.level] 主视图缩放级别。当且地图中心点存在时有效。注意：全模式下层级和视点高度无法精确换算，故模式切换相关逻辑准确度不能保证，慎用:<
     * @param {String} [options.projection="4326"] 地图投影，可选值："4326","3857",
     * @param {Number} [options.clockMode=0] 时钟模式
     * @param {String|Object} [options.terrain="no"] 地形配置。默认无地形。更多参数配置，参见{@link Map.setTerrain}
     * @param {String} [options.offlineAssetsPath] 离线资源路径。内网示例： "http://10.15.111.14:43216/geodata"
     * @param {String} [options.pluginPath] 插件路径
     * 
     * 
     * 
     */
class Map {
    /**
     * 地图容器
     * 
     * @type {HTMLElement}
     *
     * @readonly
     * @memberof Map
     */
    get container() {
        return this.viewer._container;
    }


    /**
     * 底图
     *
     * @readonly
     * @memberof Map
     */
    get baseMap() {
        return this._baseMap;
    }


    /**
     * 离线图源路径
     *
     * @readonly
     * @memberof Map
     */
    get offlineAssetsPath() {
        return this.#offlineAssetsPath;
    }


    /**
     * 获取第一级图层节点列表
     *
     * @readonly
     * @memberof Map
     */
    get layers() {
        return this._layers;
    }


    /**
     * 获取所有图层节点列表(不含图层组节点)
     *
     * @readonly
     * @memberof Map
     */
    get realLayers() {
    }



    get baseLayers() {
        return this._baseMap.layers.filter(layer => {
            return layer._isBaseLayer == true;
        })
    }

    get level() {
    }

    get minLevel() {
    }
    get maxLevel() {
    }



    /**
     * 当前场景模式
     *
     * @type {Integer}
     * @memberof Map
     */
    get sceneMode() {
    }
    set sceneMode(value) {
    }

    /**
     * 默认视图范围
     *
     * @memberof Map
     */
    get homeViewExtent() {

    }
    set homeViewExtent(value) {

    }

    /**
     * 默认视点(默认视点优先级高于默认视图)
     *
     * @memberof Map
     */
    get homeViewPoint() {

    }
    set homeViewPoint(value) {
    }

    /**
     * 当前视点
     *
     * @readonly
     * @memberof Map
     */
    get viewPoint() {
    }

    /**
     * 当前近似视图范围(3D模式下稳定,其他模式不稳定)
     *
     * @memberof Map
     */
    get extent() {
    }

    set extent(value) {
    }



    /**
    * 获取地图中心点坐标
    *
    * @return {Array.<Number>|undefined} 
    * @memberof Map
    */
    get center() {
    }


    /**
     * 控件管理器
     * @type {WidgetManager}
     * 
     * @readonly
     * @memberof Map
     */
    get ui() {
    }


    /**
     * 弹窗
     *
     * @readonly
     * @memberof Map
     */
    get popup() {
    }




    /**
     * 要素选择集(选择集中地物将尝试进行高亮处理)
     *
     * @readonly
     * @memberof Map
     */
    get selections() {
    }


    /**
     * 默认Graphics
     * 
     * @type {Cesium.EntityCollection}
     *
     * @readonly
     * @memberof Map
     */
    get graphics() {
    }


    /**
     * 绘制工具
     *
     * @readonly
     * @memberof Map
     */
    get drawTool() {
    }


    /**
     * 量测工具
     *
     * @readonly
     * @memberof Map
     */
    get measureTool() {
    }



    /**
     * 地图事件
     * 
     * @type {MapEvent}
     *
     * @readonly
     * @memberof Map
     */
    get mapEvent() {
    }


    /**
     * 鼠标事件
     * 
     * @type {MouseEvent}
     * @readonly
     * @memberof Map
     */
    get mouseEvent() {
    }


    constructor(mapContainer, options = {}) {
    }

    /**
     * 设置底图
     *
     * @param {String|Object|Array<Object>} baseMapOptions 底图配置项(可一次配置多个底图图层)
     * @return {Array<Layer|LayerGroup>} 当前底图图层数组
     * @memberof Map
     * 
     * 
     * @example 
     * 
     * 在线地图资源:
     * "gaode-imagery"
     * "gaode-street"
     * "baidu-imagery"
     * "baidu-street"
     * "tencent-dark"
     * "tdt-imagery" (不稳定,慎用) 
     * "arcgis-imagery"
     * "arcgis-street-purplishBlue"
     * "superMap-zxyTileImage-world"
     * "none" (空白底图)
     * 
     * 离线地图资源(注意：使用离线地图,需要在创建地图实例时传入离线资源根路径参数offlineAssetsPath，参见Map构造器参数列表)：
     * "gaode-imagery-offline"
     * "gaode-street-offline"
     * "baidu-street-offline"
     * "baidu-dark-offline"(百度炫黑)
     * "tencent-dark-offline"(腾讯炫黑)
     * "arcgis-imagery-offline"
     * 
     * 
     * 使用关键字加载地图
     * baseMapOptions="gaode-street"
     * 
     * 启用互联网底图纠偏选项。
     * baseMapOptions={
     *      type:"gaode-street",
     *      correct:true
     * }
     * 
     * 设置WMS
     * baseMapOptions={
     *      type:"wms",
     *      url:"http://10.15.111.14:58888/geoserver/NJSDATA_TEST/wms?service=WMS&version=1.1.0&request=GetMap&layers=NJSDATA_TEST%3AL06&bbox=-2.003750834278924E7%2C-2.003750834278921E7%2C2.0037508342789248E7%2C2.0037508342789277E7&width=768&height=768&srs=EPSG%3A3857&styles=&format=image%2Fpng"
     * }
     * 
     * 设置TMS
     * baseMapOptions={
     *      type: "tms",
     *      url: "http://localhost:8099/geodata/imageryTiles/TMS-JLH-18?format=image/png",
     * }
     * 
     * 设置WMTS
     * baseMapOptions={
     *      type: "wmts",
     *      url: "http://10.15.111.14:58888/geoserver/gwc/service/wmts/rest/NJSDATA_TEST:L10/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/png",
     *      layer:"NJSDATA_TEST:L10",
     *      tileMatrixSetID: "NJSdata-3857", 
     *      style:"",
     *      format:"image/png"
     * }
     * 
     * 设置多个底图图层
     * baseMapOptions=[
     *      "gaode-imagery",
     *      {
     *          type:"wms",
     *          url: "http://10.15.111.14:58888/geoserver/gwc/service/wmts/rest/NJSDATA_TEST:L10/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/png",
     *          tileMatrixSetID: "NJSdata-3857",    
     *      }
     * ]
     * 
     * 
     */
    setBaseMap(baseMapOptions) {
    }

    /**
     * 添加图层节点
     *
     * @param {Layer|LayerGroup} layer 要添加的图层节点
     * @return {Boolean} 
     * @memberof Map
     */
    addLayer(layer) {
    }

    /**
    * 从图层组移除指定图层节点(遍历图层树)
    *
    * @param {Layer|LayerGroup} layer 要移除的图层节点
    * @return {Boolean} 
    * @memberof Map
    */
    removeLayer(layer) {
    }





    /**
    * 根据id移除指定图层节点(遍历图层树)
    *
    * @param {String} id
    * @return {Boolean} 
    * @memberof LayerGroup
    */
    removeLayerById(id) {
    }

    /**
     * 根据id获取指定图层节点
     *
     * @param {String} id 图层节点id
     * @return {Layer|LayerGroup|undefined} 
     * @memberof Map
     */
    getLayerById(id) {
    }

    /**
     * 获取指定名称的所有图层节点
     *
     * @param {String} name 图层名称
     * @return {Array.<Layer>} 
     * @memberof Map
     */
    getLayersByName(name) {
    }



    /**
    * 遍历图层节点执行方法
    *
    * @param {*} func 入参为图层节点的迭代函数
    * @param {*} skipLayerGroupNode 是否跳过图层组节点本身
    * @param {*} context this上下文
    * @ignore
    * @memberof Map
    */
    eachLayer(func, skipLayerGroupNode, context) {
    }

    clearAllLayers() {

    }

    destroy() {
    }

    /**
     * 飞至主视图
     *
     * @param {number} [duration=2] 飞跃动画时长(秒)
     * @param {Function} [callback] 动画结束回调 
     * @memberof Map
     */
    flyHome(duration = 2, callback) {
    }


    /**
     * 飞至视点
     *
     * @param {ViewPoint|Object} viewPoint 目标视点
     * @param {Number} [duration=2] 飞跃动画时长(秒)
     * @param {Function} [callback] 动画结束回调 
     * @memberof Map
     */
    flyToViewPoint(viewPoint, duration = 2, callback) {
    }

    /**
     * 飞至指定地理范围
     *
     * @param {Number[]} extent 目标地理范围，形如[xmin,ymin,xmax,ymax]
     * @param {Number} [duration=2] 飞跃动画时长(秒)
     * @param {Function} [callback] 动画结束回调 
     * @memberof Map
     */
    flyToExtent(extent, duration = 2, callback) {
    }

    /**
     * 将地图中心定位至指定位置
     *
     * @param {Array.<Number>} position 要居中的点位
     * @param {Number} level 缩放层级
     * @param {number} [duration=2] 动画时长(s)
     * @param {Function} callback 动画结束回调 
     * @return {*} 
     * @memberof Map
     */
    centreAt(position, level, duration = 2, callback) {
    }


    /**
     * 放大地图
     *
     * @memberof Map
     */
    zoomIn() {
    }


    /**
     * 缩小地图
     *
     * @memberof Map
     */
    zoomOut() {
    }


    /**
     * 将屏幕坐标转换为地图坐标
     *
     * @param {Number[]|Cesium.Cartesian2} windowPosition
     * @return {Number[]} 
     * @memberof Map
     */
    toMap(windowPosition) {
    }


    /**
     * 选择目标
     *
     * @param {Object|Object[]} objects 要选择的目标
     * @param {Object} [options] 高亮配置
     * @param {Cesium.Color} [options.color=Cesium.Color.fromBytes(0, 255, 255, 200)]
     * @memberof Map
     */
    select(objects, options = { color: Cesium.Color.fromBytes(0, 255, 255, 200) }) {
    }


    /**
     * 取消选择目标
     *
     * @param {Object|Object[]} objects 要选则的目标
     * @memberof Map
     */
    unSelect(objects) {
    }

    /**
     * 清楚选择集
     *
     * @memberof Map
     */
    clearSelections() {
    }




    /**
     * 添加交互
     *
     * @param {*} interaction
     * @return {Boolean} 
     * @memberof Map
     */
    addInteraction(interaction) {

    }


    /**
     * 移除交互
     *
     * @param {*} interaction
     * @return {Boolean} 
     * @memberof Map
     */
    removeInteraction(interaction) {
    }


    addOverlay(overlay) {
    }
    removeOverlay(overlay) {
    }

    /**
     * 路径飞行。
     *
     * @param {Object} options
     * @param {Array.<Array.<Number>>| Object} 路径
     * @param {Number} [options.offsetX] X轴偏移量
     * @param {Number} [options.offsetY] Y轴偏移量
     * @param {Number} [options.offsetZ] Z轴偏移量
     * @param {Number} [option.offsetHeight] 高程偏移量
     * @return {*} 
     * @memberof Map
     */
    flyByPath(options) {
    }


    /**
     * 停止路径飞行
     *
     * @memberof Map
     */
    stopPathFlying() {
    }





    /**
     * 对目标应用路径运动
     *
     * @param {Cesium.Entity} target
     * @param {Array.<Array.<Number>>|Array.<Object>} path
     * @param {Object} [options={}]
     * @param {String} [options.positionField="position"] 位置字段
     * @param {String} [options.timeField="time"] 时间字段
     * @return {Boolean}
     * @memberof Map
     */
    applyPathMotion(target, path, options = {}) {
    }


    /**
     * 导出地图截图
     *
     * @param {Object} [options={}]
     * @param {Integer} [options.width] 图片宽度
     * @param {Integer} [options.height] 图片高度
     * @param {String} [options.fileName] 文件名。提供文件名将自动下载图片(png)
     * @return {String} 
     * @memberof Map
     */
    exportImage(options = {}) {
    }


    /**
     * 开始录屏
     *
     * @memberof Map
     */
    startRecordingScreen() {
    }


    /**
     * 停止录屏
     *
     * @param {Object} options
     * @param {options.fileName} [options.fileName] 要导出的文件名
     * @memberof Map
     */
    stopRecordingScreen(options) {
    }


    /**
     * 识别指定窗口位置目标
     *
     * @param {Object} wp 窗口坐标,形如 {x:95,y:27}
     * @return {Object|undefined} 
     * @memberof Map
     */
    async identifyAsync(wp, options) {
    }



    /**
     * 显示编辑器
     *
     * @param {Object} options
     * @param {Cesium.Entity} options.target
     * @param {Array.<Number>} options.location 
     * @return {*} 
     * @memberof Map
     */
    showEditor(options) {
    }



    /**
     * 获取批量图层数据范围
     *
     * @param {Array.<String>} ids 图层id数组
     * @param {Number} [ratio=0.1] 扩张系数(0-1)
     * @return {Promise.<Array|undefined>} 
     * @memberof Map
     */
    getBatchLayerDataExtentAsync(ids, ratio = 0.1) {
    }






    /**
     * 将地图序列化为字符串(有损)
     *
     * @static
     * @param {Map} map 要进行序列化地图实例
     * @return {String} 
     * @memberof Map
     */
    static Serialize(map) {
    }


    /**
     * 将字符串反序列化为地图实例
     *
     * @static
     * @param {HTMLElement|String} container 地图容器(dom element or id)
     * @param {String} serializedMap 要进行反序列化字符串
     * @return {Map} 
     * @memberof Map
     */
    static Deserialize(container, serializedMap) {
    }
}



export { Map };

