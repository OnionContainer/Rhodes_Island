import { Comparable } from "./MyMath";

export class KVPair<K,V>{
    private _list:any = {};
    public edit(key:K, value:V):void{
        this._list[key] = value;
    }
    public read(key:K):V{
        return this._list[key];
    }
}


class Node<E>{
    public item:E;
    public next:Node<E>;
    constructor(item:E, next:Node<E>){
        this.item = item;
        this.next = next;
    }
}

export class LinkList<E>{
    private _head:Node<E>;
    private _tail:Node<E>;
    private _length:number = 0;
    constructor(){
        this._head = new Node<E>(null, null);
        this._tail = new Node<E>(null, null);
    }

    //基础属性
    public get length():number{
        // let result:number = 0;
        // let current:Node<E> = this._head;
        // while (current.next !== null) {
        //     result += 1;
        //     current = current.next;
        // }
        // return result;
        return this._length;
    }

    public get isEmpty():boolean{
        return this._head.next === null;
    }

    //增删改查
    //增
    public push(item:E):void{
        let last:Node<E> = new Node<E>(item, null);
        if (this.isEmpty) {
            this._head.next = last;
            this._tail.next = last;
        } else {
            this._tail.next.next = last;
            this._tail.next = last;
        }
        this._length += 1;
    }

    public unshift(item:E):void{
        let first:Node<E> = new Node<E>(item, null);
        if (this.isEmpty) {
            this._tail.next = first;
            this._head.next = first;
        } else {
            first.next = this._head.next;
            this._head.next = first;
        }
        this._length += 1;
    }

    public insert(index:number, item:E):boolean{
        if (index < 0 || index > this._length) {//这句不一样
            return false;
        }

        if (index === this.length) {
            this.push(item);
            return true;
        }

        let current:Node<E> = this._head;//这句和其他遍历是不一样的，因为要选取到选定位置的前面一格
        for (let n = 0; n < index; n += 1) {
            current = current.next;
        }

        current.next = new Node<E>(item, current.next);
        this._length += 1;

        return true;
    }

    //删
    public remove(index:number):E{
        if (index < 0 || index >= this.length) {
            return null;
        }

        let current:Node<E> = this._head.next;
        for (let n = 0; n < index; n += 1) {
            current = current.next;
        }

        let item:E = current.item;
        current = null;
        this._length -= 1;

        return current.item;
    }

    public shift():E{
        if (this.isEmpty) {
            return null;
        }

        let item = this._head.next.item;
        this._head.next = this._head.next.next;

        if (this.isEmpty) {
            this._tail.next = null;
        }

        this._length -= 1;
        return item;
    }

    //改
    public write(index:number, item:E):void{
        if (index < 0 || index >= this.length) {
            return;
        }

        let current:Node<E> = this._head.next;
        for (let n = 0; n < index; n += 1) {
            current = current.next;
        }

        current.item = item;
    }

    //查
    public read(index:number):E{
        if (index < 0 || index >= this.length) {
            return;
        }

        let current:Node<E> = this._head.next;
        for (let n = 0; n < index; n += 1) {
            current = current.next;
        }

        return current.item;
    }

    public search(item:E):number[]{
        let result:number[] = [];
        this.foreach((ele:E, index:number)=>{
            if (ele === item) {
                result.push(index);
            }
        });
        return result;
    }

    /**
     * 判断链表中是否存在某一元素
     * @param item 
     */
    public has(item: E):boolean{

        let current = this._head.next;
        while (current != null) {
            if (current.item == item) {
                return true;
            }
            current = current.next;
        }

        return false;
    }

    //高阶函数
    public foreach(f:(ele:E, index:number, list:LinkList<E>)=>void):void{
        let current = this._head.next;
        let num:number = 0;
        while (current !== null) {
            f(current.item, num, this);
            current = current.next;
            num += 1;
        }
    }

    /**
     * 请暂时不要使用这个函数，因为我也不知道它会不会爆炸
     * 除非你读过这个函数的源代码
     * @param f 判断元素优先级的回调函数
     * @param increase 是否升序，默认升序
     * @returns 返回一个排序的链表
     */
    public sortby(f:(ele:E)=>number, increase:boolean = true):LinkList<E>{
        let priority:LinkList<number> = new LinkList<number>();
        let sorted:LinkList<E> = new LinkList<E>();
        priority.push(-0);
        sorted.push(null);

        let compare:(a:number,b:number)=>boolean = increase?(a,b)=>{return a < b;}:(a,b)=>{return a > b};

        this.foreach((ele)=>{
            let currentPri = f(ele);
            let node:Node<E> = sorted._head.next;
            let priNode:Node<number> = priority._head.next;

            let foundPlace:boolean = false;
            while (node.next !== null) {
                // if (currentPri < priNode.next.item) {
                if (compare(currentPri, priNode.next.item)) {
                    node.next = new Node<E>(ele, node.next);
                    priNode.next = new Node<number>(currentPri, priNode.next);
                    foundPlace = true;
                    break;
                }

                node = node.next;
                priNode = priNode.next;
            }

            if (!foundPlace) {
                sorted.push(ele);
                priority.push(currentPri);
            }
        });

        sorted.shift();
        return sorted;
    }

