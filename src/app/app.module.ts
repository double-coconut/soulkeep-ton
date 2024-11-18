import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DndModule } from 'ngx-drag-drop';
import { AuthInterceptor } from '@common/services/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from '@general/components/loading/loading.component';
import { LoadingOverlayComponent } from '@general/components/loader-overlay/loading-overlay.component';
import { TabButtonsComponent } from '@general/components/tab-buttons/tab-buttons.component';
import { ToArrayPipe } from '@common/pipes/rule-random-value.pipe';
import { ImageBlobPipe } from '@common/pipes/image-blob.pipe';
import { AuthService } from '@common/services/auth.service';
import { telegramUserInitializer } from '@common/initializers/telegram-user-initializer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DndModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TabButtonsComponent,
    LoadingComponent,
    LoadingOverlayComponent,
    ToArrayPipe,
    ImageBlobPipe
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: telegramUserInitializer,
      multi: true,
      deps: [AuthService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
