import * as esbulid from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugin/unpkg-path-plugin';
import { fetchPlugin } from './plugin/fetch-plugin';

let init = false;

export const bundle = async (rawInput: string) => {
    if (!init) {
        console.log('hehe');
        await esbulid.initialize({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.9.2/esbuild.wasm',
        });
        init = true;
    }

    try {
        const result = await esbulid.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(rawInput)],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window',
            },
        });

        return {
            code: result.outputFiles[0].text,
            error: '',
        };
    } catch (err) {
        return {
            code: '',
            error: err.message as string,
        };
    }
};
