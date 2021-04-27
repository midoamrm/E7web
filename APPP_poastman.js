//Author@mohamed amr amhmed taha mansi
//Data:4/26/2021
// ASU


const Joi = require('joi');             

const express = require('express');     
const app = express();                  
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const students = [
    { id: 1, name: 'medoamr', code: "abc4128"},
    { id: 2, name: 'aliiamr', code: "abe4147"},
    { id: 3, name: 'zyenamr', code: "anc4156"}
];




app.get('/'/* path or url '/' represrnts route of the website*/, /* callback function */(req, res) => {
   
    res.send('Hello World');
});


app.get('/api/students', (req, res) => {
    res.send(students);
});


app.get('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('THe student with the given id was not found.');
        return;
    }
    res.send(student);
});




// Add student
app.post('/api/students', (req, res) => {

    const {error} = validatestudent(req.body);

    if (error) return res.status(400).send(error.details[0].message);


    // create a new student object
    const student = {
        id: students.length + 1,
        name: req.body.name,
		code: req.body.code
    };
    students.push(student);
    res.send(student);
});

// Updating resources
app.put('/api/students/:id', (req, res) => {
   
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('THe student with the given id was not found.');

    // validate 
   
    const { error } = validatestudent(req.body); 
    if (error)	return res.status(400).send(error.details[0].message);
	
    
    student.name = req.body.name;
	student.code = req.body.code;
    res.send(student);
});


// Deleting a student
app.delete('/api/students/:id', (req, res) => {
    
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('THe student with the given id was not found.');
	
    // Delete
    const index = students.indexOf(student);
    students.splice(index, 1);

    // Return the same student
    res.send(student);
});

// Environment variable
const port = /*process.env.port ||*/ 3000

app.listen(port /*PortNumber*/, () => console.log(`Listeneing on port ${port}......`) /* optionally a function that called when the app starts listening to the given port */);



function validatestudent(student) {
    const schema = {
        name: Joi.string().regex(new RegExp('^[a-zA-Z\-\,]*$')).required(),
		code: Joi.string().min(7).max(7).required()
    }
    return Joi.validate(student, schema);
}
////////////////////////////
const courses = [
    { id: 1, name: 'course1', code: "CSE412", description: "Good" },
    { id: 2, name: 'course2', code: "DBE413", description: "Bad"  },
    { id: 3, name: 'course3', code: "BBE413", description: "Excllanet"  }
];



// To respond to http get request
app.get('/'/* path or url '/' represrnts route of the website*/, /* callback function */(req, res) => {
    // This req object has a bunch of useful propereties u can refrence documentation for more info
    res.send('Hello World');
});

// to get all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});



app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) 
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }
    res.send(course);
});




// Add course
app.post('/api/courses', (req, res) => {

    const {error} = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);


    // create a new course object
    const course = {
        id: courses.length + 1,
        name: req.body.name,
		code: req.body.code,
		description: req.body.description
    };
    courses.push(course);
    res.send(course);
});

// Updating resources
app.put('/api/courses/:id', (req, res) => {
    // Look up the course 
   
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('THe course with the given id was not found.');

    // validate 
    // If not valid, return 400 bad request
    const { error } = validateCourse(req.body); // result.error
    if (error)	return res.status(400).send(error.details[0].message);
	
    // Update the course 
   
    course.name = req.body.name;
	course.code = req.body.code,
	course.description = req.body.description
    res.send(course);
});


// Deleting a course
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course 
    
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('THe course with the given id was not found.');
	
    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});






function validateCourse(course) {
    const schema = {
        name: Joi.string().min(5).required(),
		code: Joi.string().regex(new RegExp('^[a-zA-Z][a-zA-Z][a-zA-Z][0-9][0-9][0-9]$')).required(),
		description: Joi.string().max(200).required()
    }
    return Joi.validate(course, schema);
}
