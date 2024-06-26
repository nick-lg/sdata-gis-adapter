
import { JSHelper } from "../../libs/JSHelper";
import React from "react";
import ReactDOM from "react-dom";
import { Event } from "../core/event/Event";


/**
 * @summary 地图弹窗类
 *
 */
class Popup {
    _container;
    _element;
    _map;
    _content;
    _location;

    _offsetX;
    _offsetY;

    _horizontalOrigin;
    _verticalOrigin;

    _scratchHorizentalOrigin;
    _scratchVerticalOrigin

    _alignOrigin = [0, 0];

    _closeBtnDom;
    _closeBtn;
    _closeBtnColor;
    _open = true;//标识弹窗是否应该显示
    _event;
    _draggable;
    _attachedLayerID;
    _cache = {
        dragging: false,
        lastX: 0,
        lastY: 0,
        bakCursour: undefined,
        scractCartesian3: new Cesium.Cartesian3(),
        scrachCartographic: new Cesium.Cartographic(),

        deltaX: 0,
        deltaY: 0,
        originLocation: new Cesium.Cartesian3(),

        resizeObserver: undefined,

    }


    /**
     * popup容器
     * @type {HTMLElement}
     * @readonly
     * @memberof Widget
     */
    get container() {
        return this._container;
    }


    /**
     * popup dom根节点
     *
     * @readonly
     * @memberof Widget
     */
    get element() {
        return this._element;
    }

    /**
     * popup css类名
     *
     * @memberof Widget
     */
    get className() {
        return this._element.className;
    }
    set className(value) {
        if (value) {
            if (value.indexOf("sdg-popup") == -1) {
                // this._element.style.setProperty("display","none")
                this._element.style.setProperty("position", "absolute")
                // this._element.style.setProperty("background-color","white")
                // this._element.style.setProperty("box-shadow","0 1px 4px rgba(0, 0, 0, 0.2)")
                this._element.style.setProperty("padding", "20px 15px 15px")
                // this._element.style.setProperty("border-radius","10px")
                // this._element.style.setProperty( "border","1px solid #cccccc")
                // this._element.style.setProperty("left", "0px")
                // this._element.style.setProperty("top", "0px")
                this._element.style.setProperty("min-width", "280px")
                this._element.style.setProperty("max-width", "560px");
                this._element.style.setProperty("pointer-events", "all")

            }
            this._element.className = value;
        }
    }


    get draggable() {
        return this._draggable;
    }

    get attachedLayerID() {
        return this._attachedLayerID
    }



    /**
     * 可见性
     *
     * @memberof Popup
     */
    get visible() {
        return !(this._element.style.display == "none" || this._element.style.display == "");
    }
    set visible(value) {
        this._element.style.display = value ? "block" : "none";
    }
    /**
     * 弹窗内容
     *
     * @memberof Popup
     */
    get content() {
        return this._content;
    }
    set content(value) {
        this.clear();

        if (JSHelper.IsString(value))
            this._element.innerHTML = value;
        else if (this._content instanceof HTMLElement)
            this._element.appendChild(value);
        else if (React.isValidElement(value) || JSHelper.IsFunction(value)) {
            if (!this._cache.resizeObserver) {
                const self = this;
                this._cache.resizeObserver = new ResizeObserver(function (entries) {
                    // console.log(1);
                    self._updateAnchorInfo();
                    if (self._open & self.visible)
                        self._render();
                })
                this._cache.resizeObserver.observe(this._element);
            }
            if (JSHelper.IsFunction(value))
                value.call();
            else
                ReactDOM.render(value, this._element);
        }
        else {
            value = value ? value : "";
        }

        if (this._closeBtn) {
            if (!this._closeBtnDom)
                this._closeBtnDom = document.createElement("a");
            this._closeBtnDom.className = "sdg-popup-closeBtn";

            if (typeof this._closeBtnStyle === "object") {
                Object.assign(this._closeBtnDom.style, this._closeBtnStyle)
            }
            else {
                //很遗憾不支持透明度
                this._closeBtnDom.style.color = this._closeBtnColor ? `rgba(${this._closeBtnColor[0]},${this._closeBtnColor[1]},${this._closeBtnColor[2]})` : "red";
            }

            this._closeBtnDom.addEventListener("click", (e) => {
                this.close(this._destroryAfterClose);
            })

            // if (this._element.firstChild)
            //     this._element.insertBefore(closer, this._element.firstChild)
            // else
            this._element.appendChild(this._closeBtnDom);
        }
        this._content = value;
        this._updateAnchorInfo();

        if (this._open & this.visible)
            this._render();
    }


