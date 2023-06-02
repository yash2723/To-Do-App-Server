import ErrorHandler from "../middlewares/error.js";
import Task from "../models/task.js";

export const newTask = async (req, res, next) => {
    
    try {
        const {title, description} = req.body;

        await Task.create({
            title,
            description,
            user: req.user,
        });

        res.status(201).json({
            success: true,
            msg: "Task added successfully."
        });
    } catch (error) {
        next(error);
    }

}

export const getMyTask = async (req, res, next) => {
    
    try {
        const tasks = await Task.find({user: req.user._id});

        res.status(200).json({
            success: true,
            msg: tasks
        })
    } catch (error) {
        next(error);
    }

}

export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!task) {
            return next(new ErrorHandler("Task not Found.", 404));
        }
        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(200).json({
            success: true,
            msg: "Task updated."
        });
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!task) {
            return next(new ErrorHandler("Task not Found.", 404));
        }
        await task.deleteOne();
        
        res.status(200).json({
            success: true,
            msg: "Task deleted."
        });
    } catch (error) {
        next(error);
    }
}