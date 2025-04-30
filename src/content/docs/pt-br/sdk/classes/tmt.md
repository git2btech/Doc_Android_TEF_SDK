---
title: TMT (Telemetria)
---
Essa classe é responsável por gerenciar a comunicação com o sistema Telemetria da 2BTech para validar licenças e reportar transações.

:::note[Uso interno]
Essa classe é de uso interno da biblioteca.
:::

### Métodos

---

#### submitTransaction

```kotlin
  suspend fun submitTransaction(td: TransactionData)
  ```
  Envia detalhes da transação realizada para o TMT(independentemente de ter sido um sucesso ou não).

---

#### checkLicenseStatus

```kotlin
  suspend fun checkLicenseStatus(serial: String, key: String): Int
  ```
  Checa o status de uma licença com o servidor TMT.

Parâmetros:

- serial: Número de série do dispositivo
- key: Chave de ativação de licença


Retorna:

- Int: Código de status da licença
  - 1: Licença válida
  - -1: Licença Inválida
  - 0: Falha ao checar validade da licença
