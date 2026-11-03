require('dotenv').config();
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());

// Existing student data
let students = [
    { id: 1, name: "muku", marks: 35 },
    { id: 2, name: "moka", marks: 95 },
    { id: 3, name: "loka", marks: 75 }
];

// 1. Configure OpenAPI
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Student API',
            version: '1.0.0',
            description: 'API for retrieving student details'
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3001}`
            }
        ]
    },
    apis: ['./student.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// 2. Provide Swagger UI
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// 3. Provide the raw OpenAPI specification
app.get('/openapi.json', (req, res) => {
    res.json(swaggerSpec);
});

// 4. Document your existing API
/**
 * @openapi
 * /student:
 *   get:
 *     summary: Get all students
 *     description: Returns the list of all students.
 *     responses:
 *       200:
 *         description: Successfully retrieved students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   marks:
 *                     type: integer
 */

// 5. Your existing API endpoint
app.get('/student', (req, res) => {
    res.json(students);
});

// 6. Start the server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});