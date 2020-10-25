import React, { Component } from 'react';

class Staff extends Component {
  state = {};
  render() {
    return <div id={this.props.modeName}></div>;
  }
  componentDidMount() {
    const vf = this.props.vf;

    let div = document.getElementById(this.props.modeName);
    let renderer = new vf.Renderer(div, vf.Renderer.Backends.SVG);

    renderer.resize(280, 90);

    let context = renderer.getContext();

    let stave = new vf.Stave(0, -20, 280);

    stave.addClef('treble');

    let myNotes = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];

    let realNotes = myNotes.map((note) =>
      new vf.StaveNote({
        clef: 'treble',
        keys: [`${note}/4`],
        duration: 'w',
      }).addAccidental(0, new vf.Accidental('b'))
    );

    let voice = new vf.Voice({
      num_beats: myNotes.length,
      beat_value: 1,
    });

    voice.addTickables(realNotes);

    let formatter = new vf.Formatter();
    formatter.format([voice], 260);

    stave.setContext(context).draw();
    voice.draw(context, stave);
  }
}

export default Staff;
