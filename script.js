/**
 * Verkefni 7 – Reikniæfingarforrit
 *
 * Forrit sem æfir hraða í að reikna einföld dæmi
 */

// fasti sem segir til um hve marga leiki eigi að spila
const GAMES_TO_PLAY = 10;

/**
 * Birtir upplýsingar um leik og eftir að notandi samþykkir spilar fyrsta leik
 * með kalli í play().
 * Eftir leik er notanda boðið að spila annan leik, ef ekki hættir forrit.
 */
function start() {
  alert(`Markmiðið er að svara eins mörgum af 10 dæmum rétt eins hratt og mögulegt er.`);

  do {
    play();
  } while (confirm(`Spila annan leik?`));
}

/**
 * Spilar einn leik. Heldur utan um hvenær leikur byrjaði, hvenær endar og
 * fjölda réttra svara. Eftir leik eru birtar upplýsingar um niðurstöðu:
 *   Þú svaraðir X af 10 dæmum rétt á Y sekúndum
 *   Meðalrétt svör á sekúndu eru Z
 * Þar sem Y og Z hafa tvo aukastafi.
 *
 * Ef notandi ýtir á "Cancel" í leik eru skilaboðin "Hætt í leik." birt og engar
 * upplsýingar um niðurstöður.
 *
 */
function play() {
  let games = 0;
  let correct = 0; 
  let qTime;
  let qStart;
  let qEnd;
  let times = [];
  let ans;

  const start = new Date();
  do {
    problem = ask();
    qStart = new Date();
    ans = prompt(`Hvað er ${problem.question}?`);
    qEnd = new Date();
    qTime = (qEnd - qStart) / 1000;
    times.push(qTime);
    if (ans === null) {
      return alert(`Hætta í leik.`);
    }
    else if (parseInt(ans) === problem.answer) {
      correct++;
    }

    games++;
  } while (!(games === GAMES_TO_PLAY));
  const end = new Date();

  const time = (end - start) / 1000;

  let avg = 0;
  for (var i = 0; i < time.length; i++) {
    avg = avg + times[i];
  }

  avg = avg / (times.length);

  alert(`Þú svaraðir ${correct} af ${GAMES_TO_PLAY} dæmum rétt á ${time.toFixed(2)} sekúndum.\n Meðalrétt svör á sekúndu eru ${avg.toFixed(2)}`)
}

/**
 * Spyr einnar spurningar og skilar upplýsingum um svar (mögulega með því að
 * nota true, false og null ef notandi hættir). Birtir notanda propmpt til að
 * svara í og túlkar svarið yfir í tölu.
 *
 * Mögulegar spurningar eru:
 * - `+` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `-` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `*` dæmi þar sem báðar tölur geta verið á bilinu `[1, 10]`
 * - `/` dæmi þar sem fyrri tala er á bilinu `[2, 10]` og seinni talan er fyrri
 *   talan sinnum tala á bilinu `[2, 10]` þ.a. svarið verði alltaf heiltala
 *
 * Sniðugt væri að færa það að búa til spurningu í nýtt fall sem ask() kallar í.
 */
function ask() {
  const operators = [`+`, `-`, `*`, `/`];
  const choose = operators[randomNumber(0, operators.length - 1)];
  let num1 = 0;
  let num2 = 0;
  let answer = 0;
  let question;
  let problem;

  switch (choose) {
    case `+`:
      num1 = randomNumber(1, 100);
      num2 = randomNumber(1, 100);
      answer = num1 + num2;
      question = `${num1} + ${num2}`;

      problem = {
        answer: answer,
        question: question
      }

      return problem;
    
    case  `-`:
      num1 = randomNumber(1, 100);
      num2 = randomNumber(1, 100);
      answer = num1 - num2;
      question = `${num1} - ${num2}`;

      problem = {
        answer: answer,
        question: question
      }

      return problem;

    case `*`: 
      num1 = randomNumber(1, 10);
      num2 = randomNumber(1, 10);
      answer = num1 * num2;
      question = `${num1} * ${num2}`;

      problem = {
        answer: answer,
        question: question
      }

      return problem;

    case `/`:
      num1 = randomNumber(2, 10);
      num2 = num1 * randomNumber(2,10);
      answer = num2 / num1;
      question = `${num2} / ${num1}`;

      problem = {
        answer: answer,
        question: question
      }

      return problem;

    default:
      break;
  }
}

/**
 * Skilar tölu af handahófi á bilinu [min, max]
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Byrjar leik
start();
