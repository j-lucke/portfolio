let selectedProject = null
const projects = document.querySelectorAll('.project')
//projects.push(document.getElementById('intro'))
//console.log(projects)

document.addEventListener('click', (event) => {
    console.log('distances')
    projects.forEach( p => {
        console.log(p.id, f(p))
    })
    console.log()
})

function f(node) {
    const midScreen = window.innerHeight / 2
    const rect = node.getBoundingClientRect()
    const midNode = rect.y + rect.height/2
    return Math.abs(midScreen - midNode)
}

function select() {
    let min = f(projects[0])
    let project = projects[0]

    for (let i = 0; i < projects.length; i++) {
        const d = f(projects[i])
        if (d < min) {
            project = projects[i]
            min = d
        }
    }

    if (min > 400)
        return null

    return project
}



document.addEventListener('scroll', (event) => {
    old = selectedProject
    selectedProject = select()
    if (selectedProject != null) {
        selectedProject.classList.add('onstage')
    }
    if (old != selectedProject) {
        if (old != null) {
            old.classList.remove('onstage')
        }
    }
    if (selectedProject != null)
        console.log(selectedProject.id)
})


/*
function select() {
    if (selectedProject != null) {
        console.log(selectedProject)
    }
    for (let i = 0; i < projects.length; i++) {
        const y = projects[i].y + projects[i].height / 2
        if (y > 0 && y < window.innerHeight) {
            return projects[i]
        }
    }
    return null
}

document.addEventListener('click', () => {
    projects.forEach(x => {
        console.log(x)})
})

*/


