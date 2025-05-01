---
title: Transaction
---
A classe Transaction gerencia a lógica singular de cada processo de pagamento, oferecendo métodos para controlar o rumo do fluxo de pagamento da transação. Essa classe também implementa o listener que vai ser chamado à cada atualização do processo de pagamento.

:::caution[Uso gerenciado]
Essa classe está disponível para uso gerenciado.
:::

:::tip[Interface]
Para tipar uma variável que guardará uma instância da classe Transaction você pode importar sua interface `com.tobetech.pay.TransactionInterface` e então `val t: TransactionInterface`
:::


## Inicialização

Ao ser instânciada essa classe:

1. Configura à sí mesma com data, hora e outros detalhes relevantes no momento da sua criação.
2. Inicia o processo de pagamento utilizando a classe [payment](/Doc_Android_TEF_SDK/pt-br/sdk/classes/payment).

### Propriedades

| Propriedade | Tipo | Descrição |
| -------- | ---- | ----------- |
| transactionData | TransactionData | informações coletadas do fluxo de pagamento |
| abortAsap | Boolean | flag para abortar transação |


### Métodos

---

#### abortPayment

  ```kotlin
  fun abortPayment()
  ```

  Solicita o cancelamento de um pagamento ainda pendente, o cancelamento não é sincrono devido à natureza do funcionamento da biblioteca que se comunica com o pinpad, mas o pagamento será cancelado o mais rápido possível.
  Para reverter um pagamento já feito, use a função `rollbackPayment` abaixo.

  Exemplo:

```kotlin
t.abortPayment()
 ```

---

#### rollbackPayment

 ```kotlin
  fun rollbackPayment()
  ```
  Solicita o estorno de uma transação já paga, geralmente usada quando não foi possível fazer a entrega de um produto depois do seu pagamento.

Exemplo:

```kotlin
t.rollbackPayment()
 ```

---

#### assertPayment

 ```kotlin
  fun assertPayment()
  ```
  Confirma o pagamento já feito, geralmente usada quando o produto que foi pago já foi entregue.

Exemplo:

```kotlin
t.assertPayment()
 ```

## Listener

Para acompanhar e processar os eventos emitidos durante o processo de pagamento a classe implementa um listener com as funções `onData` e `onTransactionResult`.


```kotlin
override fun onData(
    stage: Int,
    command: Int,
    fieldId: Int,
    minLength: Int,
    maxLength: Int,
    input: ByteArray
)
 ```

Parâmetros:

- stage: Estágio atual da transação(`1` ou `2`).
- command: Código de comando vindo do terminal
- fieldId: Identificador de campo
- minLength: Tamanho mínimo do input
- maxLength: Tamanho máximo do input
- input: Dados vindos do terminal

---

```kotlin
override fun onTransactionResult(
  stage: Int, 
  resultCode: Int
)
```

Parâmetros:

- stage: Estágio atual da transação(`1` ou `2`).
- resultCode: Código de resultado do terminal.


## Diagrama do fluxo de transação
![fluxograma](/src/assets/fluxograma-portugues.png)