    // public bbSortBy(f:(ele:E)=>number, increase:boolean = true):LinkList<E>{

    // }

}

export class PArray<E>{
    public arr:E[];
    public pointer:number;

    constructor(source:E[] = [], initPoint:number = -1){
        this.arr = source;
        this.pointer = initPoint;
    }

    public read():E{
        return this.arr[this.pointer];
    };

    public step():void{
        this.pointer += 1;
    }

    public get out():boolean{
        return this.pointer < 0 || this.pointer >= this.arr.length;
    }
}



export class ArrayAlgo{

    /**
     * 输入的两个数组的每个index对应元素是否相等
     * @param arr0 
     * @param arr1 
     */
    public static strictCompare(arr0:Comparable[], arr1:Comparable[]):boolean{
        if (arr0.length !== arr1.length) {
            return false;
        }
        for (let i = 0; i < arr0.length; i += 1) {
            if (!arr0[i].equals(arr1[i])) {
                return false;
            }
        }

        return true;
    }

    /**
     * 返回一个集合c，且使得它具有如下性质：
     * 对于每个存在于集合a中的元素，如果它不在集合b中，则它在集合c中
     * 即c=a-b
     * @param a 
     * @param b 
     */
    public static findComplementSet(a:Comparable[], b:Comparable[]):Comparable[]{
        let result:Comparable[] = [];
        for (let ele of a) {
            if (ArrayAlgo.findEle(ele, b) === -1) {
                result.push(ele);
            }
        };
        //求相对补集a-b
        return result;
    }

    public static findIntersectionSet(a:Comparable[], b:Comparable[]){
        //求交集a∩b
    }

    /**
     * 求ele在arr中的index，若未找到则返回-1
     * ele必须实现comparable接口
     * @param ele 
     * @param arr 
     */
    public static findEle(ele:Comparable, arr:Comparable[]):number{
        for (let i = 0; i < arr.length; i += 1) {
            if (ele.equals(arr[i])) {
                return i;
            }
        }
        return -1;
    }

    /**
     * 从arr中移除ele
     * 如果ele不存在则什么都不做
     * @param ele 
     * @param arr 
     */
    public static removeEle(ele:any, arr:any[]):any[]{
        const i = arr.indexOf(ele);
        if (i !== -1) {
            arr.splice(i,1);
        }
        return arr;
    }
}




// export class Box extends Laya.Rectangle{

//     public unitX:number;
//     public unitY:number;
    

//     constructor(){
//         super(0,0,0,0);
//     }
   

//     /**
//      * 就是……来一组（100个）随机的碰撞箱
//      * @param xRange 
//      * @param yRange 
//      * @param widRange 
//      * @param higRange
//      */
//     public static randomBoxes(xRange:number = 1200, yRange:number = 800, widRange:number = 300, higRange:number = 300):Box[]{
//         const rad:Function = MyMath.randomInt;
//         let result:Box[] = [];
//         for(let i = 0; i < 50; i += 1) {
//             result.push(new Box());
//             result[i].pos(rad(xRange), rad(yRange)).size(rad(widRange), rad(higRange));
//         }
//         return result;
//     }

//     public pos(x:number, y:number):Box{
//         this.x = x;
//         this.y = y;
//         return this;
//     }

//     public size(width:number, height:number):Box{
//         this.width = width;
//         this.height = height;
//         return this;
//     }

//     public intersects_X(rec:Box):boolean{
//         if (this.x < rec.x) {
//             return rec.intersects_X(this);
//         }
//         return  (this.x >= rec.x && this.x <= rec.right) ||
//                 (this.right >= rec.x && this.right <= rec.right)
//     }

//     public intersects_Y(rec:Box):boolean{
//         if (this.y<rec.y) {
//             return rec.intersects_Y(this);
//         }
//         return  (this.y >= rec.y && this.y <= rec.bottom) ||
//                 (this.bottom >= rec.y && this.bottom <= rec.bottom)
//     }
// }
    
