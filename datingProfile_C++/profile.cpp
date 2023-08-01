#include <iostream>
#include <vector>
#include "profile.hpp"
using namespace std;

Profile::Profile(string new_name, int new_age, string new_city, string new_country, string new_pronouns)
  : name(new_name), age(new_age), city(new_city), country(new_country), pronouns(new_pronouns) {}

void Profile::addHobbies(string newHobbies) {
  hobbies.push_back(newHobbies);
}

string Profile::viewProfile() {
  string bio = "Name: " + name + "\n" + "Age: " + to_string(age) + "\n" + "City: " + city + "\n" + "Country: " + country + "\n" + "Pronouns: " + pronouns + "\n" + "Hobbies: " + "\n";
  for (int i = 0; i < hobbies.size(); i++) {
    bio += "+ " + hobbies[i] + "\n";
  }
  return bio;
}
