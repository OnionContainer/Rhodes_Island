//TODO
//放置我们项目里自定义的通用KEY值表
//放在同一个文件里有助于结构清晰
//另：如果只有某特定模块系统里使用的enum可以不放过来 直接写在模块文件中

//又另： 建议在使用enum的时候加一个空值None以应对判定问题

export enum ActorIdentity {
    None,
    Operator,
    Enemy, //之后抛弃这个类型
    Monster,
    Token
    //这其实是对应的不同的数据模板
}

export enum CampType {
    None,
    Self,   //我方
    Enemy   //敌方
}
