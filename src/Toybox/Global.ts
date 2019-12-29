export default class MyGlobal{
    public static UISet:Laya.Sprite;        //游戏场景里的中心区域原点
    public static UISet_sub:Laya.Sprite;    //上面那个sprite的一个子节点，为了不把地图擦掉，可以在这个节点里绘图
    public static ListOfOprt:string[] = [//侧边栏需要用到的可选干员列表
        "bird"
    ];
    public static LINE_EFFECT_ON:boolean = false;
}

