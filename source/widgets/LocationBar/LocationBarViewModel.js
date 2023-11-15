import { JSHelper } from "../../../libs/JSHelper.js";
import { MouseEventType } from "../../index.js";
import { WidgetViewModel } from "../WidgetViewModel.js"

class LocationBarViewModel extends WidgetViewModel {

    containsHeight;//是否包含高程通道
    decimals;
    lng;
    lat;
    alt;



    constructor(options) {
        super(options);

        this.containsHeight = options.containsHeight || false;

        this.decimals = JSHelper.Clamp(options.decimals || 6, 1, 8);

        this.#subscibeEvent();
    }

    #subscibeEvent() {
        this.map.mouseEvent.on(MouseEventType.MOUSE_MOVE, this.#onMouseMove, this);
    }


    #onMouseMove(eventArg) {
    }

    destrory() {
    }
}

export { LocationBarViewModel }