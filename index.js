// Simple Factory
class WoodenDoor {
    constructor(width, height){
      this.width = width
      this.height = height
    }
  
    getWidth(){
      return this.width
    }
  
    getHeight(){
      return this.height
    }
}

const DoorFactory = {
    makeDoor: (width, height) => new WoodenDoor(width, height),
    makeDoorStack: (width, height, count) => {
        let stack = [];
        for (let index = 0; index < count; index++) {
            stack.push(new WoodenDoor(width, height))
        }
        return stack;
    },
}

const door = DoorFactory.makeDoor(100, 200);
const doorStack = DoorFactory.makeDoorStack(100, 200, 5);
console.log('Simple Factory')
console.log(door)
console.log(doorStack)
console.log('Simple Factory (END)')

// Fabric method

class HiringManager {
    takeInterview() {
        const interviewer = this.makeInterviewer()
        interviewer.askQuestions()
    }
}

class Developer {
    askQuestions(){
        console.log('Ask about js')
    }
}
class CommunityExecutive {
    askQuestions(){
        console.log('Ask about community')
    }
}

class DevelopmentManager extends HiringManager {
    makeInterviewer(){
        return new Developer();
    }
}
class MarketingManager extends HiringManager {
    makeInterviewer(){
        return new CommunityExecutive();
    }
}

const devManger = new DevelopmentManager();
const marketingManager = new MarketingManager();

console.log('Fabric method')
devManger.takeInterview()
marketingManager.takeInterview()
console.log('Fabric method (END)')

// Abstract Fabric

class WoodenBestDoor {
    getDescription() {
        console.log('I am a wooden door')
    }
}

class IronDoor {
    getDescription() {
        console.log('I am an iron door')
    }
}
class Welder {
    getDescription() {
        console.log('I can only fit iron doors')
    }
}

class Carpenter {
    getDescription() {
        console.log('I can only fit wooden doors')
    }
}

class WoodenDoorFactory {
    makeDoor(){
        return new WoodenBestDoor()
    }

    makeFittingExpert() {
        return new Carpenter()
    }
}

class IronDoorFactory {
    makeDoor(){
        return new IronDoor()
    }

    makeFittingExpert() {
        return new Welder()
    }

}
const woodenFactory = new WoodenDoorFactory();
const ironFactory = new IronDoorFactory();

const woodenExample = {
    door: woodenFactory.makeDoor(),
    expert: woodenFactory.makeFittingExpert()
};

const ironExample = {
    door: ironFactory.makeDoor(),
    expert: ironFactory.makeFittingExpert()
}

console.log('Abstract Fabric')
console.log(woodenExample.door.getDescription())
console.log(woodenExample.expert.getDescription())
console.log(ironExample.door.getDescription())
console.log(ironExample.expert.getDescription())
console.log('Abstract Fabric (END)')

// Builder

class Burger {
    constructor({size, cheeze, pepperoni, lettuce, tomato}) {
        this.size = size
        this.cheeze = cheeze || false
        this.pepperoni = pepperoni || false
        this.lettuce = lettuce || false
        this.tomato = tomato || false
    }
}

class BurgerBuilder {
    constructor(size = 200){
        this.size = size;
    }

    addCheeze(){
        this.cheeze = true
        return this;
    }
    addPepperoni(){
        this.pepperoni = true
        return this;
    }
    addLettuce(){
        this.lettuce = true
        return this;
    }
    addTomato(){
        this.tomato = true
        return this;
    }
    build(){
        return new Burger(this)
    }
}

const burger = new BurgerBuilder();
burger.addCheeze();
burger.addTomato();
console.log(burger.build());