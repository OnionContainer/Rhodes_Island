
class HashMapNode<K,V>{
    public key;
    public value;
    constructor(key:K, value:V){
        this.key = key;
        this.value = value;
    }
}

export module Struc{
    export class HashMap<K,V>{
        private _list:Array<HashMapNode<K,V>>
        constructor(){
            this._list = []
        }
        public get(key:K):V{
            for (let ele of this._list){
                if (ele.key === key) {
                    return ele.value
                }
            }
            return null
        }
        public getKeyByVal(val:V):K{
            for (let ele of this._list) {
                if (ele.value === val) {
                    return ele.key
                }
            }
            return null
        }
        public keyExist(key:K):boolean{
            for (let ele of this._list) {
                if (ele.key === key) {
                    return true
                }
            }
            return false
        }
        public set(key:K,value:V):void{
            for (let n = 0; n < this._list.length; n += 1) {
                if (this._list[n].key === key) {
                    this._list[n].value = value
                    return
                }
            }
            this._list.push(new HashMapNode<K,V>(key,value))
        }
        public remove(key:K):boolean{
            let count:number = 0;
            for (let ele of this._list) {
                if (ele.key === key) {
                    this._list.splice(count,1);
                    return true
                }
                count += 1;
            }
            return false
        }
        public get length():number{
            return this._list.length
        }
    }

    export class PointerList<E>{
        private _list:Array<E> = []
        private _pointer:number = 0
        constructor(source:Array<E> = [], initPoint:number = 0){
            source.forEach((ele)=>{
                this._list.push(ele)
            })
        }

        get exceeding():boolean{
            return this._pointer >= this._list.length || this._pointer < 0
        }

        read():E{
            return this._list[this._pointer]
        }

        step():PointerList<E>{
            this._pointer+=1
            return this
        }

        to(place:number):PointerList<E>{
            this._pointer = place
            return this
        }

        push(data:E):PointerList<E>{
            this._list.push(data)
            return this
        }

        set(index:number,data:E):PointerList<E>{
            this._list[index] = data
            return this
        }
        
        next(shift:number = 1):E{
            return this._list[this._pointer+shift]
        }

        get length():number{
            return this._list.length
        }

        get last():E{
            return this._list[this._list.length-1]
        }

        get pointer():number{
            return this._pointer
        }

        get atEnd():boolean{
            return this._pointer === this._list.length - 1
        }
    }
}