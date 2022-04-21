import firebaseApp from "./Firebase";
import { getDatabase } from "firebase/database";

export function handleKeyPress(event) {
  var key = "Undefined";
  if (typeof event == "string") {
    key = event;
  } else {
    key = event.key;
  }
  
  const database = getDatabase();
}
