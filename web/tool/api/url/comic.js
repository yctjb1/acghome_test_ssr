export default {

    comicContent: "/content",//根据漫画id拉取具体漫画（无论是否回收）
    comicList: "/list",//漫画列表(额外type判断回收)
    resourceWeb: "/resourceWeb",//根据漫画id拉取资源站列表(额外type判断回收)
    resourceLink: "/resourceLink",//根据资源站id拉取连接列表(已排序)(额外type判断回收)

    updateComic: "/updateComic",//更新、插入漫画信息-->没有id就是插入，下同
    updateWebLink: "/updateWebLink",//更新、插入漫画/资源站的资源站信息-->单条插入实时后台渲染

    handleRecover: "/handleRecover",//所有漫画、资源站、连接的回收站相关处理
    listRecover: "/listRecover",//所有漫画、资源站、连接的回收站查询
    
    collectedorliked: "/collectedorliked",//根据漫画id和用户id判断漫画是否已经被收藏或点赞
    collectedorliked: "/collectedorliked",//根据漫画id和用户id判断漫画是否已经被收藏或点赞
}
