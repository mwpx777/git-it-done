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

let userFormEl = document.querySelector('#user-form');
let nameInputEL = document.querySelector('#username');

userFormEl.addEventListener('submit', formSubmitHandler)

function getUsersRepos(user){
    //format the github api url
    // example "http://api.girhub.com/users/mwpx777/repos"
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data);
            console.log(apiUrl);
        });
    });
};

function formSubmitHandler(event){
    event.preventDefault();
    // get value from input element
    var username = nameInputEL.value.trim();
    if (username){
        //this will pass 'username' into getUsersRepos function above
        getUsersRepos(username);
        // this clears the nameInputEl 
        nameInputEL.value = "";
    }else{
        alert("Please enter GitHub username");
    }

};

// argument in this function call will get passed to 'user' in function above
getUsersRepos()