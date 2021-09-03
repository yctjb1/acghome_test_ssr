import { Readable } from 'stream'
import { Controller, Get, Provide, Inject } from '@midwayjs/decorator'
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

  @Get('/')
  async handleRedirect(): Promise<void> {
    this.ctx.redirect('/homepage/home')
  }

  // @Get('/')
  // @Get('/detail/:id')
  @Get('/404')
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


@Provide()
@Controller('/homepage')
export class Homepage {
  @Inject()
  ctx: IEggContext

  @Inject('ApiService')
  apiService: IApiService

  @Inject('ApiDetailService')
  apiDeatilservice: IApiDetailService

  @Get('/')
  async handleRedirect(): Promise<void> {
    this.ctx.redirect('/homepage/home')
  }

  @Get('/administer')
  async handleRedirectAdminister(): Promise<void> {
    this.ctx.redirect('/homepage/administer/comicmanage')
  }

  @Get('/usercenter')
  async handleRedirectUserCenter(): Promise<void> {
    this.ctx.redirect('/homepage/usercenter/0000000001/collecting')
  }

  @Get('/usercenter/:userId')
  async handleRedirectUserCenterDetail(): Promise<void> {
    const ctx:any = this.ctx;
    const { userId } = ctx.match?ctx.match.params : ctx.params;
    this.ctx.redirect(`/homepage/usercenter/${userId}/collecting`)
  }

  @Get('/home')
  @Get('/baike')
  @Get('/articlelist')
  @Get('/articlelist/:articleId')
  @Get('/comiclist')
  @Get('/comiclist/:comicId')
  @Get('/administer/:nav')//$nav: adminmanage,comicmanage,webmanage,linkmanage,delmanage
  @Get(`/usercenter/:userId/:bar`)//$bar: collecting,following,followed,liking,
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

