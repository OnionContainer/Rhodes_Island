import People from "../SceneScript/GameObj/People_stuff/People";
import MyMath from "./myMath";
import { Struc } from "./DataStructure";
import EventCentre from "./EventCentre";


/*
MassEffect已经没用了
我们现在在用地图节点模式代替碰撞检测



*/

/**
 * ColiBox是碰撞箱类
 * 可以描述某一矩形实体的位置
 */
export class ColiBox extends Laya.Rectangle{

    private _registrant:any;
    private _type:string;

    public get registrant():ColiBox{
        return this._registrant;
    }

    public get type():string{
        return this._type;
    }

    constructor(register:any, type:string){
        super(0,0,0,0);
        this._registrant = this._registrant;
        this._type = type;
    }

    /**
     * 就是……来一组（100个）随机的碰撞箱
     * @param xRange 
     * @param yRange 
     * @param widRange 
     * @param higRange
     */
    public static randomBoxes(xRange:number = 1200, yRange:number = 800, widRange:number = 300, higRange:number = 300):ColiBox[]{
        const rad:Function = MyMath.randomInt;
        let result:ColiBox[] = [];
        for(let i = 0; i < 50; i += 1) {
            result.push(new ColiBox(null, "any"));
            result[i].pos(rad(xRange), rad(yRange)).size(rad(widRange), rad(higRange));
        }
        return result;
    }

    public pos(x:number, y:number):ColiBox{
        this.x = x;
        this.y = y;
        return this;
    }

    public size(width:number, height:number):ColiBox{
        this.width = width;
        this.height = height;
        return this;
    }

    public intersects_X(rec:ColiBox):boolean{
        if (this.x < rec.x) {
            return rec.intersects_X(this);
        }
        return  (this.x >= rec.x && this.x <= rec.right) ||
                (this.right >= rec.x && this.right <= rec.right)
    }

    public intersects_Y(rec:ColiBox):boolean{
        if (this.y<rec.y) {
            return rec.intersects_Y(this);
        }
        return  (this.y >= rec.y && this.y <= rec.bottom) ||
                (this.bottom >= rec.y && this.bottom <= rec.bottom)
    }
}

export class UnionBox extends ColiBox{
    private ok:ColiBox = new ColiBox(1,"");
    constructor(){
        super(1,"2");
    }
}

/**
 * ColiPareList是一个ColiBox数组
 */
export class ColiPareList{

    private array:[ColiBox, ColiBox][];

    constructor(){
        this.array = [];
    }

    //还原array接口
    public get length():number{
        return this.array.length;
    }

    public read(index:number):[ColiBox, ColiBox]{
        return this.array[index];
    }

    public write(index:number, item:[ColiBox, ColiBox]):void{
        this.array[index] = item;
    }

    public push(item:[ColiBox,ColiBox]):void{
        this.array.push(item);
    }

    public splice(index:number, length:number):[ColiBox,ColiBox][]{
        return this.array.splice(index,length);
    }

    /**
     * 实现一下foreach
     * @param f f:(ele:[ColiBox,ColiBox], index:number, arr:ColiPareList)=>void
     * 
     */
    public foreach(f:(ele:[ColiBox,ColiBox], index:number, arr:ColiPareList)=>void):void{
        for(let n = 0; n < this.array.length; n += 1) {
            f(this.array[n],n,this);
        }

    }
    
    public clone():ColiPareList{
        let result:ColiPareList = new ColiPareList();
        for(let n = 0; n < this.length; n += 1) {
            result.write(n, this.read(n));
        }
        return result;
    }

    /**
     * 输入一个新的碰撞关系表，返回“进入”“离开”“维持碰撞”三个表
     * @param newList 新碰撞关系表
     */
    public findChange(newList:ColiPareList):{in:ColiPareList,out:ColiPareList,remain:ColiPareList}{
        let inList:ColiPareList = new ColiPareList();       //新产生的碰撞关系
        let remainList:ColiPareList = new ColiPareList();   //维持原状的碰撞关系
        let me:ColiPareList = this.clone();                 //解除的碰撞关系

        let found:boolean = false;
        for(let n = 0; n < newList.length; n += 1) {
            found = false;
            let current:[ColiBox,ColiBox] = newList.read(n);


            for (let k = 0; k < me.length; k += 1) {//look for duplicate element in me
                let toCheck:[ColiBox,ColiBox] = me.read(k);
                if (current[0] === toCheck[0] && current[1] === toCheck[1]) {//pair duplicate = remain
                    remainList.push(current);
                    me.splice(k,1);//keep splicing the old array
                    found = true;
                    break;
                }
            }

            if (!found) {//pair not duplicate
                inList.push(current);//this element is new
            }
        }


        return {
            in:inList,//所有新表有但旧表没有的元素，就是“入”列表
            out:me,//删掉所有与新表重复的元素之后，剩下的就是“本来碰撞后来不碰撞”的“出”列表
            remain:remainList//所有新表和旧表都有的元素，就是“原本就在一起，现在还在一起”的“不变”列表
        }
    }
    
}

