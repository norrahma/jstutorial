var API = "https://api.github.com/users/";
var $champDeRecherche = $('#champDeRecherche');
$champDeRecherche.on('input', function(){
    var user = this.value;
    if (user) {
        console.log(API+user+"/repos");

    }
});
