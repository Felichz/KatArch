# Seeing What Happens

## gancho · Healthy machines, broken business

Farmacy Food's machines can all be healthy and the business, stuck. Every service responds, memory and network are fine, and still an order sits still at some step. The team writes that machine and network metrics do not say whether the system is truly available.

That is why each service has two checks. One is technical, a heartbeat each service sends to say it is still alive. The other is about the business. A supervisor sends a test message every so often down a critical path, for example placing an order. It measures two things, whether the result is correct and how long it took.

With that they find out when the machines are healthy but something in the business logic got stuck. And how long each path takes, looked at month by month, shows when it is worth splitting off a module or adding machines, with data in hand. Measuring the business this way has a cost. The test messages have to be designed into the code, that adds work and complexity, and if done badly they can affect real orders.

## familias · Four families

To find out that something is wrong there are four families, and each one answers a different question.

Logs are the notes each service leaves of what it did, one by one. They gain with the detail of what happened. They pay with volume, because they grow fast and you have to know how to search them.

Metrics are numbers over time, like how many orders come in per minute or how long a response takes, and alerts are set on top of them. They gain because they show the trend at a glance. They pay because they warn that something changed, but not why.

Traces follow a single order through every service it touches. They gain because they show where it slowed down or where it failed. They pay because each service has to pass the order's mark on to the next.

Business health tests a whole path the way a customer would, as Farmacy Food does. It gains because it sees what the customer sees. It pays with tests that have to be built and maintained inside the system.

## shopwise · The conversations, at home

ShopWise, the online store with its artificial intelligence assistant, needed a different view. To know whether the assistant answers well, the team wanted traces, the path of each conversation step by step. It also wanted to evaluate the answers without putting every change into production.

It compared three tools. The one it chose can be installed on its own machines, and that was one of its conditions, keeping control over sensitive data. That way, the traces of the conversations do not leave its infrastructure.

Keeping it at home has its price. Installing and maintaining that tool is up to the team, and it has less documentation than others, so solving an odd problem can take longer.

## par · What each one looks at

Farmacy Food and ShopWise look at different things. Farmacy Food asks whether the business works, and tests it end to end like a customer. ShopWise asks what happened inside each conversation, and follows its path step by step. And both decisions have their cost written down, tests to build in one case and a tool to operate in the other.

## silencio · The sensor that goes quiet

There is a failure that makes no noise. At MonitorMe, if a sensor stops sending data, nothing breaks. The screen simply stops showing that signal. And a quiet pulse sensor is not the same as a normal pulse.

The team walked the path of the data, piece by piece, to see what each one does when the data does not arrive. The one that stores stores nothing, and the one that shows shows nothing. The one that analyzes keeps the last reading with its time. And its rules can be set for the case where the data is missing or too old. Then the rule does not apply, or an alert goes off.

## pregunta · The deciding question

All of this points to the same thing, how the team finds out that something is wrong before the customer does. That includes what works on every machine but not in the business, and what simply stops happening, like the sensor that goes quiet.
