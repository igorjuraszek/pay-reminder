import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HomeUsersController extends Controller {
  @tracked inputValue = '';

  get sortedUsers() {
    const users = this.filteredUsers;
    const sorted = users.sortBy('username');
    return sorted;
  }

  get filteredUsers() {
    const filtered = this.model.users.filter(({ username, name, surname }) => {
      return `${username.toLowerCase()} ${name.toLowerCase()} ${surname.toLowerCase()}`.includes(
        this.inputValue.toLowerCase()
      );
    });
    return filtered;
  }

  @action
  onUserSearch({ target: { value } }) {
    this.inputValue = value;
  }
}
