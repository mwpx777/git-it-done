// function getUsersRepos(user) {
//     // this function will fetch the repos from api.github
//      fetch("http://api.github.com/users/octocat/repos").then(function(response){
//      //.json method will convert the response into json
//     response.json().then(function(data){
//      console.log(data);
//     //  this will log an array into the console
// });
// });
// }
// getUsersRepos();

function getUsersRepos(user){
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data);
        });
    });
};

// argument in this function call will get passed to 'user' in function above
getUsersRepos("twitter")