// class MapNode<K,V>{
//     public key;
//     public value;
//     constructor(key:K, value:V){
//         this.key = key;
//         this.value = value;
//     }
// }

// export module Struc{
//     export class LinkList<E>{
//         private _head:Node<E>;
//         private _tail:Node<E>;
//         constructor(){
//             this._head = new Node<E>(null, null);
//             this._tail = new Node<E>(null, null);
//         }

//         //基础属性
//         public get length():number{
//             let result:number = 0;
//             let current:Node<E> = this._head;
//             while (current.next !== null) {
//                 result += 1;
//                 current = current.next;
//             }
//             return result;
//         }

//         public get isEmpty():boolean{
//             return this._head.next === null;
//         }

//         //增删改查
//         //增
//         public push(item:E):void{
//             let last:Node<E> = new Node<E>(item, null);
//             if (this.isEmpty) {
//                 this._head.next = last;
//                 this._tail.next = last;
//             } else {
//                 this._tail.next.next = last;
//                 this._tail.next = last;
//             }
            
//         }

//         public unshift(item:E):void{
//             let first:Node<E> = new Node<E>(item, null);
//             if (this.isEmpty) {
//                 this._tail.next = first;
//                 this._head.next = first;
//             } else {
//                 first.next = this._head.next.next;
//                 this._head.next = first;
//             }
//         }

//         public insert(index:number, item:E):boolean{
//             if (index < 0 || index > this.length) {//这句不一样
//                 return false;
//             }

//             if (index === this.length) {
//                 this.push(item);
//                 return true;
//             }

//             let current:Node<E> = this._head;//这句和其他遍历是不一样的，因为要选取到选定位置的前面一格
//             for (let n = 0; n < index; n += 1) {
//                 current = current.next;
//             }

//             current.next = new Node<E>(item, current.next);

//             return true;
//         }

//         //删
//         public remove(index:number):E{
//             if (index < 0 || index >= this.length) {
//                 return null;
//             }

//             let current:Node<E> = this._head.next;
//             for (let n = 0; n < index; n += 1) {
//                 current = current.next;
//             }

//             let item:E = current.item;
//             current = null;

//             return current.item;
//         }

//         public shift():E{
//             if (this.isEmpty) {
//                 return null;
//             }

//             let item = this._head.next.item;
//             this._head.next = this._head.next.next;
//             if (this.isEmpty) {
//                 this._tail.next = null;
//             }
//             return item;
//         }

//         //改
//         public write(index:number, item:E):void{
//             if (index < 0 || index >= this.length) {
//                 return;
//             }

//             let current:Node<E> = this._head.next;
//             for (let n = 0; n < index; n += 1) {
//                 current = current.next;
//             }

//             current.item = item;
//         }

//         //查
//         public read(index:number):E{
//             if (index < 0 || index >= this.length) {
//                 return;
//             }

//             let current:Node<E> = this._head.next;
//             for (let n = 0; n < index; n += 1) {
//                 current = current.next;
//             }

//             return current.item;
//         }

//         public search(item:E):number[]{
//             let result:number[] = [];
//             this.foreach((ele:E, index:number)=>{
//                 if (ele === item) {
//                     result.push(index);
//                 }
//             });
//             return result;
//         }

//         /**
//          * 判断链表中是否存在某一元素
//          * @param item 
//          */
//         public has(item: E):boolean{

//             let current = this._head.next;
//             while (current != null) {
//                 if (current.item == item) {
//                     return true;
//                 }
//                 current = current.next;
//             }

//             return false;
//         }

//         //高阶函数
//         public foreach(f:(ele:E, index:number, list:LinkList<E>)=>void):void{
//             let current = this._head.next;
//             let num:number = 0;
//             while (current !== null) {
//                 f(current.item, num, this);
//                 current = current.next;
//                 num += 1;
//             }
//         }

//         /**
//          * 请暂时不要使用这个函数，因为我也不知道它会不会爆炸
//          * 除非你读过这个函数的源代码
//          * @param f 判断元素优先级的回调函数
//          * @param increase 是否升序，默认升序
//          * @returns 返回一个排序的链表
//          */
//         public sortby(f:(ele:E)=>number, increase:boolean = true):LinkList<E>{
//             let priority:LinkList<number> = new LinkList<number>();
//             let sorted:LinkList<E> = new LinkList<E>();
//             priority.push(-0);
//             sorted.push(null);

//             let compare:(a:number,b:number)=>boolean = increase?(a,b)=>{return a < b;}:(a,b)=>{return a > b};

//             this.foreach((ele)=>{
//                 let currentPri = f(ele);
//                 let node:Node<E> = sorted._head.next;
//                 let priNode:Node<number> = priority._head.next;

