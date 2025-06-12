import { _decorator, Button, Component, Node } from 'cc';
import { SButton } from './SButton';
import { Balance } from './Balance';
import { ReelController } from './ReelController';
import { ReelResult } from './ReelResult';
const { ccclass, property } = _decorator;

@ccclass('SlotController')
export class SlotController extends Component 
{
    @property(Balance)
    private balance: Balance; 

    @property(ReelController)
    private reelController: ReelController;

    @property(SButton)
    private buttonReroll: SButton;

    start() 
    {
        this.buttonReroll.SubscribeSpinComplete(this.OnReRollClick, this);
        this.reelController.SubscribeSpinComplete(this.OnReelComplete, this);
    }

    update(deltaTime: number) 
    {
        
    }

    private OnReRollClick()
    {
        if (this.balance.CanSubstract(5))
        {
            this.balance.Substract(5);
            this.reelController.Spin();
        }
    }

    private OnReelComplete(value : ReelResult)
    {
        for(let i = 0; i < value.resultLeft.length; i++)
        {
            console.log("LEFT " + value.resultLeft[i]);
        }
        
        for(let i = 0; i < value.resultMid.length; i++)
        {
            console.log("MID " + value.resultMid[i]);
        }

        for(let i = 0; i < value.resultRight.length; i++)
        {
            console.log("RIGHT " + value.resultRight[i]);
        }
    }
}


