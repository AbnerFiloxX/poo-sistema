const formulario = document.getElementById('formulario')
const cardsEstudiantes = document.getElementById('cardsEstudiantes')
const cardsProfesores = document.getElementById('cardsProfesores')
const templateEstudiantes = document.getElementById('templateEstudiante').content
const templateProfesores = document.getElementById('templateProfesor').content
const alert = document.querySelector('.alert')

const estudiantes = []
const profesores = []

//Construccion de Clases
class Persona {
    constructor(nombre,edad){
        this.nombre = nombre
        this.edad = edad
        this.uid = `${Date.now()}`
    }

    static pintarPersonaUI(personas,tipo){
        if(tipo=== 'Estudiante'){
            cardsEstudiantes.textContent = ''
            const fragment = document.createDocumentFragment()

            personas.forEach((item) =>{
                fragment.appendChild(item.agregarNuevoEstudiante())
            })

            cardsEstudiantes.appendChild(fragment)
        }

        if(tipo=== 'Profesor'){
            cardsProfesores.textContent = ''
            const fragment = document.createDocumentFragment()

            personas.forEach((item) =>{
                fragment.appendChild(item.agregarNuevoProfesor())
            })

            cardsProfesores.appendChild(fragment)
        }
    }
}

class Estudiante extends Persona{
    #estado = false
    #estudiante = "Estudiante"

    set setEstado(estado){
        this.#estado = estado
    }

    get getEstudiante(){
        return this.#estudiante
    }

    agregarNuevoEstudiante(){
        const clone = templateEstudiantes.cloneNode(true)
        clone.querySelector('h5 .text-primary').textContent = this.nombre
        clone.querySelector('h6').textContent = this.getEstudiante
        clone.querySelector('.lead').textContent = this.edad

        if(this.#estado){
            clone.querySelector('.badge').className = "badge bg-success"
            clone.querySelector('.btn-success').disabled = true
            clone.querySelector('.btn-danger').disabled = false
        } else{
            clone.querySelector('.badge').className = "badge bg-danger"
            clone.querySelector('.btn-success').disabled = false
            clone.querySelector('.btn-danger').disabled = true
        }

        clone.querySelector('.badge').textContent = this.#estado ? 'Aprobado' : 'Reprobado'

        clone.querySelector('.btn-success').dataset.uid = this.uid
        clone.querySelector('.btn-danger').dataset.uid = this.uid
        
        return clone
    }
}


class Profesor extends Persona {
    #profesor = 'Profesor'

    agregarNuevoProfesor(){
        const clone = templateProfesores.cloneNode(true)
        clone.querySelector('h5').textContent = this.nombre
        clone.querySelector('h6').textContent = this.#profesor
        clone.querySelector('.lead').textContent = this.edad
        return clone
    }
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    alert.classList.add('d-none')
    const datos = new FormData(formulario)
    const [nombre, edad, opcion] =  [...datos.values()]
    
    if(!nombre.trim() || !edad.trim() || !opcion.trim()){
        alert.classList.remove('d-none')
        return
    }

    if(opcion === 'Estudiante'){
        const estudiante = new Estudiante(nombre,edad)
        estudiantes.push(estudiante)
        Persona.pintarPersonaUI(estudiantes,opcion)
    }

    if(opcion === 'Profesor'){
        const profesor = new Profesor(nombre,edad)
        profesores.push(profesor)
        Persona.pintarPersonaUI(profesores,opcion)
    }
})