/**
 * 这个类虽然叫质量效应，但它其实是一个物理类
 * 目前主营业务是碰撞检测
 * inst太难写了而且容易与init混淆，以后全部写成i
 */
export default class MassEffect{
    private constructor(){}

    public static init(scene:Laya.Scene):void{
        this.i = new MassEffect();
        this.i.scene = scene;
        this.i.testLayer = new Laya.Sprite;
        this.i.testLayer.pos(100,100);
        scene.addChild(this.i.testLayer);
        this.init = ()=>{};
    }
    public static i:MassEffect;//单例

    private coliBoxes:ColiBox[] = [];   //已注册的碰撞箱
    private oldPares:ColiPareList = new ColiPareList();  //上一次碰撞检测的结果
    
    private scene:Laya.Scene;       //游戏场景。实际上物理类不需要关注实体所在的场景，此属性仅供开发测试使用
    private testLayer:Laya.Sprite;  //专门用来测试的图层，不参与测试以外的功能

    private neo:ColiBox;

    /**
     * 每一帧中所要做的事
     * 1.进行碰撞检测
     * 2.刷新“旧碰撞关系”
     * 3.发布碰撞事件
     */
    public frameWork():void{
        let newList:ColiPareList = this._collisionDetect(this.coliBoxes);//进行碰撞检测
        let result = this.oldPares.findChange(newList);//寻找变化的碰撞关系
        this.oldPares = newList;//刷新“旧碰撞关系”
        
        result.in.foreach((ele)=>{
            let name:string = [ele[0].type, ele[1].type].sort().join("_") + "_IN";
            EventCentre.instance.event(EventCentre.FieldName.COLLISION, name, ele);//type of ele: [ColiBox, ColiBox]
            console.log(name);
        });

        result.out.foreach((ele)=>{
            let name:string = [ele[0].type, ele[1].type].sort().join("_") + "_OUT";
            EventCentre.instance.event(EventCentre.FieldName.COLLISION, name, ele);
        });

        // this.testLayer.graphics.clear();
        // this.coliBoxes.forEach((ele)=>{
        //     MyMath.drawRec(this.testLayer,ele,"#444444")
        // });
        // result.in.foreach((ele)=>{
        //     MyMath.drawRec(this.testLayer,ele[0],"#ff0000");
        //     MyMath.drawRec(this.testLayer,ele[1],"#ff0000");
        // });
        // result.out.foreach((ele)=>{
        //     MyMath.drawRec(this.testLayer,ele[0],"#0000ff");
        //     MyMath.drawRec(this.testLayer,ele[1],"#0000ff");
        // });
        // this.neo.pos(this.testLayer.mouseX-50, this.testLayer.mouseY-50);
        // MyMath.drawRec(this.testLayer,this.neo,"#00ff00");
    }

    /**
     * 测试用方法
     */
    public test():void{
        // let e = ColiBox.randomBoxes();
        // for (let n = 0; n < 50; n += 1) {
        //     this.coliBoxes.push(e[n]);
        // }
        // this.neo = e[0];
        // this.neo.size(100,100);
    }

    /**
     * 注册碰撞箱
     */
    public signBox(registrant:any, type:string):ColiBox{
        let box = new ColiBox(registrant, type);
        this.coliBoxes.push(box);
        return box;
    }
    
    

