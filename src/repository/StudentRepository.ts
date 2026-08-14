import { Student } from '../model/student.js';

let etudiants: Student[] = [
    { id: 1, nom: 'Alice', age: 20 },
    { id: 2, nom: 'Bob', age: 22 }
];

export const studentRepository = {
    findAll(): Student[] {
        return etudiants;
    },

    findById(id: number): Student | undefined {
        return etudiants.find(e => e.id === id);
    },

    create(nom: string, age: number): Student {
        const nouveauEtudiant: Student = {
            id: etudiants.length > 0 ? etudiants[etudiants.length - 1].id + 1 : 1,
            nom,
            age
        };
        etudiants.push(nouveauEtudiant);
        return nouveauEtudiant;
    },

    update(index: number, id: number, nom: string, age: number): Student {
        etudiants[index] = { id, nom, age };
        return etudiants[index];
    },

    delete(index: number): void {
        etudiants.splice(index, 1);
    }
};