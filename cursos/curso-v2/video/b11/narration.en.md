# Identity and Sensitive Data

## clearview · What matching cannot read

What ClearView sells is that a company picks someone without knowing who they are. If the matching service could read the original résumé, with name, photo and address, the promise would depend on no programmer ever using it by mistake.

The team did not let it depend on that. The original résumé is kept by a single service, the candidate one, and reading it requires a special permission that the matching service does not have. Matching works with the anonymous story. That way, not looking at identity stops being a good intention, because the shape of the system enforces it.

## familias · Four families

A piece of sensitive data, like a résumé or a medical record, forces decisions on who gets in, who sees it whole, how it is protected and how long it lasts. There are four families.

The first is an identity provider, a service that checks who each person is and what they can do. It gains by not having to build something so delicate. It pays by depending on what that provider offers.

The second is permissions and isolation. The full data lives in a single place and only whoever needs it reads it, as at ClearView. It gains because a mistake somewhere else does not expose it. It pays with more rules, and with parts that cannot read what would sometimes come in handy.

The third is encrypting, storing the data in a way that cannot be read without its key. It gains because a stolen copy is useless. It pays with extra work every time it has to be read, and with keys that have to be looked after.

The fourth is retention, deciding how long each piece of data lives and having it deleted when it expires. It gains by keeping less, because what is not kept does not leak. It pays by having to justify each period, and with processes that delete on time.

## clave · Deleting a key

Farmacy Family keeps profiles and medical data, and a customer can ask for everything of theirs to be deleted. In a system spread over several databases, with backup copies, finding and deleting every trace of a person is hard, and the team writes it that way.

The decision is that each user has their own encryption key, in a separate store, never next to the data. Everything about that person is stored encrypted with their key. To delete a person it is enough to delete their key, and once the backup copies are deleted too, their data becomes unreadable everywhere.

Deleting this way has a cost. For the system not to get slow, it needs a short-lived memory with unencrypted data. And if a key leaks, deleting it no longer guarantees anything.

## par · Prevent it or make it unreadable

ClearView and Farmacy Family protect a person with opposite mechanisms. ClearView prevents a part of the system from reading the data. Farmacy Family lets the data be in many places, and makes sure it can turn it unreadable in all of them at once. Both mechanisms were decided before storing the first piece of data. Adding them later, over data already spread around, would take much more work, and this is our own reading.

## identidad · Who is who

Before deciding who sees what, the system has to know who everyone is. Spotlight compared three paths for that. It could build its own identity service, run an open source one on its own machines, or pay a provider that runs it entirely.

It chose the provider. Building or maintaining something like that brings security and compliance work, and the team preferred to dedicate itself to what is specific to the product. The price of buying it is that the provider limits what can be done. That is why it proposes wrapping it in a service of its own, a facade through which the rest of the system asks about identity. That facade adds what the provider does not bring.

## plazo · How long it lasts and where it lives

MobilityCorp's decision on the vehicle photos, the one that cites its requirements by number, is a tiered retention. The photos show license plates and sometimes people, so they are personal data under the European data protection regulation. That regulation requires keeping them only as long as needed. But they also serve as evidence in a dispute and to train the models.

That is why there are three tiers. The original photos are kept a few months, and longer only if there is an open dispute. The working copies last less. And for training, anonymous copies are used, with faces and plates blurred.

Sysops Squad looks at the other question, where the full data lives. It proposes that the customers' part keep only the last four digits of the card, which are enough to show it. The full card lives only in billing, and that way the card audit covers less of the system.

## pregunta · The deciding question

With sensitive data, what has to be answered is who sees it whole, how long it lasts and how it is deleted. And it is better done before storing the first one, because afterwards every copy spread around is one more place to look for it.
