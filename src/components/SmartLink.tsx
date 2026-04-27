/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React from 'react';

import { externalReferences } from '../assets/data';

import { replaceSymbols } from '../logic/utilities';

interface SmartLinkProps {
  children: string;
  term?: string;
  newTab?: boolean;
  willReplaceSymbols?: boolean;
}

function SmartLink({
  children,
  term,
  newTab = true,
  willReplaceSymbols = true,
}: SmartLinkProps) {
  const fallbackTerm = children.toLowerCase();
  const link = externalReferences[term ?? fallbackTerm];
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
