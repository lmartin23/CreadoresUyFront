import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupCreadorComponent } from './components/signup-creador/signup-creador.component';
import { LogoutComponent } from './components/logout/logout.component';
import { FeedComponent } from './components/feed/feed.component';
import { SearchComponent } from './components/search/search.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { TextComponent } from './components/create-post/text/text.component';
import { ImageComponent } from './components/create-post//image/image.component';
import { VideoComponent } from './components/create-post//video/video.component';
import { LinkComponent } from './components/create-post//link/link.component';
import { AudioComponent } from './components/create-post/audio/audio.component';
import { SuscribeComponent } from './components/suscribe/suscribe.component';
import { CreateplanComponent } from './components/planconfig/planconfig.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { BackOfficeComponent } from './components/backOffice/back-office/back-office.component';
import { UserComponent } from './components/backOffice/user/list/user.component';
import { UserAddComponent } from './components/backOffice/user/add/user-add.component'
import { UserEditComponent } from './components/backOffice/user/edit/user-edit.component'
import { AdminComponent } from './components/backOffice/admin/list/admin.component';
import { EstadisticaComponent } from './components/estadistica/estadistica.component';
import { AdminEditComponent } from './components/backOffice/admin/edit/admin-edit.component';
import { AdminAddComponent } from './components/backOffice/admin/add/admin-add.component';
import { CategoryComponent } from './components/backOffice/category/list/category.component';
import { CategoryEditComponent } from './components/backOffice/category/edit/category-edit.component';
import { CategoryAddComponent } from './components/backOffice/category/add/category-add.component';
import { CreatorComponent } from './components/backOffice/creator/list/creator.component';
import { CreatorEditComponent } from './components/backOffice/creator/edit/creator-edit.component';
import { CreatorAddComponent } from './components/backOffice/creator/add/creator-add.component';
import { PlanComponent } from './components/backOffice/plan/list/plan.component';
import { PlanAddComponent } from './components/backOffice/plan/add/plan-add.component';
import { PlanEditComponent } from './components/backOffice/plan/edit/plan-edit.component';
import { BenefitEditComponent } from './components/backOffice/benefit/edit/benefit-edit.component';
import { BenefitComponent } from './components/backOffice/benefit/list/benefit.component';
import { BenefitAddComponent } from './components/backOffice/benefit/add/benefit-add.component';
import { StatisticsComponent } from './components/backOffice/statistics/statistics.component';
import { PaymentComponent } from './components/backOffice/payment/payment.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'creator-Profile/:nickname', component: ProfileComponent },
  { path: 'register', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'creador-Register', component: SignupCreadorComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'search/:querry', component: SearchComponent },
  { path: 'createPost', component: CreatePostComponent },
  { path: 'createPost/text', component: TextComponent },
  { path: 'createPost/image', component: ImageComponent },
  { path: 'createPost/video', component: VideoComponent },
  { path: 'createPost/link', component: LinkComponent },
  { path: 'createPost/audio', component: AudioComponent },
  { path: 'planconfig', component: CreateplanComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'chat/:nickname', component: ChatComponent },
  { path: 'creator-Profile/:nickname/suscribe', component: SuscribeComponent },
  { path: 'user-Profile/:nickname', component: UserProfileComponent },
  { path: 'estadistica', component: EstadisticaComponent },


  { path: 'backOffice', component: BackOfficeComponent },
  { path: 'backOffice/usuario', component: UserComponent },
  { path: 'backOffice/usuario/crear', component: UserAddComponent },
  { path: 'backOffice/usuario/editar/:idUser', component: UserEditComponent },
  { path: 'backOffice/admin', component: AdminComponent },
  { path: 'backOffice/admin/crear', component: AdminAddComponent },
  { path: 'backOffice/admin/editar/:idUser', component: AdminEditComponent },
  { path: 'backOffice/creador', component: CreatorComponent },
  { path: 'backOffice/creador/crear', component: CreatorAddComponent },
  { path: 'backOffice/creador/editar/:idCreator', component: CreatorEditComponent },
  { path: 'backOffice/categoria', component: CategoryComponent },
  { path: 'backOffice/categoria/crear', component: CategoryAddComponent },
  { path: 'backOffice/categoria/editar/:idCategoria', component: CategoryEditComponent },
  { path: 'backOffice/plan', component: PlanComponent },
  { path: 'backOffice/plan/crear', component: PlanAddComponent },
  { path: 'backOffice/plan/editar/:idPlan', component: PlanEditComponent },
  { path: 'backOffice/beneficio', component: BenefitComponent },
  { path: 'backOffice/beneficio/crear', component: BenefitAddComponent },
  { path: 'backOffice/beneficio/editar/:idBenefit', component: BenefitEditComponent },
  { path: 'backOffice/estadisticas', component: StatisticsComponent },
  { path: 'backOffice/pagos', component: PaymentComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
