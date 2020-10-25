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

    let stave = new vf.Stave(0, -10, 280);

    stave.addClef('treble');

    let notes = this.props.vexScale;

    let voice = new vf.Voice({
      num_beats: notes.length,
      beat_value: 1,
    });

    voice.addTickables(notes);

    let formatter = new vf.Formatter();
    formatter.format([voice], 260);

    stave.setContext(context).draw();
    voice.draw(context, stave);
  }
}

export default Staff;
