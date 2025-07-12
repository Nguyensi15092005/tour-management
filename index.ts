import express, {Express, Request, Response} from "express";

const app: Express = express();
const port: number = 3005;
app.get("/", (req: Request, res: Response)=>{
    res.send("OK")
});
app.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
})

