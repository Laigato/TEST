import { _decorator, Component, Node, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ReelResult')
export class ReelResult implements IData 
{
    public resultLeft: string[];
    public resultMid: string[];
    public resultRight: string[];
}
