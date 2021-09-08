
//20210908记录旧版本接口大全
//需要前缀'http://www.acg-home.cn/' 或 'http://localhost/'
export const oldAllUrl = {
    testAPI: "testAPI",//测试

    comicContent: "comic/content",//根据漫画id拉取具体漫画（无论是否回收）
    comicList: "comic/list",//漫画列表(额外type判断回收)
    resourceWeb: "comic/resourceWeb",//根据漫画id拉取资源站列表(额外type判断回收)
    resourceLink: "comic/resourceLink",//根据资源站id拉取连接列表(已排序)(额外type判断回收)

    updateComic: "comic/updateComic",//更新、插入漫画信息-->没有id就是插入，下同
    updateWebLink: "comic/updateWebLink",//更新、插入漫画/资源站的资源站信息-->单条插入实时后台渲染

    handleRecover: "comic/handleRecover",//所有漫画、资源站、连接的回收站相关处理
    listRecover: "comic/listRecover",//所有漫画、资源站、连接的回收站查询

    usersLogin: "users/login",//用户登录
    queryAuthority: "users/queryAuthority",//拉取权限，根据用户id和用户名（稍微安全点）
    queryFavourites: "users/queryFavourites",//拉取收藏
    queryAllUsers: "users/queryAllUsers",//拉取所有用户的除了喜好的所有信息(额外type判断回收)
    updateBase: "users/updateBase",//用户更新基本信息
    superUpdate: "users/superUpdate",//用户更新权限和密码（超级管理的操作）
    updatePassword: "users/updatePassword",//用户更新密码
    queryBase: "users/queryBase",//拉取权限、昵称等基本信息，（低安全）仅仅用id
    checkUserName: "users/checkUserName",//检查是否已存在相同的用户名或昵称
    registerUser: "users/registerUser",//用户注册

    oneUpload: "thirdParty/oneUpload",//单个图片上传，用于测试图片、头像、封面


    mailSMS: "actions/mailSMS",//用户注册时的邮箱验证（需要输入邮箱）
    handleActivity: "actions/handleActivity",//用户动态相关【预留了删除，目前只有更新或插入】
    queryListorcount: "actions/queryListorcount",//根据动态表进行的联表查询+同时2条sql
    collectedorliked: "comic/collectedorliked",//根据漫画id和用户id判断漫画是否已经被收藏或点赞
    collectedorliked: "comic/collectedorliked",//根据漫画id和用户id判断漫画是否已经被收藏或点赞

    articleList: "article/list",//查询文章列表（包含了对应的标签）
    articleDetail: "article/detail",//文章详情
    handleManner: "article/handleManner",//文章态度查询、更新
    queryAllManner: "article/articleManner",//文章态度查询、更新
    queryCommentByArticle: "comment/queryByArticle",//所有一二级评论
    addArticle: "article/createNew",//新增文章
    updateArticle: "article/articleUpdate",//编辑文章（未变动标签）
    createOrUpdate: "tag/createOrUpdate",//新增标签 ,
    queryTagList: "tag/list",//查询标签 ,
    updateTarcileMidTag: "tag/updateTarcileMidTag",//插入或更新文章标签中间表
    addFirstComment: "comment/addFirstComment",//新增一级评论
    addSecondComment: "comment/addSecondComment",//新增二级评论
}