    /**
     * 输入一个碰撞箱列表，返回碰撞结果
     * @param list 碰撞箱列表
     * @returns 碰撞结果
     */
    private _collisionDetect(list:ColiBox[]):ColiPareList{
        MyMath.bubbleSort(list, (ele)=>{return ele.x});//以x轴坐标升序排列所有碰撞箱
        let pareList:ColiPareList = new ColiPareList();
        for(let n = 0; n < list.length - 1; n += 1) {
            const paringBox:ColiBox = list[n];
            for (let p = n + 1; p < list.length; p += 1) {
                let toPare:ColiBox = list[p];
                if (!paringBox.intersects_X(toPare)) {//如果二者在x轴不相交，直接跳出循环
                    break;
                } else if (paringBox.intersects_Y(toPare)) {//如果二者在x轴相交，且在y轴相交，则它们重合了
                    pareList.push([paringBox, toPare]);
                }
                //如果二者在x轴相交，在y轴不相交，则什么都不做，继续循环
            }
        }

        return pareList;

        /*
        碰撞检测算法
        首先，所有的待检测的碰撞箱对象都事先根据x值排了序，也就是从左到右排列
        
        然后开始碰撞检测

        1.数组中的每一个元素（除了最后一个）都会从它的位置的下一个元素开始找起
        index   0   1   2   3   4   ....    l-2     l-1
                []  []  []  []  []          []      []
                                            ↑
                                        第一层循环只遍历到这里
                                        也就是倒数第二个元素
        2.如果这个元素找到了一个在x轴与其重叠的碰撞箱，那么就再查看它们的y轴碰撞关系
        0                          1   2
        [这个碰撞箱在搜寻...]       [√]  []
            *查看实例0与实例1之间的碰撞关系，如果y轴不碰撞，什么都不做。如果y轴碰撞，将二者加入碰撞集合中
        
        3.找到一个x轴重叠碰撞箱之后，继续找下一个，直到整个数组遍历完成
        0                          1    2   3   4   5   6   7    ...
        [这个碰撞箱在搜寻...]       [√]  [√] [√] [√] [√] [√] [√]   ...

        4.但是，如果找到一个与其不重叠的碰撞箱，那么剩下的碰撞箱就都不检查了
        因为所有的碰撞箱已经事先按x轴坐标升序排列，出现一个不重叠之后剩下的也都不重叠
        0                          1    2   3      4                 5   6   7    ...
        [这个碰撞箱在搜寻...]       [√]  [√] [x] [(;ﾟдﾟ)wdnmd无视我?]  []  []  []   ...
                                            ↑
                                            发现不重叠的碰撞箱
                                            剩下的全都放弃检查
        
        搜索时大概会是这种感觉
        0   1   2   3   4
        []  []  []  []  []整个数组
        []搜寻者
            []  []  []  []配对成功项目
            []搜寻者
                []  []配对成功项目
                []搜寻者
                    []  []配对成功项目
                    []搜寻者
                        []配对成功项目
        结果：
        0:1 0:2 0:3 0:4
        1:2 1:3
        2:3 2:4
        3:4
        */
    }
    




}



/**
 * 储存代码
 */
function frameTest(){
        //let m_x:number = this.testLayer.mouseX;
        // let m_y:number = this.testLayer.mouseY;
        // this.neo.pos(m_x-50,m_y-50).size(100,100);
        // let newCollision = this._collisionDetect(this.coliBoxes);
        // let result = this.oldPares.findChange(newCollision);
        // //进入涂红，离开涂蓝，不变涂灰，neo涂绿
        // this.testLayer.graphics.clear();
        // for (let n = 0; n < result.remain.length; n += 1){
        //     let pair:[ColiBox, ColiBox] = result.remain.read(n);
        //     MyMath.drawRec(this.testLayer, pair[0], "#111111");
        //     MyMath.drawRec(this.testLayer, pair[1], "#111111");
        // }
        // for (let n = 0; n < result.in.length; n += 1){
        //     let pair:[ColiBox, ColiBox] = result.in.read(n);
        //     MyMath.drawRec(this.testLayer, pair[0], "#ff0000");
        //     MyMath.drawRec(this.testLayer, pair[1], "#ff0000");
        // }
        // for (let n = 0; n < result.out.length; n += 1){
        //     let pair:[ColiBox, ColiBox] = result.out.read(n);
        //     MyMath.drawRec(this.testLayer, pair[0], "#0000ff");
        //     MyMath.drawRec(this.testLayer, pair[1], "#0000ff");
        // }
        
        // console.log(`in:${result.in.length},out:${result.out.length},remain:${result.remain.length}`);
        // MyMath.drawRec(this.testLayer, this.neo, "#00ff00");
        // this.oldPares = newCollision;
}