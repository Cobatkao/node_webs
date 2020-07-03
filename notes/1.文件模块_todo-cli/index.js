const db = require('./db')
const inquirer = require('inquirer')
const path = require('path')
const targetHome = process.env.HOME || require('os').homedir()
const todoFilePath = path.join(targetHome, '.todolist')

const storePath = () => {
    console.log(todoFilePath)
}

const clear = async () => {
    await db.write([])
    process.exit()
}

const printTaskByStatus = async (status) => {
    const list = await db.read().then(null, err => {
        return console.log(`发生内部错误 ${err}`)
    })
    inquirer.prompt({
        type: 'list',
        name: 'index',
        message: '请选择以下待办事项？',
        choices: [
            new inquirer.Separator(),
            // 根据status筛选
            ...list.filter(task => { return task.done === status}).map((task, index) => {
                return {
                    name: `${index + 1} → ${task.title} - ${task.description}`,
                    value: index.toString()
                }
            }),
            new inquirer.Separator(),
            {name: '+ 创建新任务', value: '-2'},
            {name: '! 退出', value: '-1'},
        ]
    })
        .then(res => {
            const index = parseInt(res.index)
            if (index >= 0) {
                askForActions(list, index)
            } else if (index === -2) {
                createTask()
            }
        })
}

// 创建新任务时的问题
const questions = [
    {
        name: "name",
        type: "input",
        message: "请输入待办事项:",
    },
    {
        name: "description",
        type: "input",
        message: "请输入待办描述:"
    }
]

// 创建待办事项
const createTask = () => {
    inquirer.prompt(questions).then(({title, description}) => {
        console.log(title, description)
        insertTask(title, description)
    })
}

// 展示当前的任务
const showTaskDetail = ({title, description, done, createAt, updateAt, completeAt}) => {
    console.log('-'.repeat(25))
    console.log(`待办事项：${title}`)
    console.log(`事项描述：${description}`)
    console.log(`当前状态：${done ? '已完成' : '未完成'}`)
    console.log(`创建时间：${createAt}`)
    console.log(`更新时间：${updateAt}`)
    console.log(`完成时间：${completeAt}`)
}

// 插入新的任务
const insertTask = async (title, description) => {
    const now = (new Date()).toLocaleString()
    const todoList = await db.read().then(null, err => {
        console.log(`发生内部错误 ${err}`)
    })
    const todo = {
        title,
        description,
        done: false,
        createAt: now,
        updateAt: now,
        completeAt: '/'
    }
    todoList.push(todo)
    db.write(todoList).then(() => {
        console.log('添加成功')
        showTaskDetail(todo)
    })
}

// 操作待办事项
const askForActions = (list, index) => {
    const actions = {
        markAsDone,
        markAsUnDone,
        updateTask,
        removeItem,
        quit
    }
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: '请选择操作',
        choices: [
            {name: '返回上一级', value: 'quit'},
            {name: '已完成', value: 'markAsDone'},
            {name: '未完成', value: 'markAsUnDone'},
            {name: '改标题', value: 'updateTask'},
            {name: '删除', value: 'removeItem'},
        ]
    }).then(answer => {
        const action = actions[answer.action]
        action && action(list, index)
    })
}

const quit = (list) => {
    printAllTasks(list)
}

const markAsDone = (list, index) => {
    list[index].done = true
    list[index].completeAt = (new Date()).toLocaleString()
    db.write(list)
    showTaskDetail(list[index])
}

const markAsUnDone = (list, index) => {
    list[index].done = false
    db.write(list)
}

const updateTask = (list, index) => {
    inquirer.prompt({
        type: 'input',
        name: 'title',
        message: '请输入新的标题',
        default: `目前的标题 - ${list[index].title}`
    }).then(rel => {
        list[index].title = rel.title
        list[index].updateAt = (new Date()).toLocaleString()
        db.write(list)
        showTaskDetail(list[index])
    })
}

const removeItem = (list, index) => {
    inquirer.prompt({
        type: 'confirm',
        message: '是否确定删除？',
        name: 'delete'
    }).then(info => {
        info.delete ? list.splice(index, 1) : console.log('取消删除')
        db.write(list)
        console.log('删除成功')
    })
}

const printAllTasks = (list) => {
    inquirer.prompt({
        type: 'list',
        name: 'index',
        message: '请选择以下待办事项？',
        choices: [
            new inquirer.Separator(),
            ...list.map((task, index) => {
                return {
                    name: `${task.done ? '✔' : '╳'} ${index + 1} → ${task.title} - ${task.description}`,
                    value: index.toString()
                }
            }),
            new inquirer.Separator(),
            {name: '+ 创建新任务', value: '-2'},
            {name: '! 退出', value: '-1'},
        ]
    })
        .then(res => {
            const index = parseInt(res.index)
            if (index >= 0) {
                askForActions(list, index)
            } else if (index === -2) {
                createTask()
            }
        })
}

const show = async () => {
    const list = await db.read().then(null, err => {
        return console.log(`发生内部错误 ${err}`)
    })
    if (!list.length) {
        return console.log('暂无待办事项哦~')
    }
    printAllTasks(list)
}

module.exports = {
    insertTask,
    show,
    clear,
    storePath,
    printTaskByStatus
}