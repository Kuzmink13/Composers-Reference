/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React from 'react';

import * as refs from '../assets/externalReferences.json';

import { replaceSymbols } from '../logic/utilities';

function SmartLink({
  children,
  term = children.toLowerCase(),
  newTab = true,
  willReplaceSymbols = true,
}) {
  const link = refs.default[term];
  return link ? (
    <a
      href={link}
      target={newTab ? '_' : ''}
      className="tab-selection external-link"
    >
      {willReplaceSymbols ? replaceSymbols(children) : children}
    </a>
  ) : willReplaceSymbols ? (
    replaceSymbols(children)
  ) : (
    children
  );
}

export default SmartLink;
