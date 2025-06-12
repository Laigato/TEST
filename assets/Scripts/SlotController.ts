import { _decorator, Button, Component, Node } from 'cc';
import { SButton } from './SButton';
import { Balance } from './Balance';
import { ReelController } from './ReelController';
import { ReelResult } from './ReelResult';
import { BalanceData } from './BalanceData';
import { Paytable } from './Paytable';
import { Bet } from './Bet';
import { BetData } from './BetData';
const { ccclass, property } = _decorator;

@ccclass('SlotController')
export class SlotController extends Component 
{
    @property(Balance)
    private balance: Balance; 
    @property(Bet)
    private bet: Bet;

    @property(ReelController)
    private reelController: ReelController;

    @property(SButton)
    private buttonReroll: SButton;

    private paytable: Paytable = new Paytable();
    private betLock: number;

    start() 
    {
        this.buttonReroll.SubscribeSpinComplete(this.OnReRollClick, this);
        this.reelController.SubscribeSpinStart(this.OnReelStart, this);
        this.reelController.SubscribeSpinComplete(this.OnReelComplete, this);
        
        this.paytable.Add("Symbol_7", 3, 7);
        this.paytable.Add("Symbol_BAR", 3, 3);
        this.paytable.Add("Symbol_Lemon", 3, 4);
        this.paytable.Add("Symbol_Lemon", 2, 1);
        this.paytable.Add("Symbol_Cherry", 3, 2);
        this.paytable.Add("Symbol_Cherry", 2, 1);

        let balanceData = new BalanceData();
        balanceData.InitialBalance = 1000;
        this.balance.Initialize(balanceData);

        let betData = new BetData();
        betData.InitialBet = 10;
        betData.Increment = 5;
        this.bet.Initialize(betData);
    }

    update(deltaTime: number) 
    {
        
    }

    private OnReRollClick()
    {
        if (this.balance.CanSubstract(this.bet.GetCurrentBet()))
        {
            this.balance.Substract(this.bet.GetCurrentBet());
            this.reelController.Spin();
            this.betLock = this.bet.GetCurrentBet();
        }
    }

    private OnReelStart()
    {
        this.buttonReroll.Disable();
    }
    
    private OnReelComplete(value : ReelResult)
    {
        const topResult = this.MapArray([value.resultLeft[0], value.resultMid[0], value.resultRight[0]]);
        const topMap = topResult.map;
        const topStreakName = topResult.streakName;
        const topCount = (topMap.get(topStreakName)?? 0) + (topMap.get("Symbol_WILD") ?? 0);
        const topMultiplier = this.paytable.GetMultiplier(topStreakName, topCount); 
        
        const midResult = this.MapArray([value.resultLeft[1], value.resultMid[1], value.resultRight[1]]);
        const midMap = midResult.map;
        const midStreakName = midResult.streakName;
        const midCount = (midMap.get(midStreakName)?? 0) + (midMap.get("Symbol_WILD") ?? 0);
        const midMultiplier = this.paytable.GetMultiplier(midStreakName, midCount);
        
        const botResult = this.MapArray([value.resultLeft[2], value.resultMid[2], value.resultRight[2]]);
        const botMap = botResult.map;
        const botStreakName = botResult.streakName;
        const botCount = (botMap.get(botStreakName)?? 0) + (botMap.get("Symbol_WILD") ?? 0);
        const botMultiplier = this.paytable.GetMultiplier(botStreakName, botCount);
        
        const totalMult = (topMultiplier?? 0) + (midMultiplier?? 0) + (botMultiplier?? 0);
        
        this.balance.Add(this.betLock * totalMult);
        this.buttonReroll.Enable();
    }
                
    private MapArray(array: string[]) : { map: Map<string, number>, streakName: string } 
    {
        const map = new Map<string, number>();
        let streakName = "";
        let streakCount = 0;
        for(let i = 0; i < array.length; i++)
        {
            const item = array[i];
            let currentCount = map.get(item) ?? 0;
            
            map.set(item, currentCount + 1);

            if (map.get(item) > streakCount &&
                item != "Symbol_WILD")
            {
                streakCount = map.get(item);
                streakName = item;
            }
        }

        return { map, streakName };
    }
}


