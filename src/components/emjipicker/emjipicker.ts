import { Component, forwardRef } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {EmojiProvider} from "../../providers/emoji/emoji";

/**
 * Generated class for the EmjipickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

export const EMOJI_ACCESSOR:any={
  provide:NG_VALUE_ACCESSOR,
  useExisting:forwardRef(() => EmjipickerComponent),
  multi:true
}

@Component({
  selector: 'emjipicker',
  templateUrl: 'emjipicker.html',
  providers:[EMOJI_ACCESSOR]
})

export class EmjipickerComponent implements ControlValueAccessor{

  emojiArray=[];
  content:string;
  onChanged:Function;
  onTouched:Function;

  constructor(emojiProvider:EmojiProvider) {
    this.emojiArray = emojiProvider.getEmojis();
  }
  /**
   * 向DOM初始化值
   * @param obj
   */
  writeValue(obj: any): void {
    this.content = obj;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
    this.setValue(this.content);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


  setValue(val:any):any{
    this.content += val;
    if(this.content){
      this.onChanged(this.content);
    }
  }

}
