// --------------------------------------------------------------------------------
// EXERCISE 1
// --------------------------------------------------------------------------------
export function searchNumber(matrix, targetNumber) {

    for (let i = 0; i < matrix.length; i++) {
        let element = matrix[i]
        if (Array.isArray(element)) {

            const found = searchNumber(element, targetNumber)
            if (found) return found

        } else {
            if (element === targetNumber) {
                return true;
            }
        }
    }

    return false;
}

// --------------------------------------------------------------------------------
// EXERCISE 2
// --------------------------------------------------------------------------------
export class Shape {
    constructor(name) {
        this.name = name
    }

    getName() {
        return this.name
    }

    calculateArea() {
        throw new Error("The 'calculateArea' function must be implemented in child classes.")
    }
}

export class Circle extends Shape {
    constructor(name, radius) {
        super(name)
        this.radius = radius
    }

    getName() {
        return `I'm a circle named '${this.name}'`
    }

    calculateArea() {
        return +((Math.PI * Math.pow(this.radius, 2)).toFixed(2))
    }
}


// --------------------------------------------------------------------------------
// EXERCISE 3
// --------------------------------------------------------------------------------
export function Book(title, author, genre) {
    this.title = title
    this.author = author
    this.genre = genre

    this.isGenre = function (genre) {
        return this.genre === genre
    }
}

Book.prototype.setGenre = function (newGenre) {
    this.genre = newGenre
}

Book.prototype.getInfo = function () {
    return {
        Title: this.title,
        Author: this.author,
        Genre: this.genre
    }
}

// --------------------------------------------------------------------------------
// EXERCISE 4
// --------------------------------------------------------------------------------
const createEmpRankByDptm = function (departmentName, rankArr) {
    return {
        departmentName: departmentName,
        rank: rankArr
    }
}

const createEmployeeRank = function (employee) {
    const projects = employee.projects
    let totalHoursWorked = 0

    for (let project of projects) {
        const tasks = project.tasks
        for (let task of tasks) {
            totalHoursWorked += task.hoursWorked
        }
    }

    return {
        fullName: employee['firstName'] + ' ' + employee['lastName'],
        totalHoursWorked: totalHoursWorked
    }
}

const createRankByDptm = function (departmentName, totalHoursWorked) {
    return {
        departmentName: departmentName,
        totalHoursWorked: totalHoursWorked
    }
}

const sortDptmNameAsc = (a, b) => {
    const normA = a.departmentName.toUpperCase()
    const normB = b.departmentName.toUpperCase()

    if (normA > normB) {
        return 1
    }
    if (normA < normB) {
        return -1
    }
    return 0
}

export function dashboardCompany(company) {
    if (!company || typeof company !== 'object' || Array.isArray(company)) {
        throw new Error("The value of company is invalid.")
    }

    const empRankByDpt = {
        employeeRankByDepartment: [],
        rankByDepartment: []
    }

    for (let department of company['departments']) {
        const rank = []
        let totalHoursWorked = 0

        for (let employee of department['employees']) {
            let empRank = createEmployeeRank(employee)
            totalHoursWorked += empRank.totalHoursWorked
            rank.push(empRank)
        }

        rank.sort((a, b) => b.totalHoursWorked - a.totalHoursWorked)

        const empRankByDptm = createEmpRankByDptm(department['name'], rank)
        empRankByDpt['employeeRankByDepartment'].push(empRankByDptm)

        const rankByDptm = createRankByDptm(department.name, totalHoursWorked)
        empRankByDpt['rankByDepartment'].push(rankByDptm)
    }

    empRankByDpt.employeeRankByDepartment.sort(sortDptmNameAsc)
    empRankByDpt.rankByDepartment.sort(sortDptmNameAsc)

    return empRankByDpt
}

// --------------------------------------------------------------------------------
// EXERCISE 5
// --------------------------------------------------------------------------------
export class WordsAnalyzer {

