#include <vector>
#include <string>
using namespace std;

class Profile {
  private:
  string name;
  int age;
  string city;
  string country;
  string pronouns;
  vector<string> hobbies;

  public:
  Profile(string new_name, int new_age, string new_city, string new_country, string new_pronouns = "they/them");

  void addHobbies(string newHobbies);
  string viewProfile();


};
