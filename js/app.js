// Définition de l'uri de l'API Github
var API = "https://api.github.com/users/";

// Je selectionne l'objet dans le DOM dont l'id est champDeRecherche
var $champDeRecherche = $('#champDeRecherche');

// J'écoute l'evenement input sur mon objet jQuery
$champDeRecherche.on('input', function () {

    // Le this point vers le DOM de l'objet jQuery selectionné
    var user = document.getElementById('champDeRecherche').value;

    if (user) { // Je vérifie si l'utilisateur n'est pas falsy

        // J'execute la requete AJAX.
        jQuery.ajax({
            url: API + user + "/repos"
        }).done(function (response) {
            $("#tableContainer").html( (getTable(response)));
        }).catch(function (rejection) {
            var message = "erreur" || rejection.responseJSON.message;
            toastr.error(message);
        });
    }
});

/**
 * Transforme un tableau contenant les repositories github en un tableau html
 * @param repos
 * @returns {string}
 */
function getTable(repos) {
    var htmlToInsert = "<table id='repos' class='table table-hover table-bordered'>" +
        "<thead>" +
        "<tr>" +
        "<th>Name</th>" +
        "<th>Stars</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>";
    for(var i=0; i<repos.length; i++) {
        var repository = repos[i];
        var tdName = "<tr>" +
            "<td>" + repository.name + "</td>";
        var tdStars = "<td>" + repository.stargazers_count + "</td>" +
            "</tr>";
        htmlToInsert = htmlToInsert + tdName + tdStars;
    }
    htmlToInsert = htmlToInsert + "</tbody>" +
        "</table>";
    return htmlToInsert;

}
