/**
 * @Description: 在打包时生成额外的配置文件。可以使用一些全局变量配置该文件，这样就可以直接在外部更改它，而无需重新打包
 * @Author: Ableson
 * @Date: 2022/2/21 14:23
 * @LastEditors: Ableson
 * @LastEditTime: 2022/2/21 14:23
 */
import { GLOB_CONFIG_FILE_NAME, OUTPUT_DIR } from '../constant';
import fs, { writeFileSync } from 'fs-extra';
import chalk from 'chalk';

import { getEnvConfig, getRootPath } from '../utils';
import { getConfigFileName } from '../getConfigFileName';

import pkg from '../../package.json';

interface configParams {
  configName: string;
  config: any;
  configFileName?: string;
}

function createConfig(params: configParams) {
  const { configName, config, configFileName } = params;
  try {
    // 变量字符串
    const windowConf = `window.${configName}`;
    // Ensure that the variable will not be modified
    // 将配置的对象以JSON字符串格式拼接到变量字符串后面，最后用正则将空格去掉
    const configStr = `${windowConf}=${JSON.stringify(config)};
      Object.freeze(${windowConf});
      Object.defineProperty(window, "${configName}", {
        configurable: false,
        writable: false,
      });
    `.replace(/\s/g, '');
    // ↓创建dist文件夹
    fs.mkdirp(getRootPath(OUTPUT_DIR));
    // ↓将字符串写入到dist文件下的指定JS文件名的文件中
    writeFileSync(getRootPath(`${OUTPUT_DIR}/${configFileName}`), configStr);

    console.log(chalk.cyan(`✨ [${pkg.name}]`) + ` - configuration file is build successfully:`);
    console.log(chalk.gray(OUTPUT_DIR + '/' + chalk.green(configFileName)) + '\n');
  } catch (e) {
    console.log(chalk.red('configuration file configuration file failed to package:\n' + e));
  }
}

export function runBuildConfig() {
  // 获取我们可以配置的环境变量对象
  const config = getEnvConfig();
  // 获取配置文件的JS名
  const configFileName = getConfigFileName(config);
  // 创建文件
  createConfig({ config, configName: configFileName, configFileName: GLOB_CONFIG_FILE_NAME });
}
