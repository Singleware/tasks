/**
 * Task callback.
 */
declare type Callback = (task: Task) => any;
/**
 * Task
 */
export declare class Task {
    /**
     * Default constructor.
     * @param callback Task callback.
     * @param repeat Determines whether or not the task will repeat.
     * @param delay Start delay time in ms.
     */
    constructor(callback: Callback, repeat?: boolean, delay?: number);
    /**
     * Determines whether or not the task will repeat.
     */
    readonly repeat: boolean;
    /**
     * Delay time in ms.
     */
    readonly delay: number;
    /**
     * Start time in ms.
     */
    readonly time: number;
    /**
     * Cancel task.
     */
    cancel(): void;
}
/**
 * Perform all pending tasks.
 */
export declare function performAllTasks(): void;
export {};
