module.exports = {
  guessing: {
    not_enough_guesses: 'Du hast alle :max Guesses verbraucht.',
    correct_guess: [
      'Ja, das stimmt, so ein Traning kann nur von :person gedroppt werden.',
      'Sowas kann nur von :person kommen.',
    ],
    incorrect_guess: [
      'Samma, gibst du dir überhaupt Mühe? Hört sich das wirklich nach :person an?',
    ],
    thread_title: 'Guess the dropper(s) of the traning',
  },
  formatting: {
    traning_line: ':author: :content',
  },
  error: {
    command: {
      not_found: 'Der Befehl ":command" existiert nicht.',
      random: {
        no_traning: [
          'Fehler beim asynchronen Laden des Tranings.',
          'Wir leben in einer Welt mit asynchronen Traning-Fetch-Methoden und wir finden keinen Traning.',
        ],
      },
    },
  },
};
