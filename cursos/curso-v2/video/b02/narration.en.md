# From the Requirement to the Qualities, and Giving Things Up in Writing

## gancho · Two sentences

MonitorMe is a system for hospitals. It shows the patients' vital signs at the nurses' station and warns when something goes out of range. The client's request fits on one page, and asks to read eight vital signs from each patient. Among its sentences there are two that weigh more than the rest. One asks for an average response of one second or less. The other says that, if a device fails, the system has to keep working with the others.

Neither of those sentences says what the system has to look like. But from sentences like these come the few properties that decide its shape.

## cualidad · What a quality is

Those properties are called the qualities of the system. A quality is something the system has to have apart from what it does. For example, how fast it responds, how much it holds up if something fails, how easy it is to change or how much it costs. In the kata repositories they appear as architecture characteristics.

Only a few are chosen because each one pulls the structure in one direction, and you cannot pull in every direction at once. What one favors, another pays for. The few that rule are used to choose the overall shape of the system, what is called its style.

## monitorme · Sentence by sentence

The first way to find them is to read the request sentence by sentence and name the quality each one asks for. That is how the MonitorMe team worked. The one second of response asks for performance. Keeping on working if a device fails asks for fault tolerance. And being able to add sensors in the future asks for two things. That the system can be changed, what they call evolvability, and that it can add machines when the load grows, what they call elasticity.

Reading this way, far more than three come out. MonitorMe got to nine candidates and kept three: evolvability, performance and elasticity.

## renuncias · Giving up, with its condition

What stays below is written down too. MonitorMe left each thing it gave up in a decision of its own.

One is deployability, which is putting new versions of the system into operation. It stayed below because the system is installed only once in each hospital. The decision names the condition that makes giving it up safe, one installation per hospital. And the same document says what would break it. If one day the system moves to the cloud, whoever reads the decision knows that giving it up no longer holds.

Availability, the system always being up, was also left out of the three, and with it something different happens. MonitorMe does not say it does not matter. It says it will not decide the style, and that it is solved in how the copies of the system are put into operation. Each service runs duplicated, and if one copy falls, another replaces it. It admits that duplicating everything costs more resources.

## clearview · From what is hard about the case

The second way to find the qualities starts from what makes the case hard. That is what ClearView did. Its team wrote down three difficulties, and for each one it looked for the quality that answers it.

Artificial intelligence does not always behave the same, and a new version of the model can change the results. That asks for being able to repeat the tests, testability. An organization that lives on donations runs the risk of the model's cost shooting up. That asks for a system that can be sustained with the money there is, what the team calls feasibility. And each human resources system has its own API, the door through which another program talks to it. That asks for interoperability, being able to talk to all of them.

ClearView also left something it gave up in writing, in its own decision. It lowered data integrity, which is the data being correct and not getting lost. According to the team it matters, but it is guarded mostly in the code. It fits with the shared database of the previous block, which weakened precisely that quality.

## comparacion · Two paths

MonitorMe and ClearView reach the same place by different paths. MonitorMe starts from what the client asks for, sentence by sentence. ClearView starts from what can go wrong. Both end up with three qualities that rule, and both leave in writing what went down and why. That paper makes it possible to reopen something given up the day the condition that held it changes.
