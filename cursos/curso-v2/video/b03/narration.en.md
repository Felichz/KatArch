# Checking with a Calculation

## monitorme · One second, divided up

MonitorMe, the system for hospitals, has to show the vital signs in one second or less. Its team did not stop at the sentence and turned it into a calculation.

First they worked out how many signals arrive. On average, each patient sends a little over four signals per second, across all their sensors. For the worst moment the team assumed eight, and an installation has up to five hundred patients. At the peak, that comes to four thousand signals per second.

Then they followed the path of one signal, end to end. It goes through the service that stores it and through the one that shows it on screen. It also goes through the database and through the message broker, the piece that hands messages out among the services. And it travels over the hospital's network. They gave each stretch a time and added them up. It came to just under seven hundred milliseconds, below the second.

## supuesto · The number in charge

That calculation says something more if you look at it closely, and what follows is already our own reading of its numbers. More than ninety percent of the time is in the two services that process the signal. The database, the broker and the network, which is what usually gets discussed the most, weigh very little.

And those two stretches come from a single assumption the team left in writing, that processing a signal takes two milliseconds. With three milliseconds, the sum goes over the second. The calculation does not only approve the design. It also says which number has to be measured before anything else. And if it cannot be measured yet, the decision stays conditional on that number, and that is written down too.

## clearview · The calculation in money

ClearView did a calculation of the same kind, but in money. It uses a language model, the artificial intelligence that reads and writes text. Every time it asks it for something, it pays for the text it sends and for the text it gets back. So the team measured its matching options in number of calls to the model.

They compared six ways of matching the stories, the anonymous versions of the résumés, with the jobs. In some, the model looks at each story together with each job. In others, the model describes each story and each job only once, and the matching is done afterwards without it. For the first, the calls grow with the stories multiplied by the jobs. For the second, they grow with the stories added to the jobs.

With numbers of our own, to see it: a thousand stories and a hundred jobs are a hundred thousand calls in the first case, and eleven hundred in the second. When a résumé changes, the second path asks again for a single description. The team chose a way from the second group.

## comparacion · Time and money

One calculation measures time and the other measures money, and in both a single number moves everything. In MonitorMe, the two milliseconds per signal. In ClearView, how many times the model is called. That number says what has to be measured first, and which decision depends on it.
