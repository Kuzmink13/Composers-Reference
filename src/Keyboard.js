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

  static reverseNoteMap = {
    0: 'Q',
    1: '2',
    2: 'W',
    3: '3',
    4: 'E',
    5: 'R',
    6: '5',
    7: 'T',
    8: '6',
    9: 'Y',
    10: '7',
    11: 'U',

    12: 'Z',
    13: 'S',
    14: 'X',
    15: 'D',
    16: 'C',
    17: 'V',
    18: 'G',
    19: 'B',
    20: 'H',
    21: 'N',
    22: 'J',
    23: 'M',

    24: ',',
  };

  static getNote = (code) => this.noteMap[code];

  static getKey = (index) => this.reverseNoteMap[index];

  static isDelete = (key) => key === 'Del' || key === 'Delete';

  static isEscape = (key) => key === 'Esc' || key === 'Escape';

  static isSpace = (key) => key === ' ' || key === 'Spacebar';

  static isLeftRightArrow = (key) =>
    key === 'ArrowLeft' || key === 'ArrowRight';

  static isRightArrow = (key) => key === 'ArrowRight';
}

export default Keyboard;
