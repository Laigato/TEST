import { _decorator, Component, Node, RichText } from 'cc';
import { BetData } from './BetData';
const { ccclass, property } = _decorator;

@ccclass('Bet')
export class Bet extends Component implements ICanInitialize
{
    @property(RichText)
    private amount: RichText;

    private betData : BetData;
    private currentBet : number;

    Initialize(value: IData): void 
    {
        this.betData = value as BetData;
        this.currentBet = this.betData.InitialBet;
        this.Refresh();
    }

    public GetCurrentBet()
    {
        return this.currentBet;
    }

    public Refresh()
    {
        this.amount.string = this.currentBet.toString();
    }

    public Increment()
    {
        this.currentBet += this.betData.Increment;
        this.Refresh();
    }
    
    public Decrement()
    {
        this.currentBet -= this.betData.Increment;
        this.Refresh();
    }
}
