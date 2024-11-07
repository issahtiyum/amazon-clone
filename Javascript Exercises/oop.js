class Car {
  #brand;
  #model;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  displayInfo (){
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Is the trunk open? ${this.isTrunkOpen}`)
  }

  speed = 0;
  maxSpeed = 200;
  isTrunkOpen = false;
  go(){ 
    if(this.speed === maxSpeed) {
      console.log('maximum speed reached')
      return;
    }
    if (this.isTrunkOpen === true) {
      console.log('trunk is open! Cannot move car')
      return;
    }
    this.speed += 5;
  }
  brake(){
    if(this.speed === 0) {
      console.log('car has stopped')
      return;
    }
     this.speed -= 5; 
    }
  openTrunk(){
    if (this.speed > 0) {
      console.log('The car is moving! Cannot open trunk!')
      return;
    }
    this.isTrunkOpen = true;
  }
  closeTrunk(){
    this.isTrunkOpen = false;
  }
}
const car2 = new Car({brand: 'Toyota', model: 'Corolla'});
const car1 = new Car({brand: 'Tesla', model: 'Model 3'});

car1.displayInfo();
car2.displayInfo();

class RaceCar extends Car {
  acceleration;
  constructor(carDetails){
    super(carDetails)
    this.acceleration = carDetails.acceleration;
  }
  maxSpeed = 300;
  openTrunk(){
    console.log("racecars don't have trunks!")
  }
  closeTrunk() {
    console.log("racecars don't have trunks!")
  }
  go(){
    if(this.speed === this.maxSpeed) {
      console.log('maximum speed reached')
      return;
    }
    this.speed += this.acceleration;
    this.displayInfo()
  }
}

const raceCar = new RaceCar({brand: 'McLaren', model: 'F1', acceleration: 20})
raceCar.openTrunk()
raceCar.go()
raceCar.displayInfo()