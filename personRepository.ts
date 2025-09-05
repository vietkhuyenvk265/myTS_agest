import peopleData from './data/people.json';
import { Person } from './person';
import fs from 'fs';

export class PersonRepository {
    static loadPeople(): Person[] {
        try {
            return peopleData.map((data: any) => Person.fromJSON(data));
        } catch (error) {
            console.error('Error in people data:', error.message);
            return [];
        }
    }
    static savePeople(people: Person[]): void {
        const dataToSave = people.map(person => person.toJSON());
        fs.writeFileSync('./data/people.output.json', JSON.stringify(dataToSave))
    }
}