const { spawn } = require('child_process');
const got = require('got');
const test = require('tape');

// Start the app
// Iniciar o app
const env = Object.assign({}, process.env, {PORT: 5000});
const child = spawn('node', ['index.js'], {env});

test('responds to requests', (t) => {
  t.plan(4);
  // Espere até que o servidor esteja pronto
  child.stdout.on('data', _ => {
    // Faça uma solicitação ao nosso aplicativo
    (async () => {
      const response = await got('http://127.0.0.1:5000');
      // pare o servidor
      child.kill();
      // Sem erro
      t.false(response.error);
      // Successful response
      // resposta com sucesso
      t.equal(response.statusCode, 200);
      // Assert content checks
      // Assegurar verificações de conteúdo
      t.notEqual(response.body.indexOf("<title>Node.js Getting Started on Heroku</title>"), -1);
      t.notEqual(response.body.indexOf("Getting Started on Heroku with Node.js"), -1);
    })();
  });
});
