/**
 * 虽然列向量和行向量都就是个定长数组
 * 但我这里还是当列向量吧
 */
export class ColoumVector{
    public static fromArray(arr:number[]):ColoumVector{
        let result = new ColoumVector(arr.length);
        arr.forEach((ele,index)=>{
            result.write(index, ele);
        });

        return result;
    }

    public readonly height:number;
    private _data:number[] = [];

    constructor(height:number){
        this.height = height;
        
        while(height > 0) {
            this._data.push(0)
            height -= 1;
        }
    }

    //加减乘除没有减除
    public plus(w:ColoumVector):ColoumVector{
        if (w.height !== this.height) {
            throw new DOMException("Not funny didn't laugh", "Not Funny Exception");
        }

        let result:ColoumVector = this.clone;
        w._data.forEach((ele,index)=>{
            result._data[index] += ele;
        })
        return result;
    }

    public multi(c:number):ColoumVector{
        let result:ColoumVector = this.clone;
        this._data.forEach((ele,index)=>{
            result._data[index] = c*ele;
        });
        return result;
    }


    //增删改查没有增删
    public write(index:number, value:number):void{
        this._data[index] = value;
    }

    public read(index:number):number{
        return this._data[index];
    }

    public cover(source:ColoumVector):void{
        if (source.height !== this.height) {
            throw new DOMException("Not funny didn't laugh", "Not Funny Exception");
        }

        source._data.forEach((ele,index)=>{
            this._data[index] = ele;
        });
    }
    
    //其他函数
    public print():ColoumVector{
        console.log(this._data.join("\n"));
        return this;
    }

    public get clone():ColoumVector{
        let result:ColoumVector = new ColoumVector(this.height);
        this._data.forEach((ele,index)=>{
            result._data[index] = ele;
        });
        return result;
    }
}

/**
 * 虽然一排列向量和一列行向量都可以当矩阵
 * 但这里是一排列向量
 */
export class Matrix{
    public readonly height:number;
    public readonly width:number;
    private _data:ColoumVector[];
    constructor(height:number, width:number){
        this.height = height;
        this.width = width;
        this._data = [];
        for (let n = 0; n < width; n += 1) {//零向量满上
            this._data.push(new ColoumVector(height));
        }
    }
    //增删改查没有增删
    public writeColoum(index:number,coloum:ColoumVector):void{
        this._data[index].cover(coloum);
    }

    public write(row:number, col:number, value:number):void{
        // console.log(row +"|" + col);
        if (row >= this.height || col >= this.width || row < 0 || col < 0) {
            throw new DOMException("Not funny didn't laugh", "Not Funny Exception");
        }
        this._data[col].write(row, value);
    }

    public readColoum(index:number):ColoumVector{
        return this._data[index];
    }

    public read(row:number, col:number):number{
        return this._data[col].read(row);
    }

    //加减乘除没有减除
    public transColVector(v:ColoumVector):ColoumVector{
        if (v.height !== this.width) {
            throw new DOMException("Not funny didn't laugh", "Not Funny Exception");
        }

        let result = new ColoumVector(this.height);
        for (let col = 0; col < this.width; col += 1) {
            result = result.plus(this._data[col].multi(v.read(col)));
        }
        return result;
    }

    //其他函数
    public str():String{
        let result:String = "";
        for (let row = 0; row < this.height; row += 1) {
            for (let col = 0; col < this.width; col += 1) {
                result += this._data[col].read(row) + "\t";
            }
            result+="\n";
        }
        return result;
    }

    public print():void{
        console.log(this.str());
    }
}

export default class MyMath{
    //Laya模块
    /**
     * 判断两个矩形对象是否重叠
     * @param rec0 一个矩形
     * @param rec1 另一个矩形
     */
    public static overlap_Rec(rec0:Laya.Rectangle, rec1:Laya.Rectangle):boolean {
        return  this.overlap_2d(rec0.x,rec1.x,rec0.width,rec1.width) &&
                this.overlap_2d(rec0.y,rec1.y,rec0.height,rec1.height);
    }

    /**
     * 在指定绘图节点中绘制矩形
     * @param spr 绘图节点
     * @param rec 矩形
     * @param color 颜色
     */
    public static drawRec(spr:Laya.Sprite, rec:Laya.Rectangle, color:string="#ffffff"):void{
        spr.graphics.drawRect(rec.x, rec.y, rec.width, rec.height, color, "#888888", 2);
    }

    
    //Laya模块




    /**
     * 判断在数轴上两条线是否重叠
     * @param point0 线段0的左侧端点
     * @param point1 线段1的左侧端点
     * @param length0 线段0的长度
     * @param length1 线段1的长度
     */
    public static overlap_2d(point0:number, point1:number, length0:number, length1:number):boolean{
        return  MyMath.include_2d(point0,length0,point1) ||
                MyMath.include_2d(point0,length0,point1+length1);
    }
    /**
     * 判断在数轴上一个点是否处于一条线段上
     * @param locate 线段左侧端点位置
     * @param length 线段长度
     * @param dot 点位
     */
    public static include_2d(locate:number, length:number, dot:number):boolean{
        return dot>=locate && dot<=locate+length;
    }

    /**
     * @param upLimit 上界
     * @param loLimit 下界
     * @returns 上界与下界之间的随机整数
     */
    public static randomInt(upLimit:number, loLimit:number = 0):number{
        return Math.round(Math.random()*(upLimit-loLimit) + loLimit);
    }

    /**
     * 
     * @param front 原数字
     * @param shift 增加量
     * @param end 增加上限（若增加量为负，则为下限）
     * 
     */
    public static moveTo(front:number, shift:number, end:number):number {
        let result:number = front + shift;
        if (shift>0 && result>end) {
            result = end;
        } else if (shift<0 && result<end) {
            result = end;
        }
        return result;
        
    }

    /**
     * 冒泡排序
     * 注意这个算法会直接修改原数组
     * @param source 原数组
     * @param value 优先值取值函数
     * @param increase 是否升序（默认升序） 
     */
    public static bubbleSort(source:any[], value:Function, increase:boolean = true):void{
        // let time = 0;
        let complete:boolean = true;
        for (let n = source.length - 1; n > 0; n -= 1) {
            complete = true;
            for(let m = 0; m < n; m += 1) {
                let cur:number = value(source[m]);
                let next:number = value(source[m + 1]);
                if (increase?(cur>next):(cur<next)) {
                    let store = source[m];
                    source[m] = source[m+1];
                    source[m + 1] = store;
                    complete = false;
                }
                // time += 1;
            }
            if (complete) {
                break;
            }
        }
    }


}


