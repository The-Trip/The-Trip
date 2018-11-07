app.get('/api/google', function(req, res){
fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Sydney&key=AIzaSyCimBnFkoA9Bb1y23hJqngTpjmjz_Z-gWs`)
    .then(function(response) {
        return response.json();
        })
    .then(data => {
        // console.log(data);
        // alert("I am fetching")
        res.json(data)
      })
    .catch(function(error) {
    // something went wrong. let's sort it out
      });
  })