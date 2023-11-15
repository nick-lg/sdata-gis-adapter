class Interaction
{
    _map;

    _interactionType;


    /**
     * 交互类型
     *
     * @readonly
     * @memberof Interaction
     */
    get interactionType()
    {
        return this._interactionType;
    }

    /**
     * 所属地图实例
     *
     * @readonly
     * @memberof Interaction
     */
     get map() {
        return this._map;
    }


    constructor(options)
    {   
        this._interactionType=options.toolType;
    }
}
export {Interaction}