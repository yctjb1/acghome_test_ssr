import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'
import { join } from 'path'

export type DefaultConfig = PowerPartial<EggAppConfig>

export default (appInfo: EggAppInfo) => {
  const config: DefaultConfig = {}
  config.middleware = [
    'notFoundMiddleware'
  ];
  config.static = {
    prefix: '/',
    dir: [join(appInfo.appDir, './build'), join(appInfo.appDir, './public')]
  }
  return config
}
