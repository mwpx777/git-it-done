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
let repoContainerEl = document.querySelector("#repos-container");
let repoSearchTerm = document.querySelector("#repo-search-term");
let userFormEl = document.querySelector('#user-form');
let nameInputEL = document.querySelector('#username');

userFormEl.addEventListener('submit', formSubmitHandler)

function getUsersRepos(user){
    //format the github api url
    // example "http://api.girhub.com/users/mwpx777/repos"
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function(response){
        // checking if username exists
        if(response.ok){
        // converts the response to json
        response.json().then(function(data){
            // sends data and user info to displayRepos()
            displayRepos(data, user);
            console.log(data);
            console.log(apiUrl);
        });
        }else{
            alert('Error: ' + response.statusText)   //WHERE DOES THIS COME FROM??
        }
    })
        // this will get chained onto end of fetch(apiUrl) if network error
        .catch(function(error){
            alert('Unable to connect to GitHub');
        })
};

function formSubmitHandler(event){
    event.preventDefault();
    // get value from input element
    var username = nameInputEL.value.trim();
    if (username){
        //this will pass 'username' into getUsersRepos function above as argument
        getUsersRepos(username);
        // this clears the nameInputEl 
        nameInputEL.value = "";
    }else{
        alert("Please enter GitHub username");
    }

};
// repos is the list of repos, searchTerm is the username
function displayRepos(repos, searchTerm){
    // check to see if there are any repos for the username
    if(repos.length === 0){
        // if none found, display message and then return to beginning of function
        repoContainerEl.textContent = "No repositories found for" + nameInputEl.value.trim();
        return;
    }
    // clear old content from repoContainerEl search list 
    repoContainerEl.textContent = "";
    // will display repoSearchTerm text value
    repoSearchTerm.textContent = searchTerm;
    // console.log(repos);
    // console.log(searchTerm);

    // loop over repos
    for (var i = 0; i<repos.length; i++){
    // format repo name getting 'owner.login' and 'name' from each index in array 
    var repoName = repos[i].owner.login + "/" + repos[i].name;
    // create a container for each repo
    var repoEl = document.createElement('a');
    // create class for repoEl
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    // create href to link to single-repo.html passing in repoName as query
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
    // create a span element to hold repository name
    var titleEl = document.createElement('span');
    //add repoName variable from above into titleEl <span>
    titleEl.textContent = repoName;
    // append to container
    repoEl.appendChild(titleEl);
    // create status element for issues 
    var statusEl = document.createElement('span');
    // create class for statusEl
    statusEl.classList = "flex-row align-center";
    // check if current repo has issues
    if (repos[i].open_issues_count>0){
        statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    }else{
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }
    
    // append to container
    repoEl.appendChild(statusEl);
    // append container to DOM  repoContainerEl is empty <div id="repos-container"> 
    repoContainerEl.appendChild(repoEl);
}
};
// argument in this function call will get passed to 'user' in function above
getUsersRepos()