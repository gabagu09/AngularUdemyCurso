import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from '../app.component';

// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'dev-9zwcql2j.us.auth0.com',
      clientId: 'dWaevdn5kE6n5URthhf1FLGrM29dWQ0J'
    }),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}