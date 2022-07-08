import React from 'react'

const formData = {
    title: 'Encuesta 1',
    description: 'Esta es la descripcion de la encuesta 1 para la asignatura de ingenieria de software dos',
    preguntas: [
        {
            title: '¿Te gusta el pancito?',
            id: 'id-1',
            alter: [
                {
                    title: 'si',
                    id: 'id-alternativa-1'
                },
                {
                    title: 'no',
                    id: 'id-alternativa-2'
                },
                {
                    title: 'uwu',
                    id: 'id-alternativa-3'
                }
            ]
        },
        {
            title: '¿Te gusta la coca?',
            id: 'id-1',
            alter: [
                {
                    title: 'si',
                    id: 'id-alternativa-1'
                },
                {
                    title: 'no',
                    id: 'id-alternativa-2'
                },
                {
                    title: 'mejor la sprite',
                    id: 'id-alternativa-3'
                }
            ]
        },
        {
            title: 'dime que funciona por favor',
            id: 'id-1',
            alter: [
                {
                    title: 'si',
                    id: 'id-alternativa-1'
                },
                {
                    title: 'no',
                    id: 'id-alternativa-2'
                },
                {
                    title: 'te la rifaste carnal',
                    id: 'id-alternativa-3'
                }
            ]
        }
    ]
}


export default formData;