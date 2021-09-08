export * from './adminster-index'
export * from './usercenter-index'
export interface HomeData {
    IndexData?: {}
}
export interface IError {
    ErrorData:{
      code:string;
    }
}
export interface ILayout {
  LayoutData:{
    ClientHeight: number,
    addNewPage:()=>{}
  }
}