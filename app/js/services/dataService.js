angular
  .module('ServeData', [])
  .service('sData', [function() {
    return {
      pageTitle: '',
      pageIcon: '',
      patient: null,
      profesional: null,
      especialidades: ['psi', 'fono', 'teo'],
      profesionales: [{
          "name": 'Luz Adriana',
          "last_name": 'Remolina Leon',
          "document": '129345625',
          "birthdate": '14/09/1989',
          "phone": '3014562347',
          "speciality": 'psicologo',
          "consultorio": '205',
          "gender": 'F',
          "type": "doctor",
          "id": "1"
        },
        {
          "name": 'José',
          "last_name": 'Peres Mendez',
          "document": '3463246',
          "birthdate": '4/05/1967',
          "phone": '3156467456',
          "speciality": "fonoaudiologo",
          "consultorio": '15',
          "gender": 'M',
          "type": "doctor",
          "id": "2"
        }
      ],
      pacientes: [{
        "email": "sergut18@gmail.com",
        "password": "1016012390",
        "password_confirmation": "1016012390",
        "document": "1016012390",
        "name": "Sergio Alexander",
        "last_name": "Gutiérrez Bustos",
        "gender": "M",
        "birthdate": "5/18/1988",
        "phone": "3138315841",
        "aditional_information": {
          "blood_type": 'O+',
          "civil_status": "soltero",
          "occupation": "PROFESOR",
          "live_with": ["vive con 1", "vive con 2"],
          "religion": "religion",
          "companion": "ESPOSA",
          "place_of_birth": "Lugar de nacimiento",
          "state": "DEPARTAMENTO",
          "municipality": "MUNICIPIO",
          "city": "CIUDAD",
          "address": "DIIRECCION",
          "cellphone": "3124444444",
          "ethnicity": "ETNIA",
          "education_level": "NIVEL DE EDUCACION"
        }
      }],
    };
  }]);