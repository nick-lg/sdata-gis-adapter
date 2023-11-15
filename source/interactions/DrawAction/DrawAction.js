class DrawAction {
    _positions = [];
    _delegate;
    #map;
    _type;
    #drawTool;
    _isDrawing;
    _enableMeasurement;//启用测量

    get map() {
        return this.#map;
    }


    get drawTool() {
        return this.#drawTool;
    }

    get type() {
        return this._type;
    }

    get isDrawing() {
        return this._isDrawing;
    }

    get delegate() {
        return this._delegate
    }

    constructor(options) {
        this.#map = options.map;
        this.#drawTool = options.drawTool;
        this._enableMeasurement = Boolean(options.enableMeasurement) || false;
    }

    start() {
        this._mounted();
    }

    stop() {
    }

    _mounted() { }


    _onVertexAdded(position) {
    }

    _onCursourUpdated(position) {
    }
    _onDrawCompleted(position) {
    }
}

export { DrawAction }