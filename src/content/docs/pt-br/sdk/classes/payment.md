---
title: Payment
---
A classe Payment fornece o mais baixo accesso à biblioteca de comunicação com o pinpad, sendo usada principalmente para fazer a configuração dela e executar solicitações de pagamento.

:::note[Uso interno]
Essa classe é de uso interno da biblioteca.
:::

<!-- ### Propriedades

| Propriedade | Tipo | Descrição |
| -------- | ---- | ----------- |
| clisitef | CliSiTef | Instancia da biblioteca de processamento de pagamento CliSiTef |


### Métodos

---

#### configure

  ```kotlin
  fun configure(
      context: Context, 
      loja: String, 
      terminal: String, 
      gsurfOTP: String, 
      c1: String, 
      c2: String
  )
  ```
  Inicializa a biblioteca CliSiTef com informações de loja, terminal, etc. vindas da licença.

Parâmetros:

- context: Contexto android
- loja: Código da loja
- terminal: Identificador do terminal
- gsurfOTP: Código OTP GSURF
- c1: CNPJ da loja
- c2: CNPJ da automação

Exemplo:

```kotlin
Payment.configure(
    context,
    "LOJA123",
    "TERM456",
    "OTP789",
    "12345678901234",
    "56789012345678"
)
 ```

 ---

 #### submitPayment

 ```kotlin
  fun submitPayment(
      listener: ICliSiTefListener, 
      modalidade: Int, 
      valor: String, 
      docFiscal: String, 
      dataFiscal: String, 
      horaFiscal: String, 
      terminal: String
  )
  ```
  Inicia solicitação de pagamento com os parametros especificados.

Parâmetros:

- listener: Listener para atender eventos de CliSiTef
- modalidade: Código da forma de pagamento
- valor: Valor da transação
- docFiscal: Identificador da transação
- dataFiscal: Data fiscal (formato: yyyyMMdd)
- horaFiscal: Hora fiscal (formato: HHmmss)
- terminal: Identificador do terminal

Exemplo:

```kotlin
Payment.submitPayment(
    transactionListener,
    3,  // Cartão de crédito
    "0.30",
    "FISCAL123",
    "20230615",
    "143000",
    "TERM123"
)
 ```

 ---

 :::tip[Integração com CliSiTef]
A classe Payment abstrai a complexidade da biblioteca CliSiTef, proporcionando uma interface mais simples para iniciar um novo pagamento com as informações da licença.
::: -->
