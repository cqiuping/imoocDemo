import { NgModule } from '@angular/core';
import { EmjipickerComponent } from './emjipicker/emjipicker';
import {IonicPageModule} from "ionic-angular";
@NgModule({
	declarations: [EmjipickerComponent],
	imports: [IonicPageModule.forChild(EmjipickerComponent)],
	exports: [EmjipickerComponent]
})
export class ComponentsModule {}
