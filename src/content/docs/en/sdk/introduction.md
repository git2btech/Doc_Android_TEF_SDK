---
title: SDK Introduction
---

Our library was developed with the main focus on simplicity and ease of integration with any new or existing codebase.

The payment state management, as well as communication with the pinpad and other details, is handled entirely by the library itself, and the developer only needs to call a small portion of functions to process a payment.

Thanks to this characteristic, within the entirety of the library's classes, only one is exposed to the developer: [consumer](/en/sdk/classes/consumer).

A point worth mentioning is that in the library **almost** all classes are _singletons_, in other words, they were not designed to be instantiated and their methods are static. This is due to the nature of communication with the pinpad device, as a measure to avoid *race condition*.