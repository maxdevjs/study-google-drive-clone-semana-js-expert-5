# Google Drive Clone - Semana JS Expert 5.0

<details open>
<summary>English</summary>

> WIP: my project setup with [nix-shell](#my-setup)

This is the code for the journey athwart the fifth [Javascript Expert Week](https://javascriptexpert.com.br).

> Note: mark this project ([ErickWendel/semana-javascript-expert05](https://github.com/ErickWendel/semana-javascript-expert05)) with a star 🌟

## Preview

![](./resources/demo.gif)

## Checklist Features

- Web API

  - [x] Must list downloaded files
  - [] Must receive file stream and save to disk
  - [] Must notify about disk file storage progress
  - [] It must allow uploading of files in image, video or audio format
  - [] Must achieve 100% code coverage in testst achieve 100% code coverage in tests

- Web App

  - [x] Must list downloaded files
  - [] Must allow uploading of files of any size
  - [] Must have upload via button feature
  - [] Must show upload progress
  - [] Must have drag and drop upload feature

## Post-project challenges

1. _Backend_: Save the file to [AWS](https://aws.amazon.com/) or any storage service
   - Our project nowadays stores files on disk. The challenge is to upload to a cloud service, via [Stream](https://nodejs.org/api/all.html#all_stream) 🧐
   - As a plus, keep 100% code coverage, that is, create tests for your new feature 🤪
2. _Frontend_: Add tests on the _frontend_ and achieve 100% code coverage
   - You learned how to test the _backend_. Use the same process to create [unit tests](https://en.wikipedia.org/wiki/Unit_testing) in the _frontend_ with [Jest](https://jestjs.io/)
   - If you have any questions, check the [example](https://github.com/ErickWendel/tdd-frontend-example) and leave a star 🌟!
3. _Infrastructure_: Publish the application with your custom [SSL](https://www.ssl.com/faqs/faq-what-is-ssl/) in a virtual machine
   - You learned how to generate a [SSL](https://www.ssl.com/faqs/faq-what-is-ssl/) certificates locally, the challenge is for you to create a certificate (it can be with the _Let's Encrypt_) and to add it to your application

### Considerations

- Ask your questions about the challenges in our community, the goal is for you to learn in a fun way. Do you have any doubts? Ask over there!

- Upon any challenges completion, send a message to the **#desafios** channel of the **Discord** community

## Layout credits <3

- layout has been adapted from the Brazilian [Leonardo Santo](https://github.com/leoespsanto)'s project available on [codepen](https://codepen.io/leoespsanto/pen/KZMMKG).

## FAQs

- `NODE_OPTIONS` is not a command recognized by the system, what to do?

  - If you are on Windows , the way to create environment variables is different. You must use the word `set` before the command.
  - Ex: `"test": "set NODE_OPTIONS=--experimental-vm-modules && npx jest --runInBand",`

- invalid [SSL](https://www.ssl.com/faqs/faq-what-is-ssl/) certificate, what to do ?

  - This error happens because I generated a certificate linked to the user of my machine .
  - You can click on `continue` in the browser, use the invalid certificate, and the project will keep working, but if you want to generate your own, I wrote the step by step in [./certificates](./certificates)

- I ran `npm test` but nothing happens, what to do?
  - Check the version of your [Node.js](https://nodejs.dev/). We are using the version `16.8`. Go to the [Node.js](https://nodejs.dev/) site and download (🤔) the latest version

## Resources

- [ErickWendel/semana-javascript-expert05](https://github.com/ErickWendel/semana-javascript-expert05)
- [ErickWendel/semanajsexpert-gdrive-template](https://github.com/ErickWendel/semanajsexpert-gdrive-template)
- [ErickWendel/tdd-frontend-example](https://github.com/ErickWendel/tdd-frontend-example)

## My setup

In my personal setup for this project, I make use of [nix-shell](https://nixos.org/manual/nix/unstable/command-ref/nix-shell.html).

If you are interested, feel free to check its [description](project-setup/README.md).

</details>

<details>
<summary>Portuguese (initial version)</summary>

Seja bem vindo(a) à [quinta](https://github.com/ErickWendel/semana-javascript-expert05) Semana Javascript Expert. Este é o código inicial para iniciar nossa jornada.

Marque esse projeto com uma estrela 🌟

## Preview

![](./resources/demo.gif)

## Checklist Features

- Web API

  - [] Deve listar arquivos baixados
  - [] Deve receber stream de arquivos e salvar em disco
  - [] Deve notificar sobre progresso de armazenamento de arquivos em disco
  - [] Deve permitir upload de arquivos em formato image, video ou audio
  - [] Deve atingir 100% de cobertura de código em testes

- Web App
  - [] Deve listar arquivos baixados
  - [] Deve permitir fazer upload de arquivos de qualquer tamanho
  - [] Deve ter função de upload via botão
  - [] Deve exibir progresso de upload
  - [] Deve ter função de upload via drag and drop

## Desafios para alunos pós projeto

1. _Backend_: Salvar o arquivo na AWS ou qualquer serviço de storage
   - Nosso projeto hoje armazena arquivos em disco. o desafio é você via Stream, fazer upload para algum serviço na nuvem
   - Como plus, manter 100% de code coverage, ou seja, crie testes para sua nova feature
2. _Frontend_: Adicionar testes no frontend e alcançar 100% de code coverage
   - Você aprendeu como fazer testes no backend. Usar o mesmo processo para criar testes unitários no frontend com Jest
   - Caso tenha duvidas, acesse o [exemplo](https://github.com/ErickWendel/tdd-frontend-example) e deixe uma estrela!
3. _Infraestrutura_: Publicar aplicação com seu SSL customizado em máquina virtual
   - Você aprendeu a gerar SSL local, o desafio é você criar um certificado (pode ser com o _Let's Encrypt_) e adicionar na sua aplicação

### Considerações

- Tire suas dúvidas sobre os desafios em nossa comunidade, o objetivo é você aprender de forma divertida. Surgiu dúvidas? Pergunte por lá!

- Ao completar qualquer um dos desafios, envie no canal **#desafios** da comunidade no **Discord**

## Créditos ao Layout <3

- O Layout foi adaptado a partir do projeto do brasileiro [Leonardo Santo](https://github.com/leoespsanto) disponibilizado no [codepen](https://codepen.io/leoespsanto/pen/KZMMKG).

## FAQ

- `NODE_OPTIONS` não é um comando reconhecido pelo sistema, o que fazer?

  - Se você estiver no Windows, a forma de criar variáveis de ambiente é diferente. Você deve usar a palavra `set` antes do comando.
  - Ex: `"test": "set NODE_OPTIONS=--experimental-vm-modules && npx jest --runInBand",`

- Certificado SSL é inválido, o que fazer?

  - Esse erro acontece porque gerei um certificado atrelado ao usuário da minha máquina.
  - Você pode clicar em prosseguir no browser e usar o certificado invalido que o projeto vai continuar funcionando, mas se quiser gerar o seu próprio, escrevi o passo a passo em [./certificates](./certificates)

- Rodei `npm test` mas nada acontece, o que fazer?
  - Verifique a versão do seu Node.js. Estamos usando na versão 16.8. Entre no [site do node.js](https://nodejs.org) e baixe a versão mais recente.

</details>
