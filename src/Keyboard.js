class Keyboard {
  static noteMap = {
    KeyQ: 0,
    Digit2: 1,
    KeyW: 2,
    Digit3: 3,
    KeyE: 4,
    KeyR: 5,
    Digit5: 6,
    KeyT: 7,
    Digit6: 8,
    KeyY: 9,
    Digit7: 10,
    KeyU: 11,
    KeyI: 0,

    KeyZ: 0,
    KeyS: 1,
    KeyX: 2,
    KeyD: 3,
    KeyC: 4,
    KeyV: 5,
    KeyG: 6,
    KeyB: 7,
    KeyH: 8,
    KeyN: 9,
    KeyJ: 10,
    KeyM: 11,
    Comma: 0,
  };

  static getNote = (code) => this.noteMap[code];

  static isDelete = (key) => key === 'Del' || key === 'Delete';

  static isEscape = (key) => key === 'Esc' || key === 'Escape';

  static isSpace = (key) => key === ' ' || key === 'Spacebar';
}

export default Keyboard;
