import sys
from chord import Chord
from fingerboard import Fingerboard

args = sys.argv

chordName = args[1]
if len(args) > 2:
    tensions = args[2:]

tones = Chord.parse(chordName, tensions)

inv = {v:k for k, v in tones.items()}
print ""
print "%s %s" % (chordName, " ".join(tensions))
print ""
for key in sorted(inv.keys()):
    print " %3s: %2s" % (key, inv[key])

Fingerboard.dump(tones)


