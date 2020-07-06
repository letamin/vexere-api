const _ = require("lodash");

const user_1 = {
    name: "Nguyen Van A",
    age: 30,
    education: {
        university: "Van Lang Uni"
    },
    jobs: [
        {
            title: "teacher",
            type: "fulltime"
        },
        {
            title: "dev",
            type: "partime"
        }
    ]
}

const user_2 = {
    name: "Le Thi B",
    age: 20,
    education: {
        university: "Lac Hong Uni"
    }
}

const users = [user_1, user_2];

//lodash.get
// users.forEach(user => {
//     console.log(_.get(user, "jobs[0].title", "unemployed"));
// })

//lodash.chain
const url = "https://cybersoft.edu.vn/courses/1/chapter/2";
var regex = /courses\/(\d+)\/chapter\/(\d+)/g;
var match = regex.exec(url);
console.log("course id: " + match[1]);

const getObjectId = (type) => {
    return _.chain(url)
        .split("/")
        .indexOf(type)
        .thru(value => value + 1)
        .thru(value => {
            return _.chain(url)
                .split("/")
                .get(value)
                .value()
        })
        .value();
}

console.log(getObjectId("courses"));
console.log(getObjectId("chapter"));