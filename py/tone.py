class Tone:

    tones = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]

    degreeAlias = {
        "m": 3,
        "M": 4,
        "b5": 6,
        "5": 7,
        "7": 10,
        "M7": 11,
        "9": 2,
        "b9": 1,
        "#9": 3,
        "13": 9,
        "b13": 8
    }
    def getToneNumberByName(self, tone_name):
        return self.tones.index(tone_name)

    def getTone(self, root, degreeString):
        rootIndex = self.getToneNumberByName(root)
        degree = self.degreeAlias[degreeString]
        index = (rootIndex + degree) % 12
        return self.tones[index]

    def getToneName(self, root, degree):
        rootIndex = self.getToneNumberByName(root)
        index = (rootIndex + degree) % 12
        return self.tones[index]
        
