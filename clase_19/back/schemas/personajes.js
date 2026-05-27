import yup from "yup"

export const personajesSchema = yup.object({
    _id: yup.string().optional().matches(/^[0-9a-fA-F]/, "No es un _id valido"),
    name: yup.string().required("El campo nombre es requerido").min(3),
    alternate_names: yup.array().optional(),
    species: yup.string().required(),
    gender: yup.string().required(),
    house: yup.string().required().oneOf(['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'], "Debe ser una casa valida"),
    dateOfBirth: yup.date().optional(),
    yearOfBirth: yup.number().integer().min(1950),
    wizard: yup.boolean().optional(),
    ancestry: yup.string().optional(),
    eyeColour: yup.string().optional(),
    hairColour: yup.string().optional(),
    wand: yup.object().optional(),
    patronus: yup.string().optional(),
    hogwartsStudent: yup.boolean().optional(),
    hogwartsStaff: yup.boolean().optional(),
    actor: yup.string().required(),
    alternate_actors: yup.array().optional(),
    alive: yup.boolean().optional(),
    image: yup.string().url().optional()
})