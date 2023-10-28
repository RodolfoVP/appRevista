import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/seguridadModule/not-found-page/not-found-page.component';
import { LoginPageComponent } from './pages/seguridadModule/login-page/login-page.component';
import { MenuPageComponent } from './pages/seguridadModule/menu-page/menu-page.component';
import { authGuard } from './guards/auth.guard';
import { ConfirmationPasswordPageComponent } from './pages/seguridadModule/confirmation-password-page/confirmation-password-page.component';
import { MyCountPageComponent } from './pages/seguridadModule/my-count-page/my-count-page.component';
import { adminAuthGuard } from './guards/admin-auth.guard';
import { InicioFundoPageComponent } from './pages/fundoModule/inicio-fundo-page/inicio-fundo-page.component';
import { InicioFertirriegoPageComponent } from './pages/fertirriegoModule/inicio-fertirriego-page/inicio-fertirriego-page.component';
import { ClientsPageComponent } from './pages/fundoModule/clients-page/clients-page.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { UsuariosPageComponent } from './pages/seguridadModule/usuarios-page/usuarios-page.component';
import { UsuarioPageComponent } from './pages/seguridadModule/usuario-page/usuario-page.component';
import { ConfigGeneralPageComponent } from './pages/fundoModule/config-general-page/config-general-page.component';
import { UnidadesPageComponent } from './pages/fundoModule/unidades-page/unidades-page.component';
import { UnidadPageComponent } from './pages/fundoModule/unidad-page/unidad-page.component';
import { CampaignsPageComponent } from './pages/fundoModule/campaigns-page/campaigns-page.component';
import { CampaignPageComponent } from './pages/fundoModule/campaign-page/campaign-page.component';
import { ConfigGeneralFertirriegoComponent } from './pages/fertirriegoModule/config-general-fertirriego/config-general-fertirriego.component';
import { NutrientsPageComponent } from './pages/fertirriegoModule/nutrients-page/nutrients-page.component';
import { NutrientPageComponent } from './pages/fertirriegoModule/nutrient-page/nutrient-page.component';
import { CultivesPageComponent } from './pages/fertirriegoModule/cultives-page/cultives-page.component';
import { CultivePageComponent } from './pages/fertirriegoModule/cultive-page/cultive-page.component';
import { VarietiesPageComponent } from './pages/fertirriegoModule/varieties-page/varieties-page.component';
import { VarietyPageComponent } from './pages/fertirriegoModule/variety-page/variety-page.component';
import { PhenologiesPageComponent } from './pages/fertirriegoModule/phenologies-page/phenologies-page.component';
import { PhenologyPageComponent } from './pages/fertirriegoModule/phenology-page/phenology-page.component';
import { FertilizersPageComponent } from './pages/fertirriegoModule/fertilizers-page/fertilizers-page.component';
import { FertilizerPageComponent } from './pages/fertirriegoModule/fertilizer-page/fertilizer-page.component';
import { CostCentersPageComponent } from './pages/fundoModule/cost-centers-page/cost-centers-page.component';
import { CostCenterPageComponent } from './pages/fundoModule/cost-center-page/cost-center-page.component';
import { ValvePageComponent } from './pages/fundoModule/valve-page/valve-page.component';
import { ValvesPageComponent } from './pages/fundoModule/valves-page/valves-page.component';
import { CostCenterValvesPageComponent } from './pages/fundoModule/cost-center-valves-page/cost-center-valves-page.component';
import { CostCenterValvePageComponent } from './pages/fundoModule/cost-center-valve-page/cost-center-valve-page.component';
import { ThresholdsPageComponent } from './pages/fertirriegoModule/thresholds-page/thresholds-page.component';
import { ThresholdNutrientsPageComponent } from './pages/fertirriegoModule/threshold-nutrients-page/threshold-nutrients-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo:'login' },
  { path: 'login',            component: LoginPageComponent },
  { path: 'confirmPassword',  component: ConfirmationPasswordPageComponent, canActivate: [ authGuard ] },
  { path: 'menu',             component: MenuPageComponent, canActivateChild: [ adminAuthGuard ],children:[
      { path: '',                       component: SpinnerComponent, canActivateChild: [ adminAuthGuard ] },
      { path: 'myCount',                component: MyCountPageComponent, canActivateChild: [ adminAuthGuard ] },
      { path: 'inicioFundo',            component: InicioFundoPageComponent , canActivateChild: [ adminAuthGuard ]}, 
      { path: 'general-fundo',          component: ConfigGeneralPageComponent , canActivateChild: [ adminAuthGuard ]},
      { path: 'unidades',               component: UnidadesPageComponent , canActivateChild: [ adminAuthGuard ]},
      { path: 'unidad',                 component: UnidadPageComponent   , canActivateChild: [ adminAuthGuard ]},
      { path: 'campanias',              component: CampaignsPageComponent   , canActivateChild: [ adminAuthGuard ]},
      { path: 'campania',               component: CampaignPageComponent   , canActivateChild: [ adminAuthGuard ]},
      { path: 'centros-costos',         component: CostCentersPageComponent   , canActivateChild: [ adminAuthGuard ]},
      { path: 'centro-costo',           component: CostCenterPageComponent   , canActivateChild: [ adminAuthGuard ]},
      { path: 'centros-costos-valvulas',component: CostCenterValvesPageComponent   , canActivateChild: [ adminAuthGuard ]},
      { path: 'centro-costo-valvula',   component: CostCenterValvePageComponent   , canActivateChild: [ adminAuthGuard ]},
      { path: 'valvulas',               component: ValvesPageComponent   , canActivateChild: [ adminAuthGuard ]},
      { path: 'valvula',                component: ValvePageComponent   , canActivateChild: [ adminAuthGuard ]},
      { path: 'inicioFertirriego',      component: InicioFertirriegoPageComponent , canActivateChild: [ adminAuthGuard ] },
      { path: 'general-fertirriego',    component: ConfigGeneralFertirriegoComponent , canActivateChild: [ adminAuthGuard ] },
      { path: 'nutrientes',             component: NutrientsPageComponent , canActivateChild: [ adminAuthGuard ] },
      { path: 'nutriente',              component: NutrientPageComponent , canActivateChild: [ adminAuthGuard ] },
      { path: 'cultivos',               component: CultivesPageComponent , canActivateChild: [ adminAuthGuard ] },
      { path: 'cultivo',                component: CultivePageComponent , canActivateChild: [ adminAuthGuard ] },
      { path: 'variedades',             component: VarietiesPageComponent , canActivateChild: [ adminAuthGuard ] },
      { path: 'variedad',               component: VarietyPageComponent , canActivateChild: [ adminAuthGuard ] },
      { path: 'fenologias',             component: PhenologiesPageComponent , canActivateChild: [ adminAuthGuard ] },
      { path: 'fenologia',              component: PhenologyPageComponent , canActivateChild: [ adminAuthGuard ] },
      { path: 'fertilizantes',          component: FertilizersPageComponent , canActivateChild: [ adminAuthGuard ] },
      { path: 'fertilizante',           component: FertilizerPageComponent , canActivateChild: [ adminAuthGuard ] },
      { path: 'umbrales',               component: ThresholdsPageComponent , canActivateChild: [ adminAuthGuard ] },
      { path: 'umbrales-nutrientes',    component: ThresholdNutrientsPageComponent , canActivateChild: [ adminAuthGuard ] },
      { path: 'fertilizante',           component: FertilizerPageComponent , canActivateChild: [ adminAuthGuard ] },
      
      
      { path: 'usuarios',               component: UsuariosPageComponent , canActivateChild: [ adminAuthGuard ] },
      { path: 'usuario',                component: UsuarioPageComponent , canActivateChild: [ adminAuthGuard ] },
      { path: 'clientes',               component: ClientsPageComponent , canActivateChild: [ adminAuthGuard ] }
    ]
  },  
  { path:'**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash:true } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
