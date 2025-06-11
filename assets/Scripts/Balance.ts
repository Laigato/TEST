import { _decorator, Component, Node, RichText } from 'cc';
import { BalanceData } from './BalanceData';
const { ccclass, property } = _decorator;

@ccclass('Balance')
export class Balance extends Component implements ICanInitialize
{
    @property(RichText)
    private amount: RichText;
    
    private _currentBalance: number = 0;
    
    start() 
    {
        
    }
    
    update(deltaTime: number) 
    {
        
    }

    public Initialize(value: IData): void 
    {
        this._currentBalance = (value as BalanceData).InitialBalance;
        this.Refresh();
    }

    public Add(amount: number)
    {

    }

    public CanSubstract(amount: number)
    {
        return this._currentBalance >= amount; 
    }

    public Substract(amount: number)
    {
        
    }

    public Refresh()
    {

    }
}


