# Moving and Processing

## gancho · Wait or carry on

A Sysops Squad customer, at the electronics company's support service, does two things in a row. First they change their address in the profile and reload the page. Then they open a ticket because their washing machine broke.

The team proposes treating those two actions differently. The profile change has to show right away, so that call waits for the answer before carrying on. The ticket does not, because the customer has no reason to sit watching until someone picks it up. It is sent and the customer carries on, what the team calls fire and forget.

## familias · Four families

Every time one part hands something to another there are three questions. Whether the sender has to wait, which way the message travels, and when it is processed. The answers make up four families.

The call that waits gives the answer on the spot. It pays because, if the other side is slow or down, the caller is left waiting too.

The queue keeps each message until its destination takes it, a single one, and deletes it once processed. It gains because the message is not lost even if the destination is down for a while. It pays because there is no immediate answer, and because only one reads it.

The stream is a log that keeps events for a while, and each reader keeps track of where it is. It gains because the same event can be read by several, each at its own pace. It pays because it costs more than a queue.

And batches do not process each message when it arrives. A job runs on a schedule, takes everything pending and processes it together. It gains because it can sort and repeat. It pays because the result arrives later.

## stream · One event for many

Spotlight, the job platform for underrepresented people, chose between the queue and the stream with a written table. When a candidate's assignment to an organization changes, that same event is needed by the candidate service, and it also has to be kept for analytics. A queue would give it to only one and delete it. That is why it chose the stream, and it noted the price, that it costs more than a queue.

## cola · One message for one destination

Sysops Squad proposes the opposite for tickets, and for an equally clear reason. A new ticket has to reach whoever processes it, nobody else, and it cannot be lost. The team proposes queues with guaranteed delivery, point to point, and writes that it does not want to publish the ticket for whoever subscribes to read it.

Invoices follow the same logic. They travel through a queue that keeps them, so none is lost if the notification system is under maintenance.

## par · Several or one

Spotlight chose one channel and Sysops Squad proposes the other, and both have their reasons. Spotlight needed the same event to be read by several and to stay stored. Sysops Squad needed each ticket to reach a single destination and not get lost. What separates the two cases is how many have to read the message.

## lotes · All together, on schedule

The last question is left, when it is processed. Sysops Squad had a problem with assigning tickets. Sometimes the wrong technician showed up, and sometimes a ticket was never assigned.

The team proposes moving the assignment to a job that runs on a schedule, for example every hour. Processing tickets one by one, as they arrive, does not allow attending to the urgent ones first. A job that takes all the pending ones together, instead, can sort them by priority. And if something goes wrong, it runs again. That job has its cost, and the team names it. If the job does not start, because of a configuration error, nobody finds out, so it has to be watched.

The monthly billing follows the same idea. It is something that happens once a month, and the team proposes that a scheduled job do it, one that can run again if it fails.

## pregunta · The deciding question

What decides in this region has four parts, and each one has already come up. Whether the answer has to be awaited. How many have to read the message. Whether it has to be kept. And whether it has to be processed now or can wait for its time.
