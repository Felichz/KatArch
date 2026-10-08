import re


def L(text, say=None, p=None):
    d = {"text": text}
    if say:
        d["say"] = say
    if p:
        d["pauseAfter"] = p
    return d


def S(id, kicker, visual, lines):
    return {"id": id, "kicker": kicker, "visual": visual, "lines": lines}


def words(s):
    return len(re.findall(r"[\wÀ-ÿ'’]+(?:[.,][0-9]+)*", s))


def spoken(line):
    return line.get("say", line["text"])
