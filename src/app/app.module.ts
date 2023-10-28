import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { LoginPageComponent } from './pages/seguridadModule/login-page/login-page.component';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundPageComponent } from './pages/seguridadModule/not-found-page/not-found-page.component';
import { ToastrModule } from 'ngx-toastr';
import { MenuPageComponent } from './pages/seguridadModule/menu-page/menu-page.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ConfirmationPasswordPageComponent } from './pages/seguridadModule/confirmation-password-page/confirmation-password-page.component';
import { CambiarPassFormComponent } from './components/forms/cambiar-pass-form/cambiar-pass-form.component';
import { NavExampleComponent } from './components/examples/nav-example/nav-example.component';
import { MyCountPageComponent } from './pages/seguridadModule/my-count-page/my-count-page.component';
import { InicioFundoPageComponent } from './pages/fundoModule/inicio-fundo-page/inicio-fundo-page.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { InicioFertirriegoPageComponent } from './pages/fertirriegoModule/inicio-fertirriego-page/inicio-fertirriego-page.component';
import { ClientsPageComponent } from './pages/fundoModule/clients-page/clients-page.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { UsuariosPageComponent } from './pages/seguridadModule/usuarios-page/usuarios-page.component';
import { UsersTableComponent } from './components/tables/users-table/users-table.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { UsuarioPageComponent } from './pages/seguridadModule/usuario-page/usuario-page.component';
import { UsuarioFormComponent } from './components/forms/usuario-form/usuario-form.component';
import { DialogComponent } from './components/dialogs/dialog/dialog.component';
import { ConfigGeneralPageComponent } from './pages/fundoModule/config-general-page/config-general-page.component';
import { MesuresTableComponent } from './components/tables/mesures-table/mesures-table.component';
import { UnidadesPageComponent } from './pages/fundoModule/unidades-page/unidades-page.component';
import { UnidadPageComponent } from './pages/fundoModule/unidad-page/unidad-page.component';
import { MesureFormComponent } from './components/forms/mesure-form/mesure-form.component';
import { CampaignsPageComponent } from './pages/fundoModule/campaigns-page/campaigns-page.component';
import { CampaignsTableComponent } from './components/tables/campaigns-table/campaigns-table.component';
import { CampaignPageComponent } from './pages/fundoModule/campaign-page/campaign-page.component';
import { CampaignFormComponent } from './components/forms/campaign-form/campaign-form.component';
import { ConfigGeneralFertirriegoComponent } from './pages/fertirriegoModule/config-general-fertirriego/config-general-fertirriego.component';
import { NutrientsPageComponent } from './pages/fertirriegoModule/nutrients-page/nutrients-page.component';
import { NutrientPageComponent } from './pages/fertirriegoModule/nutrient-page/nutrient-page.component';
import { NutrientsTableComponent } from './components/tables/nutrients-table/nutrients-table.component';
import { NutrientFormComponent } from './components/forms/nutrient-form/nutrient-form.component';
import { CultivesPageComponent } from './pages/fertirriegoModule/cultives-page/cultives-page.component';
import { CultivePageComponent } from './pages/fertirriegoModule/cultive-page/cultive-page.component';
import { CultivesTableComponent } from './components/tables/cultives-table/cultives-table.component';
import { CultiveFormComponent } from './components/forms/cultive-form/cultive-form.component';
import { VarietiesPageComponent } from './pages/fertirriegoModule/varieties-page/varieties-page.component';
import { VarietyPageComponent } from './pages/fertirriegoModule/variety-page/variety-page.component';
import { PhenologyPageComponent } from './pages/fertirriegoModule/phenology-page/phenology-page.component';
import { PhenologiesPageComponent } from './pages/fertirriegoModule/phenologies-page/phenologies-page.component';
import { VarietiesTableComponent } from './components/tables/varieties-table/varieties-table.component';
import { PhenologiesTableComponent } from './components/tables/phenologies-table/phenologies-table.component';
import { VarietyFormComponent } from './components/forms/variety-form/variety-form.component';
import { PhenologyFormComponent } from './components/forms/phenology-form/phenology-form.component';
import { DialogVarietyPhenologyComponent } from './components/dialogs/dialog-variety-phenology/dialog-variety-phenology.component';
import { FertilizersPageComponent } from './pages/fertirriegoModule/fertilizers-page/fertilizers-page.component';
import { FertilizerPageComponent } from './pages/fertirriegoModule/fertilizer-page/fertilizer-page.component';
import { FertilizersTableComponent } from './components/tables/fertilizers-table/fertilizers-table.component';
import { FertilizerFormComponent } from './components/forms/fertilizer-form/fertilizer-form.component';
import { DialogFertilizerNutrientComponent } from './components/dialogs/dialog-fertilizer-nutrient/dialog-fertilizer-nutrient.component';
import { NumberDecimalDirective } from './directives/number-decimal.directive';
import { LoadingComponent } from './components/loading/loading.component';
import { CostCentersPageComponent } from './pages/fundoModule/cost-centers-page/cost-centers-page.component';
import { CostCenterPageComponent } from './pages/fundoModule/cost-center-page/cost-center-page.component';
import { CostCentersTableComponent } from './components/tables/cost-centers-table/cost-centers-table.component';
import { CostCenterFormComponent } from './components/forms/cost-center-form/cost-center-form.component';
import { DialogCostCenterPhenologyComponent } from './components/dialogs/dialog-cost-center-phenology/dialog-cost-center-phenology.component';
import { ValvesPageComponent } from './pages/fundoModule/valves-page/valves-page.component';
import { ValvePageComponent } from './pages/fundoModule/valve-page/valve-page.component';
import { ValvesTableComponent } from './components/tables/valves-table/valves-table.component';
import { ValveFormComponent } from './components/forms/valve-form/valve-form.component';
import { CostCenterValvesPageComponent } from './pages/fundoModule/cost-center-valves-page/cost-center-valves-page.component';
import { CostCenterValvePageComponent } from './pages/fundoModule/cost-center-valve-page/cost-center-valve-page.component';
import { CostCentersValvesTableComponent } from './components/tables/cost-centers-valves-table/cost-centers-valves-table.component';
import { CostCenterValveFormComponent } from './components/forms/cost-center-valve-form/cost-center-valve-form.component';
import { ThresholdsPageComponent } from './pages/fertirriegoModule/thresholds-page/thresholds-page.component';
import { ThresholdNutrientsPageComponent } from './pages/fertirriegoModule/threshold-nutrients-page/threshold-nutrients-page.component';
import { ThresholdsTableComponent } from './components/tables/thresholds-table/thresholds-table.component';
import { NumberDecimalFourDirective } from './directives/number-decimal-four.directive';
import { ThresholdListComponent } from './components/lists/threshold-list/threshold-list.component';
import { DialogNutrientPhenologyComponent } from './components/dialogs/dialog-nutrient-phenology/dialog-nutrient-phenology.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    LoginPageComponent,
    NotFoundPageComponent,
    MenuPageComponent,
    NavMenuComponent,
    ConfirmationPasswordPageComponent,
    CambiarPassFormComponent,
    NavExampleComponent,
    MyCountPageComponent,
    InicioFundoPageComponent,
    CardListComponent,
    InicioFertirriegoPageComponent,
    ClientsPageComponent,
    SpinnerComponent,
    UsuariosPageComponent,
    UsersTableComponent,
    UsuarioPageComponent,
    UsuarioFormComponent,
    DialogComponent,
    ConfigGeneralPageComponent,
    MesuresTableComponent,
    UnidadesPageComponent,
    UnidadPageComponent,
    MesureFormComponent,
    CampaignsPageComponent,
    CampaignsTableComponent,
    CampaignPageComponent,
    CampaignFormComponent,
    ConfigGeneralFertirriegoComponent,
    NutrientsPageComponent,
    NutrientPageComponent,
    NutrientsTableComponent,
    NutrientFormComponent,
    CultivesPageComponent,
    CultivePageComponent,
    CultivesTableComponent,
    CultiveFormComponent,
    VarietiesPageComponent,
    VarietyPageComponent,
    PhenologyPageComponent,
    PhenologiesPageComponent,
    VarietiesTableComponent,
    PhenologiesTableComponent,
    VarietyFormComponent,
    PhenologyFormComponent,
    DialogVarietyPhenologyComponent,
    FertilizersPageComponent,
    FertilizerPageComponent,
    FertilizersTableComponent,
    FertilizerFormComponent,
    DialogFertilizerNutrientComponent,
    NumberDecimalDirective,
    LoadingComponent,
    CostCentersPageComponent,
    CostCenterPageComponent,
    CostCentersTableComponent,
    CostCenterFormComponent,
    DialogCostCenterPhenologyComponent,
    ValvesPageComponent,
    ValvePageComponent,
    ValvesTableComponent,
    ValveFormComponent,
    CostCenterValvesPageComponent,
    CostCenterValvePageComponent,
    CostCentersValvesTableComponent,
    CostCenterValveFormComponent,
    ThresholdsPageComponent,
    ThresholdNutrientsPageComponent,
    ThresholdsTableComponent,
    NumberDecimalFourDirective,
    ThresholdListComponent,
    DialogNutrientPhenologyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
