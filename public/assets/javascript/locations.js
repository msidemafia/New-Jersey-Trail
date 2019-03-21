function runLocationQuery() {
  $("#distToDest").text(locationsArray[locationTracker].place).html("<br>").text("Distance to next stop:" + nextLocation).html("<br>").text("Distance to destination:" + totalDistance);
}