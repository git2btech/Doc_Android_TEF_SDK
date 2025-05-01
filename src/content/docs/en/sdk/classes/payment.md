---
title: Payment
---
The class Payment provides the lowest access to the payment communication library with the pinpad, primarily used to configure it and execute payment requests.

:::note[Internal usage]
This class is used internally by the library.
:::

<!-- ### Properties

| Property | Type | Description |
| -------- | ---- | ----------- |
| clisitef | CliSiTef | Instance of the CliSiTef payment processing library |


### Methods

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
Initializes the CliSiTef library with store, terminal, etc. information from the license.

Parameters:

- context: Android context
- loja: Store code
- terminal: Terminal identifier
- gsurfOTP: GSURF OTP code
- c1: Store CNPJ
- c2: Automation CNPJ

Example:

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

  Starts a payment request with the specified parameters.

Parameters:

- listener: CliSiTef listener to handle events
- modalidade: Payment modality code
- valor: Transaction value
- docFiscal: Transaction identifier
- dataFiscal: Fiscal date (format: yyyyMMdd)
- horaFiscal: Fiscal time (format: HHmmss)
- terminal: Terminal identifier

Example:

```kotlin
Payment.submitPayment(
    transactionListener,
    3,  // Credit card
    "0.30",
    "FISCAL123",
    "20230615",
    "143000",
    "TERM123"
)
```

---

:::tip[Integration with CliSiTef]
The Payment class abstracts the complexity of the CliSiTef library, providing a simpler interface for starting a new payment with the license information.
::: -->
