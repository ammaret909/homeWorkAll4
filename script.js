function addStudentToTbl(index, student) {
    const tableBody = document.getElementById('output-table')
    let row = document.createElement('tr')
    let cell = document.createElement('th')
    cell.setAttribute('scope', 'row')
    cell.innerHTML = index
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = `${student.name} ${student.surname}`
    row.appendChild(cell)
    cell = document.createElement('td')
    let div = document.createElement('div')
    let pic = document.createElement('img')
    pic.setAttribute('src', student.image)
    pic.setAttribute('alt', student.image)
    pic.style.height = '150px'
    pic.classList.add('img-thumbnail')
    div.appendChild(pic)
    cell.appendChild(div)
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.studentId
    row.appendChild(cell)
    cell = document.createElement('td')
    let button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-warning')
    button.setAttribute('type', 'button')
    button.innerHTML = 'EDIT'
    button.addEventListener('click', function (e) {
        e.stopPropagation()
        let text = `Edit ${student.name}`;
        if (confirm(text)) {
            editStudentData(student)
        }
    })
    cell.appendChild(button)
    row.appendChild(cell)
    cell = document.createElement('td')
    button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-danger')
    button.setAttribute('type', 'button')
    button.innerHTML = 'DELETE'
    button.addEventListener('click', function (e) {
        e.stopPropagation()
        let text = `Delete ${student.name}`;
        if (confirm(text)) {
            deleteStudet(student.id)
        }
    })
    cell.appendChild(button)
    row.appendChild(cell)
    row.addEventListener('click', function () {
        showStudentBlock(student)
    })
    tableBody.appendChild(row)
}

function addStudentList(studentList) {
    let counter = 1;
    let tableBody = document.getElementById('output-table')
    tableBody.innerHTML = ""
    for (student of studentList) {
        addStudentToTbl(counter++, student)
    }
}

var singleStudentResult = document.getElementById('sinigle_student_result')
var listStudentResult = document.getElementById('output')
var addUserDetail = document.getElementById('addUserDetail')
function hideAll() {
    singleStudentResult.style.display = 'none'
    listStudentResult.style.display = 'none'
    addUserDetail.style.display = 'none'
}
document.getElementById('allStudentMenu').addEventListener('click', function () {
    hideAll()
    listStudentResult.style.display = 'block'
    showAllStudent()
})
document.getElementById('addStudentMenu').addEventListener('click', function () {
    hideAll()
    addUserDetail.style.display = 'block'

})
document.getElementById('searchMenu').addEventListener('click', function () {
    hideAll()
    singleStudentResult.style.display = 'block'

})

function addStudentData(student) {
    let idElem = document.getElementById('id')
    idElem.innerHTML = student.id
    let studentIdElem = document.getElementById('studentId')
    studentIdElem.innerHTML = student.studentId
    let nameElem = document.getElementById('name')
    nameElem.innerHTML = `${student.name} ${student.surname}`
    let gpaElem = document.getElementById('gpa')
    gpaElem.innerHTML = student.gpa
    let profileElem = document.getElementById('image')
    profileElem.setAttribute('src', student.image)
}


document.getElementById('searchButton').addEventListener('click', () => {
    let id = document.getElementById('inputText').value
    console.log(id)
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`)
        .then(respond => {
            return respond.json()
        }).then(student => {
            addStudentData(student)
        })
})

function addStudentToDB(student) {
    fetch('http://dv-student-backend-2019.appspot.com/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    }).then(respond => {
        if (respond.status === 200) {
            return respond.json()
        }
        else {
            throw Error(respond.statusText)
        }
    }).then(data => {
        console.log('success', data)
        showAllStudent()
    }).catch(error => {
        return null
    })
}
function editStudentToDB(student){
    fetch('http://dv-student-backend-2019.appspot.com/students', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    }).then(respond => {
        if (respond.status === 200) {
            return respond.json()
        }
        else {
            throw Error(respond.statusText)
        }
    }).then(data => {
        console.log('success', data)
        showAllStudent()
    }).catch(error => {
        return null
    })

}

function deleteStudet(id) {
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`, {
        method: 'DELETE'
    }
    ).then(respond => {
        if (respond.status === 200) {
            return respond.json()
        } else {
            throw Error(respond.statusText)
        }
    }).then(data => {
        alert(`student name ${data.name} is now deleted`)
        showAllStudent()
    }).catch(error => {
        alert('failed')
    })
}
function onAddStudentClick() {
    let student = {}
    if((document.getElementById('idTemp').value !== undefined) && (document.getElementById('idTemp').value !== null)){
        student.id = document.getElementById('idTemp').value
    }
    student.name = document.getElementById('nameInput').value
    student.surname = document.getElementById('surnameInput').value
    student.studentId = document.getElementById('studentIdInput').value
    student.gpa = document.getElementById('gpaInput').value
    student.image = document.getElementById('imageLinkInput').value
    if((document.getElementById('idTemp').value !== undefined) && (document.getElementById('idTemp').value !== null)){
        editStudentToDB(student)
    }else{
        addStudentToDB(student)
    }
    
}
document.getElementById('addButton').addEventListener('click', function () {
    onAddStudentClick()
})
function showAllStudent() {
    fetch('http://dv-student-backend-2019.appspot.com/students').then(response => {
        return response.json()
    })
        .then(data => {
            addStudentList(data)
        })
}
function showStudentBlock(student) {
    hideAll()
    singleStudentResult.style.display = 'block'
    addStudentData(student)
}
function editStudentData(incomeStudent) {
    hideAll()
    addUserDetail.style.display = 'block'
    document.getElementById('idTemp').value = incomeStudent.id
    document.getElementById('nameInput').value = incomeStudent.name
    document.getElementById('surnameInput').value = incomeStudent.surname
    document.getElementById('studentIdInput').value = incomeStudent.studentId
    document.getElementById('gpaInput').value = incomeStudent.gpa
    document.getElementById('imageLinkInput').value = incomeStudent.image
}
function onLoad() {

    fetch('http://dv-student-backend-2019.appspot.com/students').then(response => {
        return response.json()
    })
        .then(data => {
            hideAll()
            addStudentList(data)
        }
        )
}