# Proyecto que prueba el uso de TDD y Semantic Release

# Pasos

Inicializar el un proyecto npm e instalar la libreria de test JEST

```sh
    npm init -y
    npm i -D jest
    npx jest --init
```

Desarrolla usando TDD , primero crear los test **fizzbuzz.test.js** y sobre eso crea la funcion **fizzbuzz.js**

```sh
    code fizzbuzz.js
    code fizzbuzz.test.js
```

Para correr un test manualmente ejecuta el comando

```sh
    npm test
```

Pero es mas comodo que se disparen los test cada vez que cambias el codigo
Para eso hay que agregar al package.json el script **"test:watch": "jest --watchAll"**
y luego ejecutar:

```sh
    npm run test:watch
```

Luego hacer iteraciones entre test y app.
