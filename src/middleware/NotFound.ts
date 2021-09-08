import { Provide } from '@midwayjs/decorator'
import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web'
import { Context } from 'egg'

@Provide()
export class NotFoundMiddleware implements IWebMiddleware {
  
  resolve () {
    return async (ctx: Context, next: IMidwayWebNext) => {
      await next()
      let status = ctx?.status.toString()
      if (status.match(/^40/)) {
        // 手动建立 /web/pages/error/:code 相关文件 
        ctx.redirect(`/error/${status}`)
      }

    }
  }
}