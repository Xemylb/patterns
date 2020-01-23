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
console.log("LEGION", legion.getStrength());


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

console.log("Decarator")
console.log(simpleBall.getWidth());
console.log(bigBall.getWidth());
console.log(ironBigBall.getMaterial(), 'Width ' + ironBigBall.getWidth());
console.log("Decarator (END)")

// Exercises

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


var foo = {n: 1};
var bar = foo;
foo.x = foo = {n: 2};

console.log("Fibanachi", foo)

const testArr = [1,2,3,4,5];

const reverseArr = (arr) => {
   for(let i = 0; i < arr.length / 2; i++){
        const num = arr[i];
        arr[i] = arr[(arr.length - 1) - i]
        arr[(arr.length - 1) - i] = num
   }
   return arr
}

const reverseString = (str) => {
    var tmp = "";
    for (var i = str.length - 1; i >= 0; i--) {
        tmp += str[i];
    }
    return tmp;
}

console.log("Reverse arr", reverseArr(testArr))

const isPrime = (num) => num > 1 ? num % 2 !== 0 : false;

const factorialFor = (num) => {
    let locNum = num;
    for(let i = num; i > 1; i--){
       locNum = locNum * (i - 1)
    }
    return locNum
}

function factorialReq(n) {
    return (n !== 1) ? n * factorial(n - 1) : 1;
}

const isSorted = (arr) => {
    let i = 0;
    if(arr.length === 0){
        return true
    }
    while(i < arr.length - 1){
        if(arr[i] > arr[i + 1]){
            break;
        }
        i++
    }
    return i === arr.length - 1
}

const customFilter = (arr, condition) => {
      let filtredArr = [];
      for(let i = 0; i < arr.length - 1; i++){
          if(condition(arr[i])){
            filtredArr.push(arr[i])
          }
      }
      return filtredArr;
}

const customIndexOf = (arr, condition) => {
    let i = arr.length - 1;
    while(i !== -1){
        if(arr[i] === condition){
            break
        }
        i--
    }
    return i
}

function sorte(items) {
    let tmp, i = 0, j = items.length - 1;
    let pivot = items[ Math.floor((items.length - 1) / 2) ];
    console.log(pivot)
    if (items.length > 1) {
        while (i <= j) {
            while (items[i] < pivot) {
                i++;
            }
            while (items[j] > pivot) {
                j--;
            }
            if (i <= j) {
                tmp = items[i];
                items[i] = items[j];
                items[j] = tmp;
                i++;
                j--;
            }
        }
    }
    return items;
}

console.log('sorte', sorte([-4, 1, Infinity, 3, 3, 0]));


var a = {a: 1};
b = a;
a.a = 3;
console.log("Наследование",a, b)

var testZam = 1;
funcZam()
function funcZam() {
 console.log("Замыкание1", testZam);
 var testZam = 2;
 console.log("Замыкание2",testZam);
}

let testZam2 = 1;
funcZam2()
function funcZam2() {
//  console.log("Замыкание3", testZam2); будет ошибка
 let testZam2 = 2;
 console.log("Замыкание4",testZam2);
}

const redXren = {
    redXren: {
      name: ''
    }
}

const redXren2 = {
    redXren21: 'some',
    redXren22: redXren
}
console.log('Xren',redXren2)


/// Console.log()
console.log('console test');
console.log(1);
setTimeout(()=> console.log('console test (END)'), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);

var firstName = 'Igor'
let user = {
  firstName: "Vic",
  sayHi: () => {
    console.log(`Hello, ${this.firstName}!`);
  }
};
setTimeout(() =>{
    user.sayHi()
}, 1000);
console.log(user)

