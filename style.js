function init() {
    fetch("https://api.github.com/orgs/twitter/public_members?per_page=5")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("Twitter Public Members: Raw data \n----------");
            for (var member of data) getUserRepos(member.login);
        });
}

function getUserRepos(username) {
    fetch("https://api.github.com/users/" + username + "/repos?per_page=5")
        .then(function (response) {
        return response.json();
    })
        .then(function (data) {
            console.log("Twitter Repositories: Names only \n----------");
            console.log(data)
        });
}

init();