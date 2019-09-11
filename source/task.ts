/*!
 * Copyright (C) 2019 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Memory from './helper/memory';

/**
 * Task callback.
 */
type Callback = (task: Task) => any;

/**
 * Task properties.
 */
type Properties = {
  /**
   * Determines whether or not the task will repeat.
   */
  repeat: boolean;
  /**
   * Task callback.
   */
  callback: Callback;
  /**
   * Task delay time in ms.
   */
  delay: number;
  /**
   * Task start time in ms.
   */
  time: number;
};

/**
 * All properties.
 */
const allProperties = new WeakMap<Task, Properties>();

/**
 * All tasks.
 */
const allTasks = new Set<Task>();

/**
 * Task
 */
export class Task {
  /**
   * Default constructor.
   * @param callback Task callback.
   * @param repeat Determines whether or not the task will repeat.
   * @param delay Start delay time in ms.
   */
  constructor(callback: Callback, repeat?: boolean, delay?: number) {
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
  public get repeat(): boolean {
    return Memory.getObject(allProperties, this).repeat;
  }

  /**
   * Delay time in ms.
   */
  public get delay(): number {
    return Memory.getObject(allProperties, this).delay;
  }

  /**
   * Start time in ms.
   */
  public get time(): number {
    return Memory.getObject(allProperties, this).time;
  }

  /**
   * Cancel task.
   */
  public cancel(): void {
    allTasks.delete(this);
  }
}

/**
 * Perform all pending tasks.
 */
export function performAllTasks(): void {
  for (const task of allTasks) {
    const properties = Memory.getObject(allProperties, task);
    if (new Date().getTime() > properties.time) {
      properties.callback(task);
      if (task.repeat) {
        properties.time = new Date().getTime() + properties.delay;
      } else {
        allTasks.delete(task);
      }
    }
  }
}
