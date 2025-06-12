import { _decorator, Component, Node, RichText } from 'cc';
import { BalanceData } from './BalanceData';
const { ccclass, property } = _decorator;

@ccclass('Balance')
export class Balance extends Component implements ICanInitialize
{
    @property(RichText)
    private amount: RichText;
    
    private currentBalance: number = 0;
    
    public Initialize(value: IData): void 
    {
        this.currentBalance = (value as BalanceData).InitialBalance;
        this.Refresh();
    }

    public Add(amount: number)
    {
        this.currentBalance += amount;
        this.Refresh();
    }
    
    public CanSubstract(amount: number)
    {
        return this.currentBalance >= amount; 
    }
    
    public Substract(amount: number)
    {
        this.currentBalance -= amount;
        this.Refresh();
    }

    public Refresh()
    {
        this.amount.string = this.currentBalance.toString();
    }
}


