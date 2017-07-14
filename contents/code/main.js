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

function _IsVerticallyMaximized() {
    var screenGeometry = _GetScreenGeometry();
    var clientGeometry = _GetClientGeometryOnScreen();
    if (clientGeometry.height == screenGeometry.height) {
        return true;
    }

    return false
}

function _IsHorizontallyMaximized() {
    var screenGeometry = _GetScreenGeometry();
    var clientGeometry = _GetClientGeometryOnScreen();
    if (clientGeometry.width == screenGeometry.width) {
        return true;
    }

    return false
}

function _IsMaximized() {
    return (_IsHorizontallyMaximized() && _IsVerticallyMaximized());
}

function _IsTiledToTop() {
    var screenGeometry = _GetScreenGeometry();
    var clientGeometry = _GetClientGeometryOnScreen();
    if (clientGeometry.height == (screenGeometry.height / 2) && clientGeometry.y == 0) {
        return true;
    }

    return false;
}

function _IsTiledToBottom() {
    var screenGeometry = _GetScreenGeometry();
    var clientGeometry = _GetClientGeometryOnScreen();
    if (clientGeometry.height == (screenGeometry.height / 2) && clientGeometry.y == (screenGeometry.height / 2)) {
        return true;
    }

    return false;
}

function _IsTiledToLeft() {
    var screenGeometry = _GetScreenGeometry();
    var clientGeometry = _GetClientGeometryOnScreen();
    if (clientGeometry.width == (screenGeometry.width / 2) && clientGeometry.x == 0) {
        return true;
    }

    return false;
}

function _IsTiledToRight() {
    var screenGeometry = _GetScreenGeometry();
    var clientGeometry = _GetClientGeometryOnScreen();
    if (clientGeometry.width == (screenGeometry.width / 2) && clientGeometry.x == (screenGeometry.width / 2)) {
        return true;
    }

    return false;
}

function _IsTiledToQuadrant() {
    var screenGeometry = _GetScreenGeometry();
    var clientGeometry = _GetClientGeometryOnScreen();
    if (clientGeometry.width == (screenGeometry.width / 2) && clientGeometry.height == (screenGeometry.height/ 2)) {
        return true;
    }

    return false;
}

function _IsTiledToTopLeft() {
	return _IsTiledToTop() && IsTiledToLeft();
}

function _IsTiledToTopRight() {
	return _IsTiledToTop() && IsTiledToRight();
}

function _IsTiledToBottomLeft() {
	return _IsTiledToBottom() && IsTiledToLeft();
}

function _IsTiledToBottom() {
	return _IsTiledToBottom() && IsTiledToRight();
}

var QuickTileUp = function() {
    if (_IsTiledToLeft()) {
        if (_IsTiledToTop()) {
            workspace.slotWindowMaximize();
        } else if (_IsVerticallyMaximized()) {
            workspace.slotWindowQuickTileTopLeft();
        } else if (_IsTiledToBottom()) {
            workspace.slotWindowQuickTileLeft();
        }
    } else if (_IsTiledToRight()) {
        if (_IsTiledToTop()) {
            workspace.slotWindowMaximize();
        } else if (_IsVerticallyMaximized()) {
            workspace.slotWindowQuickTileTopRight();
        } else if (_IsTiledToBottom()) {
            workspace.slotWindowQuickTileRight();
        }
    } else {
        workspace.slotMaximize();
    }
}

var QuickTileDown = function() {
    if (_IsTiledToLeft()) {
        if (_IsTiledToTop()) {
            workspace.slotWindowQuickTileLeft();
        } else if (_IsVerticallyMaximized()) {
            workspace.slotWindowQuickTileBottomLeft();
        } else if (_IsTiledToBottom()) {
            workspace.slotWindowMinimize();
        }
    } else if (_IsTiledToRight()) {
        if (_IsTiledToTop()) {
            workspace.slotWindowQuickTileRight();
        } else if (_IsVerticallyMaximized()) {
            workspace.slotWindowQuickTileBottomRight();
        } else if (_IsTiledToBottom()) {
            workspace.slotWindowMinimize();
        }
    } else {
        workspace.slotWindowMinimize();
    }
}

var QuickTileLeft = function() {
	if (_IsTiledToTop()) {
		if (_IsTiledToRight()) {
			workspace.slotWindowMaximizeHorizontal();
		} else if (_IsHorizontallyMaximized()) {
			workspace.slotWindowQuickTileTopLeft();
		} else if (_IsTiledToLeft()) {
			// does this grow window vertically, does nothing, or moves to another screen?
			workspace.slotWindowQuickTileLeft();
		}
	} else if (_IsTiledToBottom()) {
		if (_IsTiledToRight()) {
			workspace.slotWindowMaximizeHorizontal();
		} else if (_IsHorizontallyMaximized()) {
			workspace.slotWindowQuickTileBottomLeft();
		} else if (_IsTiledToLeft()) {
			// does this grow window vertically, does nothing, or moves to another screen?
			workspace.slotWindowQuickTileLeft();
		}
	} else {
		workspace.slotWindowQuickTileLeft();
	}
}

var QuickTileRight = function() {
	if (_IsTiledToTop()) {
		if (_IsTiledToLeft()) {
			workspace.slotWindowMaximizeHorizontal();
		} else if (_IsHorizontallyMaximized()) {
			workspace.slotWindowQuickTileTopRight();
		} else if (_IsTiledToRight()) {
			// does this grow window vertically, does nothing, or moves to another screen?
			workspace.slotWindowQuickTileRight();
		}
	} else if (_IsTiledToBottom()) {
		if (_IsTiledToLeft()) {
			workspace.slotWindowMaximizeHorizontal();
		} else if (_IsHorizontallyMaximized()) {
			workspace.slotWindowQuickTileBottomRight();
		} else if (_IsTiledToRight()) {
			// does this grow window vertically, does nothing, or moves to another screen?
			workspace.slotWindowQuickTileRight();
		}
	} else {
		workspace.slotWindowQuickTileRight();
	}
}


var shortcutPrefix = "Quick Tile 2 ";
registerShortcut(shortcutPrefix + "Up", shortcutPrefix + "Up", "Meta+Up", QuickTileUp);
registerShortcut(shortcutPrefix + "Down", shortcutPrefix + "Down", "Meta+Down", QuickTileDown);
registerShortcut(shortcutPrefix + "Left", shortcutPrefix + "Left", "Meta+Left", QuickTileLeft);
registerShortcut(shortcutPrefix + "Right", shortcutPrefix + "Right", "Meta+Right", QuickTileRight);
