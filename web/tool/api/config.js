const url = ['http://www.acg-home.cn/', 'http://localhost/']
export const Online = url[0];
// export const Online = url[1];

import comicUrl from './url/comic'
import usersUrl from './url/users'
import thirdPartyUrl from './url/thirdParty'
import actionsUrl from './url/actions'
import articleUrl from './url/article'
import tagUrl from './url/tag'
import commentUrl from './url/comment'

const createUrl=(obj,prefix)=>{
    let result = {};
    Object.keys(obj).map(key=>{
        result[key] = Online + prefix + obj[key]
    })
    return result;
}


export const GLOBAL_URL = {
    testAPI: Online + "testAPI",//测试
    ...createUrl(comicUrl,"comic"),
    ...createUrl(usersUrl,"users"),
    ...createUrl(thirdPartyUrl,"thirdParty"),
    ...createUrl(actionsUrl,"actions"),
    ...createUrl(articleUrl,"article"),
    ...createUrl(tagUrl,"tag"),
    ...createUrl(commentUrl,"comment"),

}