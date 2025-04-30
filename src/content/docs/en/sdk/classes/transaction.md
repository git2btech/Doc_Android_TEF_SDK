---
title: Transaction
---

The Transaction class manages the logic of a single payment process, offering methods to control the flow of the payment transaction. This class also implements a listener that will be called at each update of the payment process.

:::note[Internal Usage]
This class is used internally by the library.
:::

:::tip[Interface]
To type a variable that will hold an instance of this class you can import its interface `com.tobetech.pay.TransactionInterface` and then `val t: TransactionInterface`
:::

## Initialization

When instantiated this class:
1. Configures itself with relevant details such as date, time, etc. at the moment of its creation.
2. Initiates the payment process using the [payment](/Doc_Android_TEF_SDK/en/sdk/classes/payment) class.

### Properties

| Property | Type | Description |
| -------- | ---- | ----------- |
| id | String | transaction id |
| product | String | product id |
| price | String | price to be paid |
| paymentMethod | Int | payment method code |
| abortAsap | Boolean | flag to abort transaction |


### Methods

---

#### abortPayment

  ```kotlin
  fun abortPayment()
  ```

  Requests the abortion of a pending payment, the abortion is not synchronous due to the nature of the library's communication with the pinpad, but the payment will be canceled as soon as possible.
  To reverse a paid payment, use the function `rollbackPayment` below.

  Example:

```kotlin
t.abortPayment()
 ```

---

#### rollbackPayment

 ```kotlin
  fun rollbackPayment()
  ```

  Request the chargeback of a paid transaction, usually used when the product that was paid could not be delivered after the payment.

Example:

```kotlin
t.rollbackPayment()
```

---

#### assertPayment

 ```kotlin
  fun assertPayment()
  ```
  
  Confirms the payment already made, usually used when the product that was paid has already been delivered.

Example:

```kotlin
t.assertPayment()
 ```

## Listener

To track and process events emitted during the payment process, the class implements a listener with the functions `onData` and `onTransactionResult`.


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

Parameters:
- stage: Current transaction stage(`1` or `2`).
- command: Command code coming from the terminal
- fieldId: Field identifier
- minLength: Minimum input length
- maxLength: Maximum input length
- input: Data coming from the terminal

---

```kotlin
override fun onTransactionResult(
  stage: Int, 
  resultCode: Int
)
```

Parameters:

- stage: Current transaction stage(`1` or `2`).
- resultCode: Terminal result code.

## Diagram of the transaction flow
```mermaid
flowchart TD
    A[Transaction creation] --> B[Payment Initialized]
    B --> C{Communication with terminal}
    C -->|Input| D[Process commands]
    D --> C
    C -->|Payment finished| E[Payment result]
    E -->|Success| F[Confirm payment]
    E -->|Failure| G[Rollback payment]
    F --> H[Transaction completed]
    G --> H
 ```