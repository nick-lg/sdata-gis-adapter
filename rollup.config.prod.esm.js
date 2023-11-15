import path from "path";
import json from 'rollup-plugin-json';
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copyTo from "rollup-plugin-copy-assets-to";
import replace from '@rollup/plugin-replace';
import postcss from "rollup-plugin-postcss";
import cssnano from "cssnano";
import terser from '@rollup/plugin-terser';
const defaultPreset = require('cssnano-preset-default');

import image from "@rollup/plugin-image"

export default
    {
        external: [
            "jquery",
            "cesium",
            "react",
            "react-dom",
            "react-svg",
            "antd",
            "antd/dist/antd.css",
            "@nick-wilde/mvt-imagery-provider",
            "sdata-gis",
            "sdata-gis/build/assets/style/sdata-gis.css"
        ],
        input: ["./source/index.js"],//打包的起点文件
        output: {
            file: './build/sdata-gis-adapter.js',//打包的输出文件
            format: 'esm',
            indent: '\t',////用于表示缩进的字符
            sourcemap: true,
            banner: 'console.info(`sdata-gis-adapter@${new Date().getFullYear()}`)',
            // inlineDynamicImports: true
        },
        watch: {
            //限定监控范围
            include: "./source/**"
        },

        //使用的插件
        plugins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            }),

            json(),
            resolve(),
            babel({
                exclude: 'node_modules/**',
                extensions: [".js", ".ts"],
                // include:"./node_modules/babel-runtime/**",
                runtimeHelpers: true,
                // externalHelpers: true
            }),
            commonjs(
                {
                    // include: "./node_modules/**"
                    // include: "./libs/jquery-3.3.1.js"
                    // include:"./node_modules/@babel/**"
                    include: [
                        "./node_modules/**",
                    ]
                }),
            // //图片处理
            // image(),
            // //样式打包
            // postcss({
            //     extract: path.resolve('./build/assets/style/sdata-gis.css'),
            //     plugins: [
            //         cssnano({
            //             preset: defaultPreset({
            //                 // discardComments: {
            //                 //     removeAll: true,
            //                 // },
            //                 discardComments: true,
            //                 discardDuplicates: true,
            //                 discardEmpty: true,
            //                 colormin: true,
            //                 minifyParams: true,
            //                 minifySelectors: true,
            //                 normalizeString: true,
            //             })
            //         })
            //     ]
            // }),
            terser({
                compress: false,
                mangle: false,
                keep_classnames: true,
                format: {
                    comments: false,
                    semicolons: false,
                    beautify: true
                }
            })
        ],
    }

