import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AppComponent } from './app.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxPayPalModule } from 'ngx-paypal';
import { ChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HomeModule } from './components/home/home.module';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupCreadorComponent } from './components/signup-creador/signup-creador.component';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './components/logout/logout.component';
import { FeedComponent } from './components/feed/feed.component';
import { SearchComponent } from './components/search/search.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TextComponent } from './components/create-post/text/text.component';
import { ImageComponent } from './components/create-post/image/image.component';
import { VideoComponent } from './components/create-post/video/video.component';
import { LinkComponent } from './components/create-post/link/link.component';
import { AudioComponent } from './components/create-post/audio/audio.component';
import { EstadisticaComponent } from './components/estadistica/estadistica.component';
import { SuscribeComponent } from './components/suscribe/suscribe.component';
import { CreateplanComponent } from './components/planconfig/planconfig.component';
import { DatePipe } from '@angular/common';
import { SafePipe } from './components/pipes/SafePipe';

import { BackOfficeComponent } from './components/backOffice/back-office/back-office.component';
import { UserComponent } from './components/backOffice/user/list/user.component';
import { UserAddComponent } from './components/backOffice/user/add/user-add.component'
import { UserEditComponent } from './components/backOffice/user/edit/user-edit.component'
import { AdminComponent } from './components/backOffice/admin/list/admin.component';
import { AdminEditComponent } from './components/backOffice/admin/edit/admin-edit.component';
import { AdminAddComponent } from './components/backOffice/admin/add/admin-add.component';
import { CategoryComponent } from './components/backOffice/category/list/category.component';
import { CategoryEditComponent } from './components/backOffice/category/edit/category-edit.component';
import { CategoryAddComponent } from './components/backOffice/category/add/category-add.component';
import { CreatorComponent } from './components/backOffice/creator/list/creator.component';
import { CreatorAddComponent } from './components/backOffice/creator/add/creator-add.component';
import { CreatorEditComponent } from './components/backOffice/creator/edit/creator-edit.component';
import { PlanComponent } from './components/backOffice/plan/list/plan.component';
import { PlanAddComponent } from './components/backOffice/plan/add/plan-add.component';
import { PlanEditComponent } from './components/backOffice/plan/edit/plan-edit.component';
import { BenefitEditComponent } from './components/backOffice/benefit/edit/benefit-edit.component';
import { BenefitComponent } from './components/backOffice/benefit/list/benefit.component';
import { BenefitAddComponent } from './components/backOffice/benefit/add/benefit-add.component';
import { StatisticsComponent } from './components/backOffice/statistics/statistics.component';
import { ChatComponent } from './components/chat/chat.component';
import { PaymentComponent } from './components/backOffice/payment/payment.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCHjB9pc987jPv8miGwVP3ugbuN5SDiQnw",
  authDomain: "creadoresuychat.firebaseapp.com",
  projectId: "creadoresuychat",
  storageBucket: "creadoresuychat.appspot.com",
  messagingSenderId: "581272277376",
  appId: "1:581272277376:web:c61a5ec2827848d6ccb165",
  measurementId: "G-93B04QG055"
};


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    SignupCreadorComponent,
    LogoutComponent,
    FeedComponent,
    SearchComponent,
    CreatePostComponent,
    TextComponent,
    EstadisticaComponent,
    ImageComponent,
    VideoComponent,
    PaymentComponent,
    LinkComponent,
    SuscribeComponent,
    CreateplanComponent,
    AudioComponent,
    AdminEditComponent,
    CreatorComponent,
    CreatorEditComponent,
    CategoryAddComponent,
    AdminAddComponent,
    CategoryEditComponent,
    UserAddComponent,
    PlanComponent,
    PlanAddComponent,
    PlanEditComponent,
    BenefitEditComponent,
    BenefitAddComponent,
    BenefitComponent,
    StatisticsComponent,
    BackOfficeComponent,
    UserComponent,
    UserEditComponent,
    AdminComponent,
    CategoryComponent,
    CreatorAddComponent,
    ChatComponent,
    SafePipe,
    UserProfileComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    NgbModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    BrowserAnimationsModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    HttpClientModule,
    HttpClientModule,
    AngularEditorModule,
    CKEditorModule,
    NgxPayPalModule,
    ChartsModule,
    NgxPaginationModule,
    InfiniteScrollModule,
    NgMultiSelectDropDownModule.forRoot()

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
