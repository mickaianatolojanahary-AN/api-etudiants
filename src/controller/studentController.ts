import { Request, Response } from 'express';
import { studentService } from '../service/studentService';

export const studentController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const students = await studentService.getAllStudents();
            return res.status(200).json(students);
        } catch (error) {
            return res.status(500).json({ erreur: "Erreur lors de la récupération des étudiants" });
        }
    },

    getById: (req: Request, res: Response) => {
        const id = parseInt(req.params.id as string);
        const student = studentService.getStudentById(id);
        if (!student) {
            return res.status(404).json({ erreur: "Étudiant non trouvé" });
        }
        return res.status(200).json(student);
    },

    create: async (req: Request, res: Response) => {
        try {
            const { nom, age } = req.body;
            const result = await studentService.createStudent(nom, age);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ erreur: "Erreur lors de la création" });
        }
    }
};