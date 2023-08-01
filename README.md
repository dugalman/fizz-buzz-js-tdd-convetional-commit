# Proyecto que prueba el uso de TDD y Semantic Release

Lo importande de este proyecto son las herremientas de contexto para hacer los comit versionados

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


## Ejecutar test antes de los push y lint en cada commit

Hay que instalar "hasky" y "linter" con `npm i -D husky lint-staged`. Husky en lo que se basa es en los Git Hooks , que son scripts que se ejecutan en momentos determinados, como antes de un commit, push, etc...

Por ejemplo el script de **pre-commit** nos permite que antes de finalizar un commit, se ejecute un script que corra el Linter y nos diga si hay errores o no y asegurarnos que el código que se sube al repositorio sigue las reglas de estilo.

Por otro lado, **Lint-Staged** nos permite ejecutar scripts en los archivos que se van a subir al repositorio, es decir, solo en los archivos que hemos modificado, no en todos los archivos del proyecto. Se entiende que el resto de archivos que no hemos tocado ya están bien y no necesitan ser revisados.

### Configurando Husky y Lint-staged

Creamos un fichero `.lintstagedrc` en la raíz de nuestro proyecto, con el siguiente contenido:

```
{
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "git add"]
}
```

Aqui le estamos diciendo que para los ficheros con extensión js, jsx, ts y tsx, ejecute el comando eslint --fix y después añada los cambios al commit.

Ahora en nuestro `package.json` añadimos un script que podemos llamar `prepare`. Esto nos permite configurar Husky de una forma más rápida corriendo `npm run prepare`. Esto instala los git hooks dentro de la carpeta .husky que se acaba de crear.

### Añadir el pre-commit hook

Ahora vamos a añadir el pre-commit hook, para que antes de hacer un commit, se ejecute el script de Lint-Staged. Esto lo hacemos con el siguiente comando: `npx husky add .husky/pre-commit "npx lint-staged"`

Esto crea el fichero `.husky/pre-commit` con el siguiente contenido:

```sh
#!/usr/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

### Configurar el Linter


Tenemos el hook pero no tenemos un linter configurado. Solucionemos eso. Ejecutamos el siguiente comando para que se instale y configure ESlint de una forma rápida: `npx eslint --init`. Elige las opciones de configuración que prefieras.

Ahora si realizas un commit y modificas un fichero con extensión `js, jsx, ts o tsx`, se ejecutará el script de Lint-Staged y se ejecutará el comando `eslint --fix` y se añadirán los cambios al commit.

### Añadir el pre-push hook

Ahora vamos a añadir el **pre-push hook**, para que antes de hacer un push, se ejecuten los scripts que determinemos, como por ejemplo que se lancen los Tests y sólo si pasan, el código se suba finalmente al repositorio. Esto lo hacemos con el siguiente comando: `npx husky add .husky/pre-push "npm run test"`

***Si no tienes tests o estos no pasan, el push no se realizará hasta que lo soluciones.***


# Generando el archivo CHANGELOG

Una de las utilidades más inmediatas de un registro de mensajes cuidado y trabajado es la generación del archivo CHANGELOG.

Por ejemplo, podrías crear un script para generar el archivo CHANGELOG según la Operación del asunto, agrupándolos en tres apartados:
- Funcionalidades o Características (Añade, Modifica, Mejora, Elimina),
- Corrección de errores (Corrige)
-  Seguridad (Asegura).

Luego sólo tendrías que repasarlo para eliminar o depurar los mensajes recogidos.

Puedes revisar la sintaxis de todos los mensajes con el comando 

```bash 
npx commitlint --from HEAD~1 --to HEAD --verbose
```

Usando Git puedes obtener la lista de todos los commits. Por ejemplo, con sólo el texto del asunto y el identificador completo:

```bash 
git log {etiqueta} HEAD --pretty=format:%s
```
o en una lista web:

```bash 
git log v2.1.0...v2.1.1 \
  --pretty=format:'<li><a href="https://gitlab.com/{usuario}/{proyecto}/commit/%H"> ver commit • </a> %s </li>' \
  --reverse \
  | grep "#changelog"
```

o agrupándolos por usuario:
```bash 
git shortlog
```

o mostrando también el identificador corto de cada commit:
```bash
git log {etiqueta} HEAD --oneline
```

o filtrando por los mensajes de corrección de errores:
```bash
git log {etiqueta} HEAD --grep Corrige
```

También puedes recurrir a herramientas más refinadas:

- [git-changelog](https://www.npmjs.com/package/git-changelog), es configurable para definir adecuadamente los filtros de los mensajes.
- [gitchangelog](https://github.com/vaab/gitchangelog), es compatible con Python 2 y 3 para Linux, Mac y Windows. Está publicado en PyPI y también es configurable.
- [git-extras](https://github.com/tj/git-extras), paquete para Linux (Debian, Ubuntu) que añade a Git un comando git changelog (leer manual) entre otros muchos comandos.
- [ReadmeGen](https://github.com/fojuth/readmegen), en este caso es un programa PHP que también busca mensajes con un patrón específico para extraerlos y agruparlos.
- Y si utilizas GitLab como respositorio, puedes [probar este código para generar el archivo CHANGELOG](https://medium.com/@SamuelMichaud/generate-a-changelog-from-gitlabs-issue-tracker-9eced2610718).



# Referencias

- [x] [001 - Cómo configurar Husky y Lint-Staged en un proyecto](https://carlosazaustre.es/husky-lintstaged)
- [x] [002 - Conventional Commits - Especificación para tus mensajes de commit](https://carlosazaustre.es/conventional-commits)
- [ ] [poder generar automáticamente el fichero CHANGELOG](https://github.com/conventional-changelog/conventional-changelog)
- [x] [Guía para los mensajes commit](https://manuel.cillero.es/doc/apuntes-tic/herramientas/git/guia-mensajes-confirmacion-commit/)
- [x] [Husky y Lint-Staged](https://typicode.github.io/husky/#/)