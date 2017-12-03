// Définition de l'uri de l'API Github
var API = "https://api.github.com/users/";

// Je selectionne l'objet dans le DOM dont l'id est champDeRecherche
function getRepos(username) {
    // Ici, la requête sera émise de façon synchrone.
    const req = new XMLHttpRequest();
    req.open('GET', API + username + "/repos", false);
    req.send(null);
    if (req.status === 200) {
        var monTableau = getTable(JSON.parse(req.response));
        document.getElementById('tableContainer').innerHTML = monTableau;
    } else {
        console.log(JSON.parse(req.response).message);
        document.getElementById('tableContainer').innerHTML = "Aucun Repository n'a été récupéré";
    }
}



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
