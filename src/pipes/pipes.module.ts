import { NgModule } from '@angular/core';
import { OderPipe } from './oder/oder';
import { GroupPipe } from './group/group';
import { ValuesPipe } from './values/values';

@NgModule({
	declarations: [OderPipe,
    GroupPipe,
    ValuesPipe],
	imports: [],
	exports: [OderPipe,
    GroupPipe,
    ValuesPipe]
})
export class PipesModule {}
