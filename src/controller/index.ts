import { Readable } from 'stream'
import { Controller, Get, Provide, Inject, Redirect  } from '@midwayjs/decorator'
import { Context } from 'egg'
import { render } from 'ssr-core-react'
import { IApiService, IApiDetailService } from '../interface'

interface IEggContext extends Context {
  apiService: IApiService
  apiDeatilservice: IApiDetailService
}

@Provide()
@Controller('/')
export class Index {
  @Inject()
  ctx: IEggContext

  @Inject('ApiService')
  apiService: IApiService

  @Inject('ApiDetailService')
  apiDeatilservice: IApiDetailService

  // @Get('/')
  // async handleRedirect(): Promise<void> {
  //   this.ctx.redirect('/homepage/home')
  // }
  @Get('/')
  @Redirect('/homepage/home')
  async handleHomeRedirect(): Promise<void> {//第二种写法
      
  }
  @Get('/error')
  async handleNotFound(): Promise<void> {
    this.ctx.redirect('/error/404')
  }

  // @Get('/')
  // @Get('/detail/:id')
  @Get('/error/:code')
  @Get('/login')
  async handler (): Promise<void> {
    try {
      this.ctx.apiService = this.apiService
      this.ctx.apiDeatilservice = this.apiDeatilservice
      const stream = await render<Readable>(this.ctx, {
        stream: true
      })
      this.ctx.body = stream
    } catch (error) {
      console.log(error)
      this.ctx.body = error
    }
  }
}
