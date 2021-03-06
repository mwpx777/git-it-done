var issuesContainerEl = document.querySelector('#issues-container');
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

function getRepoIssues(repo){
    
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response){
        // request was successful
        if(response.ok){
        response.json().then(function(data){
            displayIssues(data);

            // check if api has paginated issues
            if(response.headers.get("Link")){
                displayWarning(repo)
            };
        });
    }else{
        // if not successful, redirect to homepage
        document.location.replace("./index.html");
    }
    })
};

function displayIssues(issues){
    // check for empty repo issues
    if(issues.length === 0){
        issuesContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for(var i=0; i<issues.length; i++){
        // create a link element to take users to the issue on github
        var issueEl = document.createElement('a');
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute('href', issues[i].html_url);
        issueEl.setAttribute('target', "_blank")
        //create span to hold issue title
        var titleEl = document.createElement('span');
        titleEl.textContent = issues[i].title;
        // append titleEl to issueEl container
        issueEl.appendChild(titleEl);
        // create a type element
        var typeEl = document.createElement('span');
        // check if issue is actual issue or pull request
        if(issues[i].pull_request){
            typeEl.textContent="(Pull Request)"
        }else{
            typeEl.textContent="(Issue)"
        }
        // append  typeEl to issuesEl Container
        issueEl.appendChild(typeEl);
        // append issuesEl to issuesContainerEl
        issuesContainerEl.appendChild(issueEl);
    }

};

function displayWarning(repo){
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");
  
    // append to warning container
    limitWarningEl.appendChild(linkEl);
};


function getRepoName(){
    // this takes the repo name from the search query on index.html
    var queryString = document.location.search;
    // this splits the document.location.search at = and takes array [1]
    var repoName = queryString.split("=")[1];

    // if there is a valid repoName, do this
    if(repoName){
    
    // this passes repoName into getRepoIssues function
    getRepoIssues(repoName)
    // this adds the repoName to top of page in search result
    repoNameEl.textContent = repoName;
    }else{
        // if repoName was not entered, redirect to homepage
        document.location.replace("./index.html");
    }
};


getRepoName();