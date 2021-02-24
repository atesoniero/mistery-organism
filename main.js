// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

function pAequorFactory(number, array) {
  return (specimen = {
    specimenNum: number,
    dna: array,
    mutate() {
      const base = Math.floor(Math.random() * 15);
      let newBase = returnRandBase();
      while (newBase === this.dna[base]) {
        newBase = returnRandBase();
      }
      this.dna[base] = newBase;
    },

    compareDNA(pAequor) {
      dna1 = pAequor.dna.slice();
      dna2 = this.dna.slice();
      console.log(dna1);
      console.log(dna2);
      commonDNA = 0;
      for (let i = 0; i < dna1.length; i++) {
        if (dna1[i] === dna2[i]) {
          commonDNA += 1;
        }
      }
     const commonPercentage = Math.floor((100 * commonDNA) / dna2.length);

      console.log(
        `Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ~${commonPercentage}% DNA in common`
      );
    },

    willLikelySurvive() {
      function returnCG(base) {
        return base === "C" || base === "G";
      }
      return (this.dna.filter(returnCG).length >= 9);
    },
  });
}

// set counter
let i = 0;
// set array of pAequor
const pAequorArray = [];
while (i < 30) {
  const testSubject = pAequorFactory(i + 1, mockUpStrand());
  if (testSubject.willLikelySurvive()) {
    pAequorArray.push(testSubject);
    i += 1;
  }
}

// Print 30 specimes with high survival rate
console.log(pAequorArray)

// Compare DNA of two random specimes
let idx1 = 0; let idx2 = 0;
while (idx1 === idx2) {
  idx1 = Math.floor(Math.random() * pAequorArray.length);
  idx2 = Math.floor(Math.random() * pAequorArray.length);
}
pAequorArray[idx1].compareDNA(pAequorArray[idx2])

