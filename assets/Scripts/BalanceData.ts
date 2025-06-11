import { _decorator, Component, Node, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BalanceData')
export class BalanceData implements IData 
{
    public InitialBalance: number;
}
