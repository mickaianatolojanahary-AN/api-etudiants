import { studentRepository } from '../repository/studentRepository.js';
import { Student } from '../model/student.js';

export const studentService = {
    getAllStudents(): Student[] {
        return studentRepository.findAll();
    },

    getStudentById(id: number): Student | null {
        return studentRepository.findById(id) || null;
    },

    createStudent(nom: string, age: number): { error?: string; status?: number; data?: Student } {
        if (!nom || !age) {
            return { error: "Le nom et l'âge sont obligatoires", status: 400 };
        }
        const newStudent = studentRepository.create(nom, age);
        return { data: newStudent, status: 201 };
    },

    updateStudent(id: number, nom: string, age: number): { error?: string; status?: number; data?: Student } {
        const etudiants = studentRepository.findAll();
        const index = etudiants.findIndex(e => e.id === id);

        if (index === -1) {
            return { error: "Étudiant non trouvé", status: 404 };
        }
        if (!nom || !age) {
            return { error: "Le nom et l'âge sont obligatoires pour un PUT", status: 400 };
        }

        const updated = studentRepository.update(index, id, nom, age);
        return { data: updated, status: 200 };
    },

    patchStudent(id: number, nom?: string, age?: number): { error?: string; status?: number; data?: Student } {
        const etudiant = studentRepository.findById(id);
        if (!etudiant) {
            return { error: "Étudiant non trouvé", status: 404 };
        }

        if (nom) etudiant.nom = nom;
        if (age) etudiant.age = age;

        return { data: etudiant, status: 200 };
    },

    deleteStudent(id: number): { error?: string; status?: number } {
        const etudiants = studentRepository.findAll();
        const index = etudiants.findIndex(e => e.id === id);

        if (index === -1) {
            return { error: "Étudiant non trouvé", status: 404 };
        }

        studentRepository.delete(index);
        return { status: 204 };
    }
};