"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Memory = require("./helper/memory");
/**
 * All properties.
 */
const allProperties = new WeakMap();
/**
 * All tasks.
 */
const allTasks = new Set();
/**
 * Task
 */
class Task {
    /**
     * Default constructor.
     * @param callback Task callback.
     * @param repeat Determines whether or not the task will repeat.
     * @param delay Start delay time in ms.
     */
    constructor(callback, repeat, delay) {
        allTasks.add(this);
        Memory.setObject(allProperties, this, {
            callback: callback,
            repeat: repeat || false,
            delay: delay || 0,
            time: new Date().getTime() + (delay || 0)
        });
    }
    /**
     * Determines whether or not the task will repeat.
     */
    get repeat() {
        return Memory.getObject(allProperties, this).repeat;
    }
    /**
     * Delay time in ms.
     */
    get delay() {
        return Memory.getObject(allProperties, this).delay;
    }
    /**
     * Start time in ms.
     */
    get time() {
        return Memory.getObject(allProperties, this).time;
    }
    /**
     * Cancel task.
     */
    cancel() {
        allTasks.delete(this);
    }
}
exports.Task = Task;
/**
 * Perform all pending tasks.
 */
function performAllTasks() {
    for (const task of allTasks) {
        const properties = Memory.getObject(allProperties, task);
        if (new Date().getTime() > properties.time) {
            properties.callback(task);
            if (task.repeat) {
                properties.time = new Date().getTime() + properties.delay;
            }
            else {
                allTasks.delete(task);
            }
        }
    }
}
exports.performAllTasks = performAllTasks;
//# sourceMappingURL=task.js.map