---
title: Consumer
---
A classe Consumer é o ponto inicial da biblioteca, ela abrange *inicialização*, *verificação de serviço* e *criação de transação*.

### Métodos

---

#### setup
  ```kotlin
  fun setup(context: Context)
  ```

  Inicializa à biblioteca de pagamento, só deve ser chamada **apenas uma vez** durante o fluxo da sua aplicação, de preferência no arquivo de entrada da sua aplicação(ex: `MainActivity.kt`).

:::note[Funcionamento interno]
Internamente essa função ira carregar a licensa de uso configurada pelo [app](/Doc_Android_TEF_SDK/pt-br/app/introduction) e também inicializará a biblioteca de comunicação com o pinpad através do método `Payment.configure()`.
:::

Parâmetros:
- context: Contexto android.

Exemplo:
```kotlin
Consumer.setup(this.application.Context)
```

:::caution[dependência do setup]
Quase todas outras funções e classes da biblioteca esperam que `setup()` já tenha sido chamada previamente.
:::

---

#### checkServiceAvailability
```kotlin
  fun checkServiceAvailability(context: Context): Boolean
  ```
Verifica a disponibilidade do serviço de pagamento, deve ser utilizado idealmente antes de mostrar ao cliente final quais opções de pagamento estão disponíveis.

Parâmetros:
- context: Contexto android.


Retorna:
- Boolean: `true` se o serviço estiver disponível, do contrário `false`.


Exemplo:
```kotlin
if (!Consumer.checkServiceAvailability(this.application.Context)) {
    // Fazer alguma coisa caso o serviço de pagamento esteja indisponível.
}
```

:::note[Funcionamento interno]
Essa função só retornará `false` caso: 
- A biblioteca não tenha sido inicializada; 
- Não seja encontrada uma licensa atrelada ao equipamento localmente; 
- Nenhum pinpad tenha sido reconhecido como conectado ao dispositivo; 
- A licensa atrelada ao equipamento tenha sido verificada como inválida no TMT(Telemetria).
:::

---

#### startNewTransaction
```kotlin
  fun startNewTransaction(
      context: Context,
      transactionId: String, 
      transactionProductId: String, 
      transactionPrice: String, 
      paymentMethod: String,
      cb: (Boolean) -> Unit
  ): Transaction
  ```

  Cria e inicia uma nova transação de pagamento.

Parâmetros:

- context: Contexto android.
- transactionId: Identificador da transação
- transactionProductId: Identificador do produto envolvido na transação
- transactionPrice: Preço da transação com dígitos decimais separados por ".", não ","(ex. "1.50")
- paymentMethod: Método de pagamento para usar (ex: *"credit"*, *"debit"*)
- cb: Função callback que recebe um boolean indicando se a transação concluiu com sucesso ou falha.

Retorna:
- Transaction: Classe já instanciada de [Transaction](/Doc_Android_TEF_SDK/pt-br/sdk/classes/transaction)


Throws:
- IllegalStateException: Se uma transação já estiver em andamento.
- Error: Se a licensa não for encontrada
- IllegalArgumentException: Se um método de pagamento inválido for fornecido.


Exemplo:
```kotlin
val transaction = Consumer.startNewTransaction(
    context,
    "transacao123",
    "produto456",
    "0.50",
    "credit",
    { success ->
        if (success) {
            // Fazer algo após o pagamento ser feito
        } else {
            // Fazer algo após o pagamento falhar
        }
    }
)
```

:::danger[Instância de Transaction]
Lembre-se de não descartar a instância de **transaction** retornada por `startNewTransaction`, ela deve ser usada para *confirmar*, *abortar*, ou *estornar* o pagamento num segundo momento(leia mais sobre na próxima sessão), do contrário a biblioteca não permitirá que novas transações aconteçam porque considerará que a anterior ainda está em andamento.
:::

:::tip[Transação Atual]
A classe Consumer mantém internamente uma referência à transação atual (currentTransaction), que é limpa automaticamente quando essa transação é concluída (com sucesso ou falha). Isso impede que múltiplas transações existam simultaneamente.
:::

:::note[Métodos de Pagamento]
Os métodos de pagamento são mapeados para códigos internos:

- "credit" → 3
- "debit" → 2
:::