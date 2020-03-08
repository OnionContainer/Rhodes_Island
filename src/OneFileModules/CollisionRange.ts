import {Vec2} from "./MyMath";


/**
 * by XWV
 */


/**
 * 圆形碰撞范围
 */
export class CircleCollisionRange {
    public center: Vec2;
    public radius: number;

    /**
     * @param center 圆心定位
     * @param radius 半径
     */
    constructor(center: Vec2, radius: number) {
        this.center = center;
        this.radius = radius;
    }

    isCoincideWithRange(range: CircleCollisionRange): boolean {
        // return range.isCoincideWithCircle(this.center, this.radius);
        return Math.abs(range.center.distanceTo(this.center)) <= (Math.abs(this.radius) + Math.abs(range.radius));
    }

    // isCoincideWithCircle(pos: Vec2, radius: number): boolean {
    //     //原点距离小等于半径和
    //     return Math.abs(pos.distanceTo(this.center)) <= (Math.abs(this.radius) + Math.abs(radius));
    // }

}


// export abstract class CollisionRange {
//
//     /**
//      * 判断是否与一个圆形区域重叠
//      * @param pos 圆心定位
//      * @param radius 半径
//      */
//     abstract isCoincideWithCircle(pos: Vec2, radius: number): boolean
//
//
//     /**
//      * 判断是否与另一个范围重叠
//      * @param range 另一个范围
//      */
//     abstract isCoincideWithRange(range: CollisionRange): boolean
// }


// /**
//  * 多边形碰撞范围
//  */
// export class PolygonCollisionRange implements CollisionRange {
//     //顶点列表
//     private vertexList: Vec2[];
//
//     constructor(vertexList: Vec2[]) {
//         this.vertexList.push(...vertexList)
//     }
//
//     isCoincideWithCircle(pos: Vec2, radius: number): boolean {
//         if (this.isPosInRange(pos)) {
//             return true;
//         } else {
//             throw new Error("未实现")
//         }
//     }
//
//
//     isCoincideWithRange(range: CollisionRange): boolean {
//         if (range instanceof CircleCollisionRange) {
//             return this.isCoincideWithCircle(range.center, range.radius);
//         } else if (range instanceof PolygonCollisionRange) {
//             //互相判断是否有顶点在对方内部
//             let result: boolean;
//             this.vertexList.forEach(p => {
//                 if (!result) {
//                     result = range.isPosInRange(p)
//                 }
//             });
//             range.getPosList().forEach(p => {
//                 if (!result) {
//                     result = this.isPosInRange(p)
//                 }
//             });
//             return result;
//         } else {
//             throw new Error("未实现")
//         }
//     }
//
//     isPosInRange(pos: Vec2) {   //坐标是否在范围内
//         if (this.vertexList.length < 3) {
//             throw new Error("多边形顶点数不足");
//         }
//         let intersectionCount = 0;
//         for (let i = 0; i < this.vertexList.length; i++) {
//             let j = i + 1;
//             if (!(j < this.vertexList.length)) {
//                 j = 0;
//             }
//
//             let pos1 = this.vertexList[i];
//             let pos2 = this.vertexList[j];
//
//             let left = pos1.x < pos2.x ? pos1.x : pos2.x;
//             let right = pos1.x > pos2.x ? pos1.x : pos2.x;
//
//             let top = pos1.y > pos2.y ? pos1.y : pos2.y;
//             let bottom = pos1.y < pos2.y ? pos1.y : pos2.y;
//
//
//             if (pos.y > top || pos.y < bottom || pos.x < left || pos.x > right) {
//                 continue;
//             }
//
//
//             let dX = pos2.x - pos1.x;
//             let dY = pos2.y - pos1.y;
//             let intersectionX = (pos.y - pos1.y) / dY * dX + pos1.x;
//             if (intersectionX == pos.x) {
//                 //相切
//                 return true;
//             } else if (intersectionX < pos.x) {
//                 intersectionCount++;
//             }
//         }
//
//         //从点作射线与多边形的边相交的次数，奇数则在多边形内部
//         return intersectionCount % 2 == 1;
//     }
//
//     getPosList(): Vec2[] {
//         return this.vertexList;
//     }
//
// }