/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useEffect } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(', ');

function getFocusableElements(container) {
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
    (element) =>
      !element.hasAttribute('disabled') &&
      element.getAttribute('aria-hidden') !== 'true'
  );
}

const trapStack = [];

function getActiveTrap() {
  return trapStack.length > 0 ? trapStack[trapStack.length - 1] : null;
}

function addTrapToStack(trap) {
  const existingIndex = trapStack.indexOf(trap);
  if (existingIndex >= 0) {
    trapStack.splice(existingIndex, 1);
  }

  const activeTrap = getActiveTrap();
  if (activeTrap && activeTrap !== trap) {
    activeTrap.pause();
  }

  trapStack.push(trap);
}

function removeTrapFromStack(trap) {
  const index = trapStack.indexOf(trap);
  if (index >= 0) {
    trapStack.splice(index, 1);
  }
}

function useFocusTrap(id) {
  useEffect(() => {
    const container = document.getElementById(id);
    if (!container) return;

    const previouslyFocusedElement = document.activeElement;
    let initialFocusTimer = null;
    let isPaused = false;

    const focusFirstElement = () => {
      const focusableElements = getFocusableElements(container);
      const targetElement = focusableElements[0] || container;
      targetElement.focus({ preventScroll: true });
    };

    const handleKeyDown = (event) => {
      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements(container);
      if (focusableElements.length === 0) {
        event.preventDefault();
        container.focus({ preventScroll: true });
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (activeElement === firstElement || !container.contains(activeElement)) {
          event.preventDefault();
          lastElement.focus({ preventScroll: true });
        }
      } else if (
        activeElement === lastElement ||
        !container.contains(activeElement)
      ) {
        event.preventDefault();
        firstElement.focus({ preventScroll: true });
      }
    };

    const handleFocusIn = (event) => {
      const target = event.target;
      if (target && !container.contains(target)) {
        focusFirstElement();
      }
    };

    const startFocusTrap = () => {
      if (!container.hasAttribute('tabindex')) {
        container.setAttribute('tabindex', '-1');
      }

      container.classList.add('trap', 'is-active');
      initialFocusTimer = window.setTimeout(focusFirstElement, 0);
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('focusin', handleFocusIn);
    };

    const stopFocusTrap = ({ restoreFocus = false } = {}) => {
      if (initialFocusTimer !== null) {
        window.clearTimeout(initialFocusTimer);
        initialFocusTimer = null;
      }

      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocusIn);
      container.classList.remove('is-active');

      if (
        restoreFocus &&
        previouslyFocusedElement &&
        previouslyFocusedElement instanceof HTMLElement &&
        previouslyFocusedElement.isConnected
      ) {
        previouslyFocusedElement.focus({ preventScroll: true });
      }
    };

    const trap = {
      pause() {
        if (isPaused) return;
        isPaused = true;
        stopFocusTrap();
      },
      resume() {
        if (!isPaused) return;
        isPaused = false;
        startFocusTrap();
      },
    };

    addTrapToStack(trap);
    startFocusTrap();

    return () => {
      const wasActiveTrap = getActiveTrap() === trap;
      removeTrapFromStack(trap);

      const hasNextTrap = getActiveTrap() !== null;
      stopFocusTrap({ restoreFocus: !hasNextTrap });

      if (wasActiveTrap) {
        const nextTrap = getActiveTrap();
        if (nextTrap) {
          nextTrap.resume();
        }
      }
    };
  }, [id]);
}

export default useFocusTrap;
