---
title: Consumer
---
The Consumer class is the entry point of the library, it covers *initialization*, *service availability check* and *transaction creation*.


### Methods

---

#### setup

```kotlin
fun setup(context: Context)
```

Initializes the payment library, should only be called **only once** during the application flow, preferably in the entry point of your application (e.g.: `MainActivity.kt`).

:::note[Under the hood]
This function will load the system usage license configured by the [app](/Doc_Android_TEF_SDK/en/app/introduction) and also initialize the communication library with the pinpad through the `Payment.configure()` method.
:::

Parameters:
- context: Android Context.

Example:
```kotlin
Consumer.setup(this.application.Context)
```

:::caution[setup dependency]
Almost all other functions and classes of this library expect that `setup()` has already been called previously.
:::

---

#### checkServiceAvailability

```kotlin
fun checkServiceAvailability(context: Context): Boolean
```

Checks if the payment service is available, should be used ideally before displaying to client available payment options.

Parameters:
- context: Android Context.


Returns:
- Boolean: `true` if the service is available, otherwise `false`.


Example:

```kotlin
if (!Consumer.checkServiceAvailability(this.application.Context)) {
    // Do something if the service is unavailable.
}
```

:::note[Under the hood]
This function will check if the payment service is available by checking if the following conditions are met:
- The library has been initialized;
- A license has been found locally;
- A pinpad has been recognized as connected to the device;
- The license attached to the device has been verified as valid in the TMT(Telemetria).
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

  Creates and starts a new payment transaction.

Parameters:
- context: Android Context.
- transactionId: Transaction identifier.
- transactionProductId: Product identifier.
- transactionPrice: Transaction price.
- paymentMethod: Payment method to use (ex: *"credit"*, *"debit"*).
- cb: Callback function that receives a boolean indicating if the transaction was successful or not.


Returns:
- Transaction: Instantiated [Transaction](/Doc_Android_TEF_SDK/en/sdk/classes/transaction) class.

Throws:
- IllegalStateException: if a transaction is already in progress.
- Error: if the license is not found.
- IllegalArgumentException: if an invalid payment method is provided.

Example:

```kotlin
val transaction = Consumer.startNewTransaction(
    context,
    "transacao123",
    "produto456",
    "0.50",
    "credit",
    { success ->
        if (success) {
            // Do something after the payment is made
        } else {
            // Do something after the payment fails
        }
    }
)
```

:::danger[Transaction Instance]
Remember not to discard the **transaction** instance returned by `startNewTransaction`, it should be used to *confirm*, *abort*, or *refund* the payment at a later time (read more about it in the next section), otherwise the library will not allow new transactions to happen because it will consider that the previous one is still in progress.
:::

:::tip[Current Transaction]
The Consumer class keeps internally a reference to the current transaction (currentTransaction), which is cleared automatically when this transaction is completed (successfully or not). This prevents multiple transactions from happening at the same time.
:::

:::note[Payment Methods]
Payment methods are mapped to internal codes:
- "credit" → 3
- "debit" → 2
:::
