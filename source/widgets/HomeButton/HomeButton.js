import { Widget } from "../Widget.js";
import { HomeButtonViewModel } from "./HomeButtonViewModel.js";
import { JSHelper } from "../../../libs/JSHelper.js"
import { BuildInWidgetType } from "../WidgetType.js";
import "./HomeButton.css"


/**
 *
 * @summary 主视图按钮。默认显示在地图左上角
 *  
 * @extends {Widget}
 */
class HomeButton extends Widget {

    _viewModel;
    get viewModel() {
        return this._viewModel;
    }

    /**
     *
     * @param {Object} options
     * @param {Map} options.map 关联地图实例
     * @param {String|HTMLElement} options.container 组件容器or容器id
     * @param {String} [options.className] 组件css类名
     * @param {String} [options.url] logo
     * @param {Number} [options.duration=0.8] 主视图跳转动画时长(秒)
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
}

export { HomeButton }