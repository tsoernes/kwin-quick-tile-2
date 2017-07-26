This KWin Script extends the quick tiling functionality in KDE. It adds two shortcuts which behave similar to the 2x2 Snap feature introduced in Windows 10, 
with an addition that allows to tile windows to the top half or the bottom half of the screen.

Tested and compatible with multi-monitor setups.

## Installation

Execute in the source folder the following command:

```
sh install.sh
```
Then open Kwin Scripts from the start menu and enable Quick Tile 2.

Default keys are <Meta + Arrow> as in Windows 10, where the Meta key is often called the Super key or Windows key.
If the keys are already bound, you need to set them in "Global Shortcuts". The shortcuts are prefixed "Quick Tile 2".
They are supposed to end up in the KWin shortcut tab, but on some systems they end on in the System Settings tab.

## Manual install and Packaging

Should something go wrong with the above script, you can try to manually package it and install it
To package this kwin-script into a .kwinscript archive, execute:

```
zip -r quick-tile-2-v$(cat metadata.desktop | grep X-KDE-PluginInfo-Version= | awk -F'=' '{print $2}').kwinscript *
```

To install the archive, execute:
```
plasmapkg2 --type kwinscript -i quick-tile-2-v*.kwinscript
```
Alternatively, open "KWin scripts" from the start menu and then "Import KWin script ..."


Forked from Quick Tiling - Windows 10 by Koen Hausmans (koen@hausmans.nl)
