rm ./quick-tile-*
zip -r quick-tile-2-v$(cat metadata.desktop | grep X-KDE-PluginInfo-Version= | awk -F'=' '{print $2}').kwinscript *
rm -rf ~/.local/share/kwin/scripts/quick-tile-2*
plasmapkg2 --type kwinscript -i quick-tile-2-v*.kwinscript
qdbus org.kde.KWin /KWin reconfigure
mkdir -p ~/.local/share/kservices5
cp ~/.local/share/kwin/scripts/quick-tile-2/metadata.desktop ~/.local/share/kservices5/kwin-script-quick-tile-2.desktop
kwin --replace &
