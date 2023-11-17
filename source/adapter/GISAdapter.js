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
            }
        }
        else {
            this.#engineType = "sdata-gis"
            //----cesium
            const flag = await this.loadCesiumAsync();
            if (!flag)
                return;


            import("sdata-gis/build/assets/style/sdata-gis.css")
            this.#delegate = await import("sdata-gis");
            window.__sdg_module = this.#delegate;
            return this.#delegate;
        }
    }


    async loadCesiumAsync() {
        if (!window.Cesium) {
            const cssUrl = `${window.prefixPath || ''}/static/cesium/Widgets/widgets.css`
            loadStyles(cssUrl);
            const jsUrl = `${window.prefixPath || ''}/static/cesium/Cesium.js`
            let result = await loadScriptAsync(jsUrl);
            if (result.status === false) {
                throw new Error(`load cesium failed:${result.info}`);
            }
        }
        else {
            console.log(`Cesium already exists`)
        }
        return true;
    }


    async #loadSdataGISAsync() {
        this.#engineType = "sdata-gis"

        //----cesium
        const flag = await this.loadCesiumAsync();
        if (!flag)
            return;

        //----sdata-gis
        loadStyles(`${window.location.origin}/storage_area/ext_plugins/web/${this.engineID}/assets/style/sdata-gis.css`)
        let result = await loadScriptAsync(`${window.location.origin}/storage_area/ext_plugins/web/${this.engineID}/sdata-gis.js`);
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

// function getStaticResourcePath(src = '', defaultPrefix = '') {
//     if (
//         src?.startsWith('http') ||
//         src?.startsWith('https') ||
//         src?.startsWith('data:image/') ||
//         src?.startsWith('blob:')
//     ) {
//         return src;
//     } else {
//         let reg = /^\/.*/;
//         let file = src ? (reg.test(src) ? src : `/${src}`) : '';
//         const prefix = window?.configuration?.system_resource_access_prefix;
//         if (file?.startsWith(prefix)) {
//             return file ? defaultPrefix + file : '';
//         }
//         return file ? (prefix || defaultPrefix) + file : '';
//     }
// };


export const routePrefix = window.prefixPath || '';

export const apiPrefixPath =
    window.apiPrefixPath === undefined ? routePrefix : window.apiPrefixPath;

/**
 * apiintl.get('EVEN.CPF')
 */
export const apiContextPath = `${origin}${apiPrefixPath}`;



