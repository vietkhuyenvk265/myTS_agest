import { PersonRepository } from './personRepository';

function main() {
    const people = PersonRepository.loadPeople();

    people.forEach(person => {
        person.celebrateBirthday();

        console.log(person.greet());
        console.log(`Is adult: ${person.isAdult()}`);
    });

    PersonRepository.savePeople(people);
}

main();
