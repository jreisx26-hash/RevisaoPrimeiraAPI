const express =  require("express");
const cors =  require("cors");

const app = express();

app.use(cors());
app.use(express.json());


let ALUNOS = [
    {id: 1, nome: "Reis", curso: "Desenvolvimento de Sistemas"},
    {id: 2, nome: "João", curso: "Redes de computadores"},
    {id: 3, nome: "Pablo", curso: "Metalurgia"},
    {id: 4, nome: "Júlia", curso: "Banco de Dados"},
];

app.get("/", (req, res) => {
    res.json({
       mensagem: "API alunos funcionando!"
    });
});

app.get("/alunos", (req, res) => {
    res.json(ALUNOS);
});

app.get("/alunos/:id", (req, res) => {

      const id = Number(req.params.id); 
      
    
      const aluno = ALUNOS.find(a => a.id === id);
     
      if(!aluno){
        return res.status(404).json({
            mensagem: "Aluno não encontrado"
        });
      }
      
      res.status(200).json(aluno);
});

app.post("/alunos/cadastrar",(req,res)=>{
      const {nome, curso} = req.body;

      if(!nome || !curso){
        return res.status(400).json({mensagem: "Nome é curso são obrigatórios"});
      }

      const novoId = ALUNOS.lenght > 0 ? Math.max(...ALUNOS.map(aluno => aluno.id)) +1 : 1;

      
    //const novoId = ALUNOS.lenght > 0 ? ALUNOS[ALUNOS.lenght - 1].id + 1 : 1;

    const novoAluno = {
        id: novoId,
        nome : nome,
        curso: curso
    };

    ALUNOS.push(novoAluno);

    res.status(201).json({
        mensagem: "Aluno Cadastrado com sucesso"
    })
    
});

const PORTA = 3000;

app.listen(PORTA, () => {
    console.log(`Servidor iniciado com sucesso!`);
    console.log(`http://localhost:${PORTA}`); 
});
