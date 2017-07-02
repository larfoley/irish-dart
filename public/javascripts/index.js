(function() {

  var nextDartOutputDiv = document.querySelector('.nextDartOutput');
  var getNextDartForm = document.querySelector('.getNextDartForm');

  function renderDartTime(data) {
    nextDartOutputDiv.classList.add('hasLoaded');
    nextDartOutputDiv.innerHTML = "";
    nextDartOutputDiv.innerHTML += "The next " + data.Direction;
    nextDartOutputDiv.innerHTML += " Dart leaving " + data.From;
    nextDartOutputDiv.innerHTML += data.arrivalTime !== undefined ?
      " is due in " + data.arrivalTime + "mins." : " is due now";
  }

  getNextDartForm.onsubmit = function(e) {
    e.preventDefault();
    var station = this.querySelector('.station').value;
    var direction = this.querySelector('.Northbound').checked ? "Northbound" : "Southbound";;
    var xhr = new XMLHttpRequest();

    nextDartOutputDiv.innerHTML = 'loading...';
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
          renderDartTime(JSON.parse(xhr.responseText))
        } else {
          console.log("Error");
        }
      }
    }
    xhr.open("GET", "/next-dart?station=" + station + "&direction=" + direction)
    xhr.send()

  }

}())
