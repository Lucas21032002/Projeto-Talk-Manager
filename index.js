const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { validationEmail, 
        validationPassword,
        validationAge,
        validationToken,
        validationName,
        validationDate,
        validationTalk,
        validationRate } = require('./Middlewares/fieldsValidation');

const app = express();
app.use(bodyParser.json());
const HTTP_OK_STATUS = 200;
const PORT = '3000';
const jsonTalker = './talker.json';
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// --------------- REQUISITO 1 ------------------//
app.get('/talker', async (req, res) => {
  const talker = await fs.readFile(jsonTalker);

  if (!talker || talker.length === 0) { // condição para retornar o array vazio
    return res.status(200).send([]);
  }
  const JSONtalker = JSON.parse(talker); // tranforma os dados e os armazena em uma variavel

  return res.status(200).json(JSONtalker); // retorna todos os talkers
});
// --------------- REQUISITO 2 ------------------//
app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params; // desestruturando o parametro da URL
    const talker = await fs.readFile(jsonTalker);
    const parseTalker = await JSON.parse(talker);
// logica para comparar o parametro id da URL com os ids da API
    const foundTalker = parseTalker.find((talk) => talk.id === Number(id));
// condição verificando se existe uma pessoa palestrante com o id passado como parametro
    if (!foundTalker) {
      return res.status(404).json({
        message: 'Pessoa palestrante não encontrada',
      });
    }
    return res.status(200).json(foundTalker);
  } catch (e) {
    console.log('erro');
  }
});
// --------------- REQUISITO 3 ------------------//
app.post('/login', validationEmail, validationPassword, (req, res) => {
  // const token = crypto.randomBytes(8).toString('hex');
  const token = '7mqaVRXJSp886CGr';
  res.status(200).json({
    token,
  });
});
// --------------- REQUISITO 4 ------------------//
app.post('/talker', 
validationToken,
validationName,
validationAge,
validationTalk,
validationRate,
validationDate,
 async (req, res) => {
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  const talker = await fs.readFile(jsonTalker, 'utf8');
  const parseTalker = await JSON.parse(talker);
  const newTalker = {
    id: parseTalker.length + 1,
    name,
    age,
    talk: {
        watchedAt,
        rate,
      },
  };
  const teste = [...parseTalker, newTalker];
  await fs.writeFile(jsonTalker, JSON.stringify(teste));
  res.status(201).json(newTalker);
});

// --------------- REQUISITO 5 ------------------//
app.put('/talker/:id',
validationToken,
validationName,
validationAge,
validationTalk,
validationRate,
validationDate, async (req, res) => {
  const { id } = req.params;
  const talker = await fs.readFile(jsonTalker, 'utf8');
  const parseTalker = await JSON.parse(talker);
  const foundTalker = parseTalker.filter((talk) => talk.id === Number(id));
  const findTalker = parseTalker.find((talk) => talk.id === Number(id));
  const editObject = {
    id: findTalker.id,
    ...req.body,
  };
  foundTalker.push(editObject);
  await fs.writeFile(jsonTalker, JSON.stringify(foundTalker));
  res.status(200).json(editObject);
});

// --------------- REQUISITO 6 ------------------//
app.delete('/talker/:id', validationToken, async (req, res) => {
  const { id } = req.params;
  const talker = await fs.readFile(jsonTalker, 'utf8');
  const parseTalker = await JSON.parse(talker);
  const findTalker = await parseTalker.filter((talk) => talk.id === id);
  await fs.writeFile(jsonTalker, JSON.stringify(findTalker));
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});
