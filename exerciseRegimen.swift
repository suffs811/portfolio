//simple app to tell you what exercise (with reps and sets) to do on the day of the week

// make exercise structure
struct Exercise {
  var name: String
  var muscles: [String]
  var reps: Int
  var sets: Int
  var totalReps: Int

  init(name: String, muscles: [String], reps: Int, sets: Int) {
    self.name = name
    self.muscles = muscles
    self.reps = reps
    self.sets = sets
    self.totalReps = sets*reps
  }
}

// make exercise object 'pushUp'
var pushUp = Exercise(name: "push up", muscles: ["Triceps", "Chest", "Shoulders"], reps: 10, sets: 3)

// create Regimen structure to print the exercises for the day of the week
struct Regimen {
  var dayOfWeek: String
  var exercises: [Exercise]

  init(dayOfWeek: String, exercises: [Exercise]) {
    self.dayOfWeek = dayOfWeek
    self.exercises = exercises
  }

  // print the exercises
  func printE() {
    print("Today is \(dayOfWeek) and the plan is to: ")
    for ex in exercises {
      print("Do \(ex.sets) sets of \(ex.reps) \(ex.name)s")
      print("That's a total of \(ex.totalReps) \(ex.name)s\n")
    }
  }

  // print out to do 'addReps' more reps of the exercise
  mutating func feelingGood(addReps: Int) { 
    for e in exercises {
      print("Let's do more \(e.name)s!")
      print("Now do \(addReps) more reps of \(e.name)s\n")
  }
  }
}

// initialize an instance of Regimen for 'Monday' with exercise 'pushUp'
var mondayRegimen = Regimen(dayOfWeek: "Monday", exercises: [pushUp])

// call mondayRegimen methods to print exercise sets and reps to screen
mondayRegimen.printE()
mondayRegimen.feelingGood(addReps: 10)
