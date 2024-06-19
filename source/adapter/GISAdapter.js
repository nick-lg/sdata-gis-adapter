import load from "load-script"
const getUrlWithCdnOrPrefix = (url) => {
    const prefix = window.prefixPathCdn || window.prefixPath || "";
    if (!url) return url;
    if (!prefix) return url;
    if (url.startsWith("http")) return prefix + new URL(url).pathname;
    if (url.startsWith("/")) return prefix + url;
    return prefix + "/" + url;
};
class GISAdapter {
    #engineType;
    #delegate
    #engineID = "fde7e957-8fd5-4f2b-8340-3b4300faaef9"
    #routePrefix = "";

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
        if (window?.appSdk?.routePrefix)
            this.#routePrefix = `/${window.appSdk.routePrefix}`

        let pluginInfo = await this.#queryPluginInfoAsync();
        if (pluginInfo) {
            switch (pluginInfo.engineType) {
                case "sdata-supermap":
                    return await this.#loadSdataGISSupermapAsync();
                case "sdata-gis-njmap":
                    return await this.#loadSdataGISNjmapAsync(pluginInfo);
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
            const cssUrl = getUrlWithCdnOrPrefix('/static/cesium/Widgets/widgets.css')
            loadStyles(cssUrl);
            const jsUrl = getUrlWithCdnOrPrefix('/static/cesium/Cesium.js')
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
        loadStyles(`${window.location.origin}${this.#routePrefix}/storage_area/ext_plugins/web/${this.engineID}/assets/style/sdata-gis.css`)
        let result = await loadScriptAsync(`${window.location.origin}${this.#routePrefix}/storage_area/ext_plugins/web/${this.engineID}/sdata-gis.js`);
        if (result.status === false) {
            throw new Error(`load cesium failed:${result.info}`);
        }
        this.#delegate = window.__sdg_module;
        return this.#delegate;
    }

    async #loadSdataGISSupermapAsync() {
        this.#engineType = "sdata-supermap"

        //----cesium
        loadStyles(`${window.location.origin}${this.#routePrefix}/storage_area/public/preset/gis/libs/supermap_for_cesium/Cesium/Widgets/widgets.css`);
        let result = await loadScriptAsync(`${window.location.origin}${this.#routePrefix}/storage_area/public/preset/gis/libs/supermap_for_cesium/Cesium/Cesium.js`);
        if (result.status === false) {
            throw new Error(`load cesium failed:${result.info}`);
        }

        //----sdata-supermap
        loadStyles(`${window.location.origin}${this.#routePrefix}/storage_area/ext_plugins/web/${this.engineID}/assets/style/sdata-supermap.css`)
        result = await loadScriptAsync(`${window.location.origin}${this.#routePrefix}/storage_area/ext_plugins/web/${this.engineID}/sdata-supermap.js`);
        if (result.status === false) {
            throw new Error(`load cesium failed:${result.info}`);
        }
        this.#delegate = window.__sdg_module;
        return this.#delegate;
    }

    async #loadSdataGISNjmapAsync(pluginInfo) {
        this.#engineType = "sdata-gis-njmap"
        console.log("pluginInfo:", pluginInfo)
        const token = pluginInfo.props.token;
        console.log(token, token)

        //css
        const css = [
            // "http://mapservices.njghzy.com.cn:84/njapis/njmaps/mapbox/css/mapbox-gl.css",
            "https://home.njitrip.com:18080/njapis/njmaps/mapbox/css/mapbox-gl.css",
            `${window.location.origin}${this.#routePrefix}/storage_area/ext_plugins/web/${this.engineID}/assets/style/sdata-gis-njmap.css`
        ];
        css.forEach(p => loadStyles(p))

        //js
        const urls = [
            // "http://mapservices.njghzy.com.cn:84/njapis/njmaps/mapbox/js/mapbox-gl.js",
            "https://home.njitrip.com:18080/njapis/njmaps/mapbox/js/mapbox-gl.js",
            // `http://mapservices.njghzy.com.cn:84/other/njapis/auth/GeoGlobe/GeoGlobeJS.min.js?njtoken=${token}`,
            `https://home.njitrip.com:18080/other/njapis/auth/GeoGlobe/GeoGlobeJS.min.js?njtoken=${token}`,
            `${window.location.origin}${this.#routePrefix}/storage_area/ext_plugins/web/${this.engineID}/sdata-gis-njmap.js`,
        ]

        let result = await loadScriptAsync(urls[0]);
        if (result.status === false) {
            throw new Error(`load ${urls[0]} failed:${result.info}`);
        }

        result = await loadNJMapGeoJS(urls[1], token);
        if (result.status === false) {
            throw new Error(`load ${urls[1]} failed:${result.info}`);
        }


        result = await loadScriptAsync(urls[2]);
        if (result.status === false) {
            throw new Error(`load ${urls[2]} failed:${result.info}`);
        }

        this.#delegate = window.__sdg_module;
        return this.#delegate;
    }

    async #queryPluginInfoAsync() {
        try {

            let prefix = "";
            if (window?.appSdk?.routePrefix)
                prefix = `/${window.appSdk.routePrefix}`


            const url = `${window.location.origin}${this.#routePrefix}/storage_area/ext_plugins/web/${this.engineID}/config.json`;
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


async function loadNJMapGeoJS(url, token) {
    let codeText = await fetch(url).then(res => res.text());
    codeText = codeText.replace('throw Error("njtoken is not define.");', `Object.defineProperty(GeoGlobe, "customToken", {
        value: '${token}',
        writable: !1
    });`)



    const scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.innerHTML = codeText;
    scriptElement.setAttribute("data-custom-flag", "njmap-geoglobejs")
    document.head.appendChild(scriptElement);

    return new Promise((resolve, reject) => {
        const tickID = setInterval(() => {
            const scriptTags = Array.from(document.querySelectorAll("head>script"));
            const index = scriptTags.findIndex(p => p.getAttribute("data-custom-flag") == "njmap-geoglobejs");
            if (index > -1) {
                clearInterval(tickID);
                resolve({ status: true, info: "" });
            }
        }, 500);

    })
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



