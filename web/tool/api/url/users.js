export default {
    usersLogin: "/login",//用户登录
    queryAuthority: "/queryAuthority",//拉取权限，根据用户id和用户名（稍微安全点）
    queryFavourites: "/queryFavourites",//拉取收藏
    queryAllUsers: "/queryAllUsers",//拉取所有用户的除了喜好的所有信息(额外type判断回收)
    updateBase: "/updateBase",//用户更新基本信息
    superUpdate: "/superUpdate",//用户更新权限和密码（超级管理的操作）
    updatePassword: "/updatePassword",//用户更新密码
    queryBase: "/queryBase",//拉取权限、昵称等基本信息，（低安全）仅仅用id
    checkUserName: "/checkUserName",//检查是否已存在相同的用户名或昵称
    registerUser: "/registerUser",//用户注册

}
