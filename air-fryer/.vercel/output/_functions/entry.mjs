import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_D9XvtG2X.mjs';
import { manifest } from './manifest_DI0NQnNy.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/vote.astro.mjs');
const _page2 = () => import('./pages/cookies.astro.mjs');
const _page3 = () => import('./pages/info.astro.mjs');
const _page4 = () => import('./pages/privacy.astro.mjs');
const _page5 = () => import('./pages/ricette/_slug_.astro.mjs');
const _page6 = () => import('./pages/_lang_/recipes/_slug_.astro.mjs');
const _page7 = () => import('./pages/_lang_.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/vote.ts", _page1],
    ["src/pages/cookies.astro", _page2],
    ["src/pages/info.astro", _page3],
    ["src/pages/privacy.astro", _page4],
    ["src/pages/ricette/[slug].astro", _page5],
    ["src/pages/[lang]/recipes/[slug].astro", _page6],
    ["src/pages/[lang]/index.astro", _page7],
    ["src/pages/index.astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "a8b14ddd-dc55-475e-a708-cd2548fc8e26",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
