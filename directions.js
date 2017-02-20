/**
 * Created by johnjaeckle on 2/17/17.
 */


var findEasterBunnyHQ_modern = function(){
    var directionList =  "R2, L3, R5, R5, R5, L4, R5, R1, R2, L1, L1, R5, R1, L3, L5, L2, R4, L1, R4, R5, L3, R5, L1, R3, L5, R1, L2, R1, L5, L1, R1, R4, R1, L1, L3, R3, R5, L3, R4, L4, R5, L5, L1, L2, R4, R3, R3, L185, R3, R4, L5, L4, R48, R1, R2, L1, R1, L4, L4, R77, R5, L2, R192, R2, R5, L4, L5, L3, R2, L4, R1, L5, R5, R4, R1, R2, L3, R4, R4, L2, L4, L3, R5, R4, L2, L1, L3, R1, R5, R5, R2, L5, L2, L3, L4, R2, R1, L4, L1, R1, R5, R3, R3, R4, L1, L4, R1, L2, R3, L3, L2, L1, L2, L2, L1, L2, R3, R1, L4, R1, L1, L4, R1, L2, L5, R3, L5, L2, L2, L3, R1, L4, R1, R1, R2, L1, L4, L4, R2, R2, R2, R2, R5, R1, L1, L4, L5, R2, R4, L3, L5, R2, R3, L4, L1, R2, R3, R5, L2, L3, R3, R1, R3";
    var directionArray = directionList.split(', ')
    var headings = [ 'N', 'E', 'S', 'W' ];
    let eTravel;
    let wTravel;
    let nTravel;
    let sTravel;
    let direction;
    this.direction= "N";

    var newDirections = directionArray.map((el, index) =>{
        //this.lastDirection = direction(lastDirection);
        let ct = el.substring(0,1);
        let distance = parseInt(el.substring(1))
        this.direction = getDirection(this.direction,ct);
        console.log('we went '+ distance + "-" + this.direction);
        return{
            't':ct,
            'distance': distance,
            'direction': this.direction
        }
    });

    // now we can sort the new array and sum the value to get N someValue and compare value,
    this.eTravel = newDirections.filter(el => el.direction == "E")
        .reduce((prevVal, el) => prevVal + el.distance, 0);

    this.wTravel = newDirections.filter(el => el.direction == "W")
        .reduce((prevVal, el) => prevVal + el.distance, 0);

    this.nTravel = newDirections.filter(el => el.direction == "N")
        .reduce((prevVal, el) => prevVal + el.distance, 0);

    this.sTravel = newDirections.filter(el => el.direction == "S")
        .reduce((prevVal, el) => prevVal + el.distance, 0);

    let lat = this.nTravel - this.sTravel;
    let long = this.eTravel - this.wTravel;
    let LatDir = (lat > 0)?"N":"S";
    let longDir = (long > 0) ?"E":"W";


    console.log("The directions suggest we travel: " + this.nTravel + " blocks North, " + this.eTravel + " blocks East, " + this.sTravel + " blocks South, and " + this.wTravel + " block West." )
    console.log("The path we should take is " + Math.abs(lat)+ " block " + LatDir + " and then head " + Math.abs(long) + " blocks " + longDir +".");
    console.log("The shortest Route is " + (Math.abs(lat) + Math.abs(long)));
    console.log("As the crow flies, it would be a little over " + Math.round(Math.hypot(Math.abs(lat),  Math.abs(long))) + " blocks.");

    document.querySelector('#pathToTake').innerText = "The path we should take is " + Math.abs(lat)+ " blocks " + LatDir + ". and then head " + Math.abs(long) + " blocks " + longDir + "."
    document.querySelector('#shortestRoute').innerText = "The shortest Route is " + (Math.abs(lat) + Math.abs(long) + " blocks.");
    document.querySelector('#crowFlies').innerText = "As the crow flies, it would be a little over " + Math.round(Math.hypot(Math.abs(lat),  Math.abs(long))) + " blocks."
}



var getDirection = function(previousDirection,ct){
    if(previousDirection == ""){
        previousDirection = "N"
    };
    switch(previousDirection) {
        case "N":
            if (ct == "L") {
                return "W";
            } else {
                return "E";
            }
            break;
        case"W":
            if (ct == "L") {
                return "S";
            } else {
                return "N";
            }
            break;
        case "S":
            if (ct == "L") {
                return "E";
            } else {
                return "W";
            }
            break;
        case "E":
            if (ct == "L") {
                return "N";
            } else {
                return "S";
            }
    }

}

var findEasterBunny = function () {
    var directionList =  "R2, L3, R5, R5, R5, L4, R5, R1, R2, L1, L1, R5, R1, L3, L5, L2, R4, L1, R4, R5, L3, R5, L1, R3, L5, R1, L2, R1, L5, L1, R1, R4, R1, L1, L3, R3, R5, L3, R4, L4, R5, L5, L1, L2, R4, R3, R3, L185, R3, R4, L5, L4, R48, R1, R2, L1, R1, L4, L4, R77, R5, L2, R192, R2, R5, L4, L5, L3, R2, L4, R1, L5, R5, R4, R1, R2, L3, R4, R4, L2, L4, L3, R5, R4, L2, L1, L3, R1, R5, R5, R2, L5, L2, L3, L4, R2, R1, L4, L1, R1, R5, R3, R3, R4, L1, L4, R1, L2, R3, L3, L2, L1, L2, L2, L1, L2, R3, R1, L4, R1, L1, L4, R1, L2, L5, R3, L5, L2, L2, L3, R1, L4, R1, R1, R2, L1, L4, L4, R2, R2, R2, R2, R5, R1, L1, L4, L5, R2, R4, L3, L5, R2, R3, L4, L1, R2, R3, R5, L2, L3, R3, R1, R3";
    var directionArray = directionList.trim().split(', ');
//create an array of objects from the directions

    var direction = 0;
    var distance = 0;
    var headings = [ 'N', 'E', 'S', 'W' ];
    var counters = [ 0, 0, 0, 0];

//we are using an arrary.forEach here, although a simple for loop has better performance.
    directionArray.forEach((el, index) =>{
        let turn = el.substr(0,1);
        if(turn == "R"){
            direction = direction == 3 ? 0 : direction + 1;
        }else{
            direction = direction == 0 ? 3: direction - 1;
        }

        distance = parseInt(el.substring(1));
        console.log("I'm headed "+ headings[direction] + " and I'm going to go: " + distance + " blocks" );

        counters[direction] = counters[direction] +  distance;

    });

    //are we travelling north or south?
    let lat = counters[0] - counters[2];
    let long = counters[1] - counters[3];
    let LatDir = (this.lat > 0)?"N":"S";
    let longDir = (this.long > 0) ?"E":"W";

    console.log("We went :" + counters[0] + " blocks North, " + counters[1] + " blocks East, " + counters[2] + "blocks South, and " + counters[3] + " block West" )

    console.log("The shortest distance between the start and destination is: " + (Math.abs(counters[0] - counters[2]) + Math.abs(counters[1] - counters[3])));

    console.log("The path we should take is " + Math.abs(lat)+ " block N,  and then head " + Math.abs(counters[1] - counters[3]) + " blocks W");

    document.querySelector('#shortDistance').innerText = "The shortest distance is " + (Math.abs(counters[0] - counters[2]) + Math.abs(counters[1] - counters[3])) + " blocks."

}