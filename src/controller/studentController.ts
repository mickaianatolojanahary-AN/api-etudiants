
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();import { Request, Response } from 'express';
import { studentService } from '../service/studentService.js';

export const studentController = {
  getAll(req: Request, res: Response) {
    const students = studentService.getAllStudents();
    return res.status(200).json(students);
  },

  getById(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const student = studentService.getStudentById(id);
    if (!student) {
      return res.status(404).json({ erreur: "Étudiant non trouvé" });
    }
    return res.status(200).json(student);
  },

  create(req: Request, res: Response) {
    const { nom, age } = req.body;
    const result = studentService.createStudent(nom, age);
    return res.status(201).json(result);
  }
};
export const getAllStudents = async (req: any, res: any) => {
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des étudiants" });
  }
};
export const createStudent = async (req: any, res: any) => {
  try {
    const { nom, age } = req.body;
    const newStudent = await prisma.student.create({
      data: { nom, age }
    });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création de l'étudiant" });
  }
};