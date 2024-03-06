import EventEmitter from 'events';

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

const beforeMigrationFunc1 = async(data:string) => {
    console.log("beforeMigrationFunc1 Migrating... : ", data)
}

const beforeMigrationFunc2 = async(data:string) => {
    console.log("beforeMigrationFunc2 Migrating... : ", data)
}

const beforeMigrationFunc3 = async(data:string) => {
    console.log("beforeMigrationFunc3 Migrating... : ", data)
}

const afterMigrationFunc1 = async(data:string) => {
    console.log("afterMigrationFunc1 Migrating... : ", data)
}

const afterMigrationFunc2 = async(data:string) => {
    console.log("afterMigrationFunc2 Migrating... : ", data)
}

const afterMigrationFunc3 = async(data:string) => {
    console.log("afterMigrationFunc3 Migrating... : ", data)
}

const afterStartFunc1 = async(PORT:any) => {
    console.log(`Server is running on http://localhost:${PORT}`)
}

const afterStartFunc2 = async(PORT:string) => {
    console.log("Listening to the after start event from the the hook.ts file")
}

const afterStartFunc3 = async(data:string) => {
    console.log("Also connected the mongoDB")
}

const runAfterMigrationFuncs = async(data:string) => {
    await afterMigrationFunc1(data)
    await afterMigrationFunc2(data)
    await afterMigrationFunc3(data)
}

const runBeforeMigrationFuncs = async(data:string) => {
    await beforeMigrationFunc1(data)
    await beforeMigrationFunc2(data)
    await beforeMigrationFunc3(data)
}

const runAfterStartFuncs = async(data:string) => {
    await afterStartFunc1(data)
    await afterStartFunc2(data)
    await afterStartFunc3(data)
}

myEmitter.on("beforeMigration", (data) => {
    runBeforeMigrationFuncs(data)
})


myEmitter.on("afterMigration", (data) => {
    runAfterMigrationFuncs(data)
})

myEmitter.on("afterStart", (PORT) => {
    runAfterStartFuncs(PORT)
})

export default  myEmitter ;