//                 let foundPlace:boolean = false;
//                 while (node.next !== null) {
//                     // if (currentPri < priNode.next.item) {
//                     if (compare(currentPri, priNode.next.item)) {
//                         node.next = new Node<E>(ele, node.next);
//                         priNode.next = new Node<number>(currentPri, priNode.next);
//                         foundPlace = true;
//                         break;
//                     }

//                     node = node.next;
//                     priNode = priNode.next;
//                 }

//                 if (!foundPlace) {
//                     sorted.push(ele);
//                     priority.push(currentPri);
//                 }
//             });

//             sorted.shift();
//             return sorted;
//         }

//         // public bbSortBy(f:(ele:E)=>number, increase:boolean = true):LinkList<E>{

//         // }

//     }

//     export class Map<K,V>{
//         private _list:Array<MapNode<K,V>>
//         constructor(){
//             this._list = []
//         }
//         public get(key:K):V{
//             for (let ele of this._list){
//                 if (ele.key === key) {
//                     return ele.value
//                 }
//             }
//             return null
//         }
//         public getKeyByVal(val:V):K{
//             for (let ele of this._list) {
//                 if (ele.value === val) {
//                     return ele.key
//                 }
//             }
//             return null
//         }
//         public keyExist(key:K):boolean{
//             for (let ele of this._list) {
//                 if (ele.key === key) {
//                     return true
//                 }
//             }
//             return false
//         }
//         public set(key:K,value:V):boolean{
//             for (let n = 0; n < this._list.length; n += 1) {
//                 if (this._list[n].key === key) {
//                     this._list[n].value = value
//                     return false;
//                 }
//             }
//             this._list.push(new MapNode<K,V>(key,value))
//             return true;
//         }
//         public batchSet(keys:K[], values:V[]):boolean{
//             if (keys.length !== values.length) {
//                 return false;
//             }
//             for (let n = 0; n < keys.length; n += 1) {
//                 this.set(keys[n], values[n]);
//             }
//             return true;

//         }
//         public remove(key:K):boolean{
//             let count:number = 0;
//             for (let ele of this._list) {
//                 if (ele.key === key) {
//                     this._list.splice(count,1);
//                     return true
//                 }
//                 count += 1;
//             }
//             return false
//         }
//         public get length():number{
//             return this._list.length
//         }
//         public foreach(f:(k:K, v:V)=>void):void{
//             for (let ele of this._list) {
//                 f(ele.key, ele.value);
//             }
//             return;
//         }
//         public filter(f:(k:K,v:V)=>boolean):Map<K,V>{
//             let result = new Map<K,V>();
//             for (let ele of this._list) {
//                 if (f(ele.key, ele.value)){
//                     result.set(ele.key, ele.value);
//                 }
//             }
//             return result;
//         }
//     }

//     export class PointerList<E>{
//         private _list:Array<E> = [];
//         private _pointer:number = 0;
//         constructor(source:Array<E> = [], initPoint:number = 0){
//             source.forEach((ele)=>{
//                 this._list.push(ele);
//             })
//         }

//         get exceeding():boolean{
//             return this._pointer >= this._list.length || this._pointer < 0
//         }

//         /*
//         以下注释中，把数组看作横向排列的一系列元素
//         index = 0的元素在最左侧
//         */

//         read():E{//查看当前pointer所指的元素
//             return this._list[this._pointer]
//         }

//         step():E{//pointer向右移一步
//             this._pointer+=1;
//             return this.read();
//         }

//         to(place:number):PointerList<E>{//pointer移到指定位置
//             this._pointer = place
//             return this
//         }

//         push(data:E):PointerList<E>{//在数组末尾增加一个元素
//             this._list.push(data)
//             return this
//         }

//         set(index:number,data:E):PointerList<E>{//覆写数组特定index中的元素
//             this._list[index] = data
//             return this
//         }
        
//         next(shift:number = 1):E{
//             //读取位于当前pointer所指的元素右边若干格的元素
//             //shift默认为1，即当前pointer右边相邻的元素
//             //shift为负数时获取左侧的元素
//             return this._list[this._pointer+shift]
//         }

//         get length():number{//获取数组长度
//             return this._list.length
//         }

//         get last():E{//获取最后一项
//             return this._list[this._list.length-1]
//         }

//         get first():E{//获取首项
//             return this._list[0];
//         }

//         get pointer():number{//获取pointer
//             return this._pointer
//         }

//         get atEnd():boolean{//查看“pointer指向数组最右侧的元素”的真值
//             return this._pointer === this._list.length - 1
//         }
//     }
// }