import bcrypt from "bcryptjs";

// Create a sample user data array with hashed passwords.
const users = [
  {
    name: "Admin User",
    email: "ramirezestudilloe@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Jane Doe",
    email: "janedoe@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default users;