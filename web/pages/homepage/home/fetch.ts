import { ISSRContext } from "ssr-types-react";

export default async (ctx: ISSRContext<any>) => {

  return {
    // 建议根据模块给数据加上 namespace防止数据覆盖
    homeIndexData: {}
  }
}
