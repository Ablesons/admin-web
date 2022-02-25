import { UserConfig, ConfigEnv, loadEnv } from 'vite';
import pkg from './package.json';
import dayjs from 'dayjs';
import { resolve } from 'path';
import { wrapperEnv } from './build/utils';
import { OUTPUT_DIR } from './build/constant';
import { createProxy } from './build/vite/proxy';
import { createVitePlugins } from './build/vite/plugin';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

  const isBuild = command === 'build';

  return {
    root,
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    server: {
      // 指定服务器应该监听哪个IP地址。如果将此设置为0.0.0.0或者true将监听所有地址，包括局域网和公网地址。
      host: true,
      // 指定开发服务器端口.
      port: VITE_PORT,
      // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
      strictPort: false,
      // 启用 TLS + HTTP/2。注意：当 server.proxy 选项 也被使用时，将会仅使用 TLS。
      https: true,
      // 在开发服务器启动时自动在浏览器中打开应用程序。
      open: true,
      // 为开发服务器配置自定义代理规则
      proxy: createProxy(VITE_PROXY),
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      // minify: 'terser',
      /**
       * 当 minify=“minify:'terser'” 解开注释
       * Uncomment when minify="minify:'terser'"
       */
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    define: {
      // setting vue-i18-next
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: 'generateModifyVars()',
          javascriptEnabled: true,
        },
      },
    },
    // 项目使用的vite插件。由于数量大，所以单独提取和管理
    plugins: createVitePlugins(viteEnv, isBuild),

    optimizeDeps: {
      include: [
        '@vue/runtime-core',
        '@vue/shared',
        // '@iconify/vue',
        'element-plus/lib/locale/lang/en',
        'element-plus/lib/locale/lang/zh-cn',
        'vxe-table/lib/locale/lang/zh-CN',
        'vxe-table/lib/locale/lang/en-US',
      ],
    },
  };
};
