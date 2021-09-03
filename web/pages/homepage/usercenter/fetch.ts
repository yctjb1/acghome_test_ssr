import { ISSRContext } from "ssr-types-react";
import { IUserCenterData } from "@/interface";

export default async (ctx: ISSRContext<any>):Promise<IUserCenterData>  => {
  const { userId = "0000000001", bar = "collecting" } = __isBrowser__ ? (ctx as any).match.params : (ctx as any).params;

  return {
    // 建议根据模块给数据加上 namespace防止数据覆盖
    IndexData: {
      userId,bar
    }
  }
}
