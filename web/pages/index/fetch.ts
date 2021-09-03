import { ISSRContext } from 'ssr-types-react'
import { HomeData } from '@/interface'
interface IApiService {
  index: () => Promise<HomeData>
}

export default async (ctx: ISSRContext<{
  apiService?: IApiService
}>) => {

  const data = __isBrowser__ ? await (await window.fetch('/api/index')).json() : await ctx.apiService?.index()
  return {
    IndexData: data
  }
}
