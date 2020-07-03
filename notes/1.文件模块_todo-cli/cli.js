#!/usr/bin/env node
const program = require('commander');
const api = require('./index')
const pkg = require('./package.json')

// 查看.todolist文件地址
program.option("-p --path", "Show .todolist file", () => {
    void api.storePath();
});

// 查看未完成的todo
program.option("-u --undone", "Show undone todos", () => {
    void api.printTaskByStatus(false);
});

// 查看已完成的todo
program.option("-d --done", "Show done todos", () => {
    void api.printTaskByStatus(true);
});

// 查看版本号
program
    .version(pkg.version)

// add 添加新的代办
program
    .command('add <taskName> [description]')
    .description('add a newly task to Todo list')
    .action((taskName, description) => {
        void api.insertTask(taskName, description)
    });

// list 展示所有待办事项
program
    .command('list')
    .description('list all todo')
    .action(() => {
        void api.show();
    });

// clear 清除所有待办
program
    .command('clear')
    .description('clear all tasks')
    .action(() => {
        void api.clear()
    });

// 显示所有待办
if (process.argv.length === 2) {
    void api.show()
}

program.parse(process.argv);