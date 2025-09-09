import peopleData from '../data/people.json';
import { Person } from './Person';
import fs from 'fs';
import path from 'path';

export class PersonRepository {
    private static inputPath = path.join(__dirname, '../data/people.json');
    private static outputPath = path.join(__dirname, '../data/people.output.json');

    static loadPeople(): Person[] {
        try {
            const textData = fs.readFileSync(this.inputPath, 'utf-8');
            const peopleData = JSON.parse(textData);

            if (!Array.isArray(peopleData)) {
                console.error('Invalid - People Data is invalid format');
                return [];
            }

            return peopleData.map((data: any) => Person.fromJSON(data));
        } catch (error: any) {
            console.error(error.message);
            return [];
        }
    }
    static savePeople(people: Person[]): void {
        try {
            const dataToSave = people.map(person => person.toJSON());
            fs.writeFileSync(this.outputPath, JSON.stringify(dataToSave));
        }
        catch (error: any) {
            console.error('Invalid saving:', error.message);
        }
    }
}