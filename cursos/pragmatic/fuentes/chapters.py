import os
_here = os.path.dirname(os.path.abspath(__file__))
exec(open(os.path.join(_here, "part1.py"), encoding="utf-8").read())
exec(open(os.path.join(_here, "part2.py"), encoding="utf-8").read())
CHAPTERS = [CH1, CH2, CH3, CH4, CH5, CH6, CH7, CH8]
exec(open(os.path.join(_here, "keys.py"), encoding="utf-8").read())
for _c in CHAPTERS:
    _c["keys"] = KEYS[_c["n"]]
