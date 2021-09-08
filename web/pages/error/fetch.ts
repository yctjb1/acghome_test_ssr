import { ISSRContext } from "ssr-types-react";
import { IError } from "@/interface";

export default async (ctx: ISSRContext<any>):Promise<IError>  => {
  const { code = "404" } = __isBrowser__ ? (ctx as any).match.params : (ctx as any).params;

  return {
    // 建议根据模块给数据加上 namespace防止数据覆盖
    ErrorData:{
        code
    }
  }
}
