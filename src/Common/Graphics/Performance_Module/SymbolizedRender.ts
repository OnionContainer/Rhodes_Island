//author Na2CuC4O8

import { MySymbol, Symbolized } from "../../../Fix/FixSymbol";
import { Vec2 } from "../../DodMath";
import CustomizedSprite from "./customizedSpr";
import { ActorBox } from "./objbox";
import { EventCentre } from "../../../Event/EventCentre";
import { Bar, Button , Text } from "./ActorComponent";
import { KVPair } from "../../DodDataStructure";

export default class ActorRU{
    private _initPos:Vec2;//actor起始坐标
    private _initSize:Vec2;//actor起始大小
    private _initBarHeight:number = 0;//进度条其实高度暂存器
    private _pos:Vec2;//根据全局缩放比换算后的可见坐标
    private _size:Vec2;//根据全局缩放比换算后的可见大小
    private _scale:number = 1;//全局缩放比
    private _symb:MySymbol;//symb
    private _father:CustomizedSprite;//父绘图节点
    private _spr:CustomizedSprite;//本绘图节点
    private _barPair:KVPair<Bar> = new KVPair<Bar>();//进度条键值组
    private _text:Text;//默认文本
    private _defButtonShowed:boolean = false;//是否显示默认按钮，默认为否
    private _buttonPair:KVPair<Button> = new KVPair<Button>();
    private _buttonHeight:number;//按钮高度暂存器
    private _damage:CustomizedSprite;//受伤特效显示节点
    private _transparency:number = 1;//受伤特效参数暂存器
    private _fist:CustomizedSprite;//攻击特效显示节点
    private _movePercentage:number = 0;//攻击特效参数暂存器
    public _centerPos:Vec2;//中心坐标
    private _ani:Laya.Animation = new Laya.Animation();


    /**
     * RenderUnit构造器
     * @param symb symb
     * @param pos 起始坐标
     * @param size 宽高
     * @param father 父绘图节点
     */
    constructor(symb:MySymbol, pos:Vec2, size:Vec2, father:CustomizedSprite, color:string = "#00ffff", scale:number = 1){
        this._father = father;//父绘图节点
        this._initPos = pos;//起始坐标
        this._initSize = size;//起始宽高
        this._spr = new CustomizedSprite();//新建绘图节点
        this._father.addChild(this._spr);//添加子节点
        this.setData(symb,new Vec2(this._initPos.x*this._scale,this._initPos.y*this._scale),new Vec2(this._initSize.x*this._scale, this._initSize.y*this._scale),undefined);//设置绘图节点参数
        ActorBox.add(this,this._symb);//将本对象添加到键值对
        this.addDefBar();//添加默认进度条
        this._text = new Text(this._initSize,this._scale);//添加默认文本
        this._text.setSymb(this._symb);//
        this._buttonHeight = this._initSize.y;//
        this._spr.addChild(this._text);//默认文本置于子节点
        EventCentre.instance.on(EventCentre.EType.PERFORMANCE_RESCALE(),this,this.reScale);//监听全局缩放比
        this._spr.on(Laya.Event.MOUSE_OVER,this,this.mouseOver);//
        this._spr.on(Laya.Event.MOUSE_OUT,this,this.mouseOut);//
        this._spr.on(Laya.Event.MOUSE_UP,this,this.showDefaultBottons);//
        this._damage = new CustomizedSprite();//
        this._spr.addChild(this._damage);//
        this._damage.setParam(0,0,this._size.x,this._size.y,"#f91526");//
        this._damage.locationAndSize();//
        this._damage.zOrder = 99;
        this.addDefButtons();//
        this._fist = new CustomizedSprite();//
        this._fist.setParam(this._centerPos.x,this._centerPos.y,16,16,"#F3C246");//
        this._fist.locationAndSize();//
        this._fist.zOrder = 2;//
        this._spr.addChild(this._fist);//
        


    }
    
    
    public clearAni():void{
        this._ani.clear();
    }


    

