---
title: TMT (Telemetry)
---
The class TMT (Telemetry) is responsible for managing communication with the 2BTech Telemetry system to validate licenses and report transactions.

:::note[Internal usage]
This class is used internally by the library.
:::

### Methods

---

#### submitTransaction

```kotlin
suspend fun submitTransaction(td: TransactionData)
```
Submits transaction details to the TMT (regardless of whether it was a success or not).

---

#### checkLicenseStatus

```kotlin
suspend fun checkLicenseStatus(serial: String, key: String): Int
```

Checks the status of a license with the TMT server.

Parameters:
- serial: Serial number of the device
- key: License activation key

Returns:
- Int: License status code
  - 1: Valid license
  - -1: Invalid license
  - 0: Failed to check license validity
