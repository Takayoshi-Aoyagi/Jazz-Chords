# coding: UTF-8

from tone import Tone

class Fingerboard:

    @classmethod
    def getPos(cls):
        _pos = {}
        openTones = ["E", "B", "G", "D", "A", "E"]
        tone = Tone()
        for stringIndex, openTone in enumerate(openTones):
            toneIndex = tone.getToneNumberByName(openTone)
            arr = []
            for i in range(13):
                toneString = tone.getToneName(openTone, i)
                arr.append(toneString)

            _pos[stringIndex + 1] = arr
        return _pos

    @classmethod
    def dump(cls, includes):
        _pos = cls.getPos()
        if len(includes) > 0:
            for key in _pos.keys():
                arr = _pos[key]
                for i, tone in enumerate(arr):
                    if tone not in includes.keys():
                        arr[i] = " "
                    else:
                        arr[i] = "%2s(%3s)" % (tone, includes[tone])
        flets = map(lambda x: " %7s " % x, range(13))
        print "    " +  " ".join(flets)
        for key in sorted(_pos.keys()):
            tones = _pos[key]
            tones = map(lambda x: " %7s " % x, tones)
            print '%s弦: |%s|' % (key, "|".join(tones))
