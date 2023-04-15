import Questions from "../models/questionsSchema.js";
import Results from "../models/resultSchema.js";
import questions, { answers } from '../database/data.js';

/** get all questions */

export async function getQuestions(req, res) {
    try {
        const questions = await Questions.find();
        res.json(questions);
    } catch (error) {
        res.json({ error });
    }
}

export async function insertQuestions(req, res) {
    try {
        const result = await Questions.insertMany({ questions, answers });
        res.json({ msg: "Veri başarılı bir şekilde db'ye kaydedildi. " });
    } catch (error) {
        res.json({ error });
    }
}


/** delete all questions */
export async function dropQuestions(req, res) {
    try {
        const result = await Questions.deleteMany();
        res.json({ msg: "Sorular başarılı bir şekilde silindi" });
    } catch (error) {
        res.json({ error });
    }
}

/** get all result */
export async function getResult(req, res) {
    try {
        const result = await Results.find();
        res.json(result);
    } catch (error) {
        res.json({ error });
    }
}

/** insert all results */
export async function storeResult(req, res) {
    try {
        const { username, result, attempts, points, achived } = req.body;
        if (!username && !result) throw new Error('Veri sağlanmadığı için işlem yapılamadı');

        Results.create({ username, result, attempts, points, achived })
        res.json({ msg: "Test sonucu başarıyla db'ye kaydedildi." })
    } catch (error) {
        res.json({ error });
    }
}

/** delete all results */
export async function dropResult(req, res) {
    try {
        await Results.deleteMany();
        res.json({ msg: "Tüm test sonuçları silindi" });
    } catch (error) {
        res.json({ error });
    }
}