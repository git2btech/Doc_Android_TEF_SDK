---
title: Configuration
---
Essa classe gerencia a leitura e escrita à licença de uso do sistema que pode ou não existir no equipamento.

:::note[Uso interno]
Essa classe é de uso interno da biblioteca.
:::

### Classes de Dados

#### License

Representa os detalhes da licença do sistema.

```kotlin
data class License(
    val id: Int,
    val entidadeId: Int,
    val dominio: String,
    val filialId: Int,
    val codigoFilial: String,
    val codigoLicenca: String,
    val serialDispositivo: String,
    val ativacao: String,
    val tefAtivado: Boolean,
    val gateway: String,
    val codigoTerminal: String,
    val entidadeLojaTefId: Int,
    val codigoLoja: String,
    val cnpjLoja: String,
    val cnpjAutomacao: String,
    val terminalGsurf: String,
    val codigoOTP: String,
    val inativacao: String?
)
```

#### Config

Contém a licença e a data da última validação.

```kotlin
data class Config(
    val license: License?,
    val validatedAt: String?
)
```

### Métodos

---

#### getConfig

  ```kotlin
  fun getConfig(context: Context): Config
  ```
  Recupera a licença de uso do sistema de pagamento salva pelo app licenciador, caso essa ainda não exista os campos de `Config` serão `null`.
  
  Parâmetros:

- context: Contexto android.

Retorna:

- Config: Objeto de configuração contendo detalhes da licença e data/hora da última validação.

Exemplo:

```kotlin
val config = Configuration.getConfig(this.application.Context)
if (config.license != null) {
    // Usar licença encontrada
}
 ```

 ---

 #### setConfig

 ```kotlin
  fun setConfig(config: Config)
  ```
  Atualiza licença salva inicialmente pelo app licenciador.

Parâmetros:

- config: Nova licença para ser salva.

Exemplo:

```kotlin
val newConfig = Config(license, validatedAt)
Configuration.setConfig(newConfig)
 ```

 :::note[Detalhes da implementação]
A classe `Configuration` usa um **content provider** para recuperar e salvar informações da licença do sistema. Ela também implementa um sistema de cache interno para não ser preciso fazer a leitura do sistema à cada chamada de `getConfig`.
:::
