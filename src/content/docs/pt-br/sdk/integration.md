---
title: Integrando SDK
---

Assim que você obtiver acesso ao arquivo **.aar** do SDK, você pode integra-lá em sua aplicação android em três simples passos:

1 - Copie o arquivo do SDK para alguma pasta dentro do projeto da sua aplicação android, por exemplo `./app/libs/`

2 - Adicione o SDK às dependencias do arquivo gradlew do projeto(`./app/build.gradle.kts`)

```
// ...
implementation(files("libs/lib-release.aar"))
// ...
```

_(tenha certeza de usar o mesmo caminho de onde copiou o arquivo .aar do SDK)_

3 - Para fazer requisições HTTP à partir do SDK dependemos de uma biblioteca que também deve ser adicionada às dependencias do projeto(`./app/build.gradle.kts`)

```
// ...
    implementation(platform("com.squareup.okhttp3:okhttp-bom:4.12.0"))

    implementation("com.squareup.okhttp3:okhttp")
    implementation("com.squareup.okhttp3:logging-interceptor")
// ...
```

Pronto, você já pode começar à usar a SDK!