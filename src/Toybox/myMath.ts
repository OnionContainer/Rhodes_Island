

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


