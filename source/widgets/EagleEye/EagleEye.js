import { Widget } from "../Widget.js";
import { EagleEyeViewModel } from "./EagleEyeViewModel.js";
import { JSHelper } from "../../../libs/JSHelper.js"
import { BuildInWidgetType } from "../WidgetType.js";
import "./EagleEye.css";



/**
 * @summary 鹰眼组件(不支持2.5D)。默认显示在地图右下角
 *
 * @extends {Widget}
 */
class EagleEye extends Widget {

    _domID;//leaflet要求必须提供id
    _viewModel;

    get domID() {
        return this._domID;
    }

    get viewModel() {
        return this._viewModel;
    }


    #width;
    #height;

    get width() {
        return this.#width;
    }
    get height() {
        return this.#height;
    }


    /**
     *
     * @param {Object} options
     * @param {Map} options.map 关联地图实例
     * @param {String|HTMLElement} options.container 组件容器or容器id
     * @param {String} [options.className] 组件css类名
     * @param {Number} [options.width=160] 宽度
     * @param {Number} [options.height=160] 高度
     * @param {Number} [options.strokeColor='rgb(255,0,0)'] 边框颜色
     * @param {Number} [options.strokeOpacity=1] 边框不透明度
     * @param {Number} [options.strokeWidth=1] 边框宽度
     * @param {Number} [options.fillColor='rgb(255,0,0)'] 填充色
     * @param {Number} [options.fillOpacity=0.1] 填充色不透明度
     * 
     */
    constructor(options) {
        super(options);
    }

    createDom() {
    }

    createDataBinding(options) {
    }

    destrory() {
    }

    toJSON() {
    }
}

export { EagleEye }