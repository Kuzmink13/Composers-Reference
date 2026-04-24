/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React from 'react';
import { createRoot } from 'react-dom/client';

import Main from './pages/Main';
import './assets/tailwind.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<Main />);
