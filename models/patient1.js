module.exports = [
    {
        user_properties: {
            id: "1001",
            type: "patient",
            email: "bob@gmail.com",
            password: "bob666",
            firstName: "Bob",
            lastName: "Sponge",
            screenName: "BobTheSquarepants",
            dateOfBirth: "01/01/1999",
            bio: "I've a TV show."
        },

        clinician: "0003",


        data: {
            blood_glucose_level: {
                required:        true,
                lower_threshold: 12,
                upper_threshold: 30
            },

            weight: {
                required:        false,
                lower_threshold: null,
                upper_threshold: null
            },

            doses_of_insulin_taken: {
                required:        true,
                lower_threshold: 0,
                upper_threshold: 3
            },

            exercise: {
                required:        false,
                lower_threshold: null,
                upper_threshold: null
            }
        },


        data_history: {
            "05/04/2022": {
                blood_glucose_level: {
                    value: 24,
                    comment: "taken after an hour rest"
                },
                doses_of_insulin_taken: {
                    value: 2,
                    comment: "after two Krabby Patty burgers"
                }
            },

            "01/04/2022": {
                blood_glucose_level: {
                    value: 24,
                    comment: null
                },
                doses_of_insulin_taken: {
                    value: 1,
                    comment: "after a Krabby Patty burger"
                }
            },

            "25/03/2022": {
                blood_glucose_level: {
                    value: 24,
                    comment: null
                },
                "doses_of_insulin_taken": {
                    value: 1,
                    comment: null
                },
                exercise: {
                    value: 9999,
                    comment: "i'm lovin' it"
                }
            }
        },


        support_message: "doing good!",


        clinician_notes: {
            "04/04/2022@09:15:10": "too much burgers",
            "05/03/2022@10:24:32": "he has a square butt"
        }
    }
]
