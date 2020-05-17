import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileSaverModule } from 'ngx-filesaver';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { DelimiterComponent } from './components/delimiter/delimiter.component';
import { MatRadioModule } from '@angular/material/radio';



@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    FooterComponent,
    HeaderComponent,
    DashboardComponent,
    LoaderComponent,
    DelimiterComponent
  ],
  entryComponents: [
    DelimiterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,

    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatGridListModule,
    MatCheckboxModule,
    MatDialogModule,
    MatRadioModule,

    FileSaverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
