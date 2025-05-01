---
title: Consumer
---
The Consumer class is the entry point of the library, it covers *initialization*, *service availability check* and *transaction creation*.


### Methods

---

#### setup

```kotlin
fun setup(context: Context, androidSerialNumber: String)
```

Initializes the payment library, should only be called **only once** during the application flow, preferably in the entry point of your application (e.g.: `MainActivity.kt`).

:::note[Under the hood]
This function will load the system usage license configured by the [app](/Doc_Android_TEF_SDK/en/app/introduction) and also initialize the communication library with the pinpad through the `Payment.configure()` method.
:::

Parameters:
- context: Android Context.
- androidSerialNumber: The unique android device serial number.

Example:
```kotlin
Consumer.setup(this.application.Context, "1234567890")
```

:::caution[setup dependency]
Almost all other functions and classes of this library expect that `setup()` has already been called previously.
:::

---

#### checkServiceAvailability

```kotlin
suspend fun checkServiceAvailability(context: Context): Boolean
```

Checks if the payment service is available, should be used ideally before displaying to client available payment options.

This function signatures includes `suspend` since it depends on async calls, therefore the developer is responsible for calling it outside the main thread to avoid layout freezes. 

Parameters:
- context: Android Context.


Returns:
- Boolean: `true` if the service is available, otherwise `false`.


Example:

```kotlin
// Checking if payment service is available using coroutine
lifecycleScope.launch {
    val isServiceAvailable = Consumer.checkServiceAvailability(applicationContext)
    
    creditButton.isEnabled = isServiceAvailable > 0
    debitButton.isEnabled = isServiceAvailable > 0
    
    if (isServiceAvailable < 1) {
        Toast.makeText(this@MainActivity, "Payment service is not available", Toast.LENGTH_LONG).show()
    }
}
```

:::note[Under the hood]
This function will check if the payment service is available by checking if the following conditions are met:
- The library has been initialized;
- A 2BTech license has been found locally;
- A pinpad has been recognized as connected to the android device;
- The license attached to the device has been verified as valid in the remotely;
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
- transactionPrice: Transaction price with decimal digits separated by ".", not ","(eg. "1.50").
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
            // Do something if the payment is successful
        } else {
            // Do something if the payment fails
        }
    }
)
```

:::danger[Transaction Instance]
Remember not to discard the **transaction** instance returned by `startNewTransaction`, it should be used to *confirm*, *abort*, or *refund* the payment at a later time (read more about it in the next section), otherwise the library will not allow new transactions to happen because it will consider that the previous one is still in progress.
:::

:::tip[Current Transaction]
The Consumer class keeps internally a reference to the current transaction, which is cleared automatically when this transaction is completed (successfully or not). This prevents multiple transactions from happening at the same time.
:::
