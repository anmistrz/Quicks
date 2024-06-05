
const random = (min:number, max:number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const randomDateWithHours = (min:number, max:number) => {
    const today = new Date();
    const randomDay = random(min, max);
    today.setDate(today.getDate() - randomDay);
    today.setHours(random(0, 23));
    today.setMinutes(random(0, 59));
    return today;
}

export const dummyDataChats = [
    {
        idGroup: 1,
        title: 'Group 1',
        member: [
            {
                id: 1,
                name: 'John Doe',
            },
            {
                id: 2,
                name: 'Jane Doe',
            },
            {
                id: 3,
                name: 'John Smith',
            }
        ],
        chats: [
            {
                id: 1,
                idUser: 1,
                name: 'John Doe',
                message: 'Hello',
                date: randomDateWithHours(0, 10)
            },
            {
                id: 2,
                idUser: 2,
                name: 'Jane Doe',
                message: 'Hi',
                date: randomDateWithHours(0, 10)
            },
            {
                id: 3,
                idUser: 3,
                name: 'John Smith',
                message: 'How are you?',
                date: randomDateWithHours(0, 10)
            }
        ],
    },
    {
        idGroup: 2,
        title: 'Group 2',
        member: [
            {
                id: 1,
                name: 'John Doe',
            },
            {
                id: 2,
                name: 'Jane Doe',
            },
            {
                id: 3,
                name: 'John Smith',
            }
        ],
        chats: [
            {
                id: 1,
                idUser: 1,
                name: 'John Doe',
                message: 'Good Morning',
                date: randomDateWithHours(0, 10)
            },
            {
                id: 2,
                idUser: 2,
                name: 'Jane Doe',
                message: 'Good Morning',
                date: randomDateWithHours(0, 10)
            },
            {
                id: 3,
                idUser: 3,
                name: 'John Smith',
                message: "Let's go to the beach",
                date: randomDateWithHours(0, 10)
            }
        ],
    },
    {
        idGroup: 3,
        title: 'Group 3',
        member: [
            {
                id: 1,
                name: 'John Doe',
            },
            {
                id: 2,
                name: 'Jane Doe',
            },
            {
                id: 3,
                name: 'John Smith',
            }
        ],
        chats: [
            {
                id: 1,
                idUser: 1,
                name: 'John Doe',
                message: 'Good Night',
                date: randomDateWithHours(0, 10)
            },
            {
                id: 2,
                idUser: 2,
                name: 'Jane Doe',
                message: 'Good Night',
                date: randomDateWithHours(0, 10)
            },
            {
                id: 3,
                idUser: 3,
                name: 'John Smith',
                message: 'Good Night',
                date: randomDateWithHours(0, 10)
            }
        ],
    },
    {
        idGroup: 4,
        title: 'Group 4',
        member: [
            {
                id: 1,
                name: 'John Doe',
            },
            {
                id: 2,
                name: 'Jane Doe',
            },
            {
                id: 3,
                name: 'John Smith',
            }
        ],
        chats: [
            {
                id: 1,
                idUser: 1,
                message: 'Good Afternoon',
                date: randomDateWithHours(0, 10)
            },
            {
                id: 2,
                idUser: 2,
                name: 'Jane Doe',
                message: 'Good Afternoon',
                date: randomDateWithHours(0, 10)
            },
            {
                id: 3,
                idUser: 3,
                name: 'John Smith',
                message: 'Good Afternoon',
                date: randomDateWithHours(0, 10)
            }
        ],
    }
]



export const defaultDummyDataChats = [
    {
        idGroup: 1,
        title: 'Group 1',
        member: [
            {
                id: 1,
                name: 'John Doe',
            },
            {
                id: 2,
                name: 'Jane Doe',
            },
            {
                id: 3,
                name: 'John Smith',
            }
        ],
        chats: [
            {
                id: 1,
                idUser: 1,
                name: 'John Doe',
                message: 'Hello',
                date: randomDateWithHours(0, 10)
            },
            {
                id: 2,
                idUser: 2,
                name: 'Jane Doe',
                message: 'Hi',
                date: randomDateWithHours(0, 10)
            },
            {
                id: 3,
                idUser: 3,
                name: 'John Smith',
                message: 'How are you?',
                date: randomDateWithHours(0, 10)
            }
        ],
    },
    {
        idGroup: 2,
        title: 'Group 2',
        member: [
            {
                id: 1,
                name: 'John Doe',
            },
            {
                id: 2,
                name: 'Jane Doe',
            },
            {
                id: 3,
                name: 'John Smith',
            }
        ],
        chats: [
            {
                id: 1,
                idUser: 1,
                name: 'John Doe',
                message: 'Good Morning',
                date: randomDateWithHours(0, 10)
            },
            {
                id: 2,
                idUser: 2,
                name: 'Jane Doe',
                message: 'Good Morning',
                date: randomDateWithHours(0, 10)
            },
            {
                id: 3,
                idUser: 3,
                name: 'John Smith',
                message: "Let's go to the beach",
                date: randomDateWithHours(0, 10)
            }
        ],
    },
    {
        idGroup: 3,
        title: 'Group 3',
        member: [
            {
                id: 1,
                name: 'John Doe',
            },
            {
                id: 2,
                name: 'Jane Doe',
            },
            {
                id: 3,
                name: 'John Smith',
            }
        ],
        chats: [
            {
                id: 1,
                idUser: 1,
                name: 'John Doe',
                message: 'Good Night',
                date: randomDateWithHours(0, 10)
            },
            {
                id: 2,
                idUser: 2,
                name: 'Jane Doe',
                message: 'Good Night',
                date: randomDateWithHours(0, 10)
            },
            {
                id: 3,
                idUser: 3,
                name: 'John Smith',
                message: 'Good Night',
                date: randomDateWithHours(0, 10)
            }
        ],
    },
    {
        idGroup: 4,
        title: 'Group 4',
        member: [
            {
                id: 1,
                name: 'John Doe',
            },
            {
                id: 2,
                name: 'Jane Doe',
            },
            {
                id: 3,
                name: 'John Smith',
            }
        ],
        chats: [
            {
                id: 1,
                idUser: 1,
                message: 'Good Afternoon',
                date: randomDateWithHours(0, 10)
            },
            {
                id: 2,
                idUser: 2,
                name: 'Jane Doe',
                message: 'Good Afternoon',
                date: randomDateWithHours(0, 10)
            },
            {
                id: 3,
                idUser: 3,
                name: 'John Smith',
                message: 'Good Afternoon',
                date: randomDateWithHours(0, 10)
            }
        ],
    }
]