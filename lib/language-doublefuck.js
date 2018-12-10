'use babel';

import LanguageDoublefuckView from './language-doublefuck-view';
import { CompositeDisposable } from 'atom';

export default {

  languageDoublefuckView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageDoublefuckView = new LanguageDoublefuckView(state.languageDoublefuckViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageDoublefuckView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-doublefuck:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageDoublefuckView.destroy();
  },

  serialize() {
    return {
      languageDoublefuckViewState: this.languageDoublefuckView.serialize()
    };
  },

  toggle() {
    console.log('LanguageDoublefuck was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
