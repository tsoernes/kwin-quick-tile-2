/*******************************************************************************
 * Quick Tile 2 KWin script
 *
 * This script will add four additional shortcuts to the KWin window manager,
 * in order to emulate Windows 10 tiling behavior.
 *
 * Original author Koen Hausmans <koen@hausmans.nl>
 ******************************************************************************/

function _GetScreenGeometry() {
    return workspace.clientArea(KWin.PlacementArea, workspace.activeScreen, workspace.Desktop);
}

function _GetClientGeometryOnScreen() {
    var clientGeometry = workspace.activeClient.geometry;
    var screenGeometry = _GetScreenGeometry();
    clientGeometry.x -= screenGeometry.x;
    clientGeometry.y -= screenGeometry.y;
    return clientGeometry;
}

function _IsWindowVerticallyMaximized() {
    var screenGeometry = _GetScreenGeometry();
    var clientGeometry = _GetClientGeometryOnScreen();
    if (clientGeometry.height == screenGeometry.height) {
        return true;
    }

    return false
}

function _IsWindowHorizontallyMaximized() {
    var screenGeometry = _GetScreenGeometry();
    var clientGeometry = _GetClientGeometryOnScreen();
    if (clientGeometry.width == screenGeometry.width) {
        return true;
    }

    return false
}

function _IsWindowMaximized() {
    return (_IsWindowHorizontallyMaximized() && _IsWindowVerticallyMaximized());
}

function _IsWindowTiledToTop() {
    var screenGeometry = _GetScreenGeometry();
    var clientGeometry = _GetClientGeometryOnScreen();
    if (clientGeometry.height == (screenGeometry.height / 2) && clientGeometry.y == 0) {
        return true;
    }

    return false;
}

function _IsWindowTiledToBottom() {
    var screenGeometry = _GetScreenGeometry();
    var clientGeometry = _GetClientGeometryOnScreen();
    if (clientGeometry.height == (screenGeometry.height / 2) && clientGeometry.y == (screenGeometry.height / 2)) {
        return true;
    }

    return false;
}

function _IsWindowTiledToLeft() {
    var screenGeometry = _GetScreenGeometry();
    var clientGeometry = _GetClientGeometryOnScreen();
    if (clientGeometry.width == (screenGeometry.width / 2) && clientGeometry.x == 0) {
        return true;
    }

    return false;
}

function _IsWindowTiledToRight() {
    var screenGeometry = _GetScreenGeometry();
    var clientGeometry = _GetClientGeometryOnScreen();
    if (clientGeometry.width == (screenGeometry.width / 2) && clientGeometry.x == (screenGeometry.width / 2)) {
        return true;
    }

    return false;
}

function _IsWindowTiledToQuadrant() {
    var screenGeometry = _GetScreenGeometry();
    var clientGeometry = _GetClientGeometryOnScreen();
    if (clientGeometry.width == (screenGeometry.width / 2) && clientGeometry.height == (screenGeometry.height/ 2)) {
        return true;
    }

    return false;
}

var QuickTileUp = function() {
    if (_IsWindowTiledToLeft()) {
        if (_IsWindowTiledToTop()) {
            workspace.slotWindowMaximize();
        } else if (_IsWindowVerticallyMaximized()) {
            workspace.slotWindowQuickTileTopLeft();
        } else if (_IsWindowTiledToBottom()) {
            workspace.slotWindowQuickTileLeft();
        }
    } else if (_IsWindowTiledToRight()) {
        if (_IsWindowTiledToTop()) {
            workspace.slotWindowMaximize();
        } else if (_IsWindowVerticallyMaximized()) {
            workspace.slotWindowQuickTileTopRight();
        } else if (_IsWindowTiledToBottom()) {
            workspace.slotWindowQuickTileRight();
        }
    } else {
        workspace.slotWindowMaximize();
    }
}

var QuickTileDown = function() {
    if (_IsWindowTiledToLeft()) {
        if (_IsWindowTiledToTop()) {
            workspace.slotWindowQuickTileLeft();
        } else if (_IsWindowVerticallyMaximized()) {
            workspace.slotWindowQuickTileBottomLeft();
        } else if (_IsWindowTiledToBottom()) {
            workspace.slotWindowMinimize();
        }
    } else if (_IsWindowTiledToRight()) {
        if (_IsWindowTiledToTop()) {
            workspace.slotWindowQuickTileRight();
        } else if (_IsWindowVerticallyMaximized()) {
            workspace.slotWindowQuickTileBottomRight();
        } else if (_IsWindowTiledToBottom()) {
            workspace.slotWindowMinimize();
        }
    } else {
        workspace.slotWindowMinimize();
    }
}

var QuickTileLeft = function() {
    if (_IsWindowTiledToQuadrant() && _IsWindowTiledToRight()) {
	workspace.slotWindowMaximizeHorizontal();
    } else if (_IsWindowTiledToTop()) {
	workspace.slotWindowQuickTileTopLeft();
    } else if (_IsWindowTiledToBottom()) {
	workspace.slotWindowQuickTileBottomLeft();
    } else if (_IsWindowMaximized()) {
	workspace.slotWindowQuickTileLeft();
	workspace.slotWindowQuickTileLeft();
    } else {
        workspace.slotWindowQuickTileLeft();
    }
}

var QuickTileRight = function() {
    if (_IsWindowTiledToQuadrant() && _IsWindowTiledToLeft()) {
	workspace.slotWindowMaximizeHorizontal();
    } else if (_IsWindowTiledToTop()) {
	workspace.slotWindowQuickTileTopRight();
    } else if (_IsWindowTiledToBottom()) {
	workspace.slotWindowQuickTileBottomRight();
    } else if (_IsWindowMaximized()) {
	workspace.slotWindowQuickTileRight();
	workspace.slotWindowQuickTileRight();
    } else {
        workspace.slotWindowQuickTileRight();
    }
}

var shortcutPrefix = "Quick Tile 2 ";
registerShortcut(shortcutPrefix + "Up", shortcutPrefix + "Up", "Meta+Up", QuickTileUp);
registerShortcut(shortcutPrefix + "Down", shortcutPrefix + "Down", "Meta+Down", QuickTileDown);
registerShortcut(shortcutPrefix + "Left", shortcutPrefix + "Left", "Meta+Left", QuickTileLeft);
registerShortcut(shortcutPrefix + "Right", shortcutPrefix + "Right", "Meta+Right", QuickTileRight);
