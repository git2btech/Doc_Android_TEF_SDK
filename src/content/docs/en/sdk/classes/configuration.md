---
title: Configuration
---
This class manages reading and writing the system usage license which may or may not exist on the device.

:::note[Internal usage]
This class is used internally by the library.
:::
<!-- 
### Data Classes

#### License

Represents system license details.

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

Contains the license and last validation date.

```kotlin
data class Config(
    val license: License?,
    val validatedAt: String?
)
```

### Methods

---

#### getConfig

  ```kotlin
  fun getConfig(context: Context): Config
  ```
  Retrieves the payment system license stored by the licensing app, if it doesn't exist the fields of `Config` will be `null`.

Parameters:
- context: Android context.

Returns:
- Config: Configuration object containing license details and last validation date.


Example:

```kotlin
val config = Configuration.getConfig(this.application.Context)
if (config.license != null) {
    // Use found license
}
 ```

 ---

 #### setConfig

 ```kotlin
  fun setConfig(config: Config)
  ```
  Updates the license saved initially by the licensing app.

Parameters:

- config: New license to be stored.

Example:

```kotlin
val newConfig = Config(license, validatedAt)
Configuration.setConfig(newConfig)
 ```

:::note[Implementation details]
The `Configuration` class uses a **content provider** to retrieve and save system license information. It also implements an internal cache system to avoid having to read the system every time `getConfig` is called.
::: -->
