import { SimpleMarkerSymbol } from "../symbol/SimpleMarkerSymbol";
import { Renderer } from "./Renderer";

class PredicateRenderer extends Renderer {

    // fields;
    infos;
    defaultSymbol;
    constructor(options = {}) {
        super(options);
        this.type = "predicate_renderer";
        this.infos = options.infos || [
            // {
            //     fields: "name,age",
            //     values: "张三,18",
            //     comparators: "==,!=,>,<",
            // }
        ];
        this.defaultSymbol = options.defaultSymbol || new SimpleMarkerSymbol();
    }
}

export { PredicateRenderer }