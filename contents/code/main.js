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

function _GetScreenGeometry() {
    return workspace.clientArea(KWin.PlacementArea, workspace.activeScreen, workspace.Desktop)
}

function _GetClientGeometryOnScreen() {
    var clientGeometry = workspace.activeClient.geometry
    var screenGeometry = _GetScreenGeometry()
    clientGeometry.x -= screenGeometry.x
    clientGeometry.y -= screenGeometry.y
    return clientGeometry
}

function _IsVerticallyMaximized() {
    var screenGeometry = _GetScreenGeometry()
    var clientGeometry = _GetClientGeometryOnScreen()
    if (clientGeometry.height === screenGeometry.height) {
        return true
    }
    return false
}

function _IsHorizontallyMaximized() {
    var screenGeometry = _GetScreenGeometry()
    var clientGeometry = _GetClientGeometryOnScreen()
    if (clientGeometry.width === screenGeometry.width) {
        return true
    }
    return false
}

function _IsMaximized() {
    return _IsHorizontallyMaximized() && _IsVerticallyMaximized()
}

function _IsTiledToTop() {
    var screenGeometry = _GetScreenGeometry()
    var clientGeometry = _GetClientGeometryOnScreen()
    if (clientGeometry.height === (screenGeometry.height / 2) && clientGeometry.y === 0) {
        return true
    }
    return false
}

function _IsTiledTop() {
    return _IsTiledToTop() && _IsHorizontallyMaximized()
}

function _IsTiledToBottom() {
    var screenGeometry = _GetScreenGeometry()
    var clientGeometry = _GetClientGeometryOnScreen()
    if (clientGeometry.height === (screenGeometry.height / 2) && clientGeometry.y === (screenGeometry.height / 2)) {
        return true
    }
    return false
}

function _IsTiledBottom() {
    return _IsTiledToBottom() && _IsHorizontallyMaximized()
}

function _IsTiledToLeft() {
    var screenGeometry = _GetScreenGeometry()
    var clientGeometry = _GetClientGeometryOnScreen()
    if (clientGeometry.width === (screenGeometry.width / 2) && clientGeometry.x === 0) {
        return true
    }
    return false
}

function _IsTiledLeft() {
    return _IsTiledToLeft() && _IsVerticallyMaximized()
}

function _IsTiledToRight() {
    var screenGeometry = _GetScreenGeometry()
    var clientGeometry = _GetClientGeometryOnScreen()
    if (clientGeometry.width === (screenGeometry.width / 2) && clientGeometry.x === (screenGeometry.width / 2)) {
        return true
    }
    return false
}

function _IsTiledRight() {
    return _IsTiledToRight() && _IsVerticallyMaximized()
}

function _IsTiledToQuadrant() {
    var screenGeometry = _GetScreenGeometry()
    var clientGeometry = _GetClientGeometryOnScreen()
    if (clientGeometry.width === (screenGeometry.width / 2) && clientGeometry.height === (screenGeometry.height/ 2)) {
        return true
    }
    return false
}

function _IsTiledTopLeft() {
    return _IsTiledToTop() && _IsTiledToLeft()
}

function _IsTiledTopRight() {
    return _IsTiledToTop() && _IsTiledToRight()
}

function _IsTiledBottomLeft() {
    return _IsTiledToBottom() && _IsTiledToLeft()
}

function _IsTiledBottomRight() {
    return _IsTiledToBottom() && _IsTiledToRight()
}

var QuickTileUp = function() {
    // L > TL
    if (_IsTiledLeft()) {
        workspace.slotWindowQuickTileTopLeft()
    // R > TR
    } else if (_IsTiledRight()) {
        workspace.slotWindowQuickTileTopRight()
    // B > T
    } else if (_IsTiledBottom()) {
        workspace.slotWindowQuickTileTop()
    // BL > L
    } else if (_IsTiledBottomLeft()) {
        workspace.slotWindowQuickTileLeft()
    // BR > R
    } else if (_IsTiledBottomRight()) {
        workspace.slotWindowQuickTileRight()
    // M > T
    // this is probaly no good for multi-monitor
    } else if (_IsMaximized()) {
        workspace.slotWindowMaximize()
    } else {
        workspace.slotWindowMaximize()
    }
}

var QuickTileDown = function() {
    // L > BL
    if (_IsTiledLeft()) {
        workspace.slotWindowQuickTileBottomLeft()
    // R > BR
    } else if (_IsTiledRight()) {
        workspace.slotWindowQuickTileBottomRight()
    // T > B
    } else if (_IsTiledTop()) {
      workspace.slotWindowQuickTileBottom()
    // TL > L
    } else if (_IsTiledTopLeft()) {
        workspace.slotWindowQuickTileLeft()
    // TR > R
    } else if (_IsTiledTopRight()) {
        workspace.slotWindowQuickTileRight()
    // M > B
    } else if (_IsMaximized()) {
        workspace.slotWindowMaximize()
    } else {
        workspace.slotWindowMinimize()
    }
}

var QuickTileLeft = function() {
    // T > TL
    if (_IsTiledTop()) {
        workspace.slotWindowQuickTileTopLeft()
    // B > BL
    } else if (_IsTiledBottom()) {
        workspace.slotWindowQuickTileBottomLeft()
    // TR > T
    } else if (_IsTiledTopRight()) {
        workspace.slotWindowQuickTileTop()
    // BR > B
    } else if (_IsTiledBottomRight()) {
        workspace.slotWindowQuickTileBottom()
    // M > L
    } else if (_IsMaximized()) {
        workspace.slotWindowQuickTileLeft()
    // R > L, BL > L, TL > L
    } else {
        workspace.slotWindowQuickTileLeft()
    }
}

var QuickTileRight = function() {
    // T > TR
    if (_IsTiledTop()) {
        workspace.slotWindowQuickTileTopRight()
    // B > BR
    } else if (_IsTiledBottom()) {
        workspace.slotWindowQuickTileBottomRight()
    // TL > T
    } else if (_IsTiledTopLeft()) {
        workspace.slotWindowQuickTileTop()
    // BL > B
    } else if (_IsTiledBottomLeft()) {
        workspace.slotWindowQuickTileBottom()
    // M > R
    } else if (_IsMaximized()) {
        workspace.slotWindowQuickTileRight()
    // L > R, BR > R, TR > R
    } else {
        workspace.slotWindowQuickTileRight()
    }
}


var shortcutPrefix = "Quick Tile 2 "
registerShortcut(shortcutPrefix + "Up", shortcutPrefix + "Up", "Meta+Up", QuickTileUp)
registerShortcut(shortcutPrefix + "Down", shortcutPrefix + "Down", "Meta+Down", QuickTileDown)
registerShortcut(shortcutPrefix + "Left", shortcutPrefix + "Left", "Meta+Left", QuickTileLeft)
registerShortcut(shortcutPrefix + "Right", shortcutPrefix + "Right", "Meta+Right", QuickTileRight)
