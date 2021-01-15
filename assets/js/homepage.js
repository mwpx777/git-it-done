function getUsersRepos() {
    fetch("http://api.github.com/users/octocat/repos");
    console.log('function was called')
};

getUsersRepos();