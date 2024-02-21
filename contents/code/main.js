/*******************************************************************************
 * Quick Tile 2 KWin script
 *
 * This script will add four additional shortcuts to the KWin window manager,
 * in order to emulate Windows 10 tiling behavior.
 *
 * Forked from Quick Tiling - Windows 10 by Koen Hausmans <koen@hausmans.nl>
 *
 * https://github.com/tsoernes/kwin-quick-tile-2
 ******************************************************************************/

function _tileEvaluator() {
  return {
    screenGeometry: workspace.clientArea(
      KWin.PlacementArea,
      workspace.activeScreen,
      workspace.currentDesktop
    ),
    clientGeometry: workspace.activeWindow.frameGeometry,
    tileGeometry: workspace.activeWindow.tile?.relativeGeometry,

    isVerticallyMaximized() {
      return (this.clientGeometry.height === this.screenGeometry.height);
    },
    isHorizontallyMaximized() {
      return (this.clientGeometry.height === this.screenGeometry.height);
    },
    isMaximized() {
      return this.isHorizontallyMaximized() && this.isVerticallyMaximized();
    },

    isTiledTop() {
      return this.tileGeometry != null &&
        this.tileGeometry.x === 0 &&
        this.tileGeometry.y === 0 &&
        this.tileGeometry.width === 1 &&
        this.tileGeometry.height === 0.5;
    },
    isTiledBottom() {
      return this.tileGeometry != null &&
        this.tileGeometry.x === 0 &&
        this.tileGeometry.y === 0.5 &&
        this.tileGeometry.width === 1 &&
        this.tileGeometry.height === 0.5;
    },
    isTiledLeft() {
      return this.tileGeometry != null &&
        this.tileGeometry.x === 0 &&
        this.tileGeometry.y === 0 &&
        this.tileGeometry.width === 0.5 &&
        this.tileGeometry.height === 1;
    },
    isTiledRight() {
      return this.tileGeometry != null &&
        this.tileGeometry.x === 0.5 &&
        this.tileGeometry.y === 0 &&
        this.tileGeometry.width === 0.5 &&
        this.tileGeometry.height === 1;
    },
    isTiledTopLeft() {
      return this.tileGeometry != null &&
        this.tileGeometry.x === 0 &&
        this.tileGeometry.y === 0 &&
        this.tileGeometry.width === 0.5 &&
        this.tileGeometry.height === 0.5;
    },
    isTiledTopRight() {
      return this.tileGeometry != null &&
        this.tileGeometry.x === 0.5 &&
        this.tileGeometry.y === 0 &&
        this.tileGeometry.width === 0.5 &&
        this.tileGeometry.height === 0.5;
    },
    isTiledBottomLeft() {
      return this.tileGeometry != null &&
        this.tileGeometry.x === 0 &&
        this.tileGeometry.y === 0.5 &&
        this.tileGeometry.width === 0.5 &&
        this.tileGeometry.height === 0.5;
    },
    isTiledBottomRight() {
      return this.tileGeometry != null &&
        this.tileGeometry.x === 0.5 &&
        this.tileGeometry.y === 0.5 &&
        this.tileGeometry.width === 0.5 &&
        this.tileGeometry.height === 0.5;
    },
  }
}

var QuickTileUp = function () {
  const tileEvaluator = _tileEvaluator();

  // L > TL
  if (tileEvaluator.isTiledLeft()) {
    workspace.slotWindowQuickTileTopLeft();
    // R > TR
  } else if (tileEvaluator.isTiledRight()) {
    workspace.slotWindowQuickTileTopRight();
    // B > T
  } else if (tileEvaluator.isTiledBottom()) {
    workspace.slotWindowQuickTileTop();
    // BL > L
  } else if (tileEvaluator.isTiledBottomLeft()) {
    workspace.slotWindowQuickTileLeft();
    // BR > R
  } else if (tileEvaluator.isTiledBottomRight()) {
    workspace.slotWindowQuickTileRight();
    // M > T
    // this is probaly no good for multi-monitor
  } else if (tileEvaluator.isMaximized()) {
    workspace.slotWindowMaximize();
  } else {
    workspace.slotWindowMaximize();
  }
};

var QuickTileDown = function () {
  const tileEvaluator = _tileEvaluator();

  // L > BL
  if (tileEvaluator.isTiledLeft()) {
    workspace.slotWindowQuickTileBottomLeft();
    // R > BR
  } else if (tileEvaluator.isTiledRight()) {
    workspace.slotWindowQuickTileBottomRight();
    // T > B
  } else if (tileEvaluator.isTiledTop()) {
    workspace.slotWindowQuickTileBottom();
    // TL > L
  } else if (tileEvaluator.isTiledTopLeft()) {
    workspace.slotWindowQuickTileLeft();
    // TR > R
  } else if (tileEvaluator.isTiledTopRight()) {
    workspace.slotWindowQuickTileRight();
    // M > B
  } else if (tileEvaluator.isMaximized()) {
    workspace.slotWindowMaximize();
  } else {
    workspace.slotWindowMinimize();
  }
};

var QuickTileLeft = function () {
  const tileEvaluator = _tileEvaluator();

  // T > TL
  if (tileEvaluator.isTiledTop()) {
    workspace.slotWindowQuickTileTopLeft();
    // B > BL
  } else if (tileEvaluator.isTiledBottom()) {
    workspace.slotWindowQuickTileBottomLeft();
    // TR > T
  } else if (tileEvaluator.isTiledTopRight()) {
    workspace.slotWindowQuickTileTop();
    // BR > B
  } else if (tileEvaluator.isTiledBottomRight()) {
    workspace.slotWindowQuickTileBottom();
    // M > L
  } else if (tileEvaluator.isMaximized()) {
    workspace.slotWindowQuickTileLeft();
    // R > L, BL > L, TL > L
  } else {
    workspace.slotWindowQuickTileLeft();
  }
};

var QuickTileRight = function () {
  const tileEvaluator = _tileEvaluator();

  // T > TR
  if (tileEvaluator.isTiledTop()) {
    workspace.slotWindowQuickTileTopRight();
    // B > BR
  } else if (tileEvaluator.isTiledBottom()) {
    workspace.slotWindowQuickTileBottomRight();
    // TL > T
  } else if (tileEvaluator.isTiledTopLeft()) {
    workspace.slotWindowQuickTileTop();
    // BL > B
  } else if (tileEvaluator.isTiledBottomLeft()) {
    workspace.slotWindowQuickTileBottom();
    // M > R
  } else if (tileEvaluator.isMaximized()) {
    workspace.slotWindowQuickTileRight();
    // L > R, BR > R, TR > R
  } else {
    workspace.slotWindowQuickTileRight();
  }
};

var shortcutPrefix = "Quick Tile 2 ";
registerShortcut(
  shortcutPrefix + "Up",
  shortcutPrefix + "Up",
  "Meta+Up",
  QuickTileUp
);
registerShortcut(
  shortcutPrefix + "Down",
  shortcutPrefix + "Down",
  "Meta+Down",
  QuickTileDown
);
registerShortcut(
  shortcutPrefix + "Left",
  shortcutPrefix + "Left",
  "Meta+Left",
  QuickTileLeft
);
registerShortcut(
  shortcutPrefix + "Right",
  shortcutPrefix + "Right",
  "Meta+Right",
  QuickTileRight
);