    constructor(data) {
        if (data === undefined || typeof data !== 'object'
            || !this._isValidEntry(data.words)) {

            return new Error("The list of words is invalid.")
        }

        this._words = [...data.words]
        this._totalVowels = this._countVowels(this._words)
        this._totalConsonants = this._countConsonants(this._words)
        this._totalNumbers = this._countNumbers(this._words)
        this._totalSymbols = this._countSymbols(this._words)
    }

    _isValidEntry(entry) {
        if (entry === null || !Array.isArray(entry)
            || (Array.isArray(entry) && entry.length > 0
                && entry.some(w => typeof w !== 'string').length > 0)) {
            return false
        } else {
            return true
        }
    }

    _countVowels(arrWords) {
        let counter = 0

        for (let word of arrWords) {
            counter += this._countWordVowels(word)
        }

        return counter
    }

    _countWordVowels(word) {
        const lowerCaseWord = word.toLowerCase()
        const vowels = ['a', 'e', 'i', 'o', 'u']

        let counter = 0

        for (let i = 0; i < lowerCaseWord.length; i++) {
            if (vowels.includes(lowerCaseWord[i])) {
                counter++
            }
        }

        return counter
    }

    _countConsonants(arrWords) {
        let counter = 0

        for (let word of arrWords) {
            counter += this._countWordConsonants(word)
        }

        return counter
    }

    _countWordConsonants(word) {
        const lowerCaseWord = word.toLowerCase()
        const vowels = ['a', 'e', 'i', 'o', 'u']
        const regex = /[a-z]/i

        let counter = 0

        for (let i = 0; i < lowerCaseWord.length; i++) {
            if (!vowels.includes(lowerCaseWord[i]) && lowerCaseWord[i].match(regex)) {
                counter++
            }
        }

        return counter
    }

    _countNumbers(arrWords) {
        let counter = 0

        for (let word of arrWords) {
            counter += this._countWordNumbers(word)
        }

        return counter
    }

    _countWordNumbers(word) {
        const regex = /[0-9]/

        let counter = 0

        for (let c of word) {
            if (c.match(regex)) {
                counter++
            }
        }

        return counter
    }

    _countSymbols(arrWords) {
        let counter = 0

        for (let word of arrWords) {
            counter += this._countWordSymbols(word)
        }

        return counter
    }

    _countWordSymbols(word) {
        const regex = /[-#]/i

        let counter = 0

        for (let c of word) {
            if (c.match(regex)) {
                counter++
            }
        }

        return counter
    }

    //---Public methods-------------------------
    getTotals() {
        return {
            "consonants": this._totalConsonants,
            "numbers": this._totalNumbers,
            "symbols": this._totalSymbols,
            "vowels": this._totalVowels
        }
    }

    textExists(textToSearch) {
        const lowerCaseTextToSearch = textToSearch.toLowerCase()

        for (let word of this._words) {
            if (word.toLowerCase().includes(lowerCaseTextToSearch)) {
                return true
            }
        }

        return false
    }

    orderWords(orderType) {
        switch (orderType) {
            case 'ASC':
                this.words.sort()
                break
            case 'DESC':
                this.words.reverse()
                break
            default:
                throw new Error('Order type not valid.')
        }
    }

    deleteWord(number) {
        if (typeof number !== 'number' || number < 1 || number > this._words.length) {
            throw new Error("The value of number is invalid.")
        }

        this._words.splice(number - 1, 1)
        this._calculateTotals()
    }

    _calculateTotals() {
        this._totalVowels = this._countVowels(this._words)
        this._totalConsonants = this._countConsonants(this._words)
        this._totalNumbers = this._countNumbers(this._words)
        this._totalSymbols = this._countSymbols(this._words)
    }

    //---Getters and setters--------------------------
    set words(words) {
        if (!this._isValidEntry(words)) {
            throw new Error("The value of words is invalid.")
        }

        this._words = words

        this._calculateTotals()
    }

    get words() {
        return this._words
    }

    get totalVowels() {
        return this._totalVowels
    }

    get totalConsonants() {
        return this._totalConsonants
    }

    get totalNumbers() {
        return this._totalNumbers
    }

    get totalSymbols() {
        return this._totalSymbols
    }
}
