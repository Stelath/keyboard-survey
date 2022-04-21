import Head from "next/head";
import styles from "../styles/Home.module.css";

import { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";

import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

import { handleKeyPress } from "../logic/handleKeyPress";
import keyboardConfig from "../logic/keyboardConfig";

export default function Home() {
  const numbers = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "delete"];
  const qwertyTopRow = ["tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"];
  const qwertyMiddleRow = ["", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "return"];
  const qwertyBottomRow = ["", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", ""];
  const spaceRow = ["", "", "Space", "", ""];
  
  const [keyboard, setKeyboard] = useState(null);
  const [keyboardLayout, setKeyboardLayout] = useState('default');

  useEffect(() => {
    setKeyboard(
      <>
        <BrowserView>
          <div className={styles.keyboard}>
            <div className={styles.keyboardGrid}>
              {createKeyboardRow(numbers, "50px", "100px")}
              {createKeyboardRow(qwertyTopRow, "100px")}
              {createKeyboardRow(qwertyMiddleRow, "110px", "110px")}
              {createKeyboardRow(qwertyBottomRow, "142px", "142px")}
              {createBottomRow(spaceRow)}
            </div>
          </div>
        </BrowserView>
        <MobileView>
        <div className={styles.carat}>|</div>
        <div className={styles.mobileKeyboard}><Keyboard onKeyPress={onKeyPress} layoutName={keyboardLayout} {...keyboardConfig} /></div>
        </MobileView>
      </>
    );
  }, []);

  const createKey = (key, width = "50px", num) => (
    <a className={`${styles.keyboardKey} ${styles.card}`} style={{ width }} key={num}>
      <h2>{key}</h2>
    </a>
  );

  const createKeyboardRow = (row, firstWidth = "50px", lastWidth = "50px") => {
    return (
      <div className={styles.keyboardGrid}>
        {row.map((key, i) => {
          if (i === 0) {
            return createKey(key, firstWidth, i);
          } else if (i === row.length - 1) {
            return createKey(key, lastWidth, i);
          } else {
            return createKey(key, "50px", i);
          }
        })}
      </div>
    );
  };

  const createBottomRow = (bottomRow) => {
    return (
      <div className={styles.keyboardGrid}>
        {bottomRow.map((key, i) => {
          if (i != bottomRow.length - (bottomRow.length / 2 + 0.5)) {
            return createKey(key, "75px", i);
          }
          return createKey(key, "300px", i);
        })}
      </div>
    );
  }

  const onKeyPress = (button) => {  
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
    else if (button === "{numbers}" || button === "{abc}") handleNumbers();
    else handleKeyPress(button);
  }
  
  const handleShift = () => {
    setKeyboardLayout((state) => {
      let currentLayout = state;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";
      return shiftToggle;
    });
  }

  const handleNumbers = () => {
    setKeyboardLayout((state) => {
      let currentLayout = state;
      let numbersToggle = currentLayout !== "numbers" ? "numbers" : "default";
      return numbersToggle;
    });
  }

  return (
    <div onKeyPress={handleKeyPress} tabIndex="0" className={styles.container}>
      <Head>
        <div dangerouslySetInnerHTML={{ __html: `<!-- Exploit the Flaws -->` }} />
        <title>Keys</title>
        <meta name="description" content="A key survey app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title} style={{marginBottom: '50px'}}>
          Welcome to <a href="https://keys.place">keys.place!</a>
        </h1>

        {keyboard ? (
          keyboard
        ) : (
          <div className={styles.keyboard}>
            <div className={styles.keyboardGrid}>
              {createKeyboardRow(numbers, "50px", "100px")}
              {createKeyboardRow(qwertyTopRow, "100px")}
              {createKeyboardRow(qwertyMiddleRow, "110px", "110px")}
              {createKeyboardRow(qwertyBottomRow, "142px", "142px")}
              {createBottomRow(spaceRow)}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
