class Vehicle{
 constructor(make, model, year){
    this.make = make;
    this.model = model;
    this.year = year;
 }
 honk(){
    return 'beep'
 }
 toString(){
   console.log(`${this.make}, ${this.model}, ${this.year}`)
 }
}

class Car extends Vehicle{
    constructor(make, model, year){
        super(make, model, year)
        this.numWheels = 4;
    }
}

class MotorCycle extends Vehicle{
    constructor(make, model, year){
        super(make, model, year)
        this.numWheels = 2;
    }
    revEngine(){
        console.log("VROOM!!!")
    }
}
let myCar = new Car('a', 'b', 200);

class Garage{
    constructor(capacity){
        this.capacity = capacity
        this.vehicles = []
    }
    add(newVehicle){
        if (newVehicle instanceof Vehicle && this.capacity >= 0){
            this.vehicles.push(newVehicle)
            console.log(`${newVehicle} added`)
            this.capacity --;
        }
        else if (this.capacity >= 0){
            console.log("sorry, at capacity")
        }
        else if(newVehicle instanceof Vehicle == false){
            console.log("must be vehicle")
        }
    }
}

