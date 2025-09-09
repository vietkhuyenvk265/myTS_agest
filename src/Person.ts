export class Person {
    private name: string;
    private age: number;
    private city: string;

    //- Add a constructor that validates
    constructor(name: string, age: number, city: string) {
        if (!name) {
            throw new Error("Invalid - Name cannot be empty");
        }
        if (age <= 0) {
            throw new Error("Invalid - Age should be positive");
        }

        this.name = name;
        this.age = age;
        this.city = city;
    }

    getName(): string {
        return this.name;
    }

    getAge(): number {
        return this.age;
    }

    getCity(): string {
        return this.city;
    }

    //- Create the following methods:
    greet(): string {
        return `Hi, I'm ${this.name} from ${this.city}.`;
    }

    celebrateBirthday(): void {
        this.age += 1;
    }

    updateCity(newCity: string): void {
        this.city = newCity;
    }

    isAdult(): boolean {
        return this.age >= 18;
    }

    hasSameCity(other: Person): boolean {
        return this.city == other.city;
    }

    //- Add getters for all properties and a method:
    toJSON(): object {
        return {
            name: this.name,
            age: this.age,
            city: this.city
        };
    }

    static fromJSON(data: any): Person {
        return new Person(data.name, data.age, data.city);
    }

}    