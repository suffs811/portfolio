#include <iostream>
#include <vector>
#include "profile.hpp"
using namespace std;

int main() {
  string ask_name;
  int ask_age;
  string ask_city;
  string ask_country;
  string ask_pronouns;
  string ask_hobbies;

  cout << "Name: ";
  cin >> ask_name;
  cout << "Age: ";
  cin >> ask_age;
  cout << "City: ";
  cin >> ask_city;
  cout << "Country: ";
  cin >> ask_country;
  cout << "Pronouns: ";
  cin >> ask_pronouns;
  cout << "Hobbies: ";
  cin >> ask_hobbies;

  Profile mar("Mar Smith", 26, "Dallas", "USA", "She/Her");
  mar.addHobbies("napping");
  cout << mar.viewProfile();

  Profile tan(ask_name, ask_age, ask_city, ask_country, ask_pronouns);
  tan.addHobbies(ask_hobbies);
  cout << tan.viewProfile();

}
