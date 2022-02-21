const fs = require('fs')
const chalk = require('chalk')

const getNotes = () =>  {
    const notes = loadNotes()
    if(notes.length!==0){
        console.log(chalk.green.bold("Your Notes"))
        notes.map((note)=>{
            console.log(chalk.bold(note.title))
        })
    }else{
        console.log(chalk.red.bold("No Notes Found!"))
    }
}

const readNotes = (title) =>  {
    const notes = loadNotes()
    const ourNote = notes.find((note) => note.title===title)
    if(ourNote){
        console.log(chalk.green.bold("Your Note has been Found"))
            console.log(chalk.bold(ourNote.title))
            console.log(chalk.bold(ourNote.body))
    }else{
        console.log(chalk.red.bold("No Such Note Found!"))
    }
}

const addNote = (title,body) =>  {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title===title)
    
    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.bold("New Note added!"));
    }else{
        console.log(chalk.bgRed.rgb(0, 0, 0).bold("Note Title Taken!"));
    }  
}

const removeNote = (title) =>  {
    const notes = loadNotes()
    const newNotes = notes.filter((note) => note.title!==title)
        
    if (newNotes.length !== notes.length){
        saveNotes(newNotes);
        console.log(chalk.green.bold("Note removed!"));
    }else{
        console.log(chalk.bgRed.rgb(0, 0, 0).bold("Note Not Found!"));
    }  
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
        return []
    }
    
}

module.exports ={
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNotes: readNotes

}