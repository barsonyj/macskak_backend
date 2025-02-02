import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

let macskak = [
 { id:1, nev:"Cirmos", kor:2, szin:"szürke" }
];
let nextId = 2;

function addMacska(req, res) {
    if (req.body.nev && req.body.kor && req.body.szin) {
        const macska = { id:nextId++, nev:req.body.nev, kor:req.body.kor, szin:req.body.szin };
        macskak.push(macska)
        res.send(macska);
    } else res.send({ error:"Hiányzó paraméterek!" });
}

function delMacska(req, res) {
    //console.log(req.params);
    if (req.params.id) {
        let i = indexOf(req.params.id);
        if (i != -1) {
            const macska = macskak.splice(i, 1);
            res.send(macska[0]);
        } else res.send({ error:"Hibás ID!" });
    } else res.send({ error:"Hinyzó paraméter!"})
}

function indexOf(id) {
    let i=0; while (i<macskak.length && macskak[i].id != id) i++;
    if (i<macskak.length) return i; else return -1;
}

app.get("/", (req, res) => res.send("<h1>Macskák v1.0.0</h1>"));
app.get("/macskak", (req, res) => res.send(macskak));
app.post("/macska", addMacska);
app.delete("/macska/:id", delMacska);

const port = process.env.PORT || 88;
app.listen(port, (error) => {
    if (error) console.log(error); else console.log("Server on " + port);
})
