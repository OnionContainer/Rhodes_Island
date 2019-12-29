export default class Doctor{
    public static instance:Doctor = new Doctor();

    private _sprite:Laya.Sprite = new Laya.Sprite();
    private _life:number = 2;

    constructor(){
        
    }

    public movein(spr:Laya.Sprite):void{
        spr.addChild(this._sprite);
        this._sprite.pos(0,570);
        this._sprite.graphics.fillText("从左侧狗头人头像将狗头拖拽到场地上，松开鼠标并再次单击鼠标选择方向以部署", 0,0,"20px Arial","#ffffff","left");
        this._sprite.graphics.fillText("这个demo其实不但简陋还有挺多bug的", 0,22,"20px Arial","#ffffff","left");
        this._sprite.graphics.fillText("但我实在是肝不动了，先发个大概吧。项目代码也基本上被糟蹋得无法维护了（反正也要重构）", 0,44,"20px Arial","#ffffff","left");
        this._sprite.graphics.fillText("干员参数我就写这儿了:", 0,66,"20px Arial","#ffffff","left");
        this._sprite.graphics.fillText("小秦，特种(因为还没做部署位置限制)，部署费用0（因为还没把费用做进去）", 0,88,"20px Arial","#ffffff","left");
        this._sprite.graphics.fillText("生命值：20，阻挡数：1（因为还没做多个阻挡），攻击力：22（因为 ），天赋：同时攻击范围内的所有敌人(因为还没做攻击优先级判定)", 0,110,"20px Arial","#ffffff","left");
    }

    public note():void{
        this._sprite.graphics.clear();
        if (this._life >= 0) {
            this._sprite.graphics.fillText("博士体力:" + this._life, 0,0,"20px Arial","#ffffff","left");
        } else {
            this._sprite.graphics.fillText("筷子吃掉了宁的脑子", 0,0,"20px Arial","#ff0000","left");
        }
    }

    public damage():void{
        this._life -= 1;
        this.note();
    }
}