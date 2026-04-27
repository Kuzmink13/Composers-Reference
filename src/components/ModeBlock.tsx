/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React from 'react';
import { useStore } from '../zustand/hooks';

import VexStaff from './VexStaff';
import type Mode from '../objects/Mode';

interface ModeBlockProps {
  mode: Mode;
}

function ModeBlock({ mode }: ModeBlockProps) {
  const openModeCard = useStore((state) => state.openModeCard);
  const clef = useStore((state) => state.clef);

  return (
    <button
      aria-label={`open mode-card for ${mode.getModeName()}`}
      onClick={() => openModeCard(mode)}
      className="tab-selection m-1 p-1"
    >
      <div className="box p-2 hover:shadow-md">
        <h2 className="text-center tracking-wider font-semibold">
          {mode.getModeName()}
        </h2>
        <VexStaff {...{ mode, clef }} />
      </div>
    </button>
  );
}

export default ModeBlock;
