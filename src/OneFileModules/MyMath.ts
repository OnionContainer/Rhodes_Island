export interface Comparable{
    /**
     * 判断两个元素是否相等
     * 必须可逆
     * @param ele 
     */
    equals(ele:Comparable):boolean
}
    
export class MyMath{

    /**
     * 返回a/b的整数结果（小数部分舍去)
     * a，b如果不在正整数域，请确保阅读过此函数
     * |————|————|————|————|————|
     *     -1<---0<---1<---
     *      可以理解为在数轴上把结果向左映射
     * @param a 
     * @param b 
     */
    public static intDivision(a:number, b:number):number{
        return (a-a%b)/b;
    }

    /**
     * 在平面上求从指定出发点到指定终点作一条指定长度的线段，此线段的另一端点的坐标
     * （如果此线段的长度大于等于出发点到终点的距离，则输出终点的坐标）
     * @param from 
     * @param end 
     * @param movement 
     */
    public static moveTo(from:Vec2, end:Vec2, movement:number):Vec2{
        const xdis = end.x - from.x;
        const ydis = end.y - from.y;
        const distance = Math.sqrt((xdis)**2 + (ydis)**2);
        if (movement >= distance) {
            return end;
        }
        const ratio = movement / distance;
        return new Vec2(from.x + xdis*ratio,from.y + ydis*ratio);
    }

    /**
     * MyMath.moveTo函数的另一个版本。这个版本会直接修改(from:Vec2)传入的对象本身，并判断最终from与end两个对象是否重合
     * @param from 
     * @param end 
     * @param movement 
     */
    public static moveToSideEffect(from:Vec2, end:Vec2, movement:number):boolean{
        const xdis = end.x - from.x;
        const ydis = end.y - from.y;
        const distance = Math.sqrt((xdis)**2 + (ydis)**2);
        if (movement >= distance) {
            from.x = end.x;
            from.y = end.y;
            return true;
        }
        const ratio = movement / distance;
        from.x = from.x + xdis*ratio;
        from.y = from.y + ydis*ratio;
        return false;
    }

    /**
     * MyMath.moveTo函数的另一个版本。返回直线速度在xy两轴上的分量
     * @param from 
     * @param end 
     * @param movement 
     */
    public static moveToComponent(from:Vec2, end:Vec2, movement:number):Vec2{
        
        const xdis = end.x - from.x;
        const ydis = end.y - from.y;
        const distance = Math.sqrt((xdis)**2 + (ydis)**2);
        const ratio = movement / distance;
        return new Vec2(xdis*ratio, ydis*ratio);
    }
    
}

export class Vec2 implements Comparable{

    public static listFromList(list:number[][]):Vec2[]{
        let result:Vec2[] = [];

        list.forEach(ele=>{
            result.push(new Vec2(ele[0],ele[1]));
        });

        return result;
    }

    public x:number;
    public y:number;

    /**
     * 返回从此点到指定点的距离
     * @param end 
     */
    public distanceTo(end:Vec2):number{
        return ((end.x - this.x)**2 + (end.y - this.y)**2)**0.5;
    }

    /**
     * 返回此向量的复制
     */
    public clone():Vec2{
        return new Vec2(this.x, this.y);
    }

    public equals(ele:Vec2):boolean{
        return this.x === ele.x && this.y === ele.y;
    }

    constructor(x?:number, y?:number) {
        this.x = x;
        this.y = y;
    }
}


