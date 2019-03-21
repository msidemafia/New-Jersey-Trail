function Location(place, route, ableToPurchase, event, type) {
    this.place = place;
    this.route = route;
    this.ableToPurchase = ableToPurchase;
    this.event = event;
    this.type = type;
}

var locations = 
    {
    1: new Location ("Patterson", 1, "N", "Global", "Urban"),
    2: new Location ("Newark", 1, "Y", "Global", "Highway"),
    3: new Location ("Asbury Park", 1, "Y", "Specific","Rural"),
    4: new Location ("Toms River", 1, "Y", "Global","Rural"),
    5: new Location ("PNC Bank Arts Center", 1, "Y", "Specific", "Rural"),
    6: new Location ("Atlantic City", 1, "Y", "Specific", "Urban"),
    7: new Location ("Ocean City", 1, "N", "Global", "Rural")
    };

var locationsArray = Object.values(locations)