import React from 'react';

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-400 py-1">
      <p className="px-1 text-center text-xs font-semibold text-gray-700">
        Composer's Reference is provided under the GNU General Public License
        v3.0. Contribute on{' '}
        <a
          aria-label="Support development on GitHub"
          href="https://github.com/Kuzmink13/Composers-Reference"
          target="_"
          className="external-link"
        >
          GitHub!
        </a>
      </p>
    </footer>
  );
}

export default Footer;
