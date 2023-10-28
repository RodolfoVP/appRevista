export enum apiHost{
    host = 'http://127.0.0.1:80/baluBackend/website/'
}

export enum apiCredenciales{
    usuario = 'USER',
    password = 'TOKEN',
}

export enum apiRuta{
    login = 'model/users/user_login.php',

    tokenVerificar = 'model/users/user_token.php',
    confirmPass = 'model/users/user_confirm.php',
    menuPrivilege = 'model/users/user_perms.php' ,
    moduleFuncs = 'model/funcs/func_module.php' ,

    userList = 'model/users/user_list.php',
    userInsert = 'model/users/user_insert.php',
    userUpdate = 'model/users/user_update.php',

    rolesList = 'model/roles/roles_list.php',

    mesureList = 'model/mesures/mesures_list.php',
    mesureInsert = 'model/mesures/mesures_insert.php',
    mesureUpdate = 'model/mesures/mesures_update.php',
    mesureTypeList = 'model/mesuresType/mesuresType_list.php',

    campaignList = 'model/campaigns/campaigns_list.php',
    campaignInsert = 'model/campaigns/campaigns_insert.php',
    campaignUpdate = 'model/campaigns/campaigns_update.php',

    nutrientList = 'model/nutrients/nutrients_list.php',
    nutrientInsert = 'model/nutrients/nutrients_insert.php',
    nutrientUpdate = 'model/nutrients/nutrients_update.php',
    nutrientFertilizerList = 'model/nutrients/nutrients_fertilizer_list.php',
    nutrientFertilizerInsert = 'model/nutrients/nutrients_fertilizer_insert.php',

    cultiveList = 'model/cultives/cultives_list.php',
    cultiveInsert = 'model/cultives/cultives_insert.php',
    cultiveUpdate = 'model/cultives/cultives_update.php',
    cultiveNutrientIrrigationList = 'model/cultives/cultives_nutrient_irrigation_list.php',
    cultiveNutrienList = 'model/cultives/cultives_nutrients_list.php',
    cultiveNutrienPhenologyList = 'model/cultives/cultives_nutrient_phenologies_list.php',


    varietyList = 'model/variety/varieties_list.php',
    varietyInsert = 'model/variety/varieties_insert.php',
    varietyUpdate = 'model/variety/varieties_update.php',
    varietyPhenologyList = 'model/variety/varieties_phenologies_list.php',
    varietyPhenologyInsert = 'model/variety/varieties_phenologies_insert.php',

    phenologyList = 'model/phenology/phenologies_list.php',
    phenologyInsert = 'model/phenology/phenologies_insert.php',
    phenologyUpdate = 'model/phenology/phenologies_update.php',
    phenologyCultiveVarietyList = 'model/phenology/phenologies_cultives_varieties_list.php',

    fertilizeryList = 'model/fertilizers/fertilizers_list.php',
    fertilizerInsert = 'model/fertilizers/fertilizers_insert.php',
    fertilizerUpdate = 'model/fertilizers/fertilizers_update.php',

    costCenterList = 'model/costcenters/costcenters_list.php',
    costCenterInsert = 'model/costcenters/costcenters_insert.php',
    costCenterUpdate = 'model/costcenters/costcenters_update.php',
    costCenterPhenologyList = 'model/costcenters/costcenters_phenologies_list.php',
    costCenterPhenologyInsert = 'model/costcenters/costcenters_phenologies_insert.php',
    costCenterValveList = 'model/costcenters/costcenters_valves_list.php',
    costCenterValveInsert = 'model/costcenters/costcenters_valves_insert.php',
    costCenterValveUpdate = 'model/costcenters/costcenters_valves_update.php',

    valveList = 'model/valves/valves_list.php',
    valveInsert = 'model/valves/valves_insert.php',
    valveUpdate = 'model/valves/valves_update.php',

}