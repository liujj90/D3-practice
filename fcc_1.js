// import module
import { menu } from '../menu_json.js';

// get id
const message = menu.menu.id;
// grab message-element
document.getElementById('message-element').textContent = message;
