function getApi() {
  // replace `octocat` with anyone else's GitHub username
  var apiKey = '6pJRVZpzh01tEktlNNLSmI1hVw5wXNTOuoca58uW';
  var requestUrl =
    'https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=' + apiKey;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // for (var i = 0; i < data.length; i++) {
      //   var link = document.createElement('a');
      //   var listItem = document.createElement('li');
      //   listItem.textContent = data[i].html_url;
      //   link.href = data[i].html_url;
      //   repoList.appendChild(link);
      //   link.appendChild(listItem);
      // }
      console.log(data);
    });
}
