import { TargetType } from "../base/Constants.js";
import { Map } from "../map/Map.js";
import { Event } from "./Event.js";
import { MouseEventType } from "./EventType.js"

/**
 *
 * @summary 鼠标事件。请勿自行创建该类实例
 * @see MouseEventType
 * @extends {Event}
 */
class MouseEvent extends Event {

    /**
     * @type {Map} 
     * @private
    */
    _map;
    constructor(map) {
        super();

        this._map = map;

        this._init();

    }




    _init() {
        //事件声明
        Object.values(MouseEventType).forEach(value => {
            // this._events[value] = new Cesium.Event();
        })

        //注册引擎事件

    }


    //#region 第一级事件回调

    _onMouseClicked(movement) {

    }

    _onMouseDoubleClicked(movement) {

    }


    _onMouseMiddleClicked(movement) {

    }
    _onMouseMiddleDown(movement) {

    }
    _onMouseMiddleUp(movement) {

    }



    _onMouseRightClicked(movement) {
    }

    _onMouseMove(movement, isMouseMove) {
    }

    _onMouseWheel(movement) {
    }
    //#endregion


    /**
    *
    * 获取鼠标指针拾取到的位置+地物信息
    * @param position
    * @private
    *
    */
    _getMouseInfo(position, isMouseMove) {
    }


    /**
     * Returns the target information for the mouse event
     * @param target
     * @returns {{instanceId: *, overlay: undefined, feature: undefined, layer: undefined}}
     * @private
     */
    _getTargetInfo(target) {
    }

    /**
      * 触发指定类型事件
      *
      * @param {String} type 事件类型，可选值取决于具体子类
      * @param {*} params 事件参数
      * @memberof MouseEvent
      */
    emit(type, params) {
    }
}

export { MouseEvent }