    /**
     * 位置
     * 
     * @type {Array.<Number>|Cesium.Cartesian3}
     *
     * @memberof Popup
     */
    get location() {
        return this._location;
    }
    set location(value) {

    }

    /**
     * 关联地图实例
     * 
     *@type {Map}
    * @readonly
    * @memberof Widget
    */
    get map() {
        return this._map;
    }


    get event() {
        return this._event;
    }


    /**
     * 
     * @param {Object} [options={}] 弹窗配置
     * @param {Cesium.Cartesian3|Array.<Number>} [options.location] 位置
     * @param {String|HTMLElement|ReactComponent|Function} [options.content=""] 弹窗内容 or 渲染函数
     * @param {String} [options.className="sdg-popup"] 弹窗元素的css className
     * @param {String} [options.horizontalOrigin="left"] 水平对齐原点，可选值："left"、"center"、"right"
     * @param {String} [options.verticalOrigin="bottom"] 纵向对齐原点，可选值："bottom"、"middle"、"top"
     * @param {Number} [options.offsetX=0] 水平偏移量(px)
     * @param {Number} [options.offsetY=0] 纵向偏移量(px)
     * @param {Boolean} [options.closeBtn=false] 是否创建关闭按钮
     * @param {Array.<Number>} [options.closeBtnColor] 关闭按钮颜色,形如 [255,0,0]
     * @param {Object} [options.closeBtnStyle] 关闭按钮样式。当指定color时，忽略options.closeBtnColor配置
     * @param {Boolean} [options.destroryAfterClose=true] 关闭后是否销毁弹窗
     * @param {Boolean} [options.draggable=true] 是否可拖动
     * @param {String} [options.attachedLayerID=undefined] 关联图层ID
     * 
     * @constructor
     */
    constructor(options = {}) {
        this._event = new Event(["added", "removed"]);
        this._event.on("added", this.#onAdded, this);
        this._event.on("removed", this.#onRemoved, this);
        this._horizontalOrigin = options.horizontalOrigin || "left";
        this._verticalOrigin = options.verticalOrigin || "bottom";
        this._offsetX = options.offsetX || 0;
        this._offsetY = options.offsetY || 0;
        this._closeBtn = options.closeBtn;
        this._closeBtnColor = options.closeBtnColor;
        this._closeBtnStyle = options.closeBtnStyle;
        this._destroryAfterClose = JSHelper.IsBoolean(options.destroryAfterClose) ? options.destroryAfterClose : true;
        this._element = document.createElement("div");
        // this._element.style.setProperty("display","none")
        // this._element.style.setProperty("position","absolute")
        // this._element.style.setProperty("background-color","white")
        // this._element.style.setProperty("box-shadow","0 1px 4px rgba(0, 0, 0, 0.2)")
        // this._element.style.setProperty("padding","20px 15px 15px")
        // this._element.style.setProperty("border-radius","10px")
        // this._element.style.setProperty( "border","1px solid #cccccc")
        // this._element.style.setProperty("left","0px")
        // this._element.style.setProperty("top","0px")
        // this._element.style.setProperty("min-width","280px")
        // this._element.style.setProperty("max-width","560px");
        // this._element.style.setProperty("pointer-events","all")

        this._draggable = JSHelper.IsBoolean(options.draggable) ? options.draggable : true;
        this._element.className = options.className || "sdg-popup";
        this._content = options.content || "";
        const self = this;
        if (React.isValidElement(this._content) || JSHelper.IsFunction(this._content)) {
            this._cache.resizeObserver = new ResizeObserver(entries => {
                self._updateAnchorInfo();
                if (self._open & self.visible)
                    self._render();
            })
            this._cache.resizeObserver.observe(this._element);
        }
        this._location = options.location;
        this._attachedLayerID = options.attachedLayerID;
    }







    /**
     * 
     * 打开弹窗
     * 
     * @param {Object} [options={}] 弹窗配置
     * @param {Cesium.Cartesian3|Array.<Number>} [options.location] 位置
     * @param {String|HTMLElement|ReactComponent|Function} [options.content] 弹窗内容 or 渲染函数
     * @param {String} [options.className="sdg-popup"] 弹窗元素的css className
     * @param {String} [options.horizontalOrigin="left"] 水平对齐原点，可选值："left"、"center"、"right"
     * @param {String} [options.verticalOrigin="bottom"] 纵向对齐原点，可选值："bottom"、"middle"、"top"
     * @param {Number} [options.offsetX=0] 水平偏移量(px)
     * @param {Number} [options.offsetY=0] 纵向偏移量(px)
     * @param {Boolean} [options.closeBtn=false] 是否创建关闭按钮
     * @param {Array.<Number>} [options.closeBtnColor] 关闭按钮颜色,形如 [255,0,0]
     * @param {Object} [options.closeBtnStyle] 关闭按钮样式。当指定color时，忽略options.closeBtnColor配置
     * @param {Boolean} [options.destroryAfterClose=true] 关闭后是否销毁弹窗
     * @param {String} [options.attachedLayerID=undefined] 关联图层ID
     * @memberof Popup
     */
    open(options = {}) {
        let location = options.location || this._location
        let content = options.content || this._content;
        if (!location || !content)
            return;

        // this.clear();

        if (options.horizontalOrigin)
            this._horizontalOrigin = options.horizontalOrigin;
        if (options.verticalOrigin)
            this._verticalOrigin = options.verticalOrigin
        if (typeof options.offsetX == "number")
            this._offsetX = options.offsetX;
        if (typeof options.offsetY == "number")
            this._offsetY = options.offsetY
        if (typeof options.closeBtn == "boolean")
            this._closeBtn = options.closeBtn;
        if (Array.isArray(options.closeBtnColor))
            this._closeBtnColor = options.closeBtnColor;
        if (typeof options.destroryAfterClose == "boolean")
            this._destroryAfterClose = options.destroryAfterClose;
        if (typeof options.closeBtnStyle === "object" && this._closeBtnDom) {
            this._closeBtnStyle = options.closeBtnStyle
        }

        this._open = true;
        this.visible = true;
        this.className = options.className;
        this.location = location;
        this.content = content;
        if (options.attachedLayerID)
            this._attachedLayerID = options.attachedLayerID;
    }


    /**
     * 关闭弹窗
     *
     * @param {Boolean} destrory 是否销毁
     * @memberof Popup
     */
    close(destrory) {
        this.visible = false;
        this._open = false;
        destrory ? this._map.removeOverlay(this) : undefined;
    }



    /**
     * 清楚弹窗内容
     *
     * @memberof Popup
     */
    clear() {
        if (this._element._reactRootContainer) {
            //卸载react组件要求清理容器
            ReactDOM.unmountComponentAtNode(this._element);
        }
        else
            while (this._element.firstChild) {
                this._element.removeChild(this._element.firstChild)
            }
    }


    /**
     * 将弹窗绑定到指定目标上
     *
     * @param {Cesium.Entity} target 要绑定的目标
     * @return {Boolean} 是否绑定成功 
     * @memberof Popup
     */
    bind(target, update) {
    }

    _updateAnchorInfo() {
        if (this.className.indexOf("sdg-popup") > -1) {
            // this._alignOrigin = [0, - this._element.clientHeight];
            // this._offsetX = - 46.6;
            // this._offsetY = -10;

            this._alignOrigin = [-46.6, - this._element.clientHeight - 10];
            // this._offsetX = - 46.6;
            // this._offsetY = -10;
        }
        else {
            switch (this._horizontalOrigin) {
                case "center":
                    this._alignOrigin[0] = -this._element.clientWidth / 2;
                    break;
                case "right":
                    this._alignOrigin[0] = - this._element.clientWidth;
                    break;
                default:
                    this._alignOrigin[0] = 0;
                    break;
            }

            switch (this._verticalOrigin) {
                case "middle":
                    this._alignOrigin[1] = -this._element.clientHeight / 2;
                    break;
                case "bottom":
                    this._alignOrigin[1] = - this._element.clientHeight;
                    break;
                default:
                    this._alignOrigin[1] = 0;
                    break;
            }
        }
    }

    _render() {
    }


    #onAdded(map) {
    }

    #onRemoved() {
        if (this._cache.resizeObserver)
            this._cache.resizeObserver.unobserve(this._element);
        this._container.removeChild(this._element);
    }

}
export { Popup }