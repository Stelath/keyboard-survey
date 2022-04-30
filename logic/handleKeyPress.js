import firebaseApp from './Firebase';
import { getDatabase, ref, set, get } from "firebase/database";

export function handleKeyPress(event) {
  var key = "Undefined";
  if (typeof event == "string") {
    key = event;
  } else {
    key = event.key;
  }

  key = key.toUpperCase();
  if (key == " ") {
    key = "Space";
  }

  writeKey(key);
  console.log(key);
}

function writeKey(key) {
  const db = getDatabase();
  const dbRef = ref(db, key)

  get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
      const count = snapshot.val().count;
      set(dbRef, {
        count: count + 1
      });
    } else {
      set(dbRef, {
        count: 1
      });
    }
  }).catch((error) => {
    console.error(error);
  });
}
