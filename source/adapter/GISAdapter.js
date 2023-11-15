// const load = require("load-script");

import load from "load-script"

class GISAdapter {
    #engineType;
    #delegate
    #engineID = "fde7e957-8fd5-4f2b-8340-3b4300faaef9"

    get engineType() {
        return this.#engineType;
    }


    get delegate() {
        return this.#delegate
    }

    get engineID() {
        return this.#engineID;
    }


    constructor() {
    }


    async initAsync() {
        let pluginInfo = await this.#queryPluginInfoAsync();
        if (pluginInfo) {
            switch (pluginInfo.engineType) {
                case "sdata-supermap":
                    return await this.#loadSupermapAsync();
                default:
                    return await this.#loadSdataGISAsync();
                // throw new Error(`invalid engine type:${engineType}`);
            }
        }
        else {
            this.#engineType = "sdata-gis"
            //----cesium
            // loadStyles("http://10.15.111.14:33228/storage_area/preset/gis/libs/Cesium/Widgets/widgets.css");
            // let result = await loadScriptAsync(`http://10.15.111.14:33228/storage_area/preset/gis/libs/Cesium/Cesium.js`);


            loadStyles(`${window.location.origin}/storage_area/public/preset/gis/libs/Cesium/Widgets/widgets.css`);
            let result = await loadScriptAsync(`${window.location.origin}/storage_area/public/preset/gis/libs/Cesium/Cesium.js`);
            if (result.status === false) {
                throw new Error(`load cesium failed:${result.info}`);
            }

            import("sdata-gis/build/assets/style/sdata-gis.css")
            this.#delegate = await import("sdata-gis");
            window.__sdg_module = this.#delegate;
            return this.#delegate;
        }


    }


    async loadCesiumAsync() {
        if (!window.Cesium) {
            loadStyles(`${window.location.origin}/storage_area/public/preset/gis/libs/Cesium/Widgets/widgets.css`);
            let result = await loadScriptAsync(`${window.location.origin}/storage_area/public/preset/gis/libs/Cesium/Cesium.js`);
            if (result.status === false) {
                throw new Error(`load cesium failed:${result.info}`);
            }
            console.log("Cesium loaded")
        }
        else {
            console.log(`Cesium already exists`)
        }
        return true;
    }


    async #loadSdataGISAsync() {
        this.#engineType = "sdata-gis"

        //----cesium
        //--test
        // loadStyles("http://10.15.111.14:33228/storage_area/preset/gis/libs/Cesium/Widgets/widgets.css");
        // let result = await loadScriptAsync(`http://10.15.111.14:33228/storage_area/preset/gis/libs/Cesium/Cesium.js`);

        // loadStyles(`${window.location.origin}/storage_area/public/preset/gis/libs/Cesium/Widgets/widgets.css`);
        // let result = await loadScriptAsync(`${window.location.origin}/storage_area/public/preset/gis/libs/Cesium/Cesium.js`);
        // if (result.status === false) {
        //     throw new Error(`load cesium failed:${result.info}`);
        // }
        const flag = await this.loadCesiumAsync();
        if (!flag)
            return;

        //----sdata-gis
        loadStyles(`${window.location.origin}/storage_area/ext_plugins/web/${this.engineID}/assets/style/sdata-gis.css`)
        result = await loadScriptAsync(`${window.location.origin}/storage_area/ext_plugins/web/${this.engineID}/sdata-gis.js`);
        if (result.status === false) {
            throw new Error(`load cesium failed:${result.info}`);
        }
        this.#delegate = window.__sdg_module;
        return this.#delegate;
    }

    async #loadSupermapAsync() {
        this.#engineType = "sdata-supermap"

        //----cesium
        loadStyles(`${window.location.origin}/storage_area/public/preset/gis/libs/supermap_for_cesium/Cesium/Widgets/widgets.css`);
        let result = await loadScriptAsync(`${window.location.origin}/storage_area/public/preset/gis/libs/supermap_for_cesium/Cesium/Cesium.js`);
        if (result.status === false) {
            throw new Error(`load cesium failed:${result.info}`);
        }

        //----sdata-supermap
        loadStyles(`${window.location.origin}/storage_area/ext_plugins/web/${this.engineID}/assets/style/sdata-supermap.css`)
        result = await loadScriptAsync(`${window.location.origin}/storage_area/ext_plugins/web/${this.engineID}/sdata-supermap.js`);
        if (result.status === false) {
            throw new Error(`load cesium failed:${result.info}`);
        }
        this.#delegate = window.__sdg_module;
        return this.#delegate;
    }

    async #queryPluginInfoAsync() {
        try {
            const url = `${window.location.origin}/storage_area/ext_plugins/web/${this.engineID}/config.json`;
            const response = await fetch(url);
            if (response.ok === false) {
                throw new Error(`query plugin info failed. status:${response.status},statusText:${response.statusText}`)
            }
            return await response.json();
        } catch (error) {
            console.error(`query plugin info failed:${error}`);
        }
    }
}
export { GISAdapter }


/**
 * 加载CSS
 *
 * @param {*} url
 */
function loadStyles(url) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(link);
}

/**
 * 以script方式加载js文件
 *
 * @param {String} url
 * @return {Promise<Object>} 
 */
async function loadScriptAsync(url) {
    let promise = new Promise((resolve, reject) => {
        load(url, function (err, script) {
            if (err)
                reject({ status: false, info: err });
            else
                resolve({ status: true, info: "" });
        })
    })
    return promise;
}
