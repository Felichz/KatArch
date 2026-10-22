# Changing Without Breaking

## gancho · A new model that does not decide yet

MobilityCorp has a model that forecasts how many vehicles will be requested in each zone of the city. When a new model shows up that promises to forecast better, it does not put it to work overnight.

First it compares it with the one in use, with a measure of the forecast's error. The new one has to reduce that error by at least five percent. If it manages that, it still decides nothing. It runs for a week in shadow, making forecasts nobody uses, only to compare them with what actually happens. Only after that week does it take control.

## familias · Four families

A change can break what used to work, and there are four families to keep that from happening.

The first is continuous integration. Every change goes through automatic tests before getting in. ShopWise, for example, proposes that those tests include evaluating its assistant against known answers. It gains because errors show up before they reach the customer. It pays with tests to write and maintain.

The second is infrastructure as code. The machines, the networks and their permissions are described in files, like code. Farmacy Food proposes it so that nobody leaves, for example, a machine open to the internet without noticing. It gains because everything can be reviewed and repeated the same way. It pays because changes can no longer be made by hand without breaking that description.

The third is turning the change on for a part, with a switch that turns it on or off without deploying again. Spotlight lists it among its practices, to test with some users and switch off fast if something goes wrong. It gains with a change that can be undone in seconds. It pays with switches that have to be noted, watched and removed when they are no longer needed.

The fourth is shadow and phases, letting the change run next to what already works, without deciding, until the data says it works. It gains with evidence before handing over control. It pays with time and with running two things at once.

## paralelo · AI next to people

Certifiable did something similar with exam grading, but with people. Its plan has phases. In the first, the AI and the experts grade the same exams in parallel, and they compare how much they agree. In the second, the AI grades first and the experts review only the cases where the AI doubts. Only in the third does the AI grade almost everything, and the experts stay on as supervisors.

## par · Testing without handing over control

MobilityCorp and Certifiable test in production without handing over control. MobilityCorp does it with a model in shadow, compared against what actually happens. Certifiable does it with people alongside, compared against the AI. In both, the change takes control only when there is data showing that it works.

## rechazado · What was decided not to do

Changing without breaking also depends on what was left in writing. Every written decision carries a status, which says whether it is in force, whether it is a proposal or whether it was rejected, and the rejections are as useful as the rest.

When a sending to a human resources system is retried, ClearView asks the candidate service for the résumé again. The team thought of keeping it in a temporary memory to ease that load, and rejected it. The reason was written down, that it prefers carrying that work rather than paying for the memory and the complexity of keeping it up to date. And it left the condition for discussing it again, that the candidate service becomes a bottleneck.

Whoever comes later does not repeat the discussion from scratch. They know what was considered, why not, and when it is worth reopening.

## fuera · What is not the system's job

MonitorMe wrote another kind of no, what stays outside its system. The sensors belong to another context, something the client clarified when the team asked. The phone app only receives the notifications, and is not designed. And the team keeps a list of what was postponed, like authentication, each point with what is still unknown. Whatever is not written down, the next person who reads the design has to guess.

## pregunta · The deciding question

The question, before handing control to a change, is how to know that it works. And, along with that, what is left in writing about what was not done, so the next change does not start blind.
