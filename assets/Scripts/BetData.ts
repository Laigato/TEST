import { _decorator, Component, Node, RichText } from 'cc';
const { ccclass } = _decorator;

@ccclass('BetData')
export class BetData implements IData 
{
    public InitialBet: number;
    public Increment: number = 5;
}
