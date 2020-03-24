import { Symbolized, MySymbol } from "../Fix/FixSymbol";
import { Vec2 } from "./DodMath";

export interface Renderer{

    /**
     * 新建棋盘
     * @param size 宽度/高度 
     * @param scale 缩放比（默认为1）
     */
    initBoard(arr: number[][], posVec2: Vec2, unitsize: Vec2, backGroundColor: string, frontColor: string, scale?: number):void

    /**
     * 重设棋盘缩放比
     * （这个东西虽然暂时用不到，但实现它有助于你维持一切显示都与缩放常数相关的逻辑）
     * @param value 缩放比
     */
    rescale(value:number):void
    /**
     * 新建一个Actor可视单元
     * @param bound 
     * @param pos 
     */
    displayActor(bound:Symbolized, pos?:Vec2):void
    /**
     * 修改一个可视单元的进度条长度
     * 自定义进度条样式和多进度条的实现方式我们以后再讨论，现在仅针对Actor
     * @param bound 
     * @param max 最大值
     * @param current 最小值
     * @param color 进度条颜色（背景颜色默认）
     */
    editBar(bound:Symbolized, symb:number, percentage?:number, color?:string):void
    
    /**
     * 默认攻击特效
     * 随便糊弄一下就行，比如两者之间连条线或者箭头什么的
     * 不用在意开销，怎么方便怎么写
     * @param from 
     * @param to 
     */
    defaultAtkEffect(from:Symbolized, to:Symbolized):void
    
    /**
     * 默认受伤特效
     * 同样，随便糊弄，比如红一下
     * 舟游原作我记得也是红一下
     * @param bound 
     */
    defaultDmgEffect(bound:Symbolized):void

    /**
     * 摧毁一个Actor可视单元
     * @param bound 
     */
    distroyActor(bound:Symbolized):void

    /**
     * 在一个可视单元上写一些字
     * 每次在同一个单元上写字都会把上一次的擦掉
     * 你可能要自己实现换行逻辑
     * 你得把我的'\n'字符手动识别成换行符，如果laya做不到的话
     * @param bound 
     * @param content 书写内容
     * @param pos 字幕相对位置
     */
    write(bound:Symbolized, content:String, pos?:Vec2):void

    /**
     * 启用鼠标停留显示文字
     * 启用后，鼠标停留在单元上才会显示它的对应文字，移开时文字消失
     * 再次调用则禁用显示文字
     */
    switchHoverText():void

    /**
     * 移动可视单元
     * @param bound 
     * @param pos 
     */
    move(bound:Symbolized, pos:Vec2):void

    /**
     * 在某个单元上新增一个按钮
     * 
     * @param bound 目标单元编号
     * @param callback 按钮按下时调用的函数
     * @param text 按钮显示文字（默认居中）
     * @param pos 相对位置（要有默认位置，而且要针对默认位置多次添加按钮做优化）
     * @param size 按钮尺寸（要有默认尺寸）
     * @param color 颜色（要有默认颜色，而且要针对默认位置多次添加默认颜色做优化）
     */
    attachButton(bound:Symbolized,num:number, callback:Function, text?:string, pos?:Vec2, size?:Vec2, color?:string):void
}