    public loadAni(name:string,status:string, loopOrNot:boolean, numOfFrames:number, scale:Vec2):Laya.Animation{
        this._ani = new Laya.Animation();
        this._ani.pos(-17*this._scale,-8*this._scale);
        this._ani.scale(scale.x,scale.y);
        this._spr.addChild(this._ani);
        this._ani.loadAtlas(`res/atlas/${name}.atlas`,Laya.Handler.create(this,onLoaded)); 
        
        this._ani.play(undefined,loopOrNot);

        function createAniUrls(url,length){
            let urls = [];
            for(let i=1;i<length;i++){
                if(i < 10){
                    urls.push(url +"_"+"0" +i+".png");
                }else{
                    urls.push(url +"_"+i+".png");  
                }
                
            }
            return urls;
        }
        function onLoaded(){
            
            this._ani.interval = 50;
            let tmpAni = createAniUrls(`${name}/${status}`,numOfFrames);
            this._ani.loadImages(tmpAni);
            
        }
        return this._ani;
    }


    /**
     * 返回当前可视节点坐标
     */
    private curPos():Vec2{
        return this._pos;
    }


    /**
     * 发动打击特效
     * @param to 打击目标
     */
    public hit(to:Symbolized):void{
        this._fist.centralShiftColored();
        let tmpVec:Vec2 = new Vec2(ActorBox.get(to.symbol.data).curPos().x-this._pos.x,ActorBox.get(to.symbol.data).curPos().y-this._pos.y);
        let fun:Function = (target:Vec2) =>{
            if(this._movePercentage > 1){
                this._movePercentage = 0;
                this._fist.graphics.clear();
                Laya.timer.clear(this,fun);
                ActorBox.get(to.symbol.data).damage();
                // this._ani.stop();
                return;
    
            }
            let curLocaction:Vec2 = new Vec2( (16+ target.x)*this._movePercentage,(16+ target.y)*this._movePercentage);
            this._movePercentage += 0.02;
            this._fist.relocate(curLocaction);
            this._fist.rotation = 2000 * this._movePercentage;
        };
        Laya.timer.loop(20,this,fun,[tmpVec]);
        
    }

    /**
     * 发动受伤特效
     */
    public damage():void{
        this._damage.setParam(0,0,this._size.x,this._size.y);
        this._damage.locationAndSize();
        this._damage.changeColor();
        let fun:Function = ()=>{
            if(this._transparency < 0){
                this._damage.graphics.clear(); 
                this._transparency = 1;
                Laya.timer.clear(this,fun);
                return;
            }
            
            this._transparency -= 0.03;
            this._damage.alpha = this._transparency;
        }
        Laya.timer.loop(20,this,fun);

    }


    /**
     * 渲染默认按钮
     */
    private showDefaultBottons(e:Laya.Event):void{
        e.stopPropagation();
        if(this._defButtonShowed === false){
            this._spr.addChild(this.getButton(0).getSpr());
            this._spr.addChild(this.getButton(1).getSpr());
            this._defButtonShowed = true;
            // console.log(this._text._switch);
        }else{
            this._spr.removeChild(this.getButton(0).getSpr());
            this._spr.removeChild(this.getButton(1).getSpr());
            this._defButtonShowed = false;
            // console.log(this._text._switch);
        }
    }
    
    /**
     * 发布鼠标进入事件
     */
    private mouseOver():void{
        this._text.setSwitchOn();
    }

    /**
     * 发布鼠标离开事件
     */
    private mouseOut():void{
        this._text.setSwitchOff();
    }

    /**
     * 重设缩放比
     * @param value 新全局缩放比
     */
    private reScale(value:number):void{
        
        this._scale = value;
        this.setData(this._symb,this._initPos,this._initSize,this._spr.getColor());
        this.setColor();
        this._damage.setParam(0,0,this._initSize.x*this._scale,this._initSize.y*this._scale);
        this._damage.locationAndSize();
        // this._ani.scale(0.25*value,0.18*value);
        // this._ani.pos(-17*value,-8*value);
        

    }

    /**
     * 设置本ARU的各项参数
     * @param symb symb
     * @param pos 起始坐标
     * @param size 大小
     * 
     */
    private setData(symb:MySymbol, pos:Vec2, size:Vec2,color:string):void{
        this._symb = symb;
        this._pos = new Vec2(pos.x*this._scale,pos.y*this._scale);
        this._size = new Vec2(size.x*this._scale,size.y*this._scale);
        this._spr.setParam(this._pos.x,this._pos.y,this._size.x,this._size.y,color);
        this.setColor();
        this._spr.locationAndSize();
        this._centerPos = new Vec2(this._size.x/2,this._size.y/2);

    }



    /**
     * @param color 设置颜色
     */
    public setColor():void{
        this._spr.changeColor();
    }


    /**
     * 
     * @param pos 重新设置起始坐标（不受缩放比影响）
     */
    public relocate(pos:Vec2):void{
        this._pos = new Vec2(pos.x*this._scale,pos.y*this._scale);
        this._initPos = pos.clone();
        this._spr.relocate(pos);
    }


    /**
     * 摧毁本ARU
     */
    public destory():void{
        this._spr.destroy();
    }

    /**
     * 获取本ARU的起始坐标（不受缩放比影响）
     */
    public getPosVec():Vec2{
        return this._initPos;
    }


    /**
     * 获取本ARU的默认文本对象
     */
    public getText():Text{
        return this._text;
    }


    /**
     * 添加默认进度条
     */
    public addDefBar():void{
        
        this._initBarHeight = 0;
        let tmp:Bar = new Bar(0,"#00ffff",new Vec2(30,5),new Vec2(0,this._initBarHeight - 6),this._scale);
        this._spr.addChild(tmp.getBackSpr());
        this._barPair.edit("bar_0",tmp);
        this._initBarHeight = this._initBarHeight - tmp.getHeight() - 1;
        
        
    }

    /**
     * 获取本ARU的指定进度条
     * @param num 进度条代号
     */
    public getBar(num:number):Bar{
        return this._barPair.read(`bar_${num}`);
    }

    /**
     * 添加附加进度条
     * @param backGroundColor 设置新增进度条颜色
     * @param symb 设置新增进度条代号
     * @param x 宽度
     * @param y 高度
     */
    public addExtBar(backGroundColor:string,symb:number,percentage:number,x:number = 30,y:number = 5):void{
        
        let tmpBar:Bar = new Bar(symb,backGroundColor,new Vec2(x,y),new Vec2(0,this._initBarHeight - y - 1),this._scale);
        this._spr.addChild(tmpBar.getBackSpr());
        this._barPair.edit(`bar_${symb}`,tmpBar);
        this._initBarHeight = this._initBarHeight - tmpBar.getHeight() - 1;
        tmpBar.percentage = percentage;
    }
    

    /**
     * 修改已有进度条
     * @param symb 指定进度条代号
     * @param percentage 修改进度条进度
     */
    public editBar(symb:number, percentage:number):void{
        this._barPair.read(`bar_${symb}`).percentage = percentage;
    }


    /**
     * 添加默认按钮
     */
    private addDefButtons():void{
        let tmp1:Button = new Button(this._symb,"Retreat",0,new Vec2( - 20,this._initSize.y),new Vec2(20,15),undefined,this._scale);
        this._buttonPair.edit("0",tmp1);
        let tmp2:Button = new Button(this._symb,"Activate_Skill",0,new Vec2(this._initSize.x,this._initSize.y),new Vec2(20,15),undefined,this._scale);
        this._buttonPair.edit("1",tmp2);
        this._buttonHeight = this._initSize.y + 16;
        let tmp3:Button = new Button(this._symb,"",999,new Vec2(0,0),new Vec2(0,0),undefined,this._scale);
        this._spr.addChild(tmp3.getSpr());
    }


    /**
     * 在默认位置添加额外按钮
     * @param name 
     * @param num 
     * @param color 
     * @param fun 
     */
    public addExtraButtonsAtDefLocation(name:string,num:number, color?:string, fun?:Function):void{
        let tmpBut:Button = new Button(this._symb,name,num,new Vec2(0,this._buttonHeight),new Vec2(20,15),color,this._scale);
        this._buttonPair.edit(num+"",tmpBut);
        this._spr.addChild(tmpBut.getSpr());
        this._buttonHeight += 16;
        tmpBut.setFunc(fun);
    }

    /**
     * 在指定位置添加额外按钮
     * @param name 
     * @param num 
     * @param fun 
     * @param pos 
     * @param size 
     * @param color 
     */
    public addExtraButtonAtNoDefLocation(name:string,num:number,fun:Function,pos:Vec2,size:Vec2, color?:string):void{
        let tmpBut:Button = new Button(this._symb,name,num,pos,size,color,this._scale);
        this._buttonPair.edit(num+"",tmpBut);
        this._spr.addChild(tmpBut.getSpr());
        tmpBut.setFunc(fun);
    }

    /**
     * 获取按钮
     * @param num 按钮编号
     */
    public getButton(num:number):Button{
        return this._buttonPair.read(num+"");
    }

}
