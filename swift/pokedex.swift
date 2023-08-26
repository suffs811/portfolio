// create pokemon class with details for each pokemon

class Pokemon {
  var num = 0
  var name = ""
  var type = [""]
  var abilities = [""]

  init(num: Int, name: String, type: [String], abilities: [String]) {
    self.num = num
    self.name = name
    self.type = type
    self.abilities = abilities
  }

  // print pokemon's info to screen
  func displayInfo() {
    print("\(self.name), I choose you!\n")
    print("Pokemon index \(self.num) chosen, type: \(self.type), abilities: \(abilities)\n")
  }
}

// create subclass of pokemon for gigantamaxed pokemon
class GigantamaxPokemon: Pokemon {
  // add location detail to pokemon
  var location = ""

  init(num: Int, name: String, type: [String], abilities: [String], location: String) {
    self.location = location

    // call superclass init method
    super.init(num: num, name: name, type: type, abilities: abilities)
  }

  // override superclass method to add location and print to screen
  override func displayInfo() {
    print("\(self.name), I choose you!\n")
    print("Pokemon index \(self.num) chosen, type: \(self.type), abilities: \(abilities), location: \(location)\n")
  }
}

// create 3 instances of pokemon class
var bulbasaur = Pokemon(num: 1, name: "Bulbasaur", type: ["Grass", "Poison"], abilities: ["Overgrown"])

var charmander = Pokemon(num: 2, name: "Charmander", type: ["Fire"], abilities: ["Blaze"])

var squirtle = Pokemon(num: 3, name: "Squirtle", type: ["Water"], abilities: ["Torrent"])

// display info of objects to screen
bulbasaur.displayInfo()
charmander.displayInfo()
squirtle.displayInfo()

// create instance of gigantamax pokemon
var charizard = GigantamaxPokemon(num: 5, name: "Charizard", type: ["Fire"], abilities: ["Blaze"], location: "Lake of Outrage")

// print details to screen
charizard.displayInfo()
