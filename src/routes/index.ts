import  { Response, Request, Router } from "express";
import path from "path";
import fs from 'fs'
import {calculator as calculator, validator as validator} from './calculate'

const router = Router()

interface UserPost{
  shape: string,
  dimension: Record<string, number>
}


function myDatabase() {
  try {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '..', '/database/data.json'), 'utf8'))
  } catch {
    return []
  }
}

function writeToDatabase(input: UserPost[]) {
  return fs.writeFileSync(
    path.join(__dirname, "..", "/database/data.json"),
    JSON.stringify(input, null, 2)
  );
}


const holder = myDatabase()

// redirect to homepage
router.get("/", function (req: Request, res: Response) {
  res.redirect("/fetchRecords")
});

/* GET home page. */
router.get(
  "/fetchRecords",
  function (req: Request, res: Response) {
    res.json(holder);
  }
);


/* post dimensions to database. */
router.post(
  "/calculate",
  function (req: Request, res: Response) {

    const input = req.body

    const valid = validator(input)
    if (!valid) {
      const area = calculator(input);
      if (typeof area.message !== "number") {
        res.status(400).json(area.message); 
      }
      let id = 0;

      if (holder.length == 0) {
        id = 1;
      } else {
        id = holder[holder.length - 1].id + 1;
      }

      const createdAt = new Date(Date.now()).toISOString();
      const writeInput = { id: id, createdAt: createdAt, area: area.message, ...input };

      if (holder.length == 0) {
        writeToDatabase([writeInput]);
      } else {
        holder.push(writeInput);
        writeToDatabase(holder);
      }

      res.status(201).json(writeInput);
    } else {
      let status = 400;
      if (valid.message == `guy gimmme valid shape na`) {
status = 404
      }
        res.status(status).json(valid.message);
    }
    
  }
);


export default router;
