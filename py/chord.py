import re
from tone import Tone

class Chord:

    tone = Tone()
    
    @classmethod
    def parse(cls, chord, tensions):
        r = re.compile("(C|Db|D|Eb|E|F|Gb|G|Ab|A|Bb|B)(m{0,1})(7|M7)")
        m = r.search(chord)
        root = m.group(1)
        thirdSymbol = "M" if m.group(2) == "" else m.group(2)
        third = cls.tone.getTone(root,thirdSymbol)
        fifth = cls.tone.getTone(root, "5")
        seventh = cls.tone.getTone(root, m.group(3))

        dic = {}
        dic[root] = "1"
        dic[third] = "3"
        dic[fifth] = "5"
        dic[seventh] = "7"

        if tensions != None:
            for tension in tensions:
                t = cls.tone.getTone(root, tension)
                dic[t] = tension

        # omit root when tension contains 9th
        if "9" in tensions or "b9" in tensions or "#9" in tensions:
            del dic[root]

        # omit 5th when tension contains 13th
        if "13" in tensions or "b13" in tensions:
            del dic[fifth]
        
        return dic
