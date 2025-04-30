---
title: Introdução ao SDK
---

Nossa biblioteca foi desenvolvida com o principal foco na simplicidade e facilidade de se integrar à qualquer base de código nova ou já existente.

O gerenciamento de estado de pagamento, bem como a comunicação com o pinpad entre outros detalhes é feito totalmente pela própria biblioteca e cabe ao desenvolvedor apenas chamar uma parcela pequena de funções para processar um pagamento.

Graças à essa caracteristica, dentro da totalidade de classes da biblioteca apenas uma é exposta ao desenvolvedor: [consumer](/pt-br/sdk/classes/consumer).

Um ponto que vale a pena tocar é que na biblioteca **quase** todas as classes são _singletons_, em outras palavras, não foram projetadas para serem instaciadas e seus métodos são estáticos, isso é devido à natureza da comunicação com o dispositivo pinpad, como medida a evitar *race condition*.