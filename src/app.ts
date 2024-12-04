import express, { Request, Response } from 'express';
import connection, { connectDB } from './database/connection';
import User from './database/models/users';
import Project from './database/models/projects';
import { createUser } from './controllers/userController';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/login', (req: Request, res: Response) => {
  res.render('login');
});

app.post('/login-account', async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({
      where: { email: req.body.email, password: req.body.password }
    })
    if (user) {
      return res.status(200).redirect('/project');
    } else {
      return res.send('The user is not exist')
    }

  } catch (err) {
    return res.send('Login user error!');
  }
});

app.get('/register', (req: Request, res: Response) => {
  res.render('register');
});

// app.post('/register', async (req: Request, res: Response) => {
//   const { fullName, email, password, retypePassword, isAgreeTerms } = req.body;
//   if (isAgreeTerms && password === retypePassword) {
//     try {
//       await User.create({ email: email, password: password, fullName: fullName });
//       return res.status(201).redirect('/login');
//     } catch (err) {
//       return res.send("Can't register");
//     }
//   }
//   return res.send(`Can't create new user.`);
// });

app.post('/register', createUser)

app.get('/project', (req, res) => {
  res.render('project-add');
});

app.post('/register-transaction', async (req: Request, res: Response) => {
  const t = await connection.transaction();
  const { fullName, email, password, retypePassword, isAgreeTerms } = req.body;
  try {
    const user = await User.create(
      { email: email, password: password, fullName: fullName },
      { transaction: t },
    );

    await Project.create(
      {
        projectName: 'Greenfield Urban Development',
        projectDescription: 'A large-scale development project to revitalize a downtown area with residential and commercial spaces.',
        status: 'In Progress',
        clientCompany: 3,
        projectLeader: 5,
        estimatedBudget: 47483647,
        totalAmountSpent: 47483647,
        estimatedProjectDuration: 18
      },
      { transaction: t },
    );
    // If the execution reaches this line, no errors were thrown.
    // We commit the transaction.
    await t.commit();
    return res.send('Create transaction successfully');
  } catch (error) {
    // If the execution reaches this line, an error was thrown.
    // We rollback the transaction.
    await t.rollback();
    return res.send('Error when creating transaction');
  }
})

connectDB();

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});