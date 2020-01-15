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

// Adapter
class Lion {
    roar(){
        console.log('Lion roar')
    }
}

class Hunter {
    hunt(lion){
        lion.roar()
    }
}

class WildDog {
    bark(){
        console.log('Wild dog bark')
    }
}

class DogAdapter{
    constructor(dog){
        this.dog = dog;
    }
    roar(){
        this.dog.bark()
    }
}

const wildDog = new WildDog();

const wildDogAdapter = new DogAdapter(wildDog);

const hunter = new Hunter();

hunter.hunt(wildDogAdapter);

// Bridge  (Мост)

class Page{
    constructor(theme){
        if(new.target === Page){
            throw new TypeError("Cannot construct Abstract instances directly");
            return;
        }
        this.theme = theme
    }
    getContent(){
        console.log(`${this.content}. Page theme is ${this.theme.getColor()}`)
    }
}

class AboutPage extends Page{
    content = 'About page content'
}

class ContactPage extends Page{
    content = 'Contact page content'
}

class Theme{
    getColor() {
        return this.color
    }
}
class DarkTheme extends Theme{
   color = 'Dark'
}

class LightTheme extends Theme{
    color = 'Light'
}

class AquaTheme extends Theme{
    color = 'Aqua'
}

const aboutPage = new AboutPage(new DarkTheme());
const contactPage = new ContactPage(new LightTheme());

aboutPage.getContent()
contactPage.getContent()

//Legion task (Компановщик)

class Human {
    constructor(){
        if(new.target === Human){
            throw new TypeError("Human is abstract class");
            return;
        }
    }
    getStrength(){
        return this.strength;
    }
}

class Archer extends Human {
    strength = 100;
}

class Solder extends Human {
    strength = 200
}

class Horseman extends Human {
    strength = 300
}

class Legion {
    constructor(){
        this.arr = []
    }

    pushLegion(solder){
        this.arr.push(solder) 
    }
    multiPushLegion(solder, count = 1){
        for(let i = 0; i < count; i++){
            this.arr.push(solder) 
        }
    }
    getStrength(){
        let count = 0;
         this.arr.map((solder) => {
            count = count + solder.getStrength()
        })
        return count
    }
}

const legion = new Legion();
legion.pushLegion(new Archer())
legion.pushLegion(new Archer())
legion.pushLegion(new Solder())
legion.pushLegion(new Solder())
legion.multiPushLegion(new Solder(), 5)
console.log(legion.getStrength());


// Decarator ( Декаратор )

class Ball {
    getWidth(){
        return 200
    }
    getMaterial(){
        return 'I am Ball'
    }
}
class BigBall {
    constructor(ball){
        this.ball = ball
    }

    getWidth(){
        const { ball } = this;
        return ball.getWidth() * 1.5
    }

    getMaterial(){
        const { ball } = this;
        return ball.getMaterial()
    }
}
class IronBall {
    constructor(ball){
        this.ball = ball
    }

    getWidth(){
        const { ball } = this;
        return ball.getWidth()
    }

    getMaterial(){
        const { ball } = this;
        return ball.getMaterial() + ". My material is Iron"
    }
}

const simpleBall = new Ball();
const bigBall = new BigBall(simpleBall);
const ironBigBall = new IronBall(bigBall);

console.log(simpleBall.getWidth());
console.log(bigBall.getWidth());
console.log(ironBigBall.getMaterial(), 'Width ' + ironBigBall.getWidth());


// Fibanachi

function fib(n) {
    let a = 1;
    let b = 1;
    for (let i = 3; i <= n; i++) {
      let c = a + b;
      a = b;
      b = c;
    }
    return b;
  }
  console.log(fib(4))