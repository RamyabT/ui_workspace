import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ 
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBu8P86kV22wrmoFsc9wsVSjdB6FENPa6o',
      libraries: ['places']
    }),
  ],
  providers:[

  ],
  exports:[

]
})
export class PreloginextensionModule { }
