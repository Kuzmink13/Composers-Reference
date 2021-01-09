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
    <a href={link} target={newTab ? '_' : ''} className="external-link">
      {willReplaceSymbols ? replaceSymbols(children) : children}
    </a>
  ) : willReplaceSymbols ? (
    replaceSymbols(children)
  ) : (
    children
  );
}

export default SmartLink;