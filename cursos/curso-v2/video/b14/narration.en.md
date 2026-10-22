# AI in the System

## clearview · Taking the decision away

ClearView's main risk with artificial intelligence was bias. Language models carry learned prejudices, and matching people with jobs is exactly where a prejudice does harm. Besides, a model does not always answer the same, and a change in its instructions can change the result.

The team compared six ways of using the model. The one that let it match résumés and jobs directly was discarded because of bias. It chose to have the model do a narrow task. It reads the anonymous story and the job, and extracts traits a person can read, which then stay fixed. The score is calculated by an ordinary rule with those traits, without the model.

That way, the model was stripped of exactly the decision it could most bend. And what remains in the middle, the traits, can be read, explained and tested.

## familias · Four families

Putting a model inside a system forces decisions on what it does, what happens when it doubts, where it gets what it knows and how it is measured. There are four families.

The first is letting the model describe and a rule decide, as at ClearView. It gains with results that can be explained and tested. It pays because the model contributes less than it could.

The second is letting it decide within limits, with rules that are not negotiable and with confidence bands that say what happens when it doubts. It gains because the model works and the business stays protected. It pays with rules to write and with people who review the doubtful cases.

The third is giving it context instead of training it, finding similar examples and passing them along with the question. It gains because it adapts to new cases without retraining. It pays with an index of examples to build and maintain.

The fourth is measuring it, before and while it runs. It gains by knowing when it gets worse. It pays with measures that have to be chosen well, because a single one misleads.

## mobilitycorp · Surrounding it with limits

MobilityCorp lets its models decide, but within written limits. The price of a rental depends on demand, the weather and the city's events, and its decision splits up the work. One model estimates how demand responds to price. Another explains the price in words. And rules written in code enforce what cannot be broken, the minimum margin, local regulation and subscriber discounts. Leaving it all to the model was discarded, because it could fail in edge cases, like a local law or a minimum fare.

And when the model doubts, the system already knows what to do. When returning a car, the customer uploads photos, and a model decides whether it came back dirty, which carries a fee. If the model's confidence is over ninety percent, it decides on its own. Between eighty and ninety, the case goes to a person who reviews it. And below eighty, the fee is not charged, so if the model doubts, the company loses and not the customer.

## par · Take it out or surround it

ClearView and MobilityCorp put limits on the model in two ways. ClearView took it out of the decision and left it for what it does well, describing. MobilityCorp let it decide, surrounded by rules that are not negotiable and with a written way out for when it doubts. Both answered beforehand what the model could not decide and what happened when it was not sure.

## contexto · Giving it examples instead of training it

Certifiable is a company that certifies software architects, and it wanted a model to grade the short answers on its exam. The model had to get it right with new questions too, ones it had never seen.

It compared three paths. Asking for the grade without examples was fast, but fragile and inconsistent. Training a model on graded answers worked with known questions, and dropped with new ones. It chose the third. For each answer, the system looks for similar answers an expert already graded and passes them to the model as examples.

The price of looking for examples is noted too. An index is needed to search those examples, grading adds a step, and the more examples are passed, the longer it takes and the more it costs.

## medir · Measuring it

Before trusting a model, it has to be measured. ShopWise compared three models for its assistant with two automatic measures. One measures whether the answer rests on the data the model received, what they call faithfulness. The other, whether it answers what was asked, relevance.

One of the models scored high relevance and zero faithfulness. It answered by asking for the order number, which was already in the question, and that single sentence counted as relevant. The team wrote down the conclusion, that a single measure is not enough and they have to be read together.

Certifiable measures another way, on each answer. It separated two pieces, one that grades and gives the mark, and another model that judges how much confidence that mark deserves. If the confidence passes a threshold, the mark stands. If not, an expert reviews it. And keeping them separate makes it possible to improve or test one while the other stays fixed.

## pregunta · The deciding question

About a model you have to know, above all, what it cannot decide and what happens when it doubts. That is answered before putting it to work, because a model is wrong with the same confidence with which